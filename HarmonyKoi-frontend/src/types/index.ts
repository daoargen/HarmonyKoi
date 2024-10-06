// types/index.ts

// Ví dụ khai báo kiểu dữ liệu cho một bài viết (Post)
export interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: Date
}

// Ví dụ khai báo kiểu dữ liệu cho một người dùng (User)
export interface User {
  id: string
  username: string
  email: string
}

// Interface cho dữ liệu người dùng (tuỳ chỉnh theo ứng dụng)
export interface User {
  id: string
  username: string
  // ... các thuộc tính khác của User
}

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
