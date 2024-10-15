import { Request } from "express"
import { Op } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreateCartDetail, UpdateCartDetail } from "~/constants/type"
import { Cart } from "~/models/cart.model"
import { CartDetail } from "~/models/cartDetail.model"
import { KoiFish } from "~/models/koiFish.model"
import { formatModelDate } from "~/utils/formatTimeModel.util"

async function getAllCartDetails(req: Request) {
  try {
    // Xử lý tham số query và gán giá trị mặc định nếu không có
    const pageIndex = parseInt(req.query.page_index as string) || 1
    const pageSize = parseInt(req.query.page_size as string) || 10
    const keyword = req.query.keyword as string

    const whereCondition: any = {
      isDeleted: false
    } // Điều kiện tìm kiếm

    if (keyword) {
      whereCondition[Op.or] = [{ "$koiFish.name$": { [Op.like]: `%${keyword}%` } }]
    }

    // Tìm và đếm tổng số cart detail
    const { count, rows: cartDetails } = await CartDetail.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Cart,
          as: "cart",
          attributes: ["totalAmount"]
        },
        {
          model: KoiFish,
          as: "koiFish",
          attributes: ["name"]
        }
      ]
    })

    // Định dạng lại dữ liệu
    const formattedCartDetails = cartDetails.map((cartDetail) => formatModelDate(cartDetail.dataValues))

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
    return { cartDetails: formattedCartDetails, pagination }
  } catch (error) {
    console.error(error)
    throw error
  }
} // Get all cartDetails

async function getCartDetailById(cartDetailId: string) {
  try {
    const cartDetail = await CartDetail.findOne({
      where: { id: cartDetailId, isDeleted: false },
      include: [
        {
          model: Cart,
          as: "cart",
          attributes: ["totalAmount"]
        },
        {
          model: KoiFish,
          as: "koiFish",
          attributes: ["name"]
        }
      ]
    })
    if (!cartDetail) throw responseStatus.responseNotFound404("Cart Detail not found")
    return cartDetail
  } catch (error) {
    console.error(error)
    throw error
  }
} // Find cartDetail by id

async function createCartDetail(newCartDetail: CreateCartDetail) {
  try {
    const cartDetail = await CartDetail.create(newCartDetail)
    return cartDetail
  } catch (error) {
    console.error(error)
    throw error
  }
} // Create cartDetail

async function editCartDetail(id: string, updatedCartDetail: UpdateCartDetail) {
  try {
    // Kiểm tra xem Cart Detail có tồn tại không
    const cartDetail = await CartDetail.findOne({
      where: { id, isDeleted: false }
    })

    if (!cartDetail) {
      throw responseStatus.responseNotFound404("Cart Detail not found")
    }

    // Cập nhật các trường được cung cấp trong updatedCartDetail
    await cartDetail.update({
      cartId: updatedCartDetail.cartId || cartDetail.cartId,
      koiFishId: updatedCartDetail.koiFishId || cartDetail.koiFishId,
      unitPrice: updatedCartDetail.unitPrice || cartDetail.unitPrice,
      totalPrice: updatedCartDetail.totalPrice || cartDetail.totalPrice
    })

    return cartDetail
  } catch (error) {
    console.error(error)
    throw error
  }
} // Update cartDetail

async function deleteCartDetail(id: string) {
  try {
    const cartDetail = await CartDetail.findOne({ where: { id, isDeleted: false } })
    if (!cartDetail) {
      throw responseStatus.responseNotFound404("Cart Detail not found or already deleted")
    }

    const cartDetailResult = await CartDetail.update({ isDeleted: true }, { where: { id } })

    if (cartDetailResult[0] === 0) {
      throw responseStatus.responeCustom(400, "Delete cart detail failed")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
} // Delete cartDetail

export default {
  getAllCartDetails,
  getCartDetailById,
  createCartDetail,
  editCartDetail,
  deleteCartDetail
}
