import { Request, Response } from "express"

import responseStatus from "~/constants/responseStatus"
import { CreateKoiFish, UpdateKoiFish } from "~/constants/type"
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
    const { verietyId, name, description, imageUrl, baseColor, symbolism, price, elementIds } = req.body
    const dataRequest: CreateKoiFish = {
      verietyId,
      name,
      description,
      imageUrl,
      baseColor,
      symbolism,
      price,
      elementIds
    }
    const koiFish = await koiFishService.createKoiFish(dataRequest)
    return res.json(responseStatus.responseData200("Create koi fish successfully!", koiFish))
  } catch (error) {
    return res.json(error)
  }
} // Controller for create koi fish

async function editKoiFish(req: Request, res: Response) {
  try {
    const id = req.params.id
    const { verietyId, name, description, imageUrl, baseColor, symbolism, price, elementIds } = req.body
    const dataRequest: UpdateKoiFish = {
      verietyId,
      name,
      description,
      imageUrl,
      baseColor,
      symbolism,
      price,
      elementIds
    }
    await koiFishService.editKoiFish(id, dataRequest)
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
