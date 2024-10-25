import { Request, Response } from "express"

import responseStatus from "~/constants/responseStatus"
import postCommentService from "~/services/postComment.service"

async function getPostComments(req: Request, res: Response) {
  try {
    const { postComments, pagination } = await postCommentService.getAllPostComments(req)
    return res.json(responseStatus.responseData200("Get post comments list successfully!", postComments, pagination))
  } catch (error) {
    return res.json(error)
  }
}

async function getPostComment(req: Request, res: Response) {
  try {
    const id = req.params.id
    const postComment = await postCommentService.getPostCommentById(id)
    return res.json(responseStatus.responseData200("Get post comment successfully!", postComment))
  } catch (error) {
    return res.json(error)
  }
}

async function createPostComment(req: Request, res: Response) {
  try {
    const newPostComment = req.body
    const postComment = await postCommentService.createPostComment(newPostComment)
    return res.json(responseStatus.responseData200("Create post comment successfully!", postComment))
  } catch (error) {
    return res.json(error)
  }
}

async function editPostComment(req: Request, res: Response) {
  try {
    const id = req.params.id
    const updatedPostComment = req.body
    await postCommentService.editPostComment(id, updatedPostComment)
    return res.json(responseStatus.responseMessage200("Edit post comment successfully!"))
  } catch (error) {
    return res.json(error)
  }
}

async function deletePostComment(req: Request, res: Response) {
  try {
    const id = req.params.id
    await postCommentService.deletePostComment(id)
    return res.json(responseStatus.responseMessage200("Delete post comment successfully!"))
  } catch (error) {
    return res.json(error)
  }
}

export default {
  getPostComments,
  getPostComment,
  createPostComment,
  editPostComment,
  deletePostComment
}
