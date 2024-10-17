import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { AuthResponse } from '../../types/auth.type';
import { setRefreshToken, setToken } from '../../utils/cookies';
// import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { loginSchema } from '../../components/common/AuthForm/data/schema';

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";

// import AuthForm from '../../components/common/AuthForm';
// import ButtonActionForm from '../../components/common/AuthForm/components/ButtonActionForm';
// import { Form } from '../../components/ui/form';
// import configs from '../../configs';
// import useDispatchAuth from '../../hooks/useDispatchAuth';
// import useDocumentTitle from '../../hooks/useDocumentTitle';
// import useTeddyAnimation from '../../hooks/useTeddyAnimation';
import { AUTH_MESSAGES, SYSTEM_MESSAGES } from '../../utils/constants';
// import isAxiosError from '../../utils/isAxiosError';
import { login } from '../../apis/users.api';
// import FormItems from './components/FormItems';

// Import the custom CSS file
import  Styles  from './LoginPage.module.css';

import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
// import NotFound from "../NotFound";


export type LoginFormType = z.infer<typeof loginSchema>;


const LoginPage: React.FC = () => {
  const [loginKey, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Call the login API
      const response = await login({ loginKey, password });
      const { access_token, refresh_token } = response.data.data;
      
      setToken(access_token);
      setRefreshToken(refresh_token);
      

      toast.success(AUTH_MESSAGES.LOGIN_TITLE_SUCCESS);
      navigate('/dashboard'); // Redirect after login
    } catch (error) {
      toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };



  return (
    <div className={Styles.loginContainer}>
      <div className={Styles.loginForm}>
        <div className={Styles.logo}>
          <img src="src/assets/images/loginImage.jpg" alt="Koi Feng Shui Logo" />
          <span>Koi Feng Shui</span>
        </div>
        <h1>Đăng nhập</h1>
        <p className={Styles.signupLink}>
          Chưa có tài khoản ? 

          <a onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}> Đăng kí tài khoản mới</a>

        </p>
        <form onSubmit={handleLogin}>
          <Button type="submit" variant="outline" onClick={() => navigate('/not-found')}  className={Styles.googleButton}>
            <img src="src/assets/images/googleLogo.png" alt="Google Logo" />
            Google
          </Button>
          <div className={Styles.divider}>Hoặc đăng nhập bằng</div>
          <form>
            <div className={Styles.formGroup}>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Nhập họ và tên" onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className={Styles.formGroup}>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input type="password" id="password" placeholder="Nhập mập khẩu" onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className={Styles.forgotPassword}>
              <a onClick={() => navigate('/not-found')} style={{cursor: "pointer"}}>Quên mật khẩu</a>
            </div>
            <Button id="submit" type="submit" className={Styles.loginButton}>Đăng nhập</Button>
          </form>
        </form>
      </div>
      <div className={Styles.koiImage}></div>
    </div>
  );
}

export default LoginPage;
