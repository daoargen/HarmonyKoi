import express from "express"

import { Role } from "~/constants/type"
import CartController from "~/controllers/cart.controller"
import authMiddleware from "~/middlewares/auth.middleware"

const router = express.Router()

/**
 * @swagger
 * /api/carts:
 *   get:
 *     tags:
 *       - cart
 *     summary: Api for get carts
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
 *         description: Keyword to search in user names
 *     responses:
 *       200:
 *         description: Returns a list of carts
 */
router.get("/", CartController.getCarts)

/**
 * @swagger
 * /api/carts/{id}:
 *   get:
 *     tags:
 *       - cart
 *     summary: Api for get cart by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Cart Id
 *     responses:
 *       200:
 *         description: Returns a cart object
 */
router.get("/:id", CartController.getCart)

/**
 * @swagger
 * /api/carts:
 *   post:
 *     tags:
 *       - cart
 *     summary: Api for create cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID of the cart
 *               totalAmount:
 *                 type: number
 *                 description: Total amount of the cart
 *     responses:
 *       201:
 *         description: Cart created successfully
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
 *                   example: Create cart successfully!
 *                 data:
 *                   type: object
 *                   # Add properties of the created cart here
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
 *                   example: Failed to create cart
 */
router.post("/", authMiddleware.verifyToken, CartController.createCart)

/**
 * @swagger
 * /api/carts/{id}:
 *   put:
 *     tags:
 *       - cart
 *     summary: Api for edit cart
 *     description: Update cart by cart ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cart to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID of the cart
 *               totalAmount:
 *                 type: number
 *                 description: Total amount of the cart
 *     responses:
 *       200:
 *         description: Cart updated successfully
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
 *                   example: Edit cart successfully!
 *       404:
 *         description: Cart not found
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
 *                   example: Cart not found
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
 *                   example: Failed to update cart
 */
router.put("/:id", authMiddleware.verifyToken, CartController.editCart)

/**
 * @swagger
 * /api/carts/{id}:
 *   delete:
 *     tags:
 *       - cart
 *     summary: Api for delete cart by Id (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the cart to delete
 *     responses:
 *       204:
 *         description: No Content, cart deleted successfully
 *       404:
 *         description: Cart not found or already deleted
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware.verifyToken, CartController.deleteCart)

export default router
