import { DataTypes, Model } from "sequelize"

import SQLModel from "~/constants/SQLModel"
import UUIDModel from "~/constants/UUIDModel"
import sequelize from "~/databases/database"

import { KoiFish } from "./koiFish.model"
import { Post } from "./post.model"

const tableName = "PostKoiFish"

export const PostKoiFish = sequelize.define<PostKoiFishInstance>(tableName, {
  ...UUIDModel,
  postId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  koiFishId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  ...SQLModel
})

PostKoiFish.belongsTo(Post, {
  foreignKey: "postId",
  as: "post"
})

PostKoiFish.belongsTo(KoiFish, {
  foreignKey: "koiFishId",
  as: "koiFish"
})

export interface PostKoiFishAttributes {
  id?: string
  postId: string
  koiFishId: string
  isDeleted?: boolean
}

// Define PostKoiFishInstance interface
export interface PostKoiFishInstance extends Model<PostKoiFishAttributes>, PostKoiFishAttributes {}
