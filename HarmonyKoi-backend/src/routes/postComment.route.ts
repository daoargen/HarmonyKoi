import express from "express"

import { Role } from "~/constants/type"
import PostCommentController from "~/controllers/postComment.controller"
import authMiddleware from "~/middlewares/auth.middleware"
// import postCommentMiddleware from "~/validations/postComment.validation"; // Import if you have validation middleware

const router = express.Router()

/**
 * @swagger
 * /api/postComments:
 *   get:
 *     tags:
 *       - postComment
 *     summary: Api for get post comments
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
 *         description: Keyword to search in comment content, user's username, or post title
 *     responses:
 *       200:
 *         description: Returns a list of post comments
 */
router.get("/", authMiddleware.verifyMinimumRole(Role.ADMIN), PostCommentController.getPostComments)

/**
 * @swagger
 * /api/postComments/{id}:
 *   get:
 *     tags:
 *       - postComment
 *     summary: Api for get post comment by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post comment Id
 *     responses:
 *       200:
 *         description: Returns a post comment object
 */
router.get("/:id", PostCommentController.getPostComment)

/**
 * @swagger
 * /api/postComments:
 *   post:
 *     tags:
 *       - postComment
 *     summary: Api for create post comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID of the commenter
 *               postId:
 *                 type: string
 *                 description: Post ID where the comment is posted
 *               content:
 *                 type: string
 *                 description: Content of the comment
 *     responses:
 *       201:
 *         description: Post comment created successfully
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
 *                   example: Create post comment successfully!
 *                 data:
 *                   type: object
 *                   # Add properties of the created post comment here
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
 *                   example: Failed to create post comment
 */
router.post("/", authMiddleware.verifyToken, PostCommentController.createPostComment)

/**
 * @swagger
 * /api/postComments/{id}:
 *   put:
 *     tags:
 *       - postComment
 *     summary: Api for edit post comment
 *     description: Update post comment by post comment ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID of the commenter
 *               postId:
 *                 type: string
 *                 description: Post ID where the comment is posted
 *               content:
 *                 type: string
 *                 description: Content of the comment
 *     responses:
 *       200:
 *         description: Post comment updated successfully
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
 *                   example: Edit post comment successfully!
 *       404:
 *         description: Post comment not found
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
 *                   example: Post comment not found
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
 *                   example: Failed to update post comment
 */
router.put("/:id", authMiddleware.verifyToken, PostCommentController.editPostComment)

/**
 * @swagger
 * /api/postComments/{id}:
 *   delete:
 *     tags:
 *       - postComment
 *     summary: Api for delete post comment by Id (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post comment to delete
 *     responses:
 *       204:
 *         description: No Content, post comment deleted successfully
 *       404:
 *         description: Post comment not found or already deleted
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware.verifyToken, PostCommentController.deletePostComment)

export default router
