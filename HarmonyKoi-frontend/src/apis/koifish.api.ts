// types/koiFish.type.ts
export interface Variety {
  name: string
  description: string
}

// apis/koifish.api.ts
import { KoiFishAttributes } from '../types/koiFish.type' // Adjust the import path as needed
import http from '../utils/Https'

// Fetch all Koi Fish
export const getKoiFishes = () => http.get<KoiFishAttributes[]>('/api/koiFishes')

// Fetch a specific Koi Fish by ID
export const getKoiFishById = (id: string) => http.get<KoiFishAttributes>(`/get/koiFish/${id}`)

// Add a new Koi Fish
export const addKoiFish = (body: KoiFishAttributes) => http.post<KoiFishAttributes>('/add/koiFish', body)

// Update an existing Koi Fish
export const updateKoiFish = (id: string, body: KoiFishAttributes) =>
  http.put<KoiFishAttributes>(`/update/koiFish/${id}`, body)

// Delete a Koi Fish (soft delete)
export const deleteKoiFish = (id: string) => http.delete(`/delete/koiFish/${id}`)
