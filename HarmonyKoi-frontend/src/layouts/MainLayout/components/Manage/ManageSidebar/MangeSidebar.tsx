// ManageSidebar.tsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './ManageSidebar.module.css'
import { Role } from '../../../../../types/user.type'

interface ManageSidebarProps {
  userRole: Role
}

const ManageSidebar: React.FC<ManageSidebarProps> = ({ userRole }) => {
  const baseLink = userRole === Role.ADMIN ? '/admin/manage' : '/member/manage'

  const memberItems = [
    { title: 'Quản lý bài viết', link: `${baseLink}/manage-posts` },
    { title: 'Quản lý đơn hàng', link: `${baseLink}/manage-orders` }
  ]

  const adminItems = [
    { title: 'Quản lý người dùng', link: `${baseLink}/manage-users` },
    { title: 'Quản lý cá', link: `${baseLink}/manage-fish` },
    { title: 'Quản lý tin tức', link: `${baseLink}/manage-news` },
    { title: 'Duyệt bài viết', link: `${baseLink}/approve-posts` }
  ]

  const items = userRole === Role.ADMIN ? adminItems : memberItems

  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        {items.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.link}
              className={({ isActive }) => (isActive ? `${styles.sidebarLink} ${styles.active}` : styles.sidebarLink)}
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ManageSidebar
