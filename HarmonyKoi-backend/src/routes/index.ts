import express from "express"

import authRouter from "~/routes/auth.route"
import cartRouter from "~/routes/cart.route"
import cartDetailRouter from "~/routes/cartDetail.route"
import elementRouter from "~/routes/element.route"
import koiFishRouter from "~/routes/koiFish.route"
import newsRouter from "~/routes/new.route"
import orderRouter from "~/routes/order.route"
import packageRouter from "~/routes/package.route"
import patternTypeRouter from "~/routes/patternType.route"
import paymentRouter from "~/routes/payment.route"
import pondRouter from "~/routes/pond.route"
import postRouter from "~/routes/post.route"
import postCommentRouter from "~/routes/postComment.route"
import reticulationRouter from "~/routes/reticulation.route"
import userRouter from "~/routes/user.route"
import verietyRouter from "~/routes/veriety.route"

const app = express()

// Routes
app.use("/users", userRouter)
app.use("/auth", authRouter)
app.use("/carts", cartRouter)
app.use("/cartDetails", cartDetailRouter)
app.use("/elements", elementRouter)
app.use("/koiFishes", koiFishRouter)
app.use("/news", newsRouter)
app.use("/orders", orderRouter)
app.use("/packages", packageRouter)
app.use("/patternTypes", patternTypeRouter)
app.use("/payments", paymentRouter)
app.use("/ponds", pondRouter)
app.use("/posts", postRouter)
app.use("/postComments", postCommentRouter)
app.use("/reticulations", reticulationRouter)
app.use("/verieties", verietyRouter)

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
