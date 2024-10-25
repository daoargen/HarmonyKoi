<<<<<<< HEAD
=======
// ManagePage.tsx
>>>>>>> 3cdbdda66d4956c74990185e2c3f314b3c73d19d
import React, { useContext } from 'react'
import { AuthContext } from '../../../../../context/AuthContext'
import ManageSidebar from '../ManageSidebar/MangeSidebar'
import styles from './ManagePage.module.css'
<<<<<<< HEAD
import Dashboard from '../../../../../pages/AdminPage/Dashboard/DashboardPage'

const ManagePage: React.FC = () => {
  const { user } = useContext(AuthContext)
=======
import { Outlet, useNavigate } from 'react-router-dom' // Thêm Outlet để hiển thị component con

const ManagePage: React.FC = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate() // Hook để điều hướng trang

  // Hàm để quay về trang chủ
  const goHome = () => {
    navigate('/') // Điều hướng về trang chủ (home)
  }
>>>>>>> 3cdbdda66d4956c74990185e2c3f314b3c73d19d

  return (
    <div className={styles.manageContainer}>
      <ManageSidebar userRole={user?.role} />
      <div className={styles.content}>
<<<<<<< HEAD
        {/* Đây là nơi sẽ hiển thị nội dung quản lý cụ thể */}
        <h1>Trang quản lý</h1>
=======
        <button onClick={goHome} className={styles.homeButton}>
          Trang chủ
        </button>
        {/* Outlet sẽ render các component con tương ứng với route */}
        <Outlet />
>>>>>>> 3cdbdda66d4956c74990185e2c3f314b3c73d19d
      </div>
    </div>
  )
}

export default ManagePage
