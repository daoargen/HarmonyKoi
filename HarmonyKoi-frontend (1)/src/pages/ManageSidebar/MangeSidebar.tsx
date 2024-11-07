import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ManageSidebar.module.css'
import { Role } from '../../types/user.type'

interface ManageSidebarProps {
  userRole: Role
}

const ManageSidebar: React.FC<ManageSidebarProps> = ({ userRole }) => {
  const memberItems = [
    { title: 'Quản lý bài viết', link: '/manageMember/manage-posts' },
    { title: 'Quản lý đơn hàng', link: '/manageMember/manage-orders' }
  ]

  const adminItems = [
    { title: 'Quản lý người dùng', link: '/manageAdmin/manage-users' },
    { title: 'Quản lý cá', link: '/manage-fish' },
    { title: 'Quản lý tin tức', link: '/manage-news' },
    { title: 'Duyệt bài viết', link: '/approve-posts' }
  ]

  const items = userRole === Role.ADMIN ? adminItems : memberItems

  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        {items.map((item, index) => (
          <li key={index}>
            <Link to={item.link} className={styles.sidebarLink}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ManageSidebar
