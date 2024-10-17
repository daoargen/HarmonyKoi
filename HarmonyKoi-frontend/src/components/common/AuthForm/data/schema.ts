import { z } from "zod";

const FULLNAME_MESSAGE = "Vui lòng nhập ít nhất 1 kí tự";
const EMAIL_MESSAGE = "Vui lòng nhập email hợp lệ";
const PHONE_REGEX = /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/;
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
const PHONE_MESSAGE = "Vui lòng nhập số điện thoại hợp lệ";
const PASSWORD_MESSAGE =
  "Mật khẩu phải từ 8 đến 16 ký tự, bao gồm một số, một chữ cái viết hoa và một chữ cái viết thường";
const PASSWORD_CONFIRM_MESSAGE = "Mật khẩu không khớp";

const emailSchema = () =>
  z
    .string({
      message: EMAIL_MESSAGE,
    })
    .email({
      message: EMAIL_MESSAGE,
    });

const passwordSchema = (message: string = "") =>
  z
    .string({
      message: message,
    })
    .refine((value) => PASSWORD_REGEX.test(value), {
      message: message,
    });

export const loginSchema = z.object({
  loginKey: emailSchema(),
  password: passwordSchema(PASSWORD_MESSAGE),
});

export const registerSchema = z.object({
  fullname: z
    .string({
      message: FULLNAME_MESSAGE,
    })
    .min(1, {
      message: FULLNAME_MESSAGE,
    }),
  loginKey: emailSchema(),
  phone: z
    .string({
      message: PHONE_MESSAGE,
    })
    .refine((value) => PHONE_REGEX.test(value), {
      message: PHONE_MESSAGE,
    }),
  password: passwordSchema(PASSWORD_MESSAGE),
});

export const forgotPasswordSchema = z.object({
  loginKey: emailSchema(),
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema(),
    confirmPassword: passwordSchema(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: PASSWORD_CONFIRM_MESSAGE,
      path: ["confirmPassword"],
    },
  );
