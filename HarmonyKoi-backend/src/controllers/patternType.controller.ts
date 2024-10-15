import { Request, Response } from "express"

import responseStatus from "~/constants/responseStatus"
import patternTypeService from "~/services/patternType.service"

async function getPatternTypes(req: Request, res: Response) {
  try {
    const { patternTypes, pagination } = await patternTypeService.getAllPatternTypes(req)
    return res.json(responseStatus.responseData200("Get pattern types list successfully!", patternTypes, pagination))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get all pattern types

async function getPatternType(req: Request, res: Response) {
  try {
    const id = req.params.id
    const patternType = await patternTypeService.getPatternTypeById(id)
    return res.json(responseStatus.responseData200("Get pattern type successfully!", patternType))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get pattern type by id

async function createPatternType(req: Request, res: Response) {
  try {
    const newPatternType = req.body
    const patternType = await patternTypeService.createPatternType(newPatternType)
    return res.json(responseStatus.responseData200("Create pattern type successfully!", patternType))
  } catch (error) {
    return res.json(error)
  }
} // Controller for create pattern type

async function editPatternType(req: Request, res: Response) {
  try {
    const id = req.params.id
    const updatedPatternType = req.body
    await patternTypeService.editPatternType(id, updatedPatternType)
    return res.json(responseStatus.responseMessage200("Edit pattern type successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for edit pattern type

async function deletePatternType(req: Request, res: Response) {
  try {
    const id = req.params.id
    await patternTypeService.deletePatternType(id)
    return res.json(responseStatus.responseMessage200("Delete pattern type successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for delete pattern type

export default {
  getPatternTypes,
  getPatternType,
  createPatternType,
  editPatternType,
  deletePatternType
}
