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
  imageUrl: string | null
}

export interface UpdateElement {
  name?: string
  imageUrl: string | null
}

// Koi Fish
export interface CreateKoiFish {
  verietyId: string
  name: string
  description: string | null
  imageUrl: string | null
  baseColor: string
  symbolism: string | null
  price: number
  elementIds: string[]
}

export interface UpdateKoiFish {
  verietyId?: string
  name?: string
  description?: string | null
  imageUrl?: string | null
  baseColor?: string
  symbolism?: string | null
  price?: number
  elementIds: string[]
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
  tittle: string
  content: string
  imageUrl: string
}

export interface UpdateNew {
  tittle?: string
  content?: string
  imageUrl: string
}

// Order
export interface CreateOrder {
  koiFishId: string | null
  packageId: string | null
  type: "PACKAGE" | "KOIFISH"
}

export interface UpdateOrder {
  status?: "PENDING" | "PROCESSING" | "SHIPPED" | "CANCELLED" | "COMPLETED"
}

export interface CreateOrderDetail {
  orderId: string
  koiFishId: string | null
  packageId: string | null
  type: "PACKAGE" | "KOIFISH"
  unitPrice: number
  totalPrice: number
}

export interface UpdateOrderDetail {
  orderId?: string
  koiFishId?: string | null
  packageId?: string | null
  type?: "PACKAGE" | "KOIFISH"
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
  amount: number
}

export interface UpdatePayment {
  payStatus?: "PENDING" | "COMPLETED" | "CANCEL"
}

// Pond
export interface CreatePond {
  name: string
  description: string | null
  imageUrl: string | null
  elementIds: string[]
}

export interface UpdatePond {
  name?: string
  description?: string | null
  imageUrl?: string | null
  elementIds: string[]
}

export interface CreatePondElement {
  pondId: string
  elementId: string
}

export interface UpdatePondElement {
  pondId?: string
  elementId?: string
}

// Post
export interface CreatePost {
  title: string
  content: string
  imageUrl: string
  rejectReason?: string
}

export interface UpdatePost {
  title?: string
  content?: string
  imageUrl?: string
  rejectReason?: string
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

// Veriety
export interface CreateVeriety {
  name: string
  description: string | null
}

export interface UpdateVeriety {
  name?: string
  description?: string | null
}

export interface handleSepayWebhook {
  content: string // Nội dung chuyển khoản
  transferAmount: number // Số tiền giao dịch
}
