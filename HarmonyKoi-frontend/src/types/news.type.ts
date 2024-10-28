import { SuccessResponse } from './response.type'

export interface News {
  id: string
  tittle: string
  content: string
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}
export type NewsResponse = SuccessResponse<News[]>
