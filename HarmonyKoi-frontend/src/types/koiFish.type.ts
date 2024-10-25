import { SuccessResponse } from './response.type'
// types/koiFish.type.ts
export interface KoiFishAttributes {
  id?: string
  verietyId: {
    name: string
    description: string
  }
  name: string
  description: string | null
  imageUrl: string | null
  baseColor: string // Có thể dùng enum nếu có các màu cụ thể
  symbolism: string | null
  price: number
  isFeatured: boolean
  totalItem?: 20
}
export type KoiFishResponse = {
  totalItem?: 20
  data: KoiFishAttributes[]
  pagination: {
    totalItem: 20
  }
}
export type Pagination = {
  totalItem: 20
}
export type koiResponse = SuccessResponse<KoiFishAttributes[]>

export interface koiFishResponse extends KoiFishAttributes {
  userName: string // Name of the user who added the fish
  isFeatured: boolean // Whether the fish is featured
  element: string[] // Elements associated with the fish (e.g., water, earth)
}
