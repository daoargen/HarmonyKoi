import express from "express"

import { Role } from "~/constants/type"
import VerietyController from "~/controllers/veriety.controller"
import authMiddleware from "~/middlewares/auth.middleware"
// import verietyMiddleware from "~/validations/veriety.validation"; // Import if you have validation middleware

const router = express.Router()

/**
 * @swagger
 * /api/verieties:
 *   get:
 *     tags:
 *       - veriety
 *     summary: Api for get varieties
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
 *         description: Keyword to search in veriety names or descriptions
 *     responses:
 *       200:
 *         description: Returns a list of varieties
 */
router.get("/", authMiddleware.verifyMinimumRole(Role.ADMIN), VerietyController.getVerieties)

/**
 * @swagger
 * /api/verieties/{id}:
 *   get:
 *     tags:
 *       - veriety
 *     summary: Api for get veriety by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Veriety Id
 *     responses:
 *       200:
 *         description: Returns a veriety object
 */
router.get("/:id", VerietyController.getVeriety)

/**
 * @swagger
 * /api/verieties:
 *   post:
 *     tags:
 *       - veriety
 *     summary: Api for create veriety
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the veriety
 *               description:
 *                 type: string
 *                 description: Description of the veriety
 *     responses:
 *       201:
 *         description: Veriety created successfully
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
 *                   example: Create veriety successfully!
 *                 data:
 *                   type: object
 *                   # Add properties of the created veriety here
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
 *                   example: Failed to create veriety
 */
router.post("/", authMiddleware.verifyToken, VerietyController.createVeriety)

/**
 * @swagger
 * /api/verieties/{id}:
 *   put:
 *     tags:
 *       - veriety
 *     summary: Api for edit veriety
 *     description: Update veriety by veriety ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the veriety to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the veriety
 *               description:
 *                 type: string
 *                 description: Description of the veriety
 *     responses:
 *       200:
 *         description: Veriety updated successfully
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
 *                   example: Edit veriety successfully!
 *       404:
 *         description: Veriety not found
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
 *                   example: Veriety not found
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
 *                   example: Failed to update veriety
 */
router.put("/:id", authMiddleware.verifyToken, VerietyController.editVeriety)

/**
 * @swagger
 * /api/verieties/{id}:
 *   delete:
 *     tags:
 *       - veriety
 *     summary: Api for delete veriety by Id (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the veriety to delete
 *     responses:
 *       204:
 *         description: No Content, veriety deleted successfully
 *       404:
 *         description: Veriety not found or already deleted
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware.verifyToken, VerietyController.deleteVeriety)

export default router
