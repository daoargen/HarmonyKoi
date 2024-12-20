"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const sequelize_1 = require("sequelize");
const SQLModel_1 = __importDefault(require("../constants/SQLModel"));
const UUIDModel_1 = __importDefault(require("../constants/UUIDModel"));
const database_1 = __importDefault(require("../databases/database"));
const package_model_1 = require("./package.model");
const post_model_1 = require("./post.model");
const user_model_1 = require("./user.model");
const tableName = "Order";
exports.Order = database_1.default.define(tableName, {
    ...UUIDModel_1.default,
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    packageId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true
    },
    postId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("PENDING", "PROCESSING", "SHIPPED", "CANCELLED", "COMPLETED"),
        allowNull: false
    },
    totalAmount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    ...SQLModel_1.default
});
exports.Order.belongsTo(user_model_1.User, {
    foreignKey: "userId",
    as: "user"
});
exports.Order.belongsTo(package_model_1.Package, {
    foreignKey: "packageId",
    as: "package"
});
exports.Order.belongsTo(post_model_1.Post, {
    foreignKey: "postId",
    as: "post"
});
