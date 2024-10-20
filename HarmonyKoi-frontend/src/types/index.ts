// import { Post } from './index'
// types/index.ts
import { SuccessResponse } from './response.type'
import { User } from './user.type'

// Ví dụ khai báo kiểu dữ liệu cho một bài viết (Post)
export interface Post {
  id: string
  userId: string
  title: string
  content: string
  dateRemain: number
  status: string
  visible: boolean
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
  user: {
    username: string
  } | null
}

export interface News {
  id: string
  tittle: string
  content: string
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}

// Interface cho credentials login
export interface LoginCredentials {
  username: string
  password: string
  // ... các trường dữ liệu khác cho login
}

export type PostResponse = SuccessResponse<Post[]>

export type NewsResponse = SuccessResponse<News[]>

export interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  // ... thêm các functions khác (nếu cần)
}
