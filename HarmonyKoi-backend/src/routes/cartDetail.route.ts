import express from "express"

import { Role } from "~/constants/type"
import CartDetailController from "~/controllers/cartDetail.controller"
import authMiddleware from "~/middlewares/auth.middleware"

const router = express.Router()

/**
 * @swagger
 * /api/cartDetails:
 *   get:
 *     tags:
 *       - cartDetail
 *     summary: Api for get cartDetails
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
 *         description: Keyword to search in koi fish names
 *     responses:
 *       200:
 *         description: Returns a list of cartDetails
 */
router.get("/", authMiddleware.verifyMinimumRole(Role.ADMIN), CartDetailController.getCartDetails)

/**
 * @swagger
 * /api/cartDetails/{id}:
 *   get:
 *     tags:
 *       - cartDetail
 *     summary: Api for get cartDetail by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: CartDetail Id
 *     responses:
 *       200:
 *         description: Returns a cartDetail object
 */
router.get("/:id", CartDetailController.getCartDetail)

/**
 * @swagger
 * /api/cartDetails:
 *   post:
 *     tags:
 *       - cartDetail
 *     summary: Api for create cartDetail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *                 description: Cart ID of the cart detail
 *               koiFishId:
 *                 type: string
 *                 description: Koi Fish ID of the cart detail
 *               unitPrice:
 *                 type: number
 *                 description: Unit price of the cart detail
 *               totalPrice:
 *                 type: number
 *                 description: Total price of the cart detail
 *     responses:
 *       201:
 *         description: Cart Detail created successfully
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
 *                   example: Create cart detail successfully!
 *                 data:
 *                   type: object
 *                   # Add properties of the created cart detail here
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
 *                   example: Failed to create cart detail
 */
router.post("/", authMiddleware.verifyToken, CartDetailController.createCartDetail)

/**
 * @swagger
 * /api/cartDetails/{id}:
 *   put:
 *     tags:
 *       - cartDetail
 *     summary: Api for edit cartDetail
 *     description: Update cartDetail by cartDetail ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cartDetail to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *                 description: Cart ID of the cart detail
 *               koiFishId:
 *                 type: string
 *                 description: Koi Fish ID of the cart detail
 *               unitPrice:
 *                 type: number
 *                 description: Unit price of the cart detail
 *               totalPrice:
 *                 type: number
 *                 description: Total price of the cart detail
 *     responses:
 *       200:
 *         description: Cart Detail updated successfully
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
 *                   example: Edit cart detail successfully!
 *       404:
 *         description: Cart Detail not found
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
 *                   example: Cart Detail not found
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
 *                   example: Failed to update cart detail
 */
router.put("/:id", authMiddleware.verifyToken, CartDetailController.editCartDetail)

/**
 * @swagger
 * /api/cartDetails/{id}:
 *   delete:
 *     tags:
 *       - cartDetail
 *     summary: Api for delete cartDetail by Id (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the cartDetail to delete
 *     responses:
 *       204:
 *         description: No Content, cartDetail deleted successfully
 *       404:
 *         description: Cart Detail not found or already deleted
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware.verifyToken, CartDetailController.deleteCartDetail)

export default router
