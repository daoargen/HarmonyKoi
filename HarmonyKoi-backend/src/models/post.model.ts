import { DataTypes, Model } from "sequelize"

import SQLModel from "~/constants/SQLModel"
import UUIDModel from "~/constants/UUIDModel"
import sequelize from "~/databases/database"

import { User } from "./user.model"

const tableName = "Post"

export const Post = sequelize.define<PostInstance>(tableName, {
  ...UUIDModel,
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateRemain: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  visible: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  ...SQLModel
})

Post.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
})

export interface PostAttributes {
  id?: string
  userId: string
  title: string
  content: string
  dateRemain: number
  status: string
  visible: boolean
  isDeleted?: boolean
}

// Define PostInstance interface
export interface PostInstance extends Model<PostAttributes>, PostAttributes {}
