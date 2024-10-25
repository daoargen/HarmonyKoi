import { Request, Response } from "express"

import responseStatus from "~/constants/responseStatus"
import orderService from "~/services/order.service"

async function getOrders(req: Request, res: Response) {
  try {
    const { orders, pagination } = await orderService.getAllOrders(req)
    return res.json(responseStatus.responseData200("Get orders list successfully!", orders, pagination))
  } catch (error) {
    return res.json(error)
  }
}

async function getOrderHistory(req: Request, res: Response) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
      return res.json(responseStatus.responseUnauthorized401())
    }
    const { orders, pagination } = await orderService.getOrderHistory(token, req)
    return res.json(responseStatus.responseData200("Get orders list successfully!", orders, pagination))
  } catch (error) {
    return res.json(error)
  }
}

async function getOrder(req: Request, res: Response) {
  try {
    const id = req.params.id
    const order = await orderService.getOrderById(id)
    return res.json(responseStatus.responseData200("Get order successfully!", order))
  } catch (error) {
    return res.json(error)
  }
}

async function createOrder(req: Request, res: Response) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
      return res.json(responseStatus.responseUnauthorized401())
    }
    const newOrder = req.body
    const order = await orderService.createOrder(token, newOrder)
    return res.json(responseStatus.responseData200("Create order successfully!", order))
  } catch (error) {
    return res.json(error)
  }
}

async function editOrder(req: Request, res: Response) {
  try {
    const id = req.params.id
    const updatedOrder = req.body
    await orderService.editOrder(id, updatedOrder)
    return res.json(responseStatus.responseMessage200("Edit order successfully!"))
  } catch (error) {
    return res.json(error)
  }
}

async function deleteOrder(req: Request, res: Response) {
  try {
    const id = req.params.id
    await orderService.deleteOrder(id)
    return res.json(responseStatus.responseMessage200("Delete order successfully!"))
  } catch (error) {
    return res.json(error)
  }
}

export default {
  getOrders,
  getOrderHistory,
  getOrder,
  createOrder,
  editOrder,
  deleteOrder
}
