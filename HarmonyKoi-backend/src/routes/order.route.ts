import express from "express"

import { Role } from "~/constants/type"
import OrderController from "~/controllers/order.controller"
import authMiddleware from "~/middlewares/auth.middleware"
// import orderMiddleware from '~/validations/order.validation'; // Import if you have validation middleware

const router = express.Router()

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags:
 *       - order
 *     summary: Api for get orders
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
 *         description: Keyword to search in user's username, package name, or post title
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Order status to filter by (PENDING, PROCESSING, SHIPPED, CANCELLED, COMPLETED)
 *     responses:
 *       200:
 *         description: Returns a list of orders
 */
router.get("/", authMiddleware.verifyMinimumRole(Role.ADMIN), OrderController.getOrders)

/**
 * @swagger
 * /api/orders/user/history:
 *   get:
 *     tags:
 *       - order
 *     summary: Api for get orders
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
 *         description: Keyword to search in user's username, package name, or post title
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Order status to filter by (PENDING, PROCESSING, SHIPPED, CANCELLED, COMPLETED)
 *     responses:
 *       200:
 *         description: Returns a list of orders
 */
router.get("/user/history", authMiddleware.verifyToken, OrderController.getOrderHistory)

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags:
 *       - order
 *     summary: Api for get order by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order Id
 *     responses:
 *       200:
 *         description: Returns a order object
 */
router.get("/:id", OrderController.getOrder)

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags:
 *       - order
 *     summary: Api for create order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               koiFishId:
 *                 type: string
 *                 description: Koi Fish ID of the order (can be null)
 *               packageId:
 *                 type: string
 *                 description: Package ID of the order (can be null)
 *               type:
 *                 type: string
 *                 enum: [PACKAGE, KOIFISH]
 *                 description: Type of the order (PACKAGE or KOIFISH)
 *     responses:
 *       201:
 *         description: Order created successfully
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
 *                   example: Create order successfully!
 *                 data:
 *                   type: object
 *                   # Add properties of the created order here
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
 *                   example: Failed to create order
 */
router.post("/", authMiddleware.verifyToken, OrderController.createOrder)

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     tags:
 *       - order
 *     summary: Api for edit order
 *     description: Update order by order ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID of the order
 *               packageId:
 *                 type: string
 *                 description: Package ID of the order (can be null)
 *               postId:
 *                 type: string
 *                 description: Post ID of the order (can be null)
 *               status:
 *                 type: string
 *                 enum: [PENDING, PROCESSING, SHIPPED, CANCELLED, COMPLETED]
 *                 description: Status of the order
 *               totalAmount:
 *                 type: number
 *                 description: Total amount of the order
 *     responses:
 *       200:
 *         description: Order updated successfully
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
 *                   example: Edit order successfully!
 *       404:
 *         description: Order not found
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
 *                   example: Order not found
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
 *                   example: Failed to update order
 */
router.put("/:id", authMiddleware.verifyToken, OrderController.editOrder)

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     tags:
 *       - order
 *     summary: Api for delete order by Id (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to delete
 *     responses:
 *       204:
 *         description: No Content, order deleted successfully
 *       404:
 *         description: Order not found or already deleted
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware.verifyToken, OrderController.deleteOrder)

export default router
