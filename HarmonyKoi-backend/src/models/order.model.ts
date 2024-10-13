import { DataTypes, Model } from "sequelize"

import SQLModel from "~/constants/SQLModel"
import UUIDModel from "~/constants/UUIDModel"
import sequelize from "~/databases/database"

import { Package } from "./package.model"
import { Post } from "./post.model"
import { User } from "./user.model"

const tableName = "Order"

export const Order = sequelize.define<OrderInstance>(tableName, {
  ...UUIDModel,
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  packageId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM("PENDING", "PROCESSING", "SHIPPED", "CANCELLED", "COMPLETED"),
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  ...SQLModel
})

Order.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
})

Order.belongsTo(Package, {
  foreignKey: "packageId",
  as: "package"
})

Order.belongsTo(Post, {
  foreignKey: "postId",
  as: "post"
})

export interface OrderAttributes {
  id?: string
  userId: string
  packageId: string | null
  postId: string | null
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "CANCELLED" | "COMPLETED"
  totalAmount: number
  isDeleted?: boolean
}

// Define OrderInstance interface
export interface OrderInstance extends Model<OrderAttributes>, OrderAttributes {}
