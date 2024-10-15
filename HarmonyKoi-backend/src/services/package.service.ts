import { Request } from "express"
import { Op } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreatePackage, UpdatePackage } from "~/constants/type"
import { Package } from "~/models/package.model"
import { formatModelDate } from "~/utils/formatTimeModel.util"

async function getAllPackages(req: Request) {
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

    // Tìm và đếm tổng số package
    const { count, rows: packages } = await Package.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      order: [["createdAt", "DESC"]]
    })

    // Định dạng lại dữ liệu
    const formattedPackages = packages.map((packageItem) => formatModelDate(packageItem.dataValues))

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
    return { packages: formattedPackages, pagination }
  } catch (error) {
    console.error(error)
    throw error
  }
} // Get all packages

async function getPackageById(packageId: string) {
  try {
    const packageItem = await Package.findOne({
      where: { id: packageId, isDeleted: false }
    })
    if (!packageItem) throw responseStatus.responseNotFound404("Package not found")
    return packageItem
  } catch (error) {
    console.error(error)
    throw error
  }
} // Find package by id

async function createPackage(newPackage: CreatePackage) {
  try {
    const packageItem = await Package.create(newPackage)
    return packageItem
  } catch (error) {
    console.error(error)
    throw error
  }
} // Create package

async function editPackage(id: string, updatedPackage: UpdatePackage) {
  try {
    // Kiểm tra xem Package có tồn tại không
    const packageItem = await Package.findOne({
      where: { id, isDeleted: false }
    })

    if (!packageItem) {
      throw responseStatus.responseNotFound404("Package not found")
    }

    // Cập nhật các trường được cung cấp trong updatedPackage
    await packageItem.update({
      name: updatedPackage.name || packageItem.name,
      description: updatedPackage.description || packageItem.description,
      duration: updatedPackage.duration || packageItem.duration,
      amountPost: updatedPackage.amountPost || packageItem.amountPost,
      price: updatedPackage.price || packageItem.price
    })

    return packageItem
  } catch (error) {
    console.error(error)
    throw error
  }
} // Update package

async function deletePackage(id: string) {
  try {
    const packageItem = await Package.findOne({ where: { id, isDeleted: false } })
    if (!packageItem) {
      throw responseStatus.responseNotFound404("Package not found or already deleted")
    }

    const packageResult = await Package.update({ isDeleted: true }, { where: { id } })

    if (packageResult[0] === 0) {
      throw responseStatus.responeCustom(400, "Delete package failed")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
} // Delete package

export default {
  getAllPackages,
  getPackageById,
  createPackage,
  editPackage,
  deletePackage
}
