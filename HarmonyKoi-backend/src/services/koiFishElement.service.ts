import responseStatus from "~/constants/responseStatus"
import { CreateKoiFishElement, UpdateKoiFishElement } from "~/constants/type"
import { Element } from "~/models/element.model"
import { KoiFish } from "~/models/koiFish.model"
import { KoiFishElement } from "~/models/koiFishElement.model"

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

async function deleteAllKoiFishElementByKoiFishId(koiFishId: string) {
  try {
    await KoiFishElement.update({ isDeleted: true }, { where: { koiFishId } })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default {
  createKoiFishElement,
  deleteKoiFishElement,
  deleteAllKoiFishElementByKoiFishId
}
