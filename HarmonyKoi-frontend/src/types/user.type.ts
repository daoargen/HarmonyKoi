import { SuccessResponse } from './response.type'

// Ví dụ khai báo kiểu dữ liệu cho một người dùng (User)
export interface UserAccount {
  email: string
  username: string
  role: 'MEMBER' | 'ADMIN' // Nếu có nhiều loại role, thêm vào đây
}

export interface User {
  id: string
  userId: string
  phone: string | null
  firstName: string
  lastName: string
  dob: string // Ngày sinh (Date of Birth) có thể để kiểu `string` dạng "YYYY-MM-DD"
  gender: 'MALE' | 'FEMALE' | 'OTHER' // Nếu có thêm giới tính khác
  avatarUrl: string
  user: UserAccount // Thông tin tài khoản bên trong đối tượng user
}

export enum Role {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER'
}

export type UserResponse = SuccessResponse<{
  user: User
}>

export type GoogleUrlResponse = SuccessResponse<{
  url: string
}>

export type VerifyTokenForgotPasswordResponse = SuccessResponse<{
  success: boolean
}>
