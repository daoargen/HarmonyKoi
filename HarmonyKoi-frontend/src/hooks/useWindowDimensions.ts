// hooks/useWindowDimensions.ts

import { useState, useEffect } from 'react'

// Custom Hook để lấy và theo dõi kích thước của cửa sổ trình duyệt
export const useWindowDimensions = () => {
  // Sử dụng useState để lưu trữ kích thước cửa sổ
  // Khởi tạo với kích thước ban đầu
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  // Sử dụng useEffect để theo dõi sự kiện 'resize' trên window
  useEffect(() => {
    // Hàm xử lý khi kích thước cửa sổ thay đổi
    const handleResize = () => {
      // Cập nhật state với kích thước mới
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Thêm event listener 'resize'
    window.addEventListener('resize', handleResize)

    // Dọn dẹp event listener khi component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, []) // [] => Chạy useEffect chỉ một lần khi component mount

  // Trả về object chứa kích thước cửa sổ
  return windowDimensions
}
