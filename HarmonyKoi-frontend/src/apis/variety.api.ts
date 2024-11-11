// apis/varieties.api.ts
import { Variety } from '../types/koiFish.type' // Adjust the import path as needed
import http from '../utils/http'

// Fetch all Varieties
export const getVarieties = () => http.get<Variety[]>('/verieties')

// Fetch a specific Variety by ID
export const getVarietyById = (id: string) => http.get<Variety>(`/verieties/${id}`)

// Add a new Variety
export const addVariety = (body: Variety) => http.post<Variety>('/verieties', body)

// Update an existing Variety
export const updateVariety = (id: string, body: Variety) => http.put<Variety>(`/verieties/${id}`, body)

// Delete a Variety
export const deleteVariety = (id: string) => http.delete(`/verieties/${id}`)
