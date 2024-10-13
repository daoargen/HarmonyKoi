"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartDetail = void 0;
const sequelize_1 = require("sequelize");
const SQLModel_1 = __importDefault(require("../constants/SQLModel"));
const UUIDModel_1 = __importDefault(require("../constants/UUIDModel"));
const database_1 = __importDefault(require("../databases/database"));
const cart_model_1 = require("./cart.model");
const koiFish_model_1 = require("./koiFish.model");
const tableName = "CartDetail";
exports.CartDetail = database_1.default.define(tableName, {
    ...UUIDModel_1.default,
    cartId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    koiFishId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    unitPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    totalPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    ...SQLModel_1.default
});
exports.CartDetail.belongsTo(cart_model_1.Cart, {
    foreignKey: "cartId",
    as: "cart"
});
exports.CartDetail.belongsTo(koiFish_model_1.KoiFish, {
    foreignKey: "koiFishId",
    as: "koiFish"
});
