import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { register } from '../../apis/users.api'
import AuthForm from '../../components/common/AuthForm'
import ButtonActionForm from '../../components/common/AuthForm/components/ButtonActionForm'
import { registerSchema } from '../../components/common/AuthForm/data/schema'
import { Form } from '../../components/ui/form'
import configs from '../../configs'
import useDispatchAuth from '../../hooks/useDispatchAuth'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import useTeddyAnimation from '../../hooks/useTeddyAnimation'
import { AUTH_MESSAGES, SYSTEM_MESSAGES } from '../../utils/constants'
import isAxiosError from '../../utils/isAxiosError'

import FormItems from './components/FormItems'

import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import React from 'react'
import Styles from '../Register/Register.module.css'

export type RegisterFormType = z.infer<typeof registerSchema>

const registerFormDefaultValues: RegisterFormType = {
  fullname: '',
  loginKey: '',
  phone: '',
  password: ''
}

const Register: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={Styles.registerContainer}>
      <div className={Styles.registerForm}>
        <div className={Styles.logo}>
          <img src='src/assets/images/loginImage.jpg' alt='Koi Feng Shui Logo' />
          <span>Koi Feng Shui</span>
        </div>
        <h1>Đăng ký</h1>
        <p className={Styles.loginLink}>
          Đã có tài khoản?{' '}
          <a onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
            Đăng nhập ngay!
          </a>
        </p>
        <Button variant='outline' className={Styles.googleButton}>
          <img src='src/assets/images/googleLogo.png' alt='Google Logo' />
          Đăng ký với Google
        </Button>
        <div className={Styles.divider}>Hoặc đăng ký bằng</div> */}
        <form>
          <div className={Styles.formGroup}>
            <Label htmlFor='fullName'>Họ và tên</Label>
            <Input type='text' id='fullName' placeholder='Nhập họ và tên' />
          </div>
          <div className={Styles.formGroup}>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' id='email' placeholder='Nhập địa chỉ email' />
          </div>
          <div className={Styles.formGroup}>
            <Label htmlFor='password'>Mật khẩu</Label>
            <Input type='password' id='password' placeholder='Nhập mật khẩu' />
          </div>
          <div className={Styles.formGroup}>
            <Label htmlFor='confirmPassword'>Xác nhận mật khẩu</Label>
            <Input type='password' id='confirmPassword' placeholder='Nhập lại mật khẩu' />
          </div>
          <div className={Styles.termsCheckbox}>
            <input type='checkbox' id='terms' />
            <Label htmlFor='terms'>
              Tôi đồng ý với <a href='#'>Điều khoản sử dụng</a> và <a href='#'>Chính sách bảo mật</a>
            </Label>
          </div>
          <Button type='submit' className={Styles.submitButton}>
            Đăng ký
          </Button>
        </form>
      </div>
      <div className={Styles.koiImage}></div>
    </div>
  )
}

export default Register
