export type Account = {
  id: string
  email: string
  username: string
  role: Role
}

export type JWTResponse = {
  accessToken: string
  refreshToken: string
  expiresAt: Date
  account: Account
}

export enum Role {
  MEMBER,
  ADMIN
}

export type Pagination = {
  pageSize: number
  totalItem: number
  currentPage: number
  maxPageSize: number
  totalPage: number
}

// User
export interface CreateUser {
  email: string
  username: string
  password: string
  gender: "MALE" | "FEMALE" | "OTHER"
  dob: Date
  role?: Role
}

export interface UpdateUserDetail {
  phone?: string
  firstName?: string
  lastName?: string
  dob?: Date
  gender?: "MALE" | "FEMALE" | "OTHER"
  avatarUrl?: string
}

export interface UpdateUserAvatar {
  userId: string
  avatarUrl: string
}

export interface FormattedModel {
  [key: string]: any
  createdAt?: string
  updatedAt?: string
}
