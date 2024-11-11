import { SuccessResponse } from './response.type'

export interface News {
  id: string
  tittle: string
  imageUrl: string
  content: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}
export type NewsResponse = SuccessResponse<News[]>

export interface NewsListResponse {
  timestamp: string
  statusCode: number
  message: string
  data: {
    formatNews: News[]
  }
  pagination: {
    pageSize: number
    totalItem: number
    currentPage: number
    maxPageSize: number
    totalPage: number
  }
}
