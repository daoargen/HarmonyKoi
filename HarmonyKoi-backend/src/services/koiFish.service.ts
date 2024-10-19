import { Request } from "express"
import { Op } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreateKoiFish, UpdateKoiFish } from "~/constants/type"
import { Element } from "~/models/element.model"
import { KoiFish } from "~/models/koiFish.model"
import { KoiFishElement } from "~/models/koiFishElement.model"
import { Veriety } from "~/models/veriety.model"
import { formatModelDate } from "~/utils/formatTimeModel.util"

async function getAllKoiFishes(req: Request) {
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
        { symbolism: { [Op.like]: `%${keyword}%` } },
        { "$veriety.name$": { [Op.like]: `%${keyword}%` } },
        { "$element.name$": { [Op.like]: `%${keyword}%` } }
      ]
    }

    // Tìm và đếm tổng số koi fish
    const { count, rows: koiFishes } = await KoiFish.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Veriety,
          as: "veriety",
          attributes: ["name"]
        }
      ]
    })

    let dataResponse: any = []
    if (koiFishes.length > 0) {
      const koiFishIds = koiFishes.map((koifish) => koifish.id).filter((id): id is string => id !== undefined)
      const koiFishElements = await KoiFishElement.findAll({
        where: { koiFishId: koiFishIds, isDeleted: false },
        attributes: ["koiFishId", "elementId"]
      })
      const elementIds = koiFishElements
        .map((koiFishElement) => koiFishElement.elementId)
        .filter((elementId): elementId is string => elementId !== undefined)
      const elements = await Element.findAll({
        where: { id: elementIds, isDeleted: false },
        attributes: ["id", "name", "imageUrl"]
      })
      const formatKoiFishs = koiFishes.map((koiFish) => {
        // Lấy danh sách koiFishElement có koiFishId tương ứng
        const relatedKoiFishElements = koiFishElements.filter((kfe) => kfe.koiFishId === koiFish.id)
        // Lấy danh sách element tương ứng từ relatedKoiFishElements
        const relatedElements = relatedKoiFishElements.map((kfe) => {
          return elements.find((element) => element.id === kfe.elementId)
        })

        return {
          ...koiFish.toJSON(),
          elements: relatedElements
        }
      })
    }
    // Định dạng lại dữ liệu
    dataResponse = koiFishes.map((koiFish) => formatModelDate(koiFish.dataValues))

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
    return { koiFishes: dataResponse, pagination }
  } catch (error) {
    console.error(error)
    throw error
  }
} // Get all koi fishes

async function getKoiFishById(koiFishId: string) {
  try {
    const koiFish = await KoiFish.findOne({
      where: { id: koiFishId, isDeleted: false },
      include: [
        {
          model: Veriety,
          as: "veriety",
          attributes: ["name"]
        }
      ]
    })
    if (!koiFish) throw responseStatus.responseNotFound404("Koi fish not found")
    return koiFish
  } catch (error) {
    console.error(error)
    throw error
  }
} // Find koi fish by id

async function createKoiFish(newKoiFish: CreateKoiFish) {
  try {
    const koiFish = await KoiFish.create(newKoiFish)
    return koiFish
  } catch (error) {
    console.error(error)
    throw error
  }
} // Create koi fish

async function editKoiFish(id: string, updatedKoiFish: UpdateKoiFish) {
  try {
    // Kiểm tra xem Koi Fish có tồn tại không
    const koiFish = await KoiFish.findOne({
      where: { id, isDeleted: false }
    })

    if (!koiFish) {
      throw responseStatus.responseNotFound404("Koi fish not found")
    }

    // Cập nhật các trường được cung cấp trong updatedKoiFish
    await koiFish.update({
      verietyId: updatedKoiFish.verietyId || koiFish.verietyId,
      name: updatedKoiFish.name || koiFish.name,
      description: updatedKoiFish.description || koiFish.description,
      imageUrl: updatedKoiFish.imageUrl || koiFish.imageUrl,
      baseColor: updatedKoiFish.baseColor || koiFish.baseColor,
      symbolism: updatedKoiFish.symbolism || koiFish.symbolism,
      price: updatedKoiFish.price || koiFish.price
    })

    return koiFish
  } catch (error) {
    console.error(error)
    throw error
  }
} // Update koi fish

async function deleteKoiFish(id: string) {
  try {
    const koiFish = await KoiFish.findOne({ where: { id, isDeleted: false } })
    if (!koiFish) {
      throw responseStatus.responseNotFound404("Koi fish not found or already deleted")
    }

    const koiFishResult = await KoiFish.update({ isDeleted: true }, { where: { id } })

    if (koiFishResult[0] === 0) {
      throw responseStatus.responeCustom(400, "Delete koi fish failed")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
} // Delete koi fish

export default {
  getAllKoiFishes,
  getKoiFishById,
  createKoiFish,
  editKoiFish,
  deleteKoiFish
}
