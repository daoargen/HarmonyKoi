import { DataTypes, Model } from "sequelize"

import SQLModel from "~/constants/SQLModel"
import UUIDModel from "~/constants/UUIDModel"
import sequelize from "~/databases/database"

import { Element } from "./element.model"
import { Pond } from "./pond.model"

const tableName = "PondElement"

export const PondElement = sequelize.define<PondElementInstance>(tableName, {
  ...UUIDModel,
  pondId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  elementId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  ...SQLModel
})

PondElement.belongsTo(Pond, {
  foreignKey: "pondId",
  as: "pond"
})

PondElement.belongsTo(Element, {
  foreignKey: "elementId",
  as: "element"
})

export interface PondElementAttributes {
  id?: string
  pondId: string
  elementId: string
  isDeleted?: boolean
}

// Define PondElementInstance interface
export interface PondElementInstance extends Model<PondElementAttributes>, PondElementAttributes {}
