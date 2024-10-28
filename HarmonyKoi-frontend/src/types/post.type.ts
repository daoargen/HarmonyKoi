import { SuccessResponse } from './response.type'

export type PostStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface Post {
  id: string
  userId: string
  title: string
  content: string
  dateRemain: number
  status: PostStatus
  visible: boolean
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
  user: {
    username: string
  } | null
}

export type PostResponse = SuccessResponse<Post[]>
