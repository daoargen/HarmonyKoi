export const SYSTEM_MESSAGES = {
  SOMETHING_WENT_WRONG: 'Đã có lỗi xảy ra'
} as const

export const HTTP_STATUS = {
  UNAUTHORIZED: 401
} as const

export const AUTH_MESSAGES = {
  REGISTER_TITLE_SUCCESS: 'Đăng ký thành công',
  REGISTER_TITLE_FAILED: 'Đăng ký thất bại',
  LOGIN_TITLE_SUCCESS: 'Đăng nhập thành công',
  LOGIN_TITLE_FAILED: 'Đăng nhập thất bại'
} as const

export const USER_MESSAGES = {
  FORGOT_PASSWORD_SUCCESS: 'Vui lòng kiểm tra email của bạn',
  FORGOT_PASSWORD_FAILED: 'Không thể gửi email đặt lại mật khẩu',
  RESET_PASSWORD_SUCCESS: 'Đặt lại mật khẩu thành công',
  RESET_PASSWORD_FAILED: 'Không thể đặt lại mật khẩu'
} as const
