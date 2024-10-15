import express from "express"

import { Role } from "~/constants/type"
import NewController from "~/controllers/new.controller"
import authMiddleware from "~/middlewares/auth.middleware"
// import newMiddleware from "~/validations/new.validation"; // Import if you have validation middleware

const router = express.Router()

/**
 * @swagger
 * /api/news:
 *   get:
 *     tags:
 *       - news
 *     summary: Api for get news
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
 *         description: Keyword to search in news categories, content, or user's username
 *     responses:
 *       200:
 *         description: Returns a list of news
 */
router.get("/", authMiddleware.verifyMinimumRole(Role.ADMIN), NewController.getNews)

/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     tags:
 *       - news
 *     summary: Api for get news by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: News Id
 *     responses:
 *       200:
 *         description: Returns a news object
 */
router.get("/:id", NewController.getNew)

/**
 * @swagger
 * /api/news:
 *   post:
 *     tags:
 *       - news
 *     summary: Api for create news
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID of the news creator (can be null for general news)
 *               category:
 *                 type: string
 *                 description: Category of the news
 *               content:
 *                 type: string
 *                 description: Content of the news
 *     responses:
 *       201:
 *         description: News created successfully
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
 *                   example: Create news successfully!
 *                 data:
 *                   type: object
 *                   # Add properties of the created news here
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
 *                   example: Failed to create news
 */
router.post("/", authMiddleware.verifyToken, NewController.createNew)

/**
 * @swagger
 * /api/news/{id}:
 *   put:
 *     tags:
 *       - news
 *     summary: Api for edit news
 *     description: Update news by news ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the news to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID of the news creator (can be null for general news)
 *               category:
 *                 type: string
 *                 description: Category of the news
 *               content:
 *                 type: string
 *                 description: Content of the news
 *     responses:
 *       200:
 *         description: News updated successfully
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
 *                   example: Edit news successfully!
 *       404:
 *         description: News not found
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
 *                   example: News not found
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
 *                   example: Failed to update news
 */
router.put("/:id", authMiddleware.verifyToken, NewController.editNew)

/**
 * @swagger
 * /api/news/{id}:
 *   delete:
 *     tags:
 *       - news
 *     summary: Api for delete news by Id (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the news to delete
 *     responses:
 *       204:
 *         description: No Content, news deleted successfully
 *       404:
 *         description: News not found or already deleted
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware.verifyToken, NewController.deleteNew)

export default router
