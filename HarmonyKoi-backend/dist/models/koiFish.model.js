"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KoiFish = void 0;
const sequelize_1 = require("sequelize");
const SQLModel_1 = __importDefault(require("../constants/SQLModel"));
const UUIDModel_1 = __importDefault(require("../constants/UUIDModel"));
const database_1 = __importDefault(require("../databases/database"));
const element_model_1 = require("./element.model");
const patternType_model_1 = require("./patternType.model");
const reticulation_model_1 = require("./reticulation.model");
const veriety_model_1 = require("./veriety.model");
const tableName = "KoiFish";
exports.KoiFish = database_1.default.define(tableName, {
    ...UUIDModel_1.default,
    verietyId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
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
    baseColor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    patternTypeId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    reticulationId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    metallic: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    symbolism: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ...SQLModel_1.default
});
exports.KoiFish.belongsTo(veriety_model_1.Veriety, {
    foreignKey: "verietyId",
    as: "veriety"
});
exports.KoiFish.belongsTo(element_model_1.Element, {
    foreignKey: "elementId",
    as: "element"
});
exports.KoiFish.belongsTo(patternType_model_1.PatternType, {
    foreignKey: "patternTypeId",
    as: "patternType"
});
exports.KoiFish.belongsTo(reticulation_model_1.Reticulation, {
    foreignKey: "reticulationId",
    as: "reticulation"
});
