import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { forgotPassword } from "../../apis/users.api";
import AuthForm from "../../components/common/AuthForm";
import ButtonActionForm from "../../components/common/AuthForm/components/ButtonActionForm";
import { forgotPasswordSchema } from "../../components/common/AuthForm/data/schema";
import { Form } from "../../components/ui/form";
import configs from "../../configs";
import useCountdown from "../../hooks/useCountdown";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useTeddyAnimation from "../../hooks/useTeddyAnimation";
import { SYSTEM_MESSAGES, USER_MESSAGES } from "../../utils/constants";
import isAxiosError from "../../utils/isAxiosError";

import FormItems from "./components/FormItems";

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;

const forgotPasswordFormDefaultValues: ForgotPasswordFormType = {
  loginKey: "",
};

const COUNT_START = 60;

const ForgotPassword = () => {
  useDocumentTitle("Prepify | Quên mật khẩu");
  const [count, { startCountdown }] = useCountdown({ countStart: COUNT_START });

  const { RiveComponent, observeInputText, teddySuccess, teddyFail } = useTeddyAnimation();
  const form = useForm<ForgotPasswordFormType>({
    mode: "all",
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: forgotPasswordFormDefaultValues,
  });

  // Forgot password with system account
  const { mutate: forgotPasswordMutate, isPending: isForgotPasswordPending } = useMutation({
    mutationFn: (body: ForgotPasswordFormType) => forgotPassword(body.loginKey),
  });

  const onSubmit = (values: ForgotPasswordFormType) => {
    if (isForgotPasswordPending) return;
    forgotPasswordMutate(values, {
      onSuccess: () => {
        form.reset();
        toast.success(USER_MESSAGES.FORGOT_PASSWORD_SUCCESS);
        teddySuccess();
        startCountdown();
      },
      onError: (error) => {
        if (isAxiosError<Error>(error)) {
          toast.error(error.response?.data.message || USER_MESSAGES.FORGOT_PASSWORD_FAILED);
        } else {
          toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
        }

        teddyFail();
      },
    });
  };

  return (
    <AuthForm animation={RiveComponent} title="Quên mật khẩu ?" loading={isForgotPasswordPending}>
      <div className="w-96 mb-4 font-normal leading-[26px]">
        <p className="mb-1 text-slate-500">Nhập email của bạn bên dưới để nhận hướng dẫn đặt lại mật khẩu.</p>
        {count != COUNT_START && (
          <p className="text-sm text-[rgba(0,_0,_0,_0.45)]">Không nhận được hướng dẫn? Hãy thử lại sau {count} giây</p>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative pb-6 space-y-3">
          <FormItems form={form} observeInputEmail={observeInputText} />

          <ButtonActionForm
            mainTitle="Lấy lại mật khẩu"
            subTitle="Đã có tài khoản?"
            to={configs.routes.login}
            loading={isForgotPasswordPending}
          />
        </form>
      </Form>
    </AuthForm>
  );
};

export default ForgotPassword;
