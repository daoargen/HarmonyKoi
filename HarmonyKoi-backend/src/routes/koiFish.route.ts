import express from "express"

import { Role } from "~/constants/type"
import KoiFishController from "~/controllers/koiFish.controller"
import authMiddleware from "~/middlewares/auth.middleware"

const router = express.Router()

/**
 * @swagger
 * /api/koiFishes:
 *   get:
 *     tags:
 *       - koiFish
 *     summary: Api for get koi fishes
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
 *         description: Keyword to search in koi fish names, descriptions, symbolism, variety names, element names
 *       - in: query
 *         name: yearOfBirth
 *         schema:
 *           type: integer
 *         description: year of birth
 *     responses:
 *       200:
 *         description: Returns a list of koi fishes
 */
router.get("/", KoiFishController.getKoiFishes)

/**
 * @swagger
 * /api/koiFishes/{id}:
 *   get:
 *     tags:
 *       - koiFish
 *     summary: Api for get koi fish by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Koi fish Id
 *     responses:
 *       200:
 *         description: Returns a koi fish object
 */
router.get("/:id", KoiFishController.getKoiFish)

/**
 * @swagger
 * /api/koiFishes:
 *   post:
 *     tags:
 *       - koiFish
 *     summary: Api for create koi fish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verietyId:
 *                 type: string
 *                 description: Variety ID of the koi fish
 *               name:
 *                 type: string
 *                 description: Name of the koi fish
 *               description:
 *                 type: string
 *                 description: Description of the koi fish
 *               imageUrl:
 *                 type: string
 *                 description: Image URL of the koi fish
 *               baseColor:
 *                 type: string
 *                 description: Base color of the koi fish
 *               symbolism:
 *                 type: string
 *                 description: Symbolism of the koi fish
 *               price:
 *                 type: number
 *                 description: Price of the koi fish
 *               elementIds:
 *                 type: array
 *                 description: Array of Element IDs
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Koi fish created successfully
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
 *                   example: Create koi fish successfully!
 *                 data:
 *                   type: object
 *                   # Add properties of the created koi fish here
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
 *                   example: Failed to create koi fish
 */
router.post("/", authMiddleware.verifyToken, KoiFishController.createKoiFish)

/**
 * @swagger
 * /api/koiFishes/{id}:
 *   put:
 *     tags:
 *       - koiFish
 *     summary: Api for edit koi fish
 *     description: Update koi fish by koi fish ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the koi fish to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verietyId:
 *                 type: string
 *                 description: Variety ID of the koi fish
 *               elementId:
 *                 type: string
 *                 description: Element ID of the koi fish
 *               name:
 *                 type: string
 *                 description: Name of the koi fish
 *               description:
 *                 type: string
 *                 description: Description of the koi fish
 *               imageUrl:
 *                 type: string
 *                 description: Image URL of the koi fish
 *               baseColor:
 *                 type: string
 *                 description: Base color of the koi fish
 *               symbolism:
 *                 type: string
 *                 description: Symbolism of the koi fish
 *               price:
 *                 type: number
 *                 description: Price of the koi fish
 *               elementIds:
 *                 type: array
 *                 description: Array of Element IDs
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Koi fish updated successfully
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
 *                   example: Edit koi fish successfully!
 *       404:
 *         description: Koi fish not found
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
 *                   example: Koi fish not found
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
 *                   example: Failed to update koi fish
 */
router.put("/:id", authMiddleware.verifyToken, KoiFishController.editKoiFish)

/**
 * @swagger
 * /api/koiFishes/{id}:
 *   delete:
 *     tags:
 *       - koiFish
 *     summary: Api for delete koi fish by Id (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the koi fish to delete
 *     responses:
 *       204:
 *         description: No Content, koi fish deleted successfully
 *       404:
 *         description: Koi fish not found or already deleted
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware.verifyToken, KoiFishController.deleteKoiFish)

export default router
