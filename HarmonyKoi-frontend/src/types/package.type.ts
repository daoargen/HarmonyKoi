import { SuccessResponse } from './response.type'

export interface Package {
  id: string
  name: string
  description: string
  duration: number
  amountPost: number
  price: number
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}
export type PackageResponse = SuccessResponse<Package[]>
