import { SuccessResponse } from './response.type'

export type PostStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface Post {
  id: string
  userId: string
  title: string
  content: string
  imageUrl: string
  rejectReason: string | null
  dateRemain: number
  status: PostStatus
  visible: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  user: {
    username: string
  } | null
}

export type PostResponse = SuccessResponse<Post[]>

export interface PostListResponse {
  timestamp: string
  statusCode: number
  message: string
  data: {
    formatPost: Post[]
  }
  pagination: {
    pageSize: number
    totalItem: number
    currentPage: number
    maxPageSize: number
    totalPage: number
  }
}
