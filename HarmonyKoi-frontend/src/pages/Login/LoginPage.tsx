import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'

import { setRefreshToken, setToken } from '../../utils/cookies'

import { toast } from 'react-toastify'
import { z } from 'zod'
import { loginSchema } from '../../components/common/AuthForm/data/schema'

import { AUTH_MESSAGES, SYSTEM_MESSAGES } from '../../utils/constants'

import { getProfile, login } from '../../apis/users.api'

// Import the custom CSS file
import Styles from './LoginPage.module.css'

import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { useNavigate } from 'react-router-dom'
import { AuthActionType } from '../../context/auth.type'

// import NotFound from "../NotFound";

export type LoginFormType = z.infer<typeof loginSchema>

const LoginPage: React.FC = () => {
  const { dispatch, isAuthenticated } = useContext(AuthContext)
  const [loginKey, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/not-found')
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // Call the login API
      const response = await login({ loginKey, password })

      if (!response) {
        throw new Error('Lỗi trong phản hồi đăng nhập') // Thông báo lỗi rõ ràng hơn
      }
      console.log('Login response:', response)

      const { accessToken, refreshToken } = response?.data?.data
      // const user = response.data.data;

      setToken(accessToken)
      setRefreshToken(refreshToken)

      const userResponse = await getProfile()
      console.log('userResponse:', userResponse)
      if (!userResponse) {
        throw new Error('Lỗi khi lấy thông tin người dùng') // Xử lý lỗi khi getProfile thất bại
      }

      const user = userResponse.data.data
      console.log(user)

      dispatch({ type: AuthActionType.SIGN_IN, payload: user })

      toast.success(AUTH_MESSAGES.LOGIN_TITLE_SUCCESS)
      navigate('/') // Redirect after login
    } catch (error: any) {
      console.log('error login: ', error)
      toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG)
    }
  }

  return (
    <div className={Styles.loginContainer}>
      <div className={Styles.loginForm}>
        <div className={Styles.logo}>
          <img src='src/assets/images/loginImage.jpg' alt='Koi Feng Shui Logo' />
          <span>Koi Feng Shui</span>
        </div>
        <h1>Đăng nhập</h1>
        <p className={Styles.signupLink}>
          Chưa có tài khoản ?
          <a onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>
            {' '}
            Đăng kí tài khoản mới
          </a>
        </p>
        <form onSubmit={handleLogin}>
          <Button
            type='submit'
            // variant='outline'
            onClick={() => navigate('/not-found')}
            className={Styles.googleButton}
          >
            <img src='src/assets/images/googleLogo.png' alt='Google Logo' />
            Google
          </Button>
          <div className={Styles.divider}>Hoặc đăng nhập bằng</div>

          <div className={Styles.formGroup}>
            <Label htmlFor='email'>Email</Label>
            <Input
              type='email'
              id='email'
              placeholder='Nhập địa chỉ email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={Styles.formGroup}>
            <Label htmlFor='password'>Mật khẩu</Label>
            <Input
              type='password'
              id='password'
              placeholder='Nhập mập khẩu'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={Styles.forgotPassword}>
            <a onClick={() => navigate('/not-found')} style={{ cursor: 'pointer' }}>
              Quên mật khẩu
            </a>
          </div>
          <Button id='submit' type='submit' className={Styles.loginButton}>
            Đăng nhập
          </Button>
        </form>
      </div>
      <div className={Styles.koiImage}></div>
    </div>
  )
}

export default LoginPage
