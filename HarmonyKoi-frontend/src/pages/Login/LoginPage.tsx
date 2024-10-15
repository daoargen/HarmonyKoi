import React from 'react'
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

// import { login } from "~apis/users.api";
import AuthForm from '../../components/common/AuthForm';
import ButtonActionForm from '../../components/common/AuthForm/components/ButtonActionForm';
import { loginSchema } from '../../components/common/AuthForm/data/schema';
import { Form } from '../../components/ui/form';
import configs from '../../configs';
import useDispatchAuth from '../../hooks/useDispatchAuth';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useTeddyAnimation from '../../hooks/useTeddyAnimation';
import { AUTH_MESSAGES, SYSTEM_MESSAGES } from '../../utils/constants';
import isAxiosError from '../../utils/isAxiosError';
import { login } from '../../apis/users.api';
import FormItems from './components/FormItems';

export type LoginFormType = z.infer<typeof loginSchema>;

const loginFormDefaultValues: LoginFormType = {
  email: "",
  password: "",
};


const LoginPage: React.FC = () => {
  useDocumentTitle("Prepify | Đăng Nhập");
  useDispatchAuth();

  const { RiveComponent, observeInputText, observeInputPassword, teddySuccess, teddyFail } = useTeddyAnimation();


  
  const form = useForm<LoginFormType>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: loginFormDefaultValues,
  });

  // Login with system account
  const { mutate: loginMutate, isPending: isLoginPending } = useMutation({
    mutationFn: (body: LoginFormType) => login(body),
  });

  const onSubmit = (values: LoginFormType) => {
    if (isLoginPending) return;
    loginMutate(values, {
      onSuccess: () => {
        form.reset();
        toast.success(AUTH_MESSAGES.LOGIN_TITLE_SUCCESS);
        teddySuccess();
      },
      onError: (error) => {
        if (isAxiosError<Error>(error)) {
          toast.error(error.response?.data.message || AUTH_MESSAGES.LOGIN_TITLE_FAILED);
        } else {
          toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
        }

        teddyFail();
      },
    });
  };

  return (
    <AuthForm animation={RiveComponent} title="Welcome back" loading={isLoginPending}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative pb-6 space-y-7">
          <FormItems form={form} observeInputEmail={observeInputText} observeInputPassword={observeInputPassword} />

          <ButtonActionForm
            mainTitle="Đăng nhập"
            subTitle="Quên mật khẩu?"
            to={configs.routes.forgotPassword}
            loading={isLoginPending}
          />
        </form>
      </Form>
    </AuthForm>
  );
};


export default LoginPage
