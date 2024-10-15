import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { register } from "~apis/users.api";
import AuthForm from "~components/common/AuthForm";
import ButtonActionForm from "~components/common/AuthForm/components/ButtonActionForm";
import { registerSchema } from "~components/common/AuthForm/data/schema";
import { Form } from "~components/ui/form";
import configs from "~configs";
import useDispatchAuth from "~hooks/useDispatchAuth";
import useDocumentTitle from "~hooks/useDocumentTitle";
import useTeddyAnimation from "~hooks/useTeddyAnimation";
import { AUTH_MESSAGES, SYSTEM_MESSAGES } from "~utils/constants";
import isAxiosError from "~utils/isAxiosError";

import FormItems from "./components/FormItems";

export type RegisterFormType = z.infer<typeof registerSchema>;

const registerFormDefaultValues: RegisterFormType = {
  fullname: "",
  email: "",
  phone: "",
  password: "",
};

const Register = () => {
  useDocumentTitle("Prepify | Đăng Ký");
  useDispatchAuth();

  const { RiveComponent, observeInputText, observeInputPassword, observeInputEmail, teddySuccess, teddyFail } =
    useTeddyAnimation();

  const form = useForm<RegisterFormType>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: registerFormDefaultValues,
  });

  // Register with system account
  const { mutate: registerMutate, isPending: isRegisterPending } = useMutation({
    mutationFn: (body: RegisterFormType) => register(body),
  });

  const onSubmit = (values: RegisterFormType) => {
    if (isRegisterPending) return;
    registerMutate(values, {
      onSuccess: () => {
        form.reset();
        teddySuccess();
        toast.success(AUTH_MESSAGES.REGISTER_TITLE_SUCCESS);
      },
      onError: (error) => {
        if (isAxiosError<Error>(error)) {
          toast.error(error.response?.data.message || AUTH_MESSAGES.REGISTER_TITLE_FAILED);
        } else {
          toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
        }

        teddyFail();
      },
    });
  };

  return (
    <AuthForm animation={RiveComponent} title="Đăng ký" loading={isRegisterPending}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative pb-6 space-y-7">
          <div className="grid grid-cols-[repeat(2,_1fr)] gap-x-4 gap-y-7">
            <FormItems
              form={form}
              observeInputText={observeInputText}
              observeInputEmail={observeInputEmail}
              observeInputPassword={observeInputPassword}
            />
          </div>

          <ButtonActionForm
            mainTitle="Đăng ký"
            subTitle="Đã có tài khoản?"
            to={configs.routes.login}
            loading={isRegisterPending}
          />
        </form>
      </Form>
    </AuthForm>
  );
};

export default Register;
