import express from "express"

import { Role } from "~/constants/type"
import ReticulationController from "~/controllers/reticulation.controller"
import authMiddleware from "~/middlewares/auth.middleware"
// import reticulationMiddleware from "~/validations/reticulation.validation"; // Import if you have validation middleware

const router = express.Router()

/**
 * @swagger
 * /api/reticulations:
 *   get:
 *     tags:
 *       - reticulation
 *     summary: Api for get reticulations
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
 *         description: Keyword to search in reticulation names or descriptions
 *     responses:
 *       200:
 *         description: Returns a list of reticulations
 */
router.get("/", authMiddleware.verifyMinimumRole(Role.ADMIN), ReticulationController.getReticulations)

/**
 * @swagger
 * /api/reticulations/{id}:
 *   get:
 *     tags:
 *       - reticulation
 *     summary: Api for get reticulation by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Reticulation Id
 *     responses:
 *       200:
 *         description: Returns a reticulation object
 */
router.get("/:id", ReticulationController.getReticulation)

/**
 * @swagger
 * /api/reticulations:
 *   post:
 *     tags:
 *       - reticulation
 *     summary: Api for create reticulation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the reticulation
 *               description:
 *                 type: string
 *                 description: Description of the reticulation
 *     responses:
 *       201:
 *         description: Reticulation created successfully
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
 *                   example: Create reticulation successfully!
 *                 data:
 *                   type: object
 *                   # Add properties of the created reticulation here
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
 *                   example: Failed to create reticulation
 */
router.post("/", authMiddleware.verifyToken, ReticulationController.createReticulation)

/**
 * @swagger
 * /api/reticulations/{id}:
 *   put:
 *     tags:
 *       - reticulation
 *     summary: Api for edit reticulation
 *     description: Update reticulation by reticulation ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the reticulation to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the reticulation
 *               description:
 *                 type: string
 *                 description: Description of the reticulation
 *     responses:
 *       200:
 *         description: Reticulation updated successfully
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
 *                   example: Edit reticulation successfully!
 *       404:
 *         description: Reticulation not found
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
 *                   example: Reticulation not found
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
 *                   example: Failed to update reticulation
 */
router.put("/:id", authMiddleware.verifyToken, ReticulationController.editReticulation)

/**
 * @swagger
 * /api/reticulations/{id}:
 *   delete:
 *     tags:
 *       - reticulation
 *     summary: Api for delete reticulation by Id (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the reticulation to delete
 *     responses:
 *       204:
 *         description: No Content, reticulation deleted successfully
 *       404:
 *         description: Reticulation not found or already deleted
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware.verifyToken, ReticulationController.deleteReticulation)

export default router
