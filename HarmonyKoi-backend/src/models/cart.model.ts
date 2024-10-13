import { DataTypes, Model } from "sequelize"

import SQLModel from "~/constants/SQLModel"
import UUIDModel from "~/constants/UUIDModel"
import sequelize from "~/databases/database"

import { User } from "./user.model"

const tableName = "Cart"

export const Cart = sequelize.define<CartInstance>(tableName, {
  ...UUIDModel,
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  ...SQLModel
})

Cart.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
})

export interface CartAttributes {
  id?: string
  userId: string
  totalAmount: number
  isDeleted?: boolean
}

// Define CartInstance interface
export interface CartInstance extends Model<CartAttributes>, CartAttributes {}
