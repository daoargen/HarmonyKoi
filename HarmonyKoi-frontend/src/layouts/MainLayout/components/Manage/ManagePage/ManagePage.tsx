// ManagePage.tsx
import React, { useContext } from 'react'
import { AuthContext } from '../../../../../context/AuthContext'
import ManageSidebar from '../ManageSidebar/MangeSidebar'
import styles from './ManagePage.module.css'
import { Outlet, useNavigate } from 'react-router-dom' // Thêm Outlet để hiển thị component con

const ManagePage: React.FC = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate() // Hook để điều hướng trang

  // Hàm để quay về trang chủ
  const goHome = () => {
    navigate('/') // Điều hướng về trang chủ (home)
  }

  return (
    <div className={styles.manageContainer}>
      <ManageSidebar userRole={user?.role} />
      <div className={styles.content}>
        <button onClick={goHome} className={styles.homeButton}>
          Trang chủ
        </button>
        {/* Outlet sẽ render các component con tương ứng với route */}
        <Outlet />
      </div>
    </div>
  )
}

export default ManagePage
