import { LoginFormType } from '../pages/Login/LoginPage'
import { RegisterFormType } from '../pages/Register/Register'
import { NewsResponse, PostResponse } from '../types'
import { AuthResponse } from '../types/auth.type'
import { GoogleUrlResponse, UserResponse } from '../types/user.type'
import { getRefreshToken } from '../utils/cookies'
import http from '../utils/http'

export const getMeQueryKey = 'me'

export const getGoogleUrlQueryKey = 'googleAuthUrl'

export const register = (body: RegisterFormType) => http.post<AuthResponse>('/register', body)

export const login = async (data: { loginKey: string; password: string }) =>
  http.post<AuthResponse>('/auth/login', data)

export const getProfile = () => http.get<UserResponse>('/users/profile')

export const getGoogleAuthUrl = () => http.get<GoogleUrlResponse>('/login/google')

export const loginWithGoogle = (code: string | null, signal?: AbortSignal) =>
  http.post<AuthResponse>('/login/google', { code }, { signal })

export const forgotPassword = (email: string) => http.post('/forgot-password', { email })

export const verifyTokenForgotPassword = (token: string | null, signal?: AbortSignal) =>
  http.post('/verify-token-forgot-password', { token }, { signal })

export const resetPassword = (token: string, password: string) => http.post('/reset-password', { token, password })

// users.api.ts
export const refreshToken = () => http.post<AuthResponse>('/auth/refresh-token', { refreshToken: getRefreshToken() })

export const getPost = () => http.get<PostResponse>('/posts')
export const getNews = () => http.get<NewsResponse>('/news')
