import express from "express"

import { Role } from "~/constants/type"
import ElementController from "~/controllers/element.controller"
import authMiddleware from "~/middlewares/auth.middleware"

const router = express.Router()

/**
 * @swagger
 * /api/elements:
 *   get:
 *     tags:
 *       - element
 *     summary: Api for get elements
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
 *         description: Keyword to search in element names
 *     responses:
 *       200:
 *         description: Returns a list of elements
 */
router.get("/", ElementController.getElements)

/**
 * @swagger
 * /api/elements/{id}:
 *   get:
 *     tags:
 *       - element
 *     summary: Api for get element by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Element Id
 *     responses:
 *       200:
 *         description: Returns a element object
 */
router.get("/:id", ElementController.getElement)

/**
 * @swagger
 * /api/elements:
 *   post:
 *     tags:
 *       - element
 *     summary: Api for create element
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the element
 *               imageUrl:
 *                 type: string
 *                 description: Image URL of the element
 *     responses:
 *       201:
 *         description: Element created successfully
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
 *                   example: Create element successfully!
 *                 data:
 *                   type: object
 *                   # Add properties of the created element here
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
 *                   example: Failed to create element
 */
router.post("/", authMiddleware.verifyToken, ElementController.createElement)

/**
 * @swagger
 * /api/elements/{id}:
 *   put:
 *     tags:
 *       - element
 *     summary: Api for edit element
 *     description: Update element by element ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the element
 *               imageUrl:
 *                 type: string
 *                 description: Image URL of the element
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the element
 *     responses:
 *       200:
 *         description: Element updated successfully
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
 *                   example: Edit element successfully!
 *       404:
 *         description: Element not found
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
 *                   example: Element not found
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
 *                   example: Failed to update element
 */
router.put("/:id", authMiddleware.verifyToken, ElementController.editElement)

/**
 * @swagger
 * /api/elements/{id}:
 *   delete:
 *     tags:
 *       - element
 *     summary: Api for delete element by Id (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the element to delete
 *     responses:
 *       204:
 *         description: No Content, element deleted successfully
 *       404:
 *         description: Element not found or already deleted
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware.verifyToken, ElementController.deleteElement)

export default router
