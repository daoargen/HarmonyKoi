import { DataTypes, Model } from "sequelize"

import SQLModel from "~/constants/SQLModel"
import UUIDModel from "~/constants/UUIDModel"
import sequelize from "~/databases/database"

import { Element } from "./element.model"

const tableName = "Pond"

export const Pond = sequelize.define<PondInstance>(tableName, {
  ...UUIDModel,
  elementId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ...SQLModel
})

Pond.belongsTo(Element, {
  foreignKey: "elementId",
  as: "element"
})

export interface PondAttributes {
  id?: string
  elementId: string
  name: string
  description: string | null
  imageUrl: string | null
  isDeleted?: boolean
}

// Define PondInstance interface
export interface PondInstance extends Model<PondAttributes>, PondAttributes {}
