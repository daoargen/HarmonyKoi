import { DataTypes, Model } from "sequelize"

import SQLModel from "~/constants/SQLModel"
import UUIDModel from "~/constants/UUIDModel"
import sequelize from "~/databases/database"

import { Post } from "./post.model"
import { User } from "./user.model"

const tableName = "PostComment"

export const PostComment = sequelize.define<PostCommentInstance>(tableName, {
  ...UUIDModel,
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ...SQLModel
})

PostComment.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
})

PostComment.belongsTo(Post, {
  foreignKey: "postId",
  as: "post"
})

export interface PostCommentAttributes {
  id?: string
  userId: string
  postId: string
  content: string
  isDeleted?: boolean
}

// Define PostCommentInstance interface
export interface PostCommentInstance extends Model<PostCommentAttributes>, PostCommentAttributes {}
