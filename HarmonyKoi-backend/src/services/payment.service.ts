import { Request } from "express"
import { Op } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreatePayment, UpdatePayment } from "~/constants/type"
import { Order } from "~/models/order.model"
import { Payment } from "~/models/payment.model"
import { formatModelDate } from "~/utils/formatTimeModel.util"

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
    const payment = await Payment.create(newPayment)
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
      orderId: updatedPayment.orderId || payment.orderId,
      paymentCode: updatedPayment.paymentCode || payment.paymentCode,
      amount: updatedPayment.amount || payment.amount,
      payDate: updatedPayment.payDate || payment.payDate,
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

export default {
  getAllPayments,
  getPaymentById,
  createPayment,
  editPayment,
  deletePayment
}
