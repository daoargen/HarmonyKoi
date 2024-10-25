"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("../routes/auth.route"));
const user_route_1 = __importDefault(require("../routes/user.route"));
const app = (0, express_1.default)();
app.use("/users", user_route_1.default);
app.use("/auth", auth_route_1.default);
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
app.use("/health", (_, res) => res.send("OK"));
exports.default = app;
