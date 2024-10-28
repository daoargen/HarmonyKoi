import { PostStatus } from './../types/post.type'
import { Post, PostResponse } from '../types/post.type'
import http from '../utils/http'

export const getPost = async () => await http.get<PostResponse>('/posts')

export const getPostById = async (id: string) => await http.get<Post>(`/posts/${id}`)

export const deletePostById = async (id: string) => await http.delete<Post>(`/posts/${id}`)

export const getPostByMember = async () => await http.get<PostResponse>('/posts/member')

export const getPostByAdmin = async () => await http.get<PostResponse>('/posts/admin')

export const createPost = async (post: { title: string; content: string }) => await http.post<Post>('/posts', post)

export const updatePost = async (
  id: string,
  data: { title: string; content: string; status: string; visible: boolean }
) => await http.put<Post>(`posts/${id}`, data)

export const updatePostVisible = async (id: string, visible: boolean) => await http.put(`/posts/${id}`, { visible })

export const updatePostStatus = async (id: string, status: PostStatus) => await http.put(`/posts/${id}`, { status })
