// apis/elements.api.ts
import { Element } from '../types/koiFish.type'
import http from '../utils/http'

// Fetch all Elements
export const getElements = () => http.get<Element[]>('/elements')

// Fetch a specific Element by ID
export const getElementById = (id: string) => http.get<Element>(`/elements/${id}`)

// Add a new Element
export const addElement = (body: Element) => http.post<Element>('/elements', body)

// Update an existing Element
export const updateElement = (id: string, body: Element) => http.put<Element>(`/elements/${id}`, body)

// Delete an Element
export const deleteElement = (id: string) => http.delete(`/elements/${id}`)
