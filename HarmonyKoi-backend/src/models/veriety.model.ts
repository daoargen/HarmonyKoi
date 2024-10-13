import { DataTypes, Model } from "sequelize"

import SQLModel from "~/constants/SQLModel"
import UUIDModel from "~/constants/UUIDModel"
import sequelize from "~/databases/database"

const tableName = "Veriety"

export const Veriety = sequelize.define<VerietyInstance>(tableName, {
  ...UUIDModel,
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ...SQLModel
})

export interface VerietyAttributes {
  id?: string
  name: string
  description: string | null
  isDeleted?: boolean
}

// Define VerietyInstance interface
export interface VerietyInstance extends Model<VerietyAttributes>, VerietyAttributes {}
