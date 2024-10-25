import { Payment } from './payment.type'

export interface User {
  username: string
}

export interface Order {
  id: string
  userId: string
  status: 'PENDING' | 'COMPLETED'
  totalAmount: number
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  user: User
  payment: Payment
}

export interface OrderListResponse {
  timestamp: string
  statusCode: number
  message: string
  data: {
    totalOrders: number
    totalSpent: number
    formatOrders: Order[]
  }
  pagination: {
    pageSize: number
    totalItem: number
    currentPage: number
    maxPageSize: number
    totalPage: number
  }
}
