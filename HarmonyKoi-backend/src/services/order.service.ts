import { Request } from "express"
import { Op } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreateOrder, UpdateOrder } from "~/constants/type"
import { Order } from "~/models/order.model"
import { Package } from "~/models/package.model"
import { Post } from "~/models/post.model"
import { User } from "~/models/user.model"
import { formatModelDate } from "~/utils/formatTimeModel.util"
import { getUserFromToken } from "~/utils/getUserFromToken.util"

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
      whereCondition[Op.or] = [
        { "$user.username$": { [Op.like]: `%${keyword}%` } },
        { "$package.name$": { [Op.like]: `%${keyword}%` } },
        { "$post.title$": { [Op.like]: `%${keyword}%` } } // Assuming Post has a 'title' field
      ]
    }

    if (status) {
      whereCondition.status = status
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
        },
        {
          model: Post,
          as: "post",
          attributes: ["title"]
        }
      ]
    })

    const formattedOrders = orders.map((order) => formatModelDate(order.dataValues))

    const totalPage = Math.ceil(count / pageSize)
    const pagination = {
      pageSize,
      totalItem: count,
      currentPage: pageIndex,
      maxPageSize: 100,
      totalPage
    }

    return { orders: formattedOrders, pagination }
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

async function createOrder(newOrder: CreateOrder) {
  try {
    const order = await Order.create(newOrder)
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
      userId: updatedOrder.userId || order.userId,
      packageId: updatedOrder.packageId !== undefined ? updatedOrder.packageId : order.packageId,
      postId: updatedOrder.postId !== undefined ? updatedOrder.postId : order.postId,
      status: updatedOrder.status || order.status,
      totalAmount: updatedOrder.totalAmount || order.totalAmount
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
  getOrderById,
  createOrder,
  editOrder,
  deleteOrder
}
