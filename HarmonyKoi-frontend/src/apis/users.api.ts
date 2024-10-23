// import { LoginFormType } from '../pages/Login/LoginPage'
import { RegisterFormType } from '../pages/Register/Register'
import { AuthResponse } from '../types/auth.type'
import { GoogleUrlResponse, UserResponse } from '../types/user.type'
import { getRefreshToken } from '../utils/cookies'
import http from '../utils/http'

export const getMeQueryKey = 'me'

export const getGoogleUrlQueryKey = 'googleAuthUrl'

export const register = (body: RegisterFormType) => http.post<AuthResponse>('/register', body)

export const login = async (data: { loginKey: string; password: string }) =>
  http.post<AuthResponse>('/auth/login', data)

export const getProfile = async () => await http.get<UserResponse>('/users/profile')

export const getGoogleAuthUrl = () => http.get<GoogleUrlResponse>('/login/google')

export const loginWithGoogle = (code: string | null, signal?: AbortSignal) =>
  http.post<AuthResponse>('/login/google', { code }, { signal })

export const forgotPassword = (email: string) => http.post('/forgot-password', { email })

export const verifyTokenForgotPassword = (token: string | null, signal?: AbortSignal) =>
  http.post('/verify-token-forgot-password', { token }, { signal })

export const resetPassword = (token: string, password: string) => http.post('/reset-password', { token, password })

// users.api.ts
export const refreshToken = async () => {
  const token = getRefreshToken()

  if (!token) {
    // Nếu không có refresh token, không thực hiện yêu cầu refresh
    throw new Error('No refresh token found')
  }

  try {
    return await http.post<AuthResponse>('/auth/refresh-token', { refreshToken: token })
  } catch (error: any) {
    console.error('Error refreshing token:', error)
    // Kiểm tra lỗi 401
    if (error.response?.status === 401) {
      // Xử lý logout hoặc điều hướng người dùng
      console.log('Refresh token expired or invalid')
      // Thực hiện logout hoặc điều hướng lại người dùng
    }
    throw error // Tiếp tục ném lỗi nếu cần
  }
}
