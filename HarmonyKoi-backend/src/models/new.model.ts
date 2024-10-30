import { DataTypes, Model } from "sequelize"

import SQLModel from "~/constants/SQLModel"
import UUIDModel from "~/constants/UUIDModel"
import sequelize from "~/databases/database"

import { User } from "./user.model"

const tableName = "New"

export const New = sequelize.define<NewInstance>(tableName, {
  ...UUIDModel,
  tittle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ...SQLModel
})

export interface NewAttributes {
  id?: string
  tittle: string
  content: string
  imageUrl: string
  isDeleted?: boolean
}

// Define NewInstance interface
export interface NewInstance extends Model<NewAttributes>, NewAttributes {}
