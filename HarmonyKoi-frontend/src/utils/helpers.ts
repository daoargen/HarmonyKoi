// utils/helpers.ts

// Kiểm tra xem chuỗi có phải là email hợp lệ hay không
export const isValidEmail = (email: string): boolean => {
  // Regular expression để kiểm tra email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Format ngày tháng theo định dạng "dd/MM/yyyy"
export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
