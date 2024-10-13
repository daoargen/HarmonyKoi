import { DataTypes, Model } from "sequelize"

import SQLModel from "~/constants/SQLModel"
import UUIDModel from "~/constants/UUIDModel"
import sequelize from "~/databases/database"

const tableName = "Reticulation"

export const Reticulation = sequelize.define<ReticulationInstance>(tableName, {
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

export interface ReticulationAttributes {
  id?: string
  name: string
  description: string | null
  isDeleted?: boolean
}

// Define ReticulationInstance interface
export interface ReticulationInstance extends Model<ReticulationAttributes>, ReticulationAttributes {}
