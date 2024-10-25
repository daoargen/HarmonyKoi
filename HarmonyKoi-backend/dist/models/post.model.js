"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const sequelize_1 = require("sequelize");
const SQLModel_1 = __importDefault(require("../constants/SQLModel"));
const UUIDModel_1 = __importDefault(require("../constants/UUIDModel"));
const database_1 = __importDefault(require("../databases/database"));
const user_model_1 = require("./user.model");
const tableName = "Post";
exports.Post = database_1.default.define(tableName, {
    ...UUIDModel_1.default,
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    dateRemain: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    visible: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    ...SQLModel_1.default
});
exports.Post.belongsTo(user_model_1.User, {
    foreignKey: "userId",
    as: "user"
});
