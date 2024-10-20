import express from "express"

import { Role } from "~/constants/type"
import PackageController from "~/controllers/package.controller"
import authMiddleware from "~/middlewares/auth.middleware"
// import packageMiddleware from "~/validations/package.validation"; // Import if you have validation middleware

const router = express.Router()

/**
 * @swagger
 * /api/packages:
 *   get:
 *     tags:
 *       - package
 *     summary: Api for get packages
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
 *         description: Keyword to search in package names or descriptions
 *     responses:
 *       200:
 *         description: Returns a list of packages
 */
router.get("/", PackageController.getPackages)

/**
 * @swagger
 * /api/packages/{id}:
 *   get:
 *     tags:
 *       - package
 *     summary: Api for get package by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Package Id
 *     responses:
 *       200:
 *         description: Returns a package object
 */
router.get("/:id", PackageController.getPackage)

/**
 * @swagger
 * /api/packages:
 *   post:
 *     tags:
 *       - package
 *     summary: Api for create package
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the package
 *               description:
 *                 type: string
 *                 description: Description of the package
 *               duration:
 *                 type: number
 *                 description: Duration of the package
 *               amountPost:
 *                 type: number
 *                 description: Amount of post
 *               price:
 *                 type: number
 *                 description: Price of the package
 *     responses:
 *       201:
 *         description: Package created successfully
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
 *                   example: Create package successfully!
 *                 data:
 *                   type: object
 *                   # Add properties of the created package here
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
 *                   example: Failed to create package
 */
router.post("/", authMiddleware.verifyToken, PackageController.createPackage)

/**
 * @swagger
 * /api/packages/{id}:
 *   put:
 *     tags:
 *       - package
 *     summary: Api for edit package
 *     description: Update package by package ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the package to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the package
 *               description:
 *                 type: string
 *                 description: Description of the package
 *               duration:
 *                 type: number
 *                 description: Duration of the package
 *               amountPost:
 *                 type: number
 *                 description: Amount of post
 *               price:
 *                 type: number
 *                 description: Price of the package
 *     responses:
 *       200:
 *         description: Package updated successfully
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
 *                   example: Edit package successfully!
 *       404:
 *         description: Package not found
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
 *                   example: Package not found
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
 *                   example: Failed to update package
 */
router.put("/:id", authMiddleware.verifyToken, PackageController.editPackage)

/**
 * @swagger
 * /api/packages/{id}:
 *   delete:
 *     tags:
 *       - package
 *     summary: Api for delete package by Id (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the package to delete
 *     responses:
 *       204:
 *         description: No Content, package deleted successfully
 *       404:
 *         description: Package not found or already deleted
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware.verifyToken, PackageController.deletePackage)

export default router
