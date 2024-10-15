import { Request, Response } from "express"

import responseStatus from "~/constants/responseStatus"
import pondService from "~/services/pond.service"

async function getPonds(req: Request, res: Response) {
  try {
    const { ponds, pagination } = await pondService.getAllPonds(req)
    return res.json(responseStatus.responseData200("Get ponds list successfully!", ponds, pagination))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get all ponds

async function getPond(req: Request, res: Response) {
  try {
    const id = req.params.id
    const pond = await pondService.getPondById(id)
    return res.json(responseStatus.responseData200("Get pond successfully!", pond))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get pond by id

async function createPond(req: Request, res: Response) {
  try {
    const newPond = req.body
    const pond = await pondService.createPond(newPond)
    return res.json(responseStatus.responseData200("Create pond successfully!", pond))
  } catch (error) {
    return res.json(error)
  }
} // Controller for create pond

async function editPond(req: Request, res: Response) {
  try {
    const id = req.params.id
    const updatedPond = req.body
    await pondService.editPond(id, updatedPond)
    return res.json(responseStatus.responseMessage200("Edit pond successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for edit pond

async function deletePond(req: Request, res: Response) {
  try {
    const id = req.params.id
    await pondService.deletePond(id)
    return res.json(responseStatus.responseMessage200("Delete pond successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for delete pond

export default {
  getPonds,
  getPond,
  createPond,
  editPond,
  deletePond
}
