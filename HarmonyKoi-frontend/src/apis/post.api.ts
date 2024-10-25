import { Post, PostResponse } from '../types'
import http from '../utils/http'

export const getPost = async () => await http.get<PostResponse>('/posts')

export const getPostById = async (id: string) => await http.get<Post>(`/posts/${id}`)

export const deletePostById = async (id: string) => await http.delete<Post>(`/posts/${id}`)
