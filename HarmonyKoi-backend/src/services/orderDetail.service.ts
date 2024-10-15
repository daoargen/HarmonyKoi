import responseStatus from "~/constants/responseStatus"
import { CreateOrderDetail, UpdateOrderDetail } from "~/constants/type"
import { KoiFish } from "~/models/koiFish.model"
import { Order } from "~/models/order.model"
import { OrderDetail } from "~/models/orderDetail.model"
import { Package } from "~/models/package.model"

async function getAllOrderDetails() {
  try {
    const orderDetails = await OrderDetail.findAll({
      where: { isDeleted: false },
      include: [
        {
          model: Order,
          as: "order",
          attributes: ["totalAmount"] // Select attributes you want from Order
        },
        {
          model: KoiFish,
          as: "koiFish",
          attributes: ["name", "price"] // Select attributes you want from KoiFish
        },
        {
          model: Package,
          as: "package",
          attributes: ["name", "price"] // Select attributes you want from Package
        }
      ]
    })
    return orderDetails
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getOrderDetailById(orderDetailId: string) {
  try {
    const orderDetail = await OrderDetail.findOne({
      where: { id: orderDetailId, isDeleted: false },
      include: [
        {
          model: Order,
          as: "order",
          attributes: ["totalAmount"]
        },
        {
          model: KoiFish,
          as: "koiFish",
          attributes: ["name", "price"]
        },
        {
          model: Package,
          as: "package",
          attributes: ["name", "price"]
        }
      ]
    })
    if (!orderDetail) throw responseStatus.responseNotFound404("OrderDetail not found")
    return orderDetail
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function createOrderDetail(newOrderDetail: CreateOrderDetail) {
  try {
    const orderDetail = await OrderDetail.create(newOrderDetail)
    return orderDetail
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function editOrderDetail(id: string, updatedOrderDetail: UpdateOrderDetail) {
  try {
    const orderDetail = await OrderDetail.findOne({
      where: { id, isDeleted: false }
    })

    if (!orderDetail) {
      throw responseStatus.responseNotFound404("OrderDetail not found")
    }

    await orderDetail.update({
      orderId: updatedOrderDetail.orderId || orderDetail.orderId,
      koiFishId: updatedOrderDetail.koiFishId !== undefined ? updatedOrderDetail.koiFishId : orderDetail.koiFishId, // Handle potential null values
      packageId: updatedOrderDetail.packageId !== undefined ? updatedOrderDetail.packageId : orderDetail.packageId, // Handle potential null values
      type: updatedOrderDetail.type || orderDetail.type,
      unitPrice: updatedOrderDetail.unitPrice || orderDetail.unitPrice,
      totalPrice: updatedOrderDetail.totalPrice || orderDetail.totalPrice
    })

    return orderDetail
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function deleteOrderDetail(id: string) {
  try {
    const orderDetail = await OrderDetail.findOne({
      where: { id, isDeleted: false }
    })
    if (!orderDetail) {
      throw responseStatus.responseNotFound404("OrderDetail not found or already deleted")
    }

    const orderDetailResult = await OrderDetail.update({ isDeleted: true }, { where: { id } })

    if (orderDetailResult[0] === 0) {
      throw responseStatus.responeCustom(400, "Delete orderDetail failed")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default {
  getAllOrderDetails,
  getOrderDetailById,
  createOrderDetail,
  editOrderDetail,
  deleteOrderDetail
}
