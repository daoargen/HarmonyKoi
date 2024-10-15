import { Request, Response } from "express"

import responseStatus from "~/constants/responseStatus"
import packageService from "~/services/package.service"

async function getPackages(req: Request, res: Response) {
  try {
    const { packages, pagination } = await packageService.getAllPackages(req)
    return res.json(responseStatus.responseData200("Get packages list successfully!", packages, pagination))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get all packages

async function getPackage(req: Request, res: Response) {
  try {
    const id = req.params.id
    const packageItem = await packageService.getPackageById(id)
    return res.json(responseStatus.responseData200("Get package successfully!", packageItem))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get package by id

async function createPackage(req: Request, res: Response) {
  try {
    const newPackage = req.body
    const packageItem = await packageService.createPackage(newPackage)
    return res.json(responseStatus.responseData200("Create package successfully!", packageItem))
  } catch (error) {
    return res.json(error)
  }
} // Controller for create package

async function editPackage(req: Request, res: Response) {
  try {
    const id = req.params.id
    const updatedPackage = req.body
    await packageService.editPackage(id, updatedPackage)
    return res.json(responseStatus.responseMessage200("Edit package successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for edit package

async function deletePackage(req: Request, res: Response) {
  try {
    const id = req.params.id
    await packageService.deletePackage(id)
    return res.json(responseStatus.responseMessage200("Delete package successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for delete package

export default {
  getPackages,
  getPackage,
  createPackage,
  editPackage,
  deletePackage
}
