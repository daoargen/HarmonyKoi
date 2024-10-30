import { Request } from "express"
import { Op } from "sequelize"

import responseStatus from "~/constants/responseStatus"
import { CreatePost, UpdatePost } from "~/constants/type"
import { Post } from "~/models/post.model"
import { User } from "~/models/user.model"
import { formatModelDate } from "~/utils/formatTimeModel.util"
import { getUserFromToken } from "~/utils/getUserFromToken.util"

import orderService from "./order.service"

async function getVisiblePosts(req: Request) {
  try {
    // Xử lý tham số query và gán giá trị mặc định nếu không có
    const pageIndex = parseInt(req.query.page_index as string) || 1
    const pageSize = parseInt(req.query.page_size as string) || 10
    const keyword = req.query.keyword as string
    const status = req.query.status as string

    const whereCondition: any = {
      isDeleted: false,
      visible: true
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

async function getMemberPosts(token: string, req: Request) {
  try {
    // Xử lý tham số query và gán giá trị mặc định nếu không có
    const pageIndex = parseInt(req.query.page_index as string) || 1
    const pageSize = parseInt(req.query.page_size as string) || 10
    const keyword = req.query.keyword as string
    const status = req.query.status as string

    const user = await getUserFromToken(token)

    const whereCondition: any = {
      isDeleted: false,
      userId: user.id
    }

    if (keyword) {
      whereCondition[Op.or] = [
        { title: { [Op.like]: `%${keyword}%` } },
        { content: { [Op.like]: `%${keyword}%` } } // Search by user's username
      ]
    }

    if (status) {
      whereCondition.status = status
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

async function getPendingPosts(req: Request) {
  try {
    // Xử lý tham số query và gán giá trị mặc định nếu không có
    const pageIndex = parseInt(req.query.page_index as string) || 1
    const pageSize = parseInt(req.query.page_size as string) || 10
    const keyword = req.query.keyword as string
    const status = req.query.status as string

    const whereCondition: any = {
      isDeleted: false,
      status: "PENDING"
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
      imageUrl: newPost.imageUrl,
      dateRemain: 100,
      status: "PENDING",
      visible: false
    })
    return post
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function editPost(id: string, token: string, updatedPost: UpdatePost) {
  try {
    const post = await Post.findOne({
      where: { id, isDeleted: false }
    })

    if (!post) {
      throw responseStatus.responseNotFound404("Post not found")
    }

    const user = await getUserFromToken(token)
    const userPackage = await orderService.getCurrentPackage(token)

    // Kiểm tra giới hạn bài đăng
    if (updatedPost.visible === true) {
      if (!userPackage) {
        throw responseStatus.responeCustom(402, "Bạn cần mua gói để thực hiện hành động này.")
      } else {
        const posts = await Post.findAll({
          where: { userId: user.id, visible: true, isDeleted: false }
        })

        if (post.status !== "APPROVED") {
          throw responseStatus.responeCustom(402, "Bài viết chưa được duyệt bởi admin")
        }

        if (posts.length >= userPackage.amountPost) {
          throw responseStatus.responeCustom(402, "Bạn đã đạt giới hạn bài đăng cho gói hiện tại.")
        }
      }
    }

    post.title = updatedPost.title || post.title
    post.content = updatedPost.content || post.content
    post.imageUrl = updatedPost.imageUrl || post.imageUrl
    if (updatedPost.title || updatedPost.content) {
      post.status = "PENDING"
    } else if (updatedPost.status) {
      post.status = updatedPost.status
    }
    post.visible = updatedPost.visible ?? post.visible

    await post.save()
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
  getMemberPosts,
  getPendingPosts,
  getPostById,
  createPost,
  editPost,
  deletePost
}
