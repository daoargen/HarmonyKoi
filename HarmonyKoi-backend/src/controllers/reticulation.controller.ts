import { Request, Response } from "express"

import responseStatus from "~/constants/responseStatus"
import reticulationService from "~/services/reticulation.service"

async function getReticulations(req: Request, res: Response) {
  try {
    const { reticulations, pagination } = await reticulationService.getAllReticulations(req)
    return res.json(responseStatus.responseData200("Get reticulations list successfully!", reticulations, pagination))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get all reticulations

async function getReticulation(req: Request, res: Response) {
  try {
    const id = req.params.id
    const reticulation = await reticulationService.getReticulationById(id)
    return res.json(responseStatus.responseData200("Get reticulation successfully!", reticulation))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get reticulation by id

async function createReticulation(req: Request, res: Response) {
  try {
    const newReticulation = req.body
    const reticulation = await reticulationService.createReticulation(newReticulation)
    return res.json(responseStatus.responseData200("Create reticulation successfully!", reticulation))
  } catch (error) {
    return res.json(error)
  }
} // Controller for create reticulation

async function editReticulation(req: Request, res: Response) {
  try {
    const id = req.params.id
    const updatedReticulation = req.body
    await reticulationService.editReticulation(id, updatedReticulation)
    return res.json(responseStatus.responseMessage200("Edit reticulation successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for edit reticulation

async function deleteReticulation(req: Request, res: Response) {
  try {
    const id = req.params.id
    await reticulationService.deleteReticulation(id)
    return res.json(responseStatus.responseMessage200("Delete reticulation successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for delete reticulation

export default {
  getReticulations,
  getReticulation,
  createReticulation,
  editReticulation,
  deleteReticulation
}
