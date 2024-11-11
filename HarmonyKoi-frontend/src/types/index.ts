// import { Post } from './index'
// types/index.ts
import { User } from './user.type'

// Ví dụ khai báo kiểu dữ liệu cho một bài viết (Post)

// Interface cho credentials login
export interface LoginCredentials {
  username: string
  password: string
  // ... các trường dữ liệu khác cho login
}

export interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  // ... thêm các functions khác (nếu cần)
}
