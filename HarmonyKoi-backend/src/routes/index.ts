import express from "express"

import authRouter from "~/routes/auth.route"
import userRouter from "~/routes/user.route"

const app = express()

app.use("/users", userRouter)
app.use("/auth", authRouter)
/**
 * @swagger
 * /api/health:
 *   get:
 *     tags:
 *       - health
 *     summary: Check health of system
 *     responses:
 *       200:
 *         description: OK
 */
app.use("/health", (_, res) => res.send("OK"))

export default app
