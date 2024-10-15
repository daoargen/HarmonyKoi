import { Request } from "express"
import { Op } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreatePatternType, UpdatePatternType } from "~/constants/type"
import { PatternType } from "~/models/patternType.model"
import { formatModelDate } from "~/utils/formatTimeModel.util"

async function getAllPatternTypes(req: Request) {
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

    // Tìm và đếm tổng số pattern types
    const { count, rows: patternTypes } = await PatternType.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      order: [["createdAt", "DESC"]]
    })

    // Định dạng lại dữ liệu
    const formattedPatternTypes = patternTypes.map((patternType) => formatModelDate(patternType.dataValues))

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
    return { patternTypes: formattedPatternTypes, pagination }
  } catch (error) {
    console.error(error)
    throw error
  }
} // Get all pattern types

async function getPatternTypeById(patternTypeId: string) {
  try {
    const patternType = await PatternType.findOne({
      where: { id: patternTypeId, isDeleted: false }
    })
    if (!patternType) throw responseStatus.responseNotFound404("Pattern type not found")
    return patternType
  } catch (error) {
    console.error(error)
    throw error
  }
} // Find pattern type by id

async function createPatternType(newPatternType: CreatePatternType) {
  try {
    const patternType = await PatternType.create(newPatternType)
    return patternType
  } catch (error) {
    console.error(error)
    throw error
  }
} // Create pattern type

async function editPatternType(id: string, updatedPatternType: UpdatePatternType) {
  try {
    // Kiểm tra xem PatternType có tồn tại không
    const patternType = await PatternType.findOne({
      where: { id, isDeleted: false }
    })

    if (!patternType) {
      throw responseStatus.responseNotFound404("Pattern type not found")
    }

    // Cập nhật các trường được cung cấp trong updatedPatternType
    await patternType.update({
      name: updatedPatternType.name || patternType.name,
      description: updatedPatternType.description || patternType.description,
      imageUrl: updatedPatternType.imageUrl || patternType.imageUrl
    })

    return patternType
  } catch (error) {
    console.error(error)
    throw error
  }
} // Update pattern type

async function deletePatternType(id: string) {
  try {
    const patternType = await PatternType.findOne({ where: { id, isDeleted: false } })
    if (!patternType) {
      throw responseStatus.responseNotFound404("Pattern type not found or already deleted")
    }

    const patternTypeResult = await PatternType.update({ isDeleted: true }, { where: { id } })

    if (patternTypeResult[0] === 0) {
      throw responseStatus.responeCustom(400, "Delete pattern type failed")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
} // Delete pattern type

export default {
  getAllPatternTypes,
  getPatternTypeById,
  createPatternType,
  editPatternType,
  deletePatternType
}
