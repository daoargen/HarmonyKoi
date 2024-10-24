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
  baseColor: string
  symbolism: string | null
  price: number
  isFeatured: boolean
  element: 
  isDeleted?: boolean
}
export type KoiFishResponse = {
  data: KoiFishAttributes[]
}

export type koiResponse = SuccessResponse<KoiFishAttributes[]>

export interface koiFishResponse extends KoiFishAttributes {
  userName: string // Name of the user who added the fish
  isFeatured: boolean // Whether the fish is featured
  element: string[] // Elements associated with the fish (e.g., water, earth)
  grade: string // Grade of the fish ('A', 'B', etc.)
}
