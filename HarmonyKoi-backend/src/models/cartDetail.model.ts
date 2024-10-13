import { DataTypes, Model } from "sequelize"

import SQLModel from "~/constants/SQLModel"
import UUIDModel from "~/constants/UUIDModel"
import sequelize from "~/databases/database"

import { Cart } from "./cart.model"
import { KoiFish } from "./koiFish.model"

const tableName = "CartDetail"

export const CartDetail = sequelize.define<CartDetailInstance>(tableName, {
  ...UUIDModel,
  cartId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  koiFishId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  unitPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  ...SQLModel
})

CartDetail.belongsTo(Cart, {
  foreignKey: "cartId",
  as: "cart"
})

CartDetail.belongsTo(KoiFish, {
  foreignKey: "koiFishId",
  as: "koiFish"
})

export interface CartDetailAttributes {
  id?: string
  cartId: string
  koiFishId: string
  unitPrice: number
  totalPrice: number
  isDeleted?: boolean
}

// Define CartDetailInstance interface
export interface CartDetailInstance extends Model<CartDetailAttributes>, CartDetailAttributes {}
