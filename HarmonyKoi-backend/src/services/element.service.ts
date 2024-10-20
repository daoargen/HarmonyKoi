import { Request } from "express"
import { Op } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreateElement, UpdateElement } from "~/constants/type"
import { Element } from "~/models/element.model"
import { formatModelDate } from "~/utils/formatTimeModel.util"

async function getAllElements(req: Request) {
  try {
    // Xử lý tham số query và gán giá trị mặc định nếu không có
    const pageIndex = parseInt(req.query.page_index as string) || 1
    const pageSize = parseInt(req.query.page_size as string) || 10
    const keyword = req.query.keyword as string

    const whereCondition: any = {
      isDeleted: false
    } // Điều kiện tìm kiếm

    if (keyword) {
      whereCondition.name = { [Op.like]: `%${keyword}%` }
    }

    // Tìm và đếm tổng số elements
    const { count, rows: elements } = await Element.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      order: [["createdAt", "DESC"]]
    })

    // Định dạng lại dữ liệu
    const formattedElements = elements.map((element) => formatModelDate(element.dataValues))

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
    return { elements: formattedElements, pagination }
  } catch (error) {
    console.error(error)
    throw error
  }
} // Get all elements

async function getElementById(elementId: string) {
  try {
    const element = await Element.findOne({
      where: { id: elementId, isDeleted: false }
    })
    if (!element) throw responseStatus.responseNotFound404("Element not found")
    return element
  } catch (error) {
    console.error(error)
    throw error
  }
} // Find element by id

async function createElement(newElement: CreateElement) {
  try {
    const element = await Element.create(newElement)
    return element
  } catch (error) {
    console.error(error)
    throw error
  }
} // Create element

async function editElement(id: string, updatedElement: UpdateElement) {
  try {
    // Kiểm tra xem Element có tồn tại không
    const element = await Element.findOne({
      where: { id, isDeleted: false }
    })

    if (!element) {
      throw responseStatus.responseNotFound404("Element not found")
    }

    // Cập nhật các trường được cung cấp trong updatedElement
    await element.update({
      name: updatedElement.name || element.name,
      imageUrl: updatedElement.imageUrl || element.imageUrl
    })

    return element
  } catch (error) {
    console.error(error)
    throw error
  }
} // Update element

async function deleteElement(id: string) {
  try {
    const element = await Element.findOne({ where: { id, isDeleted: false } })
    if (!element) {
      throw responseStatus.responseNotFound404("Element not found or already deleted")
    }

    const elementResult = await Element.update({ isDeleted: true }, { where: { id } })

    if (elementResult[0] === 0) {
      throw responseStatus.responeCustom(400, "Delete element failed")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
} // Delete element

export default {
  getAllElements,
  getElementById,
  createElement,
  editElement,
  deleteElement
}
