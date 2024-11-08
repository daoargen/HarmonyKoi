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
