import express from "express"

import { Role } from "~/constants/type"
import PondController from "~/controllers/pond.controller"
import authMiddleware from "~/middlewares/auth.middleware"
// import pondMiddleware from "~/validations/pond.validation"; // Import if you have validation middleware

const router = express.Router()

/**
 * @swagger
 * /api/ponds:
 *   get:
 *     tags:
 *       - pond
 *     summary: Api for get ponds
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
 *         description: Keyword to search in pond names, descriptions, or element names
 *     responses:
 *       200:
 *         description: Returns a list of ponds
 */
router.get("/", PondController.getPonds)

/**
 * @swagger
 * /api/ponds/{id}:
 *   get:
 *     tags:
 *       - pond
 *     summary: Api for get pond by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Pond Id
 *     responses:
 *       200:
 *         description: Returns a pond object
 */
router.get("/:id", PondController.getPond)

/**
 * @swagger
 * /api/ponds:
 *   post:
 *     tags:
 *       - pond
 *     summary: Api for create pond
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               elementId:
 *                 type: string
 *                 description: Element ID of the pond
 *               name:
 *                 type: string
 *                 description: Name of the pond
 *               description:
 *                 type: string
 *                 description: Description of the pond
 *               imageUrl:
 *                 type: string
 *                 description: Image URL of the pond
 *               elementIds:
 *                 type: array
 *                 description: Array of Element IDs
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Pond created successfully
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
 *                   example: Create pond successfully!
 *                 data:
 *                   type: object
 *                   # Add properties of the created pond here
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
 *                   example: Failed to create pond
 */
router.post("/", authMiddleware.verifyToken, PondController.createPond)

/**
 * @swagger
 * /api/ponds/{id}:
 *   put:
 *     tags:
 *       - pond
 *     summary: Api for edit pond
 *     description: Update pond by pond ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the pond to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               elementId:
 *                 type: string
 *                 description: Element ID of the pond
 *               name:
 *                 type: string
 *                 description: Name of the pond
 *               description:
 *                 type: string
 *                 description: Description of the pond
 *               imageUrl:
 *                 type: string
 *                 description: Image URL of the pond
 *               elementIds:
 *                 type: array
 *                 description: Array of Element IDs
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Pond updated successfully
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
 *                   example: Edit pond successfully!
 *       404:
 *         description: Pond not found
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
 *                   example: Pond not found
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
 *                   example: Failed to update pond
 */
router.put("/:id", authMiddleware.verifyToken, PondController.editPond)

/**
 * @swagger
 * /api/ponds/{id}:
 *   delete:
 *     tags:
 *       - pond
 *     summary: Api for delete pond by Id (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the pond to delete
 *     responses:
 *       204:
 *         description: No Content, pond deleted successfully
 *       404:
 *         description: Pond not found or already deleted
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware.verifyToken, PondController.deletePond)

export default router
