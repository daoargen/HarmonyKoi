import { Request } from "express"
import { Op } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreateCart, UpdateCart } from "~/constants/type"
import { Cart } from "~/models/cart.model"
import { formatModelDate } from "~/utils/formatTimeModel.util"

async function getAllCarts(req: Request) {
  try {
    // Xử lý tham số query và gán giá trị mặc định nếu không có
    const pageIndex = parseInt(req.query.page_index as string) || 1
    const pageSize = parseInt(req.query.page_size as string) || 10
    const keyword = req.query.keyword as string

    const whereCondition: any = {
      isDeleted: false
    } // Điều kiện tìm kiếm

    if (keyword) {
      whereCondition[Op.or] = [{ "$user.username$": { [Op.like]: `%${keyword}%` } }]
    }

    // Tìm và đếm tổng số user cart
    const { count, rows: carts } = await Cart.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      order: [["createdAt", "DESC"]]
      // include: [
      //   {
      //     model: User,
      //     as: "user",
      //     attributes: ["username"]
      //   }
      // ]
    })

    // Định dạng lại dữ liệu
    const formattedCarts = carts.map((cart) => formatModelDate(cart.dataValues))

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
    return { carts: formattedCarts, pagination }
  } catch (error) {
    console.error(error)
    throw error
  }
} // Get all carts

async function getCartById(cartId: string) {
  try {
    const cart = await Cart.findOne({
      where: { id: cartId, isDeleted: false }
      // include: [
      //   {
      //     model: User,
      //     as: "user",
      //     attributes: ["username"]
      //   }
      // ]
    })
    if (!cart) throw responseStatus.responseNotFound404("Cart not found")
    return cart
  } catch (error) {
    console.error(error)
    throw error
  }
} // Find cart by id

async function createCart(newCart: CreateCart) {
  try {
    const cart = await Cart.create(newCart)
    return cart
  } catch (error) {
    console.error(error)
    throw error
  }
} // Create cart

async function editCart(id: string, updatedCart: UpdateCart) {
  try {
    // Kiểm tra xem Cart có tồn tại không
    const cart = await Cart.findOne({
      where: { id, isDeleted: false }
    })

    if (!cart) {
      throw responseStatus.responseNotFound404("Cart not found")
    }

    // Cập nhật các trường được cung cấp trong updatedCart
    await cart.update({
      userId: updatedCart.userId || cart.userId,
      totalAmount: updatedCart.totalAmount || cart.totalAmount
    })

    return cart
  } catch (error) {
    console.error(error)
    throw error
  }
} // Update cart

async function deleteCart(id: string) {
  try {
    const cart = await Cart.findOne({ where: { id, isDeleted: false } })
    if (!cart) {
      throw responseStatus.responseNotFound404("Cart not found or already deleted")
    }

    const cartResult = await Cart.update({ isDeleted: true }, { where: { id } })

    if (cartResult[0] === 0) {
      throw responseStatus.responeCustom(400, "Delete cart failed")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
} // Delete cart

export default {
  getAllCarts,
  getCartById,
  createCart,
  editCart,
  deleteCart
}
