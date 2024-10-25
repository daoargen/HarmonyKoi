import { Request, Response } from "express"

import responseStatus from "~/constants/responseStatus"
import paymentService from "~/services/payment.service"

import { handleSepayWebhook } from "./../constants/type"

async function getPayments(req: Request, res: Response) {
  try {
    const { payments, pagination } = await paymentService.getAllPayments(req)
    return res.json(responseStatus.responseData200("Get payments list successfully!", payments, pagination))
  } catch (error) {
    return res.json(error)
  }
}

async function getPayment(req: Request, res: Response) {
  try {
    const id = req.params.id
    const payment = await paymentService.getPaymentById(id)
    return res.json(responseStatus.responseData200("Get payment successfully!", payment))
  } catch (error) {
    return res.json(error)
  }
}

async function createPayment(req: Request, res: Response) {
  try {
    const newPayment = req.body
    const payment = await paymentService.createPayment(newPayment)
    return res.json(responseStatus.responseData200("Create payment successfully!", payment))
  } catch (error) {
    return res.json(error)
  }
}

async function editPayment(req: Request, res: Response) {
  try {
    const id = req.params.id
    const updatedPayment = req.body
    await paymentService.editPayment(id, updatedPayment)
    return res.json(responseStatus.responseMessage200("Edit payment successfully!"))
  } catch (error) {
    return res.json(error)
  }
}

async function deletePayment(req: Request, res: Response) {
  try {
    const id = req.params.id
    await paymentService.deletePayment(id)
    return res.json(responseStatus.responseMessage200("Delete payment successfully!"))
  } catch (error) {
    return res.json(error)
  }
}

async function cancelPayment(req: Request, res: Response) {
  try {
    const id = req.params.id
    await paymentService.cancelPayment(id)
    return res.json(responseStatus.responseMessage200("cancel payment successfully!"))
  } catch (error) {
    return res.json(error)
  }
}

async function completePaymentFromWebhook(req: Request, res: Response) {
  try {
    const { content, transferAmount } = req.body
    const dataRequest: handleSepayWebhook = {
      content,
      transferAmount
    }
    await paymentService.completePaymentFromWebhook(dataRequest)
    return res.json(responseStatus.responseMessage200("update complete payment successfully!"))
  } catch (error) {
    return res.json(error)
  }
}

export default {
  getPayments,
  getPayment,
  createPayment,
  editPayment,
  deletePayment,
  cancelPayment,
  completePaymentFromWebhook
}
