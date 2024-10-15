import express from "express"

import { Role } from "~/constants/type"
import PatternTypeController from "~/controllers/patternType.controller"
import authMiddleware from "~/middlewares/auth.middleware"
// import patternTypeMiddleware from "~/validations/patternType.validation"; // Import if you have validation middleware

const router = express.Router()

/**
 * @swagger
 * /api/patternTypes:
 *   get:
 *     tags:
 *       - patternType
 *     summary: Api for get pattern types
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
 *         description: Keyword to search in pattern type names or descriptions
 *     responses:
 *       200:
 *         description: Returns a list of pattern types
 */
router.get("/", authMiddleware.verifyMinimumRole(Role.ADMIN), PatternTypeController.getPatternTypes)

/**
 * @swagger
 * /api/patternTypes/{id}:
 *   get:
 *     tags:
 *       - patternType
 *     summary: Api for get pattern type by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Pattern type Id
 *     responses:
 *       200:
 *         description: Returns a pattern type object
 */
router.get("/:id", PatternTypeController.getPatternType)

/**
 * @swagger
 * /api/patternTypes:
 *   post:
 *     tags:
 *       - patternType
 *     summary: Api for create pattern type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the pattern type
 *               description:
 *                 type: string
 *                 description: Description of the pattern type
 *               imageUrl:
 *                 type: string
 *                 description: Image URL of the pattern type
 *     responses:
 *       201:
 *         description: Pattern type created successfully
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
 *                   example: Create pattern type successfully!
 *                 data:
 *                   type: object
 *                   # Add properties of the created pattern type here
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
 *                   example: Failed to create pattern type
 */
router.post("/", authMiddleware.verifyToken, PatternTypeController.createPatternType)

/**
 * @swagger
 * /api/patternTypes/{id}:
 *   put:
 *     tags:
 *       - patternType
 *     summary: Api for edit pattern type
 *     description: Update pattern type by pattern type ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the pattern type to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the pattern type
 *               description:
 *                 type: string
 *                 description: Description of the pattern type
 *               imageUrl:
 *                 type: string
 *                 description: Image URL of the pattern type
 *     responses:
 *       200:
 *         description: Pattern type updated successfully
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
 *                   example: Edit pattern type successfully!
 *       404:
 *         description: Pattern type not found
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
 *                   example: Pattern type not found
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
 *                   example: Failed to update pattern type
 */
router.put("/:id", authMiddleware.verifyToken, PatternTypeController.editPatternType)

/**
 * @swagger
 * /api/patternTypes/{id}:
 *   delete:
 *     tags:
 *       - patternType
 *     summary: Api for delete pattern type by Id (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the pattern type to delete
 *     responses:
 *       204:
 *         description: No Content, pattern type deleted successfully
 *       404:
 *         description: Pattern type not found or already deleted
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware.verifyToken, PatternTypeController.deletePatternType)

export default router
