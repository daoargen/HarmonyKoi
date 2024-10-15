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

// Cart
export interface CreateCart {
  userId: string
  totalAmount: number
}

export interface UpdateCart {
  userId?: string
  totalAmount?: number
}

// Cart Detail
export interface CreateCartDetail {
  cartId: string
  koiFishId: string
  unitPrice: number
  totalPrice: number
}

export interface UpdateCartDetail {
  cartId?: string
  koiFishId?: string
  unitPrice?: number
  totalPrice?: number
}

// Element
export interface CreateElement {
  name: string
}

export interface UpdateElement {
  name?: string
}

// Koi Fish
export interface CreateKoiFish {
  verietyId: string
  elementId: string
  name: string
  description: string | null
  imageUrl: string | null
  baseColor: string
  patternTypeId: string
  reticulationId: string
  metallic: boolean
  symbolism: string | null
  price: number
}

export interface UpdateKoiFish {
  verietyId?: string
  elementId?: string
  name?: string
  description?: string | null
  imageUrl?: string | null
  baseColor?: string
  patternTypeId?: string
  reticulationId?: string
  metallic?: boolean
  symbolism?: string | null
  price?: number
}

export interface CreateKoiFishElement {
  koiFishId: string
  elementId: string
}

export interface UpdateKoiFishElement {
  koiFishId?: string
  elementId?: string
}

// News
export interface CreateNew {
  userId: string | null // Make userId nullable
  category: string
  content: string
}

export interface UpdateNew {
  userId?: string | null // Make userId nullable
  category?: string
  content?: string
}

// Order
export interface CreateOrder {
  userId: string
  packageId: string | null
  postId: string | null
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "CANCELLED" | "COMPLETED"
  totalAmount: number
}

export interface UpdateOrder {
  userId?: string
  packageId?: string | null
  postId?: string | null
  status?: "PENDING" | "PROCESSING" | "SHIPPED" | "CANCELLED" | "COMPLETED"
  totalAmount?: number
}

export interface CreateOrderDetail {
  orderId: string
  koiFishId: string | null
  packageId: string | null
  type: string
  unitPrice: number
  totalPrice: number
}

export interface UpdateOrderDetail {
  orderId?: string
  koiFishId?: string | null
  packageId?: string | null
  type?: string
  unitPrice?: number
  totalPrice?: number
}

// Package
export interface CreatePackage {
  name: string
  description: string | null
  duration: number
  amountPost: number
  price: number
}

export interface UpdatePackage {
  name?: string
  description?: string | null
  duration?: number
  amountPost?: number
  price?: number
}

// Pattern Type
export interface CreatePatternType {
  name: string
  description: string | null
  imageUrl: string | null
}

export interface UpdatePatternType {
  name?: string
  description?: string | null
  imageUrl?: string | null
}

// Payment
export interface CreatePayment {
  orderId: string
  paymentCode: string
  amount: number
  payDate: Date
  payStatus: "PENDING" | "COMPLETED" | "CANCEL"
}

export interface UpdatePayment {
  orderId?: string
  paymentCode?: string
  amount?: number
  payDate?: Date
  payStatus?: "PENDING" | "COMPLETED" | "CANCEL"
}

// Pond
export interface CreatePond {
  elementId: string
  name: string
  description: string | null
  imageUrl: string | null
}

export interface UpdatePond {
  elementId?: string
  name?: string
  description?: string | null
  imageUrl?: string | null
}

// Post
export interface CreatePost {
  userId: string
  title: string
  content: string
  dateRemain: number
  status: string
  visible: boolean
}

export interface UpdatePost {
  userId?: string
  title?: string
  content?: string
  dateRemain?: number
  status?: string
  visible?: boolean
}

// Post Comment
export interface CreatePostComment {
  userId: string
  postId: string
  content: string
}

export interface UpdatePostComment {
  userId?: string
  postId?: string
  content?: string
}

// Reticulation
export interface CreateReticulation {
  name: string
  description: string | null
}

export interface UpdateReticulation {
  name?: string
  description?: string | null
}

// Veriety
export interface CreateVeriety {
  name: string
  description: string | null
}

export interface UpdateVeriety {
  name?: string
  description?: string | null
}
