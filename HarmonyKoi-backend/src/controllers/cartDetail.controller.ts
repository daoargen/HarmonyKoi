import { Request, Response } from "express"

import responseStatus from "~/constants/responseStatus"
import cartDetailService from "~/services/cartDetail.service"

async function getCartDetails(req: Request, res: Response) {
  try {
    const { cartDetails, pagination } = await cartDetailService.getAllCartDetails(req)
    return res.json(responseStatus.responseData200("Get cart details list successfully!", cartDetails, pagination))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get all cartDetails

async function getCartDetail(req: Request, res: Response) {
  try {
    const id = req.params.id
    const cartDetail = await cartDetailService.getCartDetailById(id)
    return res.json(responseStatus.responseData200("Get cart detail successfully!", cartDetail))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get cartDetail by id

async function createCartDetail(req: Request, res: Response) {
  try {
    const newCartDetail = req.body
    const cartDetail = await cartDetailService.createCartDetail(newCartDetail)
    return res.json(responseStatus.responseData200("Create cart detail successfully!", cartDetail))
  } catch (error) {
    return res.json(error)
  }
} // Controller for create cartDetail

async function editCartDetail(req: Request, res: Response) {
  try {
    const id = req.params.id
    const updatedCartDetail = req.body
    await cartDetailService.editCartDetail(id, updatedCartDetail)
    return res.json(responseStatus.responseMessage200("Edit cart detail successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for edit cartDetail

async function deleteCartDetail(req: Request, res: Response) {
  try {
    const id = req.params.id
    await cartDetailService.deleteCartDetail(id)
    return res.json(responseStatus.responseMessage200("Delete cart detail successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for delete cartDetail

export default {
  getCartDetails,
  getCartDetail,
  createCartDetail,
  editCartDetail,
  deleteCartDetail
}
