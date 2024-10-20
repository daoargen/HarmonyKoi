import responseStatus from "~/constants/responseStatus"
import { CreateKoiFishElement, UpdateKoiFishElement } from "~/constants/type"
import { Element } from "~/models/element.model"
import { KoiFish } from "~/models/koiFish.model"
import { KoiFishElement } from "~/models/koiFishElement.model"

async function getAllKoiFishElements() {
  try {
    const koiFishElements = await KoiFishElement.findAll({
      where: { isDeleted: false },
      include: [
        {
          model: KoiFish,
          as: "koiFish",
          attributes: ["name"] // Chọn các thuộc tính bạn muốn lấy từ model KoiFish
        },
        {
          model: Element,
          as: "element",
          attributes: ["name"] // Chọn các thuộc tính bạn muốn lấy từ model Element
        }
      ]
    })
    return koiFishElements
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getKoiFishElementById(koiFishElementId: string) {
  try {
    const koiFishElement = await KoiFishElement.findOne({
      where: { id: koiFishElementId, isDeleted: false },
      include: [
        {
          model: KoiFish,
          as: "koiFish",
          attributes: ["name"]
        },
        {
          model: Element,
          as: "element",
          attributes: ["name"]
        }
      ]
    })
    if (!koiFishElement) throw responseStatus.responseNotFound404("KoiFishElement not found")
    return koiFishElement
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function createKoiFishElement(newKoiFishElement: CreateKoiFishElement) {
  try {
    const existingKoiFishElement = await KoiFishElement.findOne({
      where: {
        koiFishId: newKoiFishElement.koiFishId,
        elementId: newKoiFishElement.elementId
      }
    })

    if (existingKoiFishElement) {
      // Nếu đã tồn tại bản ghi, cập nhật isDeleted = false
      if (existingKoiFishElement.isDeleted) {
        await existingKoiFishElement.update({ isDeleted: false })
        return existingKoiFishElement
      } else {
        // Xử lý trường hợp đã tồn tại bản ghi chưa bị xóa
        // Có thể throw error hoặc trả về thông báo cho biết bản ghi đã tồn tại
        throw responseStatus.responeCustom(400, "KoiFishElement already exists")
      }
    } else {
      // Nếu chưa tồn tại bản ghi, tạo mới
      const koiFishElement = await KoiFishElement.create(newKoiFishElement)
      return koiFishElement
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function editKoiFishElement(id: string, updatedKoiFishElement: UpdateKoiFishElement) {
  try {
    const koiFishElement = await KoiFishElement.findOne({
      where: { id, isDeleted: false }
    })

    if (!koiFishElement) {
      throw responseStatus.responseNotFound404("KoiFishElement not found")
    }

    await koiFishElement.update({
      koiFishId: updatedKoiFishElement.koiFishId || koiFishElement.koiFishId,
      elementId: updatedKoiFishElement.elementId || koiFishElement.elementId
    })

    return koiFishElement
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function deleteKoiFishElement(id: string) {
  try {
    const koiFishElement = await KoiFishElement.findOne({
      where: { id, isDeleted: false }
    })
    if (!koiFishElement) {
      throw responseStatus.responseNotFound404("KoiFishElement not found or already deleted")
    }

    const koiFishElementResult = await KoiFishElement.update({ isDeleted: true }, { where: { id } })

    if (koiFishElementResult[0] === 0) {
      throw responseStatus.responeCustom(400, "Delete koiFishElement failed")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default {
  getAllKoiFishElements,
  getKoiFishElementById,
  createKoiFishElement,
  editKoiFishElement,
  deleteKoiFishElement
}
