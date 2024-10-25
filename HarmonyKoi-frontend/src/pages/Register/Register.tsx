<<<<<<< HEAD
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

=======
import React, { useState } from 'react'
>>>>>>> 3cdbdda66d4956c74990185e2c3f314b3c73d19d
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
<<<<<<< HEAD
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
=======
import { registerUser } from '../../apis/users.api'
import Styles from '../Register/Register.module.css'
import logoImage from '../../../src/assets/images/logo.png'

const Register: React.FC = () => {
  const navigate = useNavigate()
  const [username, setLoginKey] = useState('') // Tên đăng nhập
  const [password, setPassword] = useState('') // Mật khẩu
  const [email, setEmail] = useState('') // Email người dùng nhập
  const [confirmPassword, setConfirmPassword] = useState('') // Xác nhận mật khẩu
  const [gender, setGender] = useState('MALE') // Giới tính mặc định là MALE

  const dob = '2000-01-01'

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Mật khẩu và xác nhận mật khẩu không khớp!')
      return
    }

    try {
      // Gọi API đăng ký
      const response = await registerUser({ email, username, password, gender, dob })
      console.log('Đăng ký thành công:', response)

      alert('Đăng ký thành công!')
      navigate('/login') // Chuyển hướng về trang đăng nhập sau khi đăng ký thành công
    } catch (error) {
      console.error('Lỗi đăng ký:', error)
      alert('Đăng ký thất bại, vui lòng thử lại.')
    }
  }
>>>>>>> 3cdbdda66d4956c74990185e2c3f314b3c73d19d

  return (
    <div className={Styles.registerContainer}>
      <div className={Styles.registerForm}>
        <div className={Styles.logo}>
<<<<<<< HEAD
          <img src='src/assets/images/loginImage.jpg' alt='Koi Feng Shui Logo' />
=======
          <img src={logoImage} alt='Koi Feng Shui Logo' />
>>>>>>> 3cdbdda66d4956c74990185e2c3f314b3c73d19d
          <span>Koi Feng Shui</span>
        </div>
        <h1>Đăng ký</h1>
        <p className={Styles.loginLink}>
          Đã có tài khoản?{' '}
          <a onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
            Đăng nhập ngay!
          </a>
        </p>
<<<<<<< HEAD
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
=======

        <form onSubmit={handleRegister}>
          <div className={Styles.formGroup}>
            <Label htmlFor='username'>Tên đăng nhập</Label>
            <Input
              type='text'
              id='username'
              placeholder='Nhập tên đăng nhập'
              onChange={(e) => setLoginKey(e.target.value)}
              required
            />
          </div>
          <div className={Styles.formGroup}>
            <Label htmlFor='email'>Email</Label>
            <Input
              type='email'
              id='email'
              placeholder='Nhập email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={Styles.formGroup}>
            <Label htmlFor='password'>Mật khẩu</Label>
            <Input
              type='password'
              id='password'
              placeholder='Nhập mật khẩu'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={Styles.formGroup}>
            <Label htmlFor='confirmPassword'>Xác nhận mật khẩu</Label>
            <Input
              type='password'
              id='confirmPassword'
              placeholder='Nhập lại mật khẩu'
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className={Styles.formGroup}>
            <Label htmlFor='dob'>Ngày sinh (mặc định)</Label>
            <Input type='text' id='dob' value={dob} readOnly disabled /> {/* Hiển thị dob mặc định */}
          </div>

          {/* Thêm dropdown chọn giới tính */}
          <div className={Styles.formGroup}>
            <Label htmlFor='gender'>Giới tính</Label>
            <select
              id='gender'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className={Styles.selectInput}
            >
              <option value='MALE'>Nam</option>
              <option value='FEMALE'>Nữ</option>
              <option value='OTHER'>Khác</option>
            </select>
          </div>

>>>>>>> 3cdbdda66d4956c74990185e2c3f314b3c73d19d
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
