import { Request } from "express"
import { Op } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreateVeriety, UpdateVeriety } from "~/constants/type"
import { Veriety } from "~/models/veriety.model"
import { formatModelDate } from "~/utils/formatTimeModel.util"

async function getAllVerieties(req: Request) {
  try {
    // Xử lý tham số query và gán giá trị mặc định nếu không có
    const pageIndex = parseInt(req.query.page_index as string) || 1
    const pageSize = parseInt(req.query.page_size as string) || 10
    const keyword = req.query.keyword as string

    const whereCondition: any = {
      isDeleted: false
    } // Điều kiện tìm kiếm

    if (keyword) {
      whereCondition[Op.or] = [{ name: { [Op.like]: `%${keyword}%` } }, { description: { [Op.like]: `%${keyword}%` } }]
    }

    // Tìm và đếm tổng số varieties
    const { count, rows: varieties } = await Veriety.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      order: [["createdAt", "DESC"]]
    })

    // Định dạng lại dữ liệu
    const formattedVarieties = varieties.map((veriety) => formatModelDate(veriety.dataValues))

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
    return { varieties: formattedVarieties, pagination }
  } catch (error) {
    console.error(error)
    throw error
  }
} // Get all varieties

async function getVerietyById(verietyId: string) {
  try {
    const veriety = await Veriety.findOne({
      where: { id: verietyId, isDeleted: false }
    })
    if (!veriety) throw responseStatus.responseNotFound404("Veriety not found")
    return veriety
  } catch (error) {
    console.error(error)
    throw error
  }
} // Find veriety by id

async function createVeriety(newVeriety: CreateVeriety) {
  try {
    const veriety = await Veriety.create(newVeriety)
    return veriety
  } catch (error) {
    console.error(error)
    throw error
  }
} // Create veriety

async function editVeriety(id: string, updatedVeriety: UpdateVeriety) {
  try {
    // Kiểm tra xem Veriety có tồn tại không
    const veriety = await Veriety.findOne({
      where: { id, isDeleted: false }
    })

    if (!veriety) {
      throw responseStatus.responseNotFound404("Veriety not found")
    }

    // Cập nhật các trường được cung cấp trong updatedVeriety
    await veriety.update({
      name: updatedVeriety.name || veriety.name,
      description: updatedVeriety.description || veriety.description
    })

    return veriety
  } catch (error) {
    console.error(error)
    throw error
  }
} // Update veriety

async function deleteVeriety(id: string) {
  try {
    const veriety = await Veriety.findOne({ where: { id, isDeleted: false } })
    if (!veriety) {
      throw responseStatus.responseNotFound404("Veriety not found or already deleted")
    }

    const verietyResult = await Veriety.update({ isDeleted: true }, { where: { id } })

    if (verietyResult[0] === 0) {
      throw responseStatus.responeCustom(400, "Delete veriety failed")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
} // Delete veriety

export default {
  getAllVerieties,
  getVerietyById,
  createVeriety,
  editVeriety,
  deleteVeriety
}
