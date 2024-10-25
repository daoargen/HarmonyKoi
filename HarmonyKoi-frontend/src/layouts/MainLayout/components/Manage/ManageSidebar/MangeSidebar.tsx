<<<<<<< HEAD
import React from 'react'
import { Link } from 'react-router-dom'
=======
// ManageSidebar.tsx
import React from 'react'
import { NavLink } from 'react-router-dom'
>>>>>>> 3cdbdda66d4956c74990185e2c3f314b3c73d19d
import styles from './ManageSidebar.module.css'
import { Role } from '../../../../../types/user.type'

interface ManageSidebarProps {
  userRole: Role
}

const ManageSidebar: React.FC<ManageSidebarProps> = ({ userRole }) => {
<<<<<<< HEAD
  const memberItems = [
    { title: 'Quản lý bài viết', link: '/manage-posts' },
    { title: 'Quản lý đơn hàng', link: '/manage-orders' }
  ]

  const adminItems = [
    { title: 'Quản lý người dùng', link: '/manage-users' },
    { title: 'Quản lý cá', link: '/manage-fish' },
    { title: 'Quản lý hồ', link: '/manage-ponds' },
    { title: 'Quản lý tin tức', link: '/manage-news' },
    { title: 'Duyệt bài viết', link: '/approve-posts' }
=======
  const baseLink = userRole === Role.ADMIN ? '/admin/manage' : '/member/manage'

  const memberItems = [
    { title: 'Quản lý bài viết', link: `${baseLink}/manage-posts` },
    { title: 'Quản lý đơn hàng', link: `${baseLink}/manage-orders` }
  ]

  const adminItems = [
    { title: 'Quản lý người dùng', link: `${baseLink}/manage-users` },
    { title: 'Quản lý cá', link: `${baseLink}/manage-fish` },
    { title: 'Quản lý hồ', link: `${baseLink}/manage-ponds` },
    { title: 'Quản lý tin tức', link: `${baseLink}/manage-news` },
    { title: 'Duyệt bài viết', link: `${baseLink}/approve-posts` }
>>>>>>> 3cdbdda66d4956c74990185e2c3f314b3c73d19d
  ]

  const items = userRole === Role.ADMIN ? adminItems : memberItems

  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        {items.map((item, index) => (
          <li key={index}>
<<<<<<< HEAD
            <Link to={item.link} className={styles.sidebarLink}>
              {item.title}
            </Link>
=======
            <NavLink
              to={item.link}
              className={({ isActive }) => (isActive ? `${styles.sidebarLink} ${styles.active}` : styles.sidebarLink)}
            >
              {item.title}
            </NavLink>
>>>>>>> 3cdbdda66d4956c74990185e2c3f314b3c73d19d
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ManageSidebar
