import { Request, Response } from "express"

import responseStatus from "~/constants/responseStatus"
import elementService from "~/services/element.service"

async function getElements(req: Request, res: Response) {
  try {
    const { elements, pagination } = await elementService.getAllElements(req)
    return res.json(responseStatus.responseData200("Get elements list successfully!", elements, pagination))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get all elements

async function getElement(req: Request, res: Response) {
  try {
    const id = req.params.id
    const element = await elementService.getElementById(id)
    return res.json(responseStatus.responseData200("Get element successfully!", element))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get element by id

async function createElement(req: Request, res: Response) {
  try {
    const newElement = req.body
    const element = await elementService.createElement(newElement)
    return res.json(responseStatus.responseData200("Create element successfully!", element))
  } catch (error) {
    return res.json(error)
  }
} // Controller for create element

async function editElement(req: Request, res: Response) {
  try {
    const id = req.params.id
    const updatedElement = req.body
    await elementService.editElement(id, updatedElement)
    return res.json(responseStatus.responseMessage200("Edit element successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for edit element

async function deleteElement(req: Request, res: Response) {
  try {
    const id = req.params.id
    await elementService.deleteElement(id)
    return res.json(responseStatus.responseMessage200("Delete element successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for delete element

export default {
  getElements,
  getElement,
  createElement,
  editElement,
  deleteElement
}
