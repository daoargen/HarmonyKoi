import { Request } from "express"
import { Op } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreatePostComment, UpdatePostComment } from "~/constants/type"
import { Post } from "~/models/post.model"
import { PostComment } from "~/models/postComment.model"
import { User } from "~/models/user.model"
import { formatModelDate } from "~/utils/formatTimeModel.util"

async function getAllPostComments(req: Request) {
  try {
    // Xử lý tham số query và gán giá trị mặc định nếu không có
    const pageIndex = parseInt(req.query.page_index as string) || 1
    const pageSize = parseInt(req.query.page_size as string) || 10
    const keyword = req.query.keyword as string

    const whereCondition: any = {
      isDeleted: false
    }

    if (keyword) {
      whereCondition[Op.or] = [
        { content: { [Op.like]: `%${keyword}%` } },
        { "$user.username$": { [Op.like]: `%${keyword}%` } }, // Search by user's username
        { "$post.title$": { [Op.like]: `%${keyword}%` } } // Search by post title
      ]
    }

    const { count, rows: postComments } = await PostComment.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"]
        },
        {
          model: Post,
          as: "post",
          attributes: ["title"]
        }
      ]
    })

    const formattedPostComments = postComments.map((comment) => formatModelDate(comment.dataValues))

    const totalPage = Math.ceil(count / pageSize)
    const pagination = {
      pageSize,
      totalItem: count,
      currentPage: pageIndex,
      maxPageSize: 100,
      totalPage
    }

    return { postComments: formattedPostComments, pagination }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getPostCommentById(postCommentId: string) {
  try {
    const postComment = await PostComment.findOne({
      where: { id: postCommentId, isDeleted: false },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"]
        },
        {
          model: Post,
          as: "post",
          attributes: ["title"]
        }
      ]
    })
    if (!postComment) throw responseStatus.responseNotFound404("Post comment not found")
    return postComment
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function createPostComment(newPostComment: CreatePostComment) {
  try {
    const postComment = await PostComment.create(newPostComment)
    return postComment
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function editPostComment(id: string, updatedPostComment: UpdatePostComment) {
  try {
    const postComment = await PostComment.findOne({
      where: { id, isDeleted: false }
    })

    if (!postComment) {
      throw responseStatus.responseNotFound404("Post comment not found")
    }

    await postComment.update({
      userId: updatedPostComment.userId || postComment.userId,
      postId: updatedPostComment.postId || postComment.postId,
      content: updatedPostComment.content || postComment.content
    })

    return postComment
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function deletePostComment(id: string) {
  try {
    const postComment = await PostComment.findOne({ where: { id, isDeleted: false } })
    if (!postComment) {
      throw responseStatus.responseNotFound404("Post comment not found or already deleted")
    }

    const postCommentResult = await PostComment.update({ isDeleted: true }, { where: { id } })

    if (postCommentResult[0] === 0) {
      throw responseStatus.responeCustom(400, "Delete post comment failed")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default {
  getAllPostComments,
  getPostCommentById,
  createPostComment,
  editPostComment,
  deletePostComment
}
