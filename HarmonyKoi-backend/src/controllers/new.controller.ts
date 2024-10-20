import { Request, Response } from "express"

import responseStatus from "~/constants/responseStatus"
import { CreateNew } from "~/constants/type"
import newService from "~/services/new.service"

async function getNews(req: Request, res: Response) {
  try {
    const { news, pagination } = await newService.getAllNews(req)
    return res.json(responseStatus.responseData200("Get news list successfully!", news, pagination))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get all news

async function getNew(req: Request, res: Response) {
  try {
    const id = req.params.id
    const news = await newService.getNewById(id)
    return res.json(responseStatus.responseData200("Get new successfully!", news))
  } catch (error) {
    return res.json(error)
  }
} // Controller for get new by id

async function createNew(req: Request, res: Response) {
  try {
    const { tittle, content } = req.body
    const dataRequest: CreateNew = {
      tittle,
      content
    }
    const news = await newService.createNew(dataRequest)
    return res.json(responseStatus.responseData200("Create new successfully!", news))
  } catch (error) {
    return res.json(error)
  }
} // Controller for create new

async function editNew(req: Request, res: Response) {
  try {
    const id = req.params.id
    const updatedNew = req.body
    await newService.editNew(id, updatedNew)
    return res.json(responseStatus.responseMessage200("Edit new successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for edit new

async function deleteNew(req: Request, res: Response) {
  try {
    const id = req.params.id
    await newService.deleteNew(id)
    return res.json(responseStatus.responseMessage200("Delete new successfully!"))
  } catch (error) {
    return res.json(error)
  }
} // Controller for delete new

export default {
  getNews,
  getNew,
  createNew,
  editNew,
  deleteNew
}
