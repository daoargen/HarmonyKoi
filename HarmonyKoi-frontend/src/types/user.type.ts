import { SuccessResponse } from './response.type';


// Ví dụ khai báo kiểu dữ liệu cho một người dùng (User)
export interface User {
    id: string | null
    username: string | null
    loginKey: string | null
    role: Role
}

  // Interface cho dữ liệu người dùng (tuỳ chỉnh theo ứng dụng)
  export interface User {
    id: string | null
    username: string | null
    // ... các thuộc tính khác của User
}

export enum Role {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER"
}

export type UserResponse = SuccessResponse<{
    user: User;
}>;

  export type GoogleUrlResponse = SuccessResponse<{ 
    url: string;
}>;

  export type VerifyTokenForgotPasswordResponse = SuccessResponse<{
    success: boolean;
}>;
