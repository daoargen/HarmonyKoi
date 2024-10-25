import { Request } from "express"
import { Op } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreatePayment, handleSepayWebhook, UpdatePayment } from "~/constants/type"
import { Order } from "~/models/order.model"
import { Payment } from "~/models/payment.model"
import { formatModelDate } from "~/utils/formatTimeModel.util"
import { logNonCustomError } from "~/utils/logNonCustomError.util"

async function getAllPayments(req: Request) {
  try {
    // Xử lý tham số query và gán giá trị mặc định nếu không có
    const pageIndex = parseInt(req.query.page_index as string) || 1
    const pageSize = parseInt(req.query.page_size as string) || 10
    const keyword = req.query.keyword as string
    const payStatus = req.query.payStatus as string

    const whereCondition: any = {
      isDeleted: false
    }

    if (keyword) {
      whereCondition[Op.or] = [
        { paymentCode: { [Op.like]: `%${keyword}%` } },
        { "$order.totalAmount$": { [Op.like]: `%${keyword}%` } }
      ]
    }

    if (payStatus) {
      whereCondition.payStatus = payStatus
    }

    const { count, rows: payments } = await Payment.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Order,
          as: "order",
          attributes: ["totalAmount"]
        }
      ]
    })

    const formattedPayments = payments.map((payment) => formatModelDate(payment.dataValues))

    const totalPage = Math.ceil(count / pageSize)
    const pagination = {
      pageSize,
      totalItem: count,
      currentPage: pageIndex,
      maxPageSize: 100,
      totalPage
    }

    return { payments: formattedPayments, pagination }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getPaymentById(paymentId: string) {
  try {
    const payment = await Payment.findOne({
      where: { id: paymentId, isDeleted: false },
      include: [
        {
          model: Order,
          as: "order",
          attributes: ["totalAmount"]
        }
      ]
    })
    if (!payment) throw responseStatus.responseNotFound404("Payment not found")
    return payment
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function createPayment(newPayment: CreatePayment) {
  try {
    // Tìm payment có orderId giống newPayment.orderId
    const existingPayment = await Payment.findOne({
      where: { orderId: newPayment.orderId, isDeleted: false }
    })

    // Nếu đã tồn tại payment, trả về payment đó
    if (existingPayment) {
      existingPayment.payStatus = "PENDING"
      await existingPayment.save()
      return existingPayment
    }

    const payment = await Payment.create({
      orderId: newPayment.orderId,
      paymentCode: await generateNextPaymentCode(),
      amount: newPayment.amount,
      payDate: new Date(),
      payStatus: "PENDING"
    })
    return payment
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function editPayment(id: string, updatedPayment: UpdatePayment) {
  try {
    const payment = await Payment.findOne({
      where: { id, isDeleted: false }
    })

    if (!payment) {
      throw responseStatus.responseNotFound404("Payment not found")
    }

    // Update payment properties
    await payment.update({
      payStatus: updatedPayment.payStatus || payment.payStatus
    })

    return payment
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function deletePayment(id: string) {
  try {
    const payment = await Payment.findOne({ where: { id, isDeleted: false } })
    if (!payment) {
      throw responseStatus.responseNotFound404("Payment not found or already deleted")
    }

    const paymentResult = await Payment.update({ isDeleted: true }, { where: { id } })

    if (paymentResult[0] === 0) {
      throw responseStatus.responeCustom(400, "Delete payment failed")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function generateNextPaymentCode() {
  try {
    // Tìm paymentCode lớn nhất trong database
    const lastPayment = await Payment.findOne({
      where: {
        paymentCode: {
          [Op.regexp]: "^DH\\d{4}$" // Chỉ lấy paymentCode có dạng DHxxxx (x là số)
        }
      },
      order: [["paymentCode", "DESC"]] // Sắp xếp theo paymentCode giảm dần
    })

    if (lastPayment) {
      // Nếu tìm thấy paymentCode lớn nhất
      const lastCode = lastPayment.paymentCode
      const numberPart = parseInt(lastCode.slice(2), 10) // Lấy phần số (bỏ 2 ký tự đầu "DH")
      const nextNumber = numberPart + 1
      const nextCode = `DH${nextNumber.toString().padStart(4, "0")}` // Tạo paymentCode mới
      return nextCode
    } else {
      // Nếu không tìm thấy paymentCode nào (database trống)
      return "DH0001" // Bắt đầu từ DH0001
    }
  } catch (error) {
    logNonCustomError(error)
    throw error
  }
}

async function cancelPayment(paymentId: string) {
  try {
    const payment = await Payment.findOne({
      where: { id: paymentId, isDeleted: false }
    })

    if (!payment) {
      throw responseStatus.responseNotFound404("Payment not found")
    }

    const order = await Order.findOne({
      where: { id: payment.orderId, isDeleted: false }
    })

    if (!order) {
      throw responseStatus.responseNotFound404("Order not found")
    }

    if (payment.payStatus === "CANCEL") {
      throw responseStatus.responseBadRequest400("Payment already cancelled")
    }

    if (order.status === "CANCELLED") {
      throw responseStatus.responseBadRequest400("Order already cancelled")
    }

    payment.payStatus = "CANCEL"
    await payment.save()

    order.status = "CANCELLED"
    await order.save()
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function completePaymentFromWebhook(webhookData: handleSepayWebhook) {
  try {
    const payment = await Payment.findOne({
      where: {
        paymentCode: webhookData.content, // Tìm theo paymentCode
        amount: webhookData.transferAmount, // Kiểm tra amount
        isDeleted: false
      }
    })

    if (!payment) {
      throw responseStatus.responseNotFound404("Payment not found")
    }

    const order = await Order.findOne({
      where: { id: payment.orderId, isDeleted: false }
    })

    if (!order) {
      throw responseStatus.responseNotFound404("Order not found")
    }

    if (payment.payStatus === "COMPLETED") {
      throw responseStatus.responseBadRequest400("Payment already completed")
    }

    if (order.status === "COMPLETED") {
      throw responseStatus.responseBadRequest400("Order already completed")
    }

    payment.payStatus = "COMPLETED"
    await payment.save()

    order.status = "COMPLETED"
    await order.save()
  } catch (error) {
    logNonCustomError(error)
    throw error
  }
}

export default {
  getAllPayments,
  getPaymentById,
  createPayment,
  editPayment,
  deletePayment,
  generateNextPaymentCode,
  cancelPayment,
  completePaymentFromWebhook
}
