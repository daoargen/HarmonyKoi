import React, { useContext } from 'react'
import { AuthContext } from '../../../../../context/AuthContext'
import ManageSidebar from '../ManageSidebar/MangeSidebar'
import styles from './ManagePage.module.css'

const ManagePage: React.FC = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className={styles.manageContainer}>
      <ManageSidebar userRole={user?.role} />
      <div className={styles.content}>
        {/* Đây là nơi sẽ hiển thị nội dung quản lý cụ thể */}
        <h1>Trang quản lý</h1>
      </div>
    </div>
  )
}

export default ManagePage
