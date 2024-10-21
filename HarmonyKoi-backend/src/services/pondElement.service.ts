import responseStatus from "~/constants/responseStatus"
import { CreatePondElement, UpdatePondElement } from "~/constants/type"
import { Element } from "~/models/element.model"
import { Pond } from "~/models/pond.model"
import { PondElement } from "~/models/pondElement.model"

async function createPondElement(newPondElement: CreatePondElement) {
  try {
    const existingPondElement = await PondElement.findOne({
      where: {
        pondId: newPondElement.pondId,
        elementId: newPondElement.elementId
      }
    })

    if (existingPondElement) {
      // Nếu đã tồn tại bản ghi, cập nhật isDeleted = false
      if (existingPondElement.isDeleted) {
        await existingPondElement.update({ isDeleted: false })
        return existingPondElement
      }
    } else {
      // Nếu chưa tồn tại bản ghi, tạo mới
      const pondElement = await PondElement.create(newPondElement)
      return pondElement
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function deletePondElement(id: string) {
  try {
    const pondElement = await PondElement.findOne({
      where: { id, isDeleted: false }
    })
    if (!pondElement) {
      throw responseStatus.responseNotFound404("PondElement not found or already deleted")
    }

    const pondElementResult = await PondElement.update({ isDeleted: true }, { where: { id } })

    if (pondElementResult[0] === 0) {
      throw responseStatus.responeCustom(400, "Delete pondElement failed")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function deleteAllPondElementByPondId(pondId: string) {
  try {
    await PondElement.update({ isDeleted: true }, { where: { pondId } })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default {
  createPondElement,
  deletePondElement,
  deleteAllPondElementByPondId
}
