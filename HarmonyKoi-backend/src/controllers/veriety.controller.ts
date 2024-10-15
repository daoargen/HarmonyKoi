import { Request, Response } from "express"

import responseStatus from "~/constants/responseStatus"
import verietyService from "~/services/veriety.service"

async function getVerieties(req: Request, res: Response) {
  try {
    const { varieties, pagination } = await verietyService.getAllVerieties(req)
    return res.json(responseStatus.responseData200("Get varieties list successfully!", varieties, pagination))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get all varieties

async function getVeriety(req: Request, res: Response) {
  try {
    const id = req.params.id
    const veriety = await verietyService.getVerietyById(id)
    return res.json(responseStatus.responseData200("Get veriety successfully!", veriety))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get veriety by id

async function createVeriety(req: Request, res: Response) {
  try {
    const newVeriety = req.body
    const veriety = await verietyService.createVeriety(newVeriety)
    return res.json(responseStatus.responseData200("Create veriety successfully!", veriety))
  } catch (error) {
    return res.json(error)
  }
} // Controller for create veriety

async function editVeriety(req: Request, res: Response) {
  try {
    const id = req.params.id
    const updatedVeriety = req.body
    await verietyService.editVeriety(id, updatedVeriety)
    return res.json(responseStatus.responseMessage200("Edit veriety successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for edit veriety

async function deleteVeriety(req: Request, res: Response) {
  try {
    const id = req.params.id
    await verietyService.deleteVeriety(id)
    return res.json(responseStatus.responseMessage200("Delete veriety successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for delete veriety

export default {
  getVerieties,
  getVeriety,
  createVeriety,
  editVeriety,
  deleteVeriety
}
