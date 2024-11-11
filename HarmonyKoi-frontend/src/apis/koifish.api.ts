// apis/koifish.api.ts

import { KoiFishAttributes } from '../types/koiFish.type' // Adjust the import path as needed
import http from '../utils/http'

// Fetch all Koi Fish
export const getKoiFishes = () => http.get<KoiFishAttributes[]>('/koiFishes')

// Fetch a specific Koi Fish by ID
export const getKoiFishById = (id: string) => http.get<KoiFishAttributes>(`/koiFishes/${id}`) // Adjusted to match your URL pattern

// Add a new Koi Fish
export const addKoiFish = async (koiData: {
  verietyId: string
  name: string
  description: string
  imageUrl: string
  baseColor: string
  symbolism: string
  price: 0
  elementIds: [string]
}) => {
  http.post<KoiFishAttributes>('/koiFishes', koiData)
}
// Update an existing Koi Fish
export const updateKoiFish = (id: string, body: KoiFishAttributes) =>
  http.put<KoiFishAttributes>(`/koiFishes/${id}`, body) // Adjusted URL

// Delete a Koi Fish (soft delete)
export const deleteKoiFish = (id: string) => http.delete(`/koiFishes/${id}`) // Adjusted URL
