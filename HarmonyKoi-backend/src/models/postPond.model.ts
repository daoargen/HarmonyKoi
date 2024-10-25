import { DataTypes, Model } from "sequelize"

import SQLModel from "~/constants/SQLModel"
import UUIDModel from "~/constants/UUIDModel"
import sequelize from "~/databases/database"

import { Pond } from "./pond.model"
import { Post } from "./post.model"

const tableName = "PostPond"

export const PostPond = sequelize.define<PostPondInstance>(tableName, {
  ...UUIDModel,
  postId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  pondId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  ...SQLModel
})

PostPond.belongsTo(Post, {
  foreignKey: "postId",
  as: "post"
})

PostPond.belongsTo(Pond, {
  foreignKey: "pondId",
  as: "pond"
})

export interface PostPondAttributes {
  id?: string
  postId: string
  pondId: string
  isDeleted?: boolean
}

// Define PostPondInstance interface
export interface PostPondInstance extends Model<PostPondAttributes>, PostPondAttributes {}
