import { SuccessResponse } from './response.type'

export enum Role {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER'
}

export type AuthResponse = SuccessResponse<{
  access_token: string;
  refresh_token: string;
}>;
