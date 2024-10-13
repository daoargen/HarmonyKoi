import { DataTypes, Model } from "sequelize"

import SQLModel from "~/constants/SQLModel"
import UUIDModel from "~/constants/UUIDModel"
import sequelize from "~/databases/database"

const tableName = "Package"

export const Package = sequelize.define<PackageInstance>(tableName, {
  ...UUIDModel,
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amountPost: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ...SQLModel
})

export interface PackageAttributes {
  id?: string
  name: string
  description: string | null
  duration: number
  amountPost: number
  price: number
  isDeleted?: boolean
}

// Define PackageInstance interface
export interface PackageInstance extends Model<PackageAttributes>, PackageAttributes {}
