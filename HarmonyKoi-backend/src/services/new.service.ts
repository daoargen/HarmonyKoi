import { Request } from "express"
import { Op } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreateNew, UpdateNew } from "~/constants/type"
import { New } from "~/models/new.model"
import { User } from "~/models/user.model" // Import User model
import { formatModelDate } from "~/utils/formatTimeModel.util"

async function getAllNews(req: Request) {
  try {
    // Xử lý tham số query và gán giá trị mặc định nếu không có
    const pageIndex = parseInt(req.query.page_index as string) || 1
    const pageSize = parseInt(req.query.page_size as string) || 10
    const keyword = req.query.keyword as string

    const whereCondition: any = {
      isDeleted: false
    } // Điều kiện tìm kiếm

    if (keyword) {
      whereCondition[Op.or] = []
    }

    // Tìm và đếm tổng số news
    const { count, rows: newsList } = await New.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      order: [["createdAt", "DESC"]]
    })

    // Định dạng lại dữ liệu
    const formattedNews = newsList.map((news) => formatModelDate(news.dataValues))

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
    return { news: formattedNews, pagination }
  } catch (error) {
    console.error(error)
    throw error
  }
} // Get all news

async function getNewById(newsId: string) {
  try {
    const news = await New.findOne({
      where: { id: newsId, isDeleted: false }
    })
    if (!news) throw responseStatus.responseNotFound404("New not found")
    return news
  } catch (error) {
    console.error(error)
    throw error
  }
} // Find new by id

async function createNew(newNew: CreateNew) {
  try {
    const news = await New.create({
      tittle: newNew.tittle,
      content: newNew.content
    })
    return news
  } catch (error) {
    console.error(error)
    throw error
  }
} // Create new

async function editNew(id: string, updatedNew: UpdateNew) {
  try {
    // Kiểm tra xem New có tồn tại không
    const news = await New.findOne({
      where: { id, isDeleted: false }
    })

    if (!news) {
      throw responseStatus.responseNotFound404("New not found")
    }

    // Cập nhật các trường được cung cấp trong updatedNew
    await news.update({
      tittle: updatedNew.tittle || news.tittle,
      content: updatedNew.content || news.content
    })

    return news
  } catch (error) {
    console.error(error)
    throw error
  }
} // Update new

async function deleteNew(id: string) {
  try {
    const news = await New.findOne({ where: { id, isDeleted: false } })
    if (!news) {
      throw responseStatus.responseNotFound404("New not found or already deleted")
    }

    const newsResult = await New.update({ isDeleted: true }, { where: { id } })

    if (newsResult[0] === 0) {
      throw responseStatus.responeCustom(400, "Delete new failed")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
} // Delete new

export default {
  getAllNews,
  getNewById,
  createNew,
  editNew,
  deleteNew
}
