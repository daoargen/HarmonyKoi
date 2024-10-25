import express from "express"

import { Role } from "~/constants/type"
import PaymentController from "~/controllers/payment.controller"
import authMiddleware from "~/middlewares/auth.middleware"
// import paymentMiddleware from '~/validations/payment.validation'; // Import if you have validation middleware

const router = express.Router()

/**
 * @swagger
 * /api/payments:
 *   get:
 *     tags:
 *       - payment
 *     summary: Api for get payments
 *     parameters:
 *       - in: query
 *         name: page_index
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: page_size
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Keyword to search in payment code or order total amount
 *       - in: query
 *         name: payStatus
 *         schema:
 *           type: string
 *         description: Payment status to filter by (PENDING, COMPLETED, CANCEL)
 *     responses:
 *       200:
 *         description: Returns a list of payments
 */
router.get("/", authMiddleware.verifyMinimumRole(Role.ADMIN), PaymentController.getPayments)

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     tags:
 *       - payment
 *     summary: Api for get payment by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment Id
 *     responses:
 *       200:
 *         description: Returns a payment object
 */
router.get("/:id", PaymentController.getPayment)

/**
 * @swagger
 * /api/payments:
 *   post:
 *     tags:
 *       - payment
 *     summary: Api for create payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: Order ID associated with the payment
 *               paymentCode:
 *                 type: string
 *                 description: Payment code
 *               amount:
 *                 type: number
 *                 description: Payment amount
 *               payDate:
 *                 type: string
 *                 format: date
 *                 description: Payment date
 *               payStatus:
 *                 type: string
 *                 enum: [PENDING, COMPLETED, CANCEL]
 *                 description: Payment status
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Create payment successfully!
 *                 data:
 *                   type: object
 *                   # Add properties of the created payment here
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Failed to create payment
 */
router.post("/", authMiddleware.verifyToken, PaymentController.createPayment)

/**
 * @swagger
 * /api/payments/{id}:
 *   put:
 *     tags:
 *       - payment
 *     summary: Api for edit payment
 *     description: Update payment by payment ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the payment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: Order ID associated with the payment
 *               paymentCode:
 *                 type: string
 *                 description: Payment code
 *               amount:
 *                 type: number
 *                 description: Payment amount
 *               payDate:
 *                 type: string
 *                 format: date
 *                 description: Payment date
 *               payStatus:
 *                 type: string
 *                 enum: [PENDING, COMPLETED, CANCEL]
 *                 description: Payment status
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Edit payment successfully!
 *       404:
 *         description: Payment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Payment not found
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Failed to update payment
 */
router.put("/:id", authMiddleware.verifyToken, PaymentController.editPayment)

/**
 * @swagger
 * /api/payments/{id}:
 *   delete:
 *     tags:
 *       - payment
 *     summary: Api for delete payment by Id (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the payment to delete
 *     responses:
 *       204:
 *         description: No Content, payment deleted successfully
 *       404:
 *         description: Payment not found or already deleted
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware.verifyToken, PaymentController.deletePayment)

/**
 * @swagger
 * /api/payments/{id}/cancel:
 *   post:
 *     tags:
 *       - payment
 *     summary: Api for cancelling a payment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the payment to cancel
 *     responses:
 *       200:
 *         description: Payment cancelled successfully
 *       404:
 *         description: Payment not found
 *       400:
 *         description: Payment already cancelled
 *       500:
 *         description: Internal server error
 */
router.post("/:id/cancel", authMiddleware.verifyToken, PaymentController.cancelPayment)

/**
 * @swagger
 * /api/payments/webhook:
 *   post:
 *     tags:
 *       - payment
 *     summary: Webhook for handling payment completion from Sepay
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Payment code from Sepay webhook
 *               transferAmount:
 *                 type: number
 *                 description: Payment amount from Sepay webhook
 *     responses:
 *       200:
 *         description: Payment completed successfully
 *       404:
 *         description: Payment not found
 *       400:
 *         description: Payment already completed
 *       500:
 *         description: Internal server error
 */
router.post("/webhook", authMiddleware.verifyToken, PaymentController.completePaymentFromWebhook)

export default router
