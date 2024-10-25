"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const sequelize_1 = require("sequelize");
const SQLModel_1 = __importDefault(require("../constants/SQLModel"));
const UUIDModel_1 = __importDefault(require("../constants/UUIDModel"));
const database_1 = __importDefault(require("../databases/database"));
const user_model_1 = require("./user.model");
const tableName = "Cart";
exports.Cart = database_1.default.define(tableName, {
    ...UUIDModel_1.default,
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    totalAmount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    ...SQLModel_1.default
});
exports.Cart.belongsTo(user_model_1.User, {
    foreignKey: "userId",
    as: "user"
});
