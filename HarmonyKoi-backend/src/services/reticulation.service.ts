import { Request } from "express"
import { Op } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreateReticulation, UpdateReticulation } from "~/constants/type"
import { Reticulation } from "~/models/reticulation.model"
import { formatModelDate } from "~/utils/formatTimeModel.util"

async function getAllReticulations(req: Request) {
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

    // Tìm và đếm tổng số reticulations
    const { count, rows: reticulations } = await Reticulation.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      order: [["createdAt", "DESC"]]
    })

    // Định dạng lại dữ liệu
    const formattedReticulations = reticulations.map((reticulation) => formatModelDate(reticulation.dataValues))

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
    return { reticulations: formattedReticulations, pagination }
  } catch (error) {
    console.error(error)
    throw error
  }
} // Get all reticulations

async function getReticulationById(reticulationId: string) {
  try {
    const reticulation = await Reticulation.findOne({
      where: { id: reticulationId, isDeleted: false }
    })
    if (!reticulation) throw responseStatus.responseNotFound404("Reticulation not found")
    return reticulation
  } catch (error) {
    console.error(error)
    throw error
  }
} // Find reticulation by id

async function createReticulation(newReticulation: CreateReticulation) {
  try {
    const reticulation = await Reticulation.create(newReticulation)
    return reticulation
  } catch (error) {
    console.error(error)
    throw error
  }
} // Create reticulation

async function editReticulation(id: string, updatedReticulation: UpdateReticulation) {
  try {
    // Kiểm tra xem Reticulation có tồn tại không
    const reticulation = await Reticulation.findOne({
      where: { id, isDeleted: false }
    })

    if (!reticulation) {
      throw responseStatus.responseNotFound404("Reticulation not found")
    }

    // Cập nhật các trường được cung cấp trong updatedReticulation
    await reticulation.update({
      name: updatedReticulation.name || reticulation.name,
      description: updatedReticulation.description || reticulation.description
    })

    return reticulation
  } catch (error) {
    console.error(error)
    throw error
  }
} // Update reticulation

async function deleteReticulation(id: string) {
  try {
    const reticulation = await Reticulation.findOne({ where: { id, isDeleted: false } })
    if (!reticulation) {
      throw responseStatus.responseNotFound404("Reticulation not found or already deleted")
    }

    const reticulationResult = await Reticulation.update({ isDeleted: true }, { where: { id } })

    if (reticulationResult[0] === 0) {
      throw responseStatus.responeCustom(400, "Delete reticulation failed")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
} // Delete reticulation

export default {
  getAllReticulations,
  getReticulationById,
  createReticulation,
  editReticulation,
  deleteReticulation
}
