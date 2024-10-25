import { Request } from "express"
import { Op } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreateOrder, CreateOrderDetail, CreatePayment, UpdateOrder } from "~/constants/type"
import { Order } from "~/models/order.model"
import { OrderDetail } from "~/models/orderDetail.model"
import { Package } from "~/models/package.model"
import { Payment } from "~/models/payment.model"
import { User } from "~/models/user.model"
import { formatModelDate } from "~/utils/formatTimeModel.util"
import { getUserFromToken } from "~/utils/getUserFromToken.util"

import { KoiFish } from "./../models/koiFish.model"
import orderDetailService from "./orderDetail.service"
import paymentService from "./payment.service"

async function getAllOrders(req: Request) {
  try {
    // Xử lý tham số query và gán giá trị mặc định nếu không có
    const pageIndex = parseInt(req.query.page_index as string) || 1
    const pageSize = parseInt(req.query.page_size as string) || 10
    const keyword = req.query.keyword as string
    const status = req.query.status as string

    const whereCondition: any = {
      isDeleted: false
    }

    if (keyword) {
      whereCondition[Op.or] = []
    }

    // Thêm filter theo status
    if (status) {
      const validStatuses = ["PENDING", "PROCESSING", "SHIPPED", "CANCELLED", "COMPLETED"]
      const inputStatus = status.trim().toUpperCase()

      if (validStatuses.includes(inputStatus)) {
        whereCondition.status = inputStatus
      } else {
        // Xử lý status không hợp lệ (ví dụ: throw error hoặc bỏ qua)
        throw responseStatus.responseBadRequest400("Invalid order status")
      }
    }

    const { count, rows: orders } = await Order.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"]
        }
      ]
    })

    let formatOrders: any[] = []
    if (orders.length > 0) {
      // Lấy tất cả các orderId từ danh sách orders
      const orderIds = orders.map((order) => order.id).filter((id): id is string => id !== undefined)

      const payments = await Payment.findAll({
        where: { orderId: orderIds, isDeleted: false },
        attributes: ["id", "orderId", "paymentCode"]
      })

      const unFormatDateOrders = orders.map((order) => {
        const payment = payments.find((p) => p.orderId === order.id)
        return {
          ...order.toJSON(),
          payment: payment
        }
      })
      // Format dữ liệu
      formatOrders = unFormatDateOrders.map((order) => formatModelDate(order))
    }

    const totalOrders =
      (await Order.count({
        where: { isDeleted: false }
      })) || 0

    // Lấy tổng số tiền của các đơn hàng đã hoàn thành (COMPLETED)
    const totalSpent =
      (await Order.sum("totalAmount", {
        where: { status: "COMPLETED", isDeleted: false }
      })) || 0

    const totalPage = Math.ceil(count / pageSize)
    const pagination = {
      pageSize,
      totalItem: count,
      currentPage: pageIndex,
      maxPageSize: 100,
      totalPage
    }

    const dataResponse = {
      totalOrders,
      totalSpent,
      formatOrders
    }

    return { orders: dataResponse, pagination }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getOrderHistory(token: string, req: Request) {
  try {
    // Xử lý tham số query và gán giá trị mặc định nếu không có
    const pageIndex = parseInt(req.query.page_index as string) || 1
    const pageSize = parseInt(req.query.page_size as string) || 10
    const keyword = req.query.keyword as string
    const status = req.query.status as string

    const user = await getUserFromToken(token)

    const whereCondition: any = {
      userId: user.id,
      isDeleted: false
    }

    if (keyword) {
      whereCondition[Op.or] = []
    }

    // Thêm filter theo status
    if (status) {
      const validStatuses = ["PENDING", "PROCESSING", "SHIPPED", "CANCELLED", "COMPLETED"]
      const inputStatus = status.trim().toUpperCase()

      if (validStatuses.includes(inputStatus)) {
        whereCondition.status = inputStatus
      } else {
        // Xử lý status không hợp lệ (ví dụ: throw error hoặc bỏ qua)
        throw responseStatus.responseBadRequest400("Invalid order status")
      }
    }

    const { count, rows: orders } = await Order.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"]
        }
      ]
    })

    let formatOrders: any[] = []
    if (orders.length > 0) {
      // Lấy tất cả các orderId từ danh sách orders
      const orderIds = orders.map((order) => order.id).filter((id): id is string => id !== undefined)

      const payments = await Payment.findAll({
        where: { orderId: orderIds, isDeleted: false },
        attributes: ["id", "orderId", "paymentCode"]
      })

      const unFormatDateOrders = orders.map((order) => {
        const payment = payments.find((p) => p.orderId === order.id)
        return {
          ...order.toJSON(),
          payment: payment
        }
      })
      // Format dữ liệu
      formatOrders = unFormatDateOrders.map((order) => formatModelDate(order))
    }

    const totalOrders =
      (await Order.count({
        where: { userId: user.id, isDeleted: false }
      })) || 0

    // Lấy tổng số tiền của các đơn hàng đã hoàn thành (COMPLETED)
    const totalSpent =
      (await Order.sum("totalAmount", {
        where: { userId: user.id, status: "COMPLETED", isDeleted: false }
      })) || 0

    const totalPage = Math.ceil(count / pageSize)
    const pagination = {
      pageSize,
      totalItem: count,
      currentPage: pageIndex,
      maxPageSize: 100,
      totalPage
    }

    const dataResponse = {
      totalOrders,
      totalSpent,
      formatOrders
    }

    return { orders: dataResponse, pagination }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getOrderById(orderId: string) {
  try {
    const order = await Order.findOne({
      where: { id: orderId, isDeleted: false }
    })
    if (!order) throw responseStatus.responseNotFound404("Order not found")
    return order
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function createOrder(token: string, newOrder: CreateOrder) {
  try {
    const user = await getUserFromToken(token)

    // 1. Tìm tất cả OrderDetail giống với newOrder
    const similarOrderDetails = await OrderDetail.findAll({
      where: {
        [newOrder.type === "KOIFISH" ? "koiFishId" : "packageId"]:
          newOrder.type === "KOIFISH" ? newOrder.koiFishId : newOrder.packageId,
        type: newOrder.type
      }
    })

    // 2. Lọc ra danh sách orderId có userId tương ứng
    const orderIds = await Promise.all(
      similarOrderDetails.map(async (detail) => {
        const order = await Order.findByPk(detail.orderId)
        return order?.userId === user.id ? detail.orderId : null
      })
    )
    const filteredOrderIds = orderIds.filter((id): id is string => !!id)

    // 3. Kiểm tra nếu có order nào phù hợp
    if (filteredOrderIds.length > 0) {
      // Tìm order đầu tiên trong danh sách orderIds
      const existingOrder = await Order.findOne({
        where: {
          id: filteredOrderIds[0]
        }
      })

      if (existingOrder) {
        throw responseStatus.responseConflict409("Order already exists")
      }
    }

    if (newOrder.type === "KOIFISH" && !newOrder.koiFishId) {
      throw new Error("koiFishId is required when type is KOIFISH")
    }

    if (newOrder.type === "PACKAGE" && !newOrder.packageId) {
      throw new Error("packageId is required when type is PACKAGE")
    }

    const order = await Order.create({
      userId: user.id!,
      status: "PENDING",
      totalAmount: 0
    })

    if (!order.id) {
      throw responseStatus.responseBadRequest400("Tạo đơn hàng thất bại")
    }

    let unitPrice = 0
    if (newOrder.type === "KOIFISH" && newOrder.koiFishId) {
      const koiFish = await KoiFish.findOne({
        where: { id: newOrder.koiFishId, isDeleted: false }
      })
      if (!koiFish) {
        throw responseStatus.responseNotFound404("Không tìm thấy cá")
      }
      unitPrice = koiFish.price
    }

    if (newOrder.type === "PACKAGE" && newOrder.packageId) {
      const currentPackage = await Package.findOne({
        where: { id: newOrder.packageId, isDeleted: false }
      })
      if (!currentPackage) {
        throw responseStatus.responseNotFound404("Không tìm thấy gói")
      }
      unitPrice = currentPackage.price
    }

    const newOrderDetail: CreateOrderDetail = {
      orderId: order.id!,
      koiFishId: newOrder.type === "KOIFISH" ? newOrder.koiFishId : null,
      packageId: newOrder.type === "PACKAGE" ? newOrder.packageId : null,
      type: newOrder.type,
      unitPrice: unitPrice,
      totalPrice: unitPrice
    }

    await orderDetailService.createOrderDetail(newOrderDetail)

    order.totalAmount = unitPrice

    await order.save()

    const newPayment: CreatePayment = {
      orderId: order.id,
      amount: order.totalAmount
    }

    await paymentService.createPayment(newPayment)

    return order
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function editOrder(id: string, updatedOrder: UpdateOrder) {
  try {
    const order = await Order.findOne({
      where: { id, isDeleted: false }
    })

    if (!order) {
      throw responseStatus.responseNotFound404("Order not found")
    }

    // Update order properties
    await order.update({
      status: updatedOrder.status || order.status
    })

    return order
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function deleteOrder(id: string) {
  try {
    const order = await Order.findOne({ where: { id, isDeleted: false } })
    if (!order) {
      throw responseStatus.responseNotFound404("Order not found or already deleted")
    }

    const orderResult = await Order.update({ isDeleted: true }, { where: { id } })

    if (orderResult[0] === 0) {
      throw responseStatus.responeCustom(400, "Delete order failed")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getCurrentPackage(token: string) {
  try {
    const user = await getUserFromToken(token)
    const order = await Order.findAll({ where: { userId: user.id, isDeleted: false } })
    if (!order) {
      throw responseStatus.responseNotFound404("Order not found or already deleted")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default {
  getAllOrders,
  getOrderHistory,
  getOrderById,
  createOrder,
  editOrder,
  deleteOrder
}
