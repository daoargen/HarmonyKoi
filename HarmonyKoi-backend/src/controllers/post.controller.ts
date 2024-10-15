import { Request, Response } from "express"

import responseStatus from "~/constants/responseStatus"
import postService from "~/services/post.service"

async function getPosts(req: Request, res: Response) {
  try {
    const { posts, pagination } = await postService.getAllPosts(req)
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
    const newPost = req.body
    const post = await postService.createPost(newPost)
    return res.json(responseStatus.responseData200("Create post successfully!", post))
  } catch (error) {
    return res.json(error)
  }
}

async function editPost(req: Request, res: Response) {
  try {
    const id = req.params.id
    const updatedPost = req.body
    await postService.editPost(id, updatedPost)
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
  getPost,
  createPost,
  editPost,
  deletePost
}