// import { User } from './../types/index';
import { Dispatch } from 'react'

import { User } from '../types/user.type'

export enum AuthActionType {
  INITIALIZE = 'INITIALIZE',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT'
}

export interface AuthState {
  isAuthenticated?: boolean
  isInitialized?: boolean
  user?: User | null
}

interface SignInPayload {
  user: User
  accessToken: string
  refreshToken: string
}

export type AuthAction =
  | PayloadAction<AuthState>
  | PayloadAction<SignInPayload> // SIGN_IN action bây giờ có payload là SignInPayload
  | { type: AuthActionType.SIGN_OUT }

export interface PayloadAction<T> {
  type: AuthActionType
  payload: T
}

export interface AuthContextType extends AuthState {
  dispatch: Dispatch<PayloadAction<AuthState>>
}

export interface ReducerHandler {
  INITIALIZE(state: AuthState, action: PayloadAction<AuthState>): AuthState
  SIGN_IN(state: AuthState, action: PayloadAction<AuthState>): AuthState
  SIGN_OUT(state: AuthState): AuthState
}
