import { SuccessResponse } from './response.type'

export enum Role {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER'
}

export type AuthResponse = SuccessResponse<{
  accessToken: string
  refreshToken: string
}>
