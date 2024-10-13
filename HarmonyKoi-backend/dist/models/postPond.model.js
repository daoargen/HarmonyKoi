"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostPond = void 0;
const sequelize_1 = require("sequelize");
const SQLModel_1 = __importDefault(require("../constants/SQLModel"));
const UUIDModel_1 = __importDefault(require("../constants/UUIDModel"));
const database_1 = __importDefault(require("../databases/database"));
const pond_model_1 = require("./pond.model");
const post_model_1 = require("./post.model");
const tableName = "PostPond";
exports.PostPond = database_1.default.define(tableName, {
    ...UUIDModel_1.default,
    postId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    pondId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    ...SQLModel_1.default
});
exports.PostPond.belongsTo(post_model_1.Post, {
    foreignKey: "postId",
    as: "post"
});
exports.PostPond.belongsTo(pond_model_1.Pond, {
    foreignKey: "pondId",
    as: "pond"
});
