import express from "express"

import { Role } from "~/constants/type"
import PostController from "~/controllers/post.controller"
import authMiddleware from "~/middlewares/auth.middleware"
// import postMiddleware from "~/validations/post.validation"; // Import if you have validation middleware

const router = express.Router()

/**
 * @swagger
 * /api/posts:
 *   get:
 *     tags:
 *       - post
 *     summary: Api for get posts
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
 *         description: Keyword to search in post titles, content, or user's username
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Post status to filter by
 *       - in: query
 *         name: visible
 *         schema:
 *           type: string
 *         description: Filter by visibility (true or false)
 *     responses:
 *       200:
 *         description: Returns a list of posts
 */
router.get("/", PostController.getPosts)

/**
 * @swagger
 * /api/posts/member:
 *   get:
 *     tags:
 *       - post
 *     summary: Api for get member posts
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
 *         description: Keyword to search in post titles, content, or user's username
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Post status to filter by
 *       - in: query
 *         name: visible
 *         schema:
 *           type: string
 *         description: Filter by visibility (true or false)
 *     responses:
 *       200:
 *         description: Returns a list of posts
 */
router.get("/member", authMiddleware.verifyToken, PostController.getMemberPosts)

/**
 * @swagger
 * /api/posts/admin:
 *   get:
 *     tags:
 *       - post
 *     summary: Api for get member posts
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
 *         description: Keyword to search in post titles, content, or user's username
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Post status to filter by
 *       - in: query
 *         name: visible
 *         schema:
 *           type: string
 *         description: Filter by visibility (true or false)
 *     responses:
 *       200:
 *         description: Returns a list of posts
 */
router.get("/admin", authMiddleware.verifyToken, PostController.getPendingPosts)

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     tags:
 *       - post
 *     summary: Api for get post by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post Id
 *     responses:
 *       200:
 *         description: Returns a post object
 */
router.get("/:id", PostController.getPost)

/**
 * @swagger
 * /api/posts:
 *   post:
 *     tags:
 *       - post
 *     summary: Api for create post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post
 *               content:
 *                 type: string
 *                 description: Content of the post
 *               imageUrl:
 *                 type: string
 *                 description: imageUrl of the post
 *     responses:
 *       201:
 *         description: Post created successfully
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
 *                   example: Create post successfully!
 *                 data:
 *                   type: object
 *                   # Add properties of the created post here
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
 *                   example: Failed to create post
 */
router.post("/", authMiddleware.verifyToken, PostController.createPost)

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     tags:
 *       - post
 *     summary: Api for edit post
 *     description: Update post by post ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post
 *               content:
 *                 type: string
 *                 description: Content of the post
 *               imageUrl:
 *                 type: string
 *                 description: imageUrl of the post
 *               status:
 *                 type: string
 *                 description: Status of the post
 *               visible:
 *                 type: boolean
 *                 description: Visibility of the post
 *     responses:
 *       200:
 *         description: Post updated successfully
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
 *                   example: Edit post successfully!
 *       404:
 *         description: Post not found
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
 *                   example: Post not found
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
 *                   example: Failed to update post
 */
router.put("/:id", authMiddleware.verifyToken, PostController.editPost)

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     tags:
 *       - post
 *     summary: Api for delete post by Id (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to delete
 *     responses:
 *       204:
 *         description: No Content, post deleted successfully
 *       404:
 *         description: Post not found or already deleted
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware.verifyToken, PostController.deletePost)

export default router
