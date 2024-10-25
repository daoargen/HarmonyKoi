import { Request } from "express"
import { Op, ValidationErrorItemOrigin } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreateKoiFish, CreateKoiFishElement, UpdateKoiFish } from "~/constants/type"
import { Element } from "~/models/element.model"
import { KoiFish } from "~/models/koiFish.model"
import { KoiFishElement } from "~/models/koiFishElement.model"
import { Veriety } from "~/models/veriety.model"
import { formatModelDate } from "~/utils/formatTimeModel.util"

import koiFishElementService from "./koiFishElement.service"

async function getAllKoiFishes(req: Request) {
  try {
    // Xử lý tham số query và gán giá trị mặc định nếu không có
    const pageIndex = parseInt(req.query.page_index as string) || 1
    const pageSize = parseInt(req.query.page_size as string) || 10
    const keyword = req.query.keyword as string
    const yearOfBirth = parseInt(req.query.yearOfBirth as string)

    const whereCondition: any = {
      isDeleted: false
    }

    if (keyword) {
      whereCondition[Op.or] = [
        { name: { [Op.like]: `%${keyword}%` } },
        { description: { [Op.like]: `%${keyword}%` } },
        { symbolism: { [Op.like]: `%${keyword}%` } },
        { "$veriety.name$": { [Op.like]: `%${keyword}%` } }
      ]
    }

    if (yearOfBirth) {
      const destiny = getDestinyByYearOfBirth(yearOfBirth)
      console.log(destiny)
      const element = await Element.findOne({
        where: {
          name: destiny,
          isDeleted: false
        }
      })
      console.log(element)
      if (element && element.id) {
        const elementId = element.id
        const koiFishIdsWithElement = await KoiFishElement.findAll({
          where: { elementId, isDeleted: false },
          attributes: ["koiFishId"]
        }).then((results) => results.map((result) => result.koiFishId))

        if (koiFishIdsWithElement.length === 0) {
          return {
            koiFishes: [],
            pagination: {
              pageSize: 10,
              totalItem: 0,
              currentPage: 1,
              maxPageSize: 100,
              totalPage: 0
            }
          }
        }

        whereCondition.id = {
          [Op.in]: koiFishIdsWithElement
        }
      }
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
          attributes: ["name", "description"]
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
      dataResponse = formatKoiFishs.map((koiFish: any) => formatModelDate(koiFish))
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
          attributes: ["name", "description"]
        }
      ]
    })
    if (!koiFish) throw responseStatus.responseNotFound404("Koi fish not found")
    const koiFishElements = await KoiFishElement.findAll({
      where: { koiFishId: [koiFishId], isDeleted: false }, // Truy vấn cho koiFishId hiện tại
      attributes: ["koiFishId", "elementId"]
    })

    const elementIds = koiFishElements
      .map((koiFishElement) => koiFishElement.elementId)
      .filter((elementId): elementId is string => elementId !== undefined)

    const elements = await Element.findAll({
      where: { id: elementIds, isDeleted: false },
      attributes: ["id", "name", "imageUrl"]
    })

    return {
      ...koiFish.toJSON(),
      elements: elements
    }
  } catch (error) {
    console.error(error)
    throw error
  }
} // Find koi fish by id

async function createKoiFish(newKoiFish: CreateKoiFish) {
  try {
    const koiFish = await KoiFish.create({
      verietyId: newKoiFish.verietyId,
      name: newKoiFish.name,
      description: newKoiFish.description,
      imageUrl: newKoiFish.imageUrl,
      baseColor: newKoiFish.baseColor,
      symbolism: newKoiFish.symbolism,
      price: newKoiFish.price
    })
    if (!koiFish.id) {
      throw responseStatus.responseBadRequest400("Fail to create new fish")
    }
    newKoiFish.elementIds.map(async (elementId) => {
      if (koiFish.id) {
        // Kiểm tra koiFish.id trước khi sử dụng
        const newKoiFishElement: CreateKoiFishElement = {
          koiFishId: koiFish.id,
          elementId: elementId
        }
        await koiFishElementService.createKoiFishElement(newKoiFishElement)
      }
    })
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
    if (koiFish.id) {
      await koiFishElementService.deleteAllKoiFishElementByKoiFishId(koiFish.id)
    }

    updatedKoiFish.elementIds.map(async (elementId) => {
      if (koiFish.id) {
        // Kiểm tra koiFish.id trước khi sử dụng
        const newKoiFishElement: CreateKoiFishElement = {
          koiFishId: koiFish.id,
          elementId: elementId
        }
        await koiFishElementService.createKoiFishElement(newKoiFishElement)
      }
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

function getDestinyByYearOfBirth(yearOfBirth: number): string {
  type HeavenlyStem = "Giap" | "At" | "Binh" | "Dinh" | "Mau" | "Ky" | "Canh" | "Tan" | "Nham" | "Quy"
  type EarthlyBranch = "Ty" | "Suu" | "Dan" | "Mao" | "Thin" | "Ti" | "Ngo" | "Mui" | "Than" | "Dau" | "Tuat" | "Hoi"

  const heavenlyStemValues: Record<HeavenlyStem, number> = {
    Giap: 1,
    At: 1,
    Binh: 2,
    Dinh: 2,
    Mau: 3,
    Ky: 3,
    Canh: 4,
    Tan: 4,
    Nham: 5,
    Quy: 5
  }

  const earthlyBranchValues: Record<EarthlyBranch, number> = {
    Ty: 0,
    Suu: 0,
    Ngo: 0,
    Mui: 0,
    Dan: 1,
    Mao: 1,
    Than: 1,
    Dau: 1,
    Thin: 2,
    Ti: 2,
    Tuat: 2,
    Hoi: 2
  }

  const destinyValues = ["Metal", "Water", "Fire", "Earth", "Wood"]

  const heavenlyStems: HeavenlyStem[] = ["Giap", "At", "Binh", "Dinh", "Mau", "Ky", "Canh", "Tan", "Nham", "Quy"]
  const earthlyBranches: EarthlyBranch[] = [
    "Ty",
    "Suu",
    "Dan",
    "Mao",
    "Thin",
    "Ti",
    "Ngo",
    "Mui",
    "Than",
    "Dau",
    "Tuat",
    "Hoi"
  ]

  // Tính chỉ số Thiên Can
  const heavenlyStemIndex = (yearOfBirth - 4) % 10

  // Tính chỉ số Địa Chi
  const earthlyBranchIndex = (yearOfBirth - 4) % 12

  const heavenlyStem = heavenlyStems[heavenlyStemIndex]
  const earthlyBranch = earthlyBranches[earthlyBranchIndex]

  let destinyValue = heavenlyStemValues[heavenlyStem] + earthlyBranchValues[earthlyBranch]
  if (destinyValue > 5) {
    destinyValue -= 5
  }
  console.log(destinyValues[destinyValue - 1])
  return destinyValues[destinyValue - 1]
}

export default {
  getAllKoiFishes,
  getKoiFishById,
  createKoiFish,
  editKoiFish,
  deleteKoiFish,
  getDestinyByYearOfBirth
}
