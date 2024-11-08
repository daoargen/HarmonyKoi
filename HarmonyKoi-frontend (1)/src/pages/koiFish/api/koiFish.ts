export interface KoiFishAttributes {
  id?: string
  verietyId: string
  name: string
  description: string | null
  imageUrl: string | null
  baseColor: string
  symbolism: string | null
  price: number
  isDeleted?: boolean
}
export interface KoiFishData extends KoiFishAttributes {
  userName: string // Name of the user who added the fish
  isFeatured: boolean // Whether the fish is featured
  element: string[] // Elements associated with the fish (e.g., water, earth)
  grade: string // Grade of the fish ('A', 'B', etc.)
}
