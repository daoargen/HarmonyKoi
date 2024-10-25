import { Request } from "express"
import { Op } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreatePost, UpdatePost } from "~/constants/type"
import { Post } from "~/models/post.model"
import { User } from "~/models/user.model"
import { formatModelDate } from "~/utils/formatTimeModel.util"
import { getUserFromToken } from "~/utils/getUserFromToken.util"

async function getVisiblePosts(req: Request) {
  try {
    // Xử lý tham số query và gán giá trị mặc định nếu không có
    const pageIndex = parseInt(req.query.page_index as string) || 1
    const pageSize = parseInt(req.query.page_size as string) || 10
    const keyword = req.query.keyword as string
    const status = req.query.status as string
    const visible = req.query.visible as string

    const whereCondition: any = {
      isDeleted: false
    }

    if (keyword) {
      whereCondition[Op.or] = [
        { title: { [Op.like]: `%${keyword}%` } },
        { content: { [Op.like]: `%${keyword}%` } },
        { "$user.username$": { [Op.like]: `%${keyword}%` } } // Search by user's username
      ]
    }

    if (status) {
      whereCondition.status = status
    }

    if (visible) {
      whereCondition.visible = visible === "true" // Convert string to boolean
    }

    const { count, rows: posts } = await Post.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"]
        }
      ]
    })

    const formattedPosts = posts.map((post) => formatModelDate(post.dataValues))

    const totalPage = Math.ceil(count / pageSize)
    const pagination = {
      pageSize,
      totalItem: count,
      currentPage: pageIndex,
      maxPageSize: 100,
      totalPage
    }

    return { posts: formattedPosts, pagination }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getPostById(postId: string) {
  try {
    const post = await Post.findOne({
      where: { id: postId, isDeleted: false },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"]
        }
      ]
    })
    if (!post) throw responseStatus.responseNotFound404("Post not found")
    return post
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function createPost(token: string, newPost: CreatePost) {
  try {
    const user = await getUserFromToken(token)
    if (!user.id) {
      throw new Error("User ID not found in token.")
    }
    const post = await Post.create({
      userId: user.id,
      title: newPost.title,
      content: newPost.content,
      dateRemain: 100,
      status: newPost.status ?? "PENDING",
      visible: false
    })
    return post
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function editPost(id: string, updatedPost: UpdatePost) {
  try {
    const post = await Post.findOne({
      where: { id, isDeleted: false }
    })

    if (!post) {
      throw responseStatus.responseNotFound404("Post not found")
    }

    await post.update({
      userId: updatedPost.userId || post.userId,
      title: updatedPost.title || post.title,
      content: updatedPost.content || post.content,
      dateRemain: updatedPost.dateRemain || post.dateRemain,
      status: updatedPost.status || post.status,
      visible: updatedPost.visible !== undefined ? updatedPost.visible : post.visible
    })

    return post
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function deletePost(id: string) {
  try {
    const post = await Post.findOne({ where: { id, isDeleted: false } })
    if (!post) {
      throw responseStatus.responseNotFound404("Post not found or already deleted")
    }

    const postResult = await Post.update({ isDeleted: true }, { where: { id } })

    if (postResult[0] === 0) {
      throw responseStatus.responeCustom(400, "Delete post failed")
    }

    return
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default {
  getVisiblePosts,
  getPostById,
  createPost,
  editPost,
  deletePost
}
