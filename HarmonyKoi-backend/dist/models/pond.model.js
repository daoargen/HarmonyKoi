"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pond = void 0;
const sequelize_1 = require("sequelize");
const SQLModel_1 = __importDefault(require("../constants/SQLModel"));
const UUIDModel_1 = __importDefault(require("../constants/UUIDModel"));
const database_1 = __importDefault(require("../databases/database"));
const element_model_1 = require("./element.model");
const tableName = "Pond";
exports.Pond = database_1.default.define(tableName, {
    ...UUIDModel_1.default,
    elementId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    ...SQLModel_1.default
});
exports.Pond.belongsTo(element_model_1.Element, {
    foreignKey: "elementId",
    as: "element"
});
