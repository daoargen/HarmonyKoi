import { Request, Response } from "express"

import responseStatus from "~/constants/responseStatus"
import cartService from "~/services/cart.service"

async function getCarts(req: Request, res: Response) {
  try {
    const { carts, pagination } = await cartService.getAllCarts(req)
    return res.json(responseStatus.responseData200("Get carts list successfully!", carts, pagination))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get all carts

async function getCart(req: Request, res: Response) {
  try {
    const id = req.params.id
    const cart = await cartService.getCartById(id)
    return res.json(responseStatus.responseData200("Get cart successfully!", cart))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get cart by id

async function createCart(req: Request, res: Response) {
  try {
    const newCart = req.body
    const cart = await cartService.createCart(newCart)
    return res.json(responseStatus.responseData200("Create cart successfully!", cart))
  } catch (error) {
    return res.json(error)
  }
} // Controller for create cart

async function editCart(req: Request, res: Response) {
  try {
    const id = req.params.id
    const updatedCart = req.body
    await cartService.editCart(id, updatedCart)
    return res.json(responseStatus.responseMessage200("Edit cart successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for edit cart

async function deleteCart(req: Request, res: Response) {
  try {
    const id = req.params.id
    await cartService.deleteCart(id)
    return res.json(responseStatus.responseMessage200("Delete cart successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for delete cart

export default {
  getCarts,
  getCart,
  createCart,
  editCart,
  deleteCart
}
