import { DataTypes, Model } from "sequelize"

import SQLModel from "~/constants/SQLModel"
import UUIDModel from "~/constants/UUIDModel"
import sequelize from "~/databases/database"

const tableName = "PatternType"

export const PatternType = sequelize.define<PatternTypeInstance>(tableName, {
  ...UUIDModel,
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

export interface PatternTypeAttributes {
  id?: string
  name: string
  description: string | null
  imageUrl: string | null
  isDeleted?: boolean
}

// Define PatternTypeInstance interface
export interface PatternTypeInstance extends Model<PatternTypeAttributes>, PatternTypeAttributes {}
