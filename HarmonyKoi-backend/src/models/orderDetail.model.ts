import { DataTypes, Model } from "sequelize"

import SQLModel from "~/constants/SQLModel"
import UUIDModel from "~/constants/UUIDModel"
import sequelize from "~/databases/database"

import { KoiFish } from "./koiFish.model"
import { Order } from "./order.model"
import { Package } from "./package.model"

const tableName = "OrderDetail"

export const OrderDetail = sequelize.define<OrderDetailInstance>(tableName, {
  ...UUIDModel,
  orderId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  koiFishId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  packageId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
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

OrderDetail.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order"
})

OrderDetail.belongsTo(KoiFish, {
  foreignKey: "koiFishId",
  as: "koiFish"
})

OrderDetail.belongsTo(Package, {
  foreignKey: "packageId",
  as: "package"
})

export interface OrderDetailAttributes {
  id?: string
  orderId: string
  koiFishId: string | null
  packageId: string | null
  type: string
  unitPrice: number
  totalPrice: number
  isDeleted?: boolean
}

// Define OrderDetailInstance interface
export interface OrderDetailInstance extends Model<OrderDetailAttributes>, OrderDetailAttributes {}
