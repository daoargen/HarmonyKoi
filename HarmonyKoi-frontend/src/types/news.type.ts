import { SuccessResponse } from './response.type'

export interface News {
  id: string
  tittle: string
  content: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}
export type NewsResponse = SuccessResponse<News[]>
