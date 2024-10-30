import { Request, Response } from "express"

import responseStatus from "~/constants/responseStatus"
import { CreatePost, UpdatePost } from "~/constants/type"
import postService from "~/services/post.service"

async function getPosts(req: Request, res: Response) {
  try {
    const { posts, pagination } = await postService.getVisiblePosts(req)
    return res.json(responseStatus.responseData200("Get posts list successfully!", posts, pagination))
  } catch (error) {
    return res.json(error)
  }
}

async function getMemberPosts(req: Request, res: Response) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
      return res.json(responseStatus.responseUnauthorized401())
    }
    const { posts, pagination } = await postService.getMemberPosts(token, req)
    return res.json(responseStatus.responseData200("Get posts list successfully!", posts, pagination))
  } catch (error) {
    return res.json(error)
  }
}

async function getPendingPosts(req: Request, res: Response) {
  try {
    console.log("pen")
    const { posts, pagination } = await postService.getPendingPosts(req)
    return res.json(responseStatus.responseData200("Get posts list successfully!", posts, pagination))
  } catch (error) {
    return res.json(error)
  }
}

async function getPost(req: Request, res: Response) {
  try {
    const id = req.params.id
    const post = await postService.getPostById(id)
    return res.json(responseStatus.responseData200("Get post successfully!", post))
  } catch (error) {
    return res.json(error)
  }
}

async function createPost(req: Request, res: Response) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
      return res.json(responseStatus.responseUnauthorized401())
    }
    const { title, content, imageUrl } = req.body
    const dataRequest: CreatePost = {
      title: title,
      content,
      imageUrl
    }
    const post = await postService.createPost(token, dataRequest)
    return res.json(responseStatus.responseData200("Create post successfully!", post))
  } catch (error) {
    return res.json(error)
  }
}

async function editPost(req: Request, res: Response) {
  try {
    const id = req.params.id
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
      return res.json(responseStatus.responseUnauthorized401())
    }
    const { title, content, imageUrl, status, visible } = req.body
    const dataRequest: UpdatePost = {
      title: title,
      content,
      imageUrl,
      status,
      visible
    }
    await postService.editPost(id, token, dataRequest)
    return res.json(responseStatus.responseMessage200("Edit post successfully!"))
  } catch (error) {
    return res.json(error)
  }
}

async function deletePost(req: Request, res: Response) {
  try {
    const id = req.params.id
    await postService.deletePost(id)
    return res.json(responseStatus.responseMessage200("Delete post successfully!"))
  } catch (error) {
    return res.json(error)
  }
}

export default {
  getPosts,
  getMemberPosts,
  getPendingPosts,
  getPost,
  createPost,
  editPost,
  deletePost
}
