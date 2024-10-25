import { Request } from "express"
import { Op } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreatePond, CreatePondElement, UpdatePond } from "~/constants/type"
import { Element } from "~/models/element.model"
import { Pond } from "~/models/pond.model"
import { PondElement } from "~/models/pondElement.model"
import { formatModelDate } from "~/utils/formatTimeModel.util"

import pondElementService from "./pondElement.service"

async function getAllPonds(req: Request) {
  try {
    // Xử lý tham số query và gán giá trị mặc định nếu không có
    const pageIndex = parseInt(req.query.page_index as string) || 1
    const pageSize = parseInt(req.query.page_size as string) || 10
    const keyword = req.query.keyword as string

    const whereCondition: any = {
      isDeleted: false
    } // Điều kiện tìm kiếm

    if (keyword) {
      whereCondition[Op.or] = [
        { name: { [Op.like]: `%${keyword}%` } },
        { description: { [Op.like]: `%${keyword}%` } },
        { "$element.name$": { [Op.like]: `%${keyword}%` } } // Search by element name
      ]
    }

    // Tìm và đếm tổng số ponds
    const { count, rows: ponds } = await Pond.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      order: [["createdAt", "DESC"]]
    })

    let dataResponse: any = []
    if (ponds.length > 0) {
      const pondId = ponds.map((pond) => pond.id).filter((id): id is string => id !== undefined)
      const pondElements = await PondElement.findAll({
        where: { pondId: pondId, isDeleted: false },
        attributes: ["pondId", "elementId"]
      })
      const elementIds = pondElements
        .map((pondElement) => pondElement.elementId)
        .filter((elementId): elementId is string => elementId !== undefined)
      const elements = await Element.findAll({
        where: { id: elementIds, isDeleted: false },
        attributes: ["id", "name", "imageUrl"]
      })
      const formatPonds = ponds.map((pond) => {
        // Lấy danh sách pondElement có pondId tương ứng
        const relatedpondElements = pondElements.filter((kfe) => kfe.pondId === pond.id)
        // Lấy danh sách element tương ứng từ relatedpondElements
        const relatedElements = relatedpondElements.map((kfe) => {
          return elements.find((element) => element.id === kfe.elementId)
        })

        return {
          ...pond.toJSON(),
          elements: relatedElements
        }
      })
      dataResponse = formatPonds.map((pond: any) => formatModelDate(pond))
    }
    // Tính toán thông tin phân trang
    const totalPage = Math.ceil(count / pageSize)
    const pagination = {
      pageSize,
      totalItem: count,
      currentPage: pageIndex,
      maxPageSize: 100,
      totalPage
    }

    // Trả về kết quả
    return { ponds: dataResponse, pagination }
  } catch (error) {
    console.error(error)
    throw error
  }
} // Get all ponds

async function getPondById(pondId: string) {
  try {
    const pond = await Pond.findOne({
      where: { id: pondId, isDeleted: false },
      include: [
        {
          model: Element,
          as: "element",
          attributes: ["name"]
        }
      ]
    })
    if (!pond) throw responseStatus.responseNotFound404("Pond not found")

    const pondElements = await PondElement.findAll({
      where: { pondId: [pondId], isDeleted: false },
      attributes: ["pondId", "elementId"]
    })

    const elementIds = pondElements
      .map((pondElement) => pondElement.elementId)
      .filter((elementId): elementId is string => elementId !== undefined)

    const elements = await Element.findAll({
      where: { id: elementIds, isDeleted: false },
      attributes: ["id", "name", "imageUrl"]
    })
    // Bổ sung đoạn code bị thiếu
    return {
      ...pond.toJSON(),
      elements: elements
    }
  } catch (error) {
    console.error(error)
    throw error
  }
} // Find pond by id

async function createPond(newPond: CreatePond) {
  try {
    const pond = await Pond.create({
      name: newPond.name,
      description: newPond.description,
      imageUrl: newPond.imageUrl
    })
    if (!pond.id) {
      throw responseStatus.responseBadRequest400("Fail to create new fish")
    }
    newPond.elementIds.map(async (elementId) => {
      if (pond.id) {
        const newPondElement: CreatePondElement = {
          pondId: pond.id,
          elementId: elementId
        }
        await pondElementService.createPondElement(newPondElement)
      }
    })
    return pond
  } catch (error) {
    console.error(error)
    throw error
  }
} // Create pond

async function editPond(id: string, updatedPond: UpdatePond) {
  try {
    // Kiểm tra xem Pond có tồn tại không
    const pond = await Pond.findOne({
      where: { id, isDeleted: false }
    })

    if (!pond) {
      throw responseStatus.responseNotFound404("Pond not found")
    }

    // Cập nhật các trường được cung cấp trong updatedPond
    await pond.update({
      name: updatedPond.name || pond.name,
      description: updatedPond.description || pond.description,
      imageUrl: updatedPond.imageUrl || pond.imageUrl
    })

    if (pond.id) {
      await pondElementService.deleteAllPondElementByPondId(pond.id)
    }

    updatedPond.elementIds.map(async (elementId) => {
      if (pond.id) {
        const newPondElement: CreatePondElement = {
          pondId: pond.id,
          elementId: elementId
        }
        await pondElementService.createPondElement(newPondElement)
      }
    })

    return pond
  } catch (error) {
    console.error(error)
    throw error
  }
} // Update pond

async function deletePond(id: string) {
  try {
    const pond = await Pond.findOne({ where: { id, isDeleted: false } })
    if (!pond) {
      throw responseStatus.responseNotFound404("Pond not found or already deleted")
    }

    const pondResult = await Pond.update({ isDeleted: true }, { where: { id } })

    if (pondResult[0] === 0) {
      throw responseStatus.responeCustom(400, "Delete pond failed")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
} // Delete pond

export default {
  getAllPonds,
  getPondById,
  createPond,
  editPond,
  deletePond
}
