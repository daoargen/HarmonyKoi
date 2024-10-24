import axios, { AxiosError, AxiosInstance } from 'axios'

import configs from '../configs'
import { AuthResponse } from '../types/auth.type'

import { HTTP_STATUS } from './constants'
import { getToken, removeToken, setToken } from './cookies'
import { refreshToken } from '../apis/users.api'

class Http {
  private accessToken: string
  instance: AxiosInstance

  constructor() {
    this.accessToken = getToken()
    this.instance = axios.create({
      baseURL: (import.meta.env.VITE_BASE_URL = 'http://localhost:1412/api'),
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url, method } = response.config
        if (
          method === 'post' &&
          (url === configs.routes.login || url === configs.routes.register || url === configs.routes.loginGoogle)
        ) {
          this.accessToken = (response.data as AuthResponse).data.accessToken
          setToken(this.accessToken)
        } else if (url === configs.routes.logout) {
          this.accessToken = ''
          console.log(1)
          removeToken()
        }
        return response
      },
      async (error: AxiosError) => {
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && error.config) {
          try {
            const { data } = await refreshToken() // Request new token using refresh token
            this.accessToken = data.data.accessToken
            setToken(this.accessToken)
            error.config.headers.Authorization = `Bearer ${this.accessToken}`
            return this.instance.request(error.config) // Retry the original request with new token
          } catch (refreshError) {
            // console.log(2)
            removeToken()
          }
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
