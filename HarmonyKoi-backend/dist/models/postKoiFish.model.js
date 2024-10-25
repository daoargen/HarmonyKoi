"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostKoiFish = void 0;
const sequelize_1 = require("sequelize");
const SQLModel_1 = __importDefault(require("../constants/SQLModel"));
const UUIDModel_1 = __importDefault(require("../constants/UUIDModel"));
const database_1 = __importDefault(require("../databases/database"));
const koiFish_model_1 = require("./koiFish.model");
const post_model_1 = require("./post.model");
const tableName = "PostKoiFish";
exports.PostKoiFish = database_1.default.define(tableName, {
    ...UUIDModel_1.default,
    postId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    koiFishId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    ...SQLModel_1.default
});
exports.PostKoiFish.belongsTo(post_model_1.Post, {
    foreignKey: "postId",
    as: "post"
});
exports.PostKoiFish.belongsTo(koiFish_model_1.KoiFish, {
    foreignKey: "koiFishId",
    as: "koiFish"
});
