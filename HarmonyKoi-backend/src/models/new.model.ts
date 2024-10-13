import { DataTypes, Model } from "sequelize"

import SQLModel from "~/constants/SQLModel"
import UUIDModel from "~/constants/UUIDModel"
import sequelize from "~/databases/database"

import { User } from "./user.model"

const tableName = "New"

export const New = sequelize.define<NewInstance>(tableName, {
  ...UUIDModel,
  userId: {
    type: DataTypes.UUID,
    allowNull: true // Assuming userId can be null for general news
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ...SQLModel
})

New.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
})

export interface NewAttributes {
  id?: string
  userId: string | null
  category: string
  content: string
  isDeleted?: boolean
}

// Define NewInstance interface
export interface NewInstance extends Model<NewAttributes>, NewAttributes {}
