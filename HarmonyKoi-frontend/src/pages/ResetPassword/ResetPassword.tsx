import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { resetPassword } from "../../apis/users.api";
import AuthForm from "../../components/common/AuthForm";
import ButtonActionForm from "../../components/common/AuthForm/components/ButtonActionForm";
import { resetPasswordSchema } from "../../components/common/AuthForm/data/schema";
import { Form } from "../../components/ui/form";
import configs from "../../configs";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useTeddyAnimation from "../../hooks/useTeddyAnimation";
import { cn } from "../../lib/utils";
import { SYSTEM_MESSAGES, USER_MESSAGES } from "../../utils/constants";
import isAxiosError from "../../utils/isAxiosError";

import FormItems from "./components/FormItems";
import React from "react";

export interface ResetPasswordProps {
  token?: string | null;
}

export type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>;

const ResetPasswordFormDefaultValues: ResetPasswordFormType = {
  password: "",
  confirmPassword: "",
};

const ResetPassword: React.FC = ({ token }: ResetPasswordProps) => {
  useDocumentTitle("Prepify | Đặt lại mật khẩu");

  const { RiveComponent, observeInputPassword, teddySuccess, teddyFail } = useTeddyAnimation();
  const form = useForm<ResetPasswordFormType>({
    mode: "all",
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: ResetPasswordFormDefaultValues,
  });

  // Mutation reset password
  const { mutate: resetPasswordMutate, isPending: isResetPasswordPending } = useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) => resetPassword(token, password),
  });

  const onSubmit = (values: ResetPasswordFormType) => {
    if (isResetPasswordPending) return;
    resetPasswordMutate(
      { token: token as string, password: values.password },
      {
        onSuccess: () => {
          form.reset();
          toast.success(USER_MESSAGES.RESET_PASSWORD_SUCCESS);
          teddySuccess();
        },
        onError: (error) => {
          if (isAxiosError<Error>(error)) {
            toast.error(error.response?.data.message || USER_MESSAGES.RESET_PASSWORD_FAILED);
          } else {
            toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
          }
          teddyFail();
        },
      },
    );
  };

  return (
    <AuthForm animation={RiveComponent} title="Đặt lại mật khẩu" loading={isResetPasswordPending}>
      <div className="w-96 mb-4 font-normal leading-[26px]">
        <p
          className={cn("text-slate-500", {
            "text-destructive": form.formState.errors.password || form.formState.errors.confirmPassword,
          })}
        >
          Phải từ 8 đến 16 ký tự, bao gồm một số, một chữ cái viết hoa và một chữ cái viết thường.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative pb-3 space-y-6">
          <FormItems form={form} observeInputPassword={observeInputPassword} />

          <div className="relative -top-3">
            <ButtonActionForm
              mainTitle="Đặt lại mật khẩu"
              subTitle="Đã có tài khoản?"
              to={configs.routes.login}
              loading={isResetPasswordPending}
            />
          </div>
        </form>
      </Form>
    </AuthForm>
  );
};

export default ResetPassword;
