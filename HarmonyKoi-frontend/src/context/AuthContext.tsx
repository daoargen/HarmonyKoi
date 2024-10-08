// src/context/AuthContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { AuthContextType, LoginCredentials, User } from '../types'

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  login: async () => {}, // Hàm rỗng để khởi tạo
  logout: () => {} // Hàm rỗng để khởi tạo
})

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const response = await fetch('/api/me', {
            headers: { Authorization: `Bearer ${token}` }
          })
          if (response.ok) {
            const userData: User = await response.json()
            setUser(userData)
            setIsLoggedIn(true)
          } else {
            localStorage.removeItem('token')
          }
        }
      } catch (error) {
        console.error('Token check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }
    checkToken()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        setUser(data.user)
        setIsLoggedIn(true)
      } else {
        throw new Error(data.message || 'Login failed.')
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error // Có thể xử lý lỗi ở component gọi login()
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsLoggedIn(false)
  }

  const contextValue: AuthContextType = {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
