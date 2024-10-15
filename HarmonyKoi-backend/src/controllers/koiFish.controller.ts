import { Request, Response } from "express"

import responseStatus from "~/constants/responseStatus"
import koiFishService from "~/services/koiFish.service"

async function getKoiFishes(req: Request, res: Response) {
  try {
    const { koiFishes, pagination } = await koiFishService.getAllKoiFishes(req)
    return res.json(responseStatus.responseData200("Get koi fishes list successfully!", koiFishes, pagination))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get all koi fishes

async function getKoiFish(req: Request, res: Response) {
  try {
    const id = req.params.id
    const koiFish = await koiFishService.getKoiFishById(id)
    return res.json(responseStatus.responseData200("Get koi fish successfully!", koiFish))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get koi fish by id

async function createKoiFish(req: Request, res: Response) {
  try {
    const newKoiFish = req.body
    const koiFish = await koiFishService.createKoiFish(newKoiFish)
    return res.json(responseStatus.responseData200("Create koi fish successfully!", koiFish))
  } catch (error) {
    return res.json(error)
  }
} // Controller for create koi fish

async function editKoiFish(req: Request, res: Response) {
  try {
    const id = req.params.id
    const updatedKoiFish = req.body
    await koiFishService.editKoiFish(id, updatedKoiFish)
    return res.json(responseStatus.responseMessage200("Edit koi fish successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for edit koi fish

async function deleteKoiFish(req: Request, res: Response) {
  try {
    const id = req.params.id
    await koiFishService.deleteKoiFish(id)
    return res.json(responseStatus.responseMessage200("Delete koi fish successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for delete koi fish

export default {
  getKoiFishes,
  getKoiFish,
  createKoiFish,
  editKoiFish,
  deleteKoiFish
}
