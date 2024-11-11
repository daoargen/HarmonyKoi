import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { Role } from '../../../../types/user.type'
import { removeToken } from '../../../../utils/cookies'
import { AuthContext } from '../../../../context/AuthContext'
import { signOut } from '../../../../context/auth.reducer'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  userRole: Role
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userRole }) => {
  //   const [user, setUser] = useState<User | null>(null) // Lưu thông tin user
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  //   const accessToken = getToken()

  const mainItems =
    userRole === Role.ADMIN
      ? {
          title: 'Quản lý hệ thống',
          link: '/admin/manage'
        }
      : {
          title: 'Quản lý thông tin',
          link: '/member/manage'
        }

  const handleLogout = () => {
    removeToken() // Xóa token khỏi cookie
    localStorage.removeItem('user') // Xóa user khỏi localStorage
    onClose()
    dispatch(signOut())
    navigate('/login')
    window.location.reload() // Chuyển hướng đến trang login
  }

  // const items = userRole === Role.ADMIN ? adminItems : memberItems

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeButton} onClick={onClose}>
        {/* &times; */}
      </button>
      <ul className={styles.sidebarList}>
        <li>
          <Link to={mainItems.link} className={styles.sidebarLink} onClick={onClose}>
            {mainItems.title}
          </Link>
        </li>
      </ul>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Đăng xuất
      </button>
    </div>
  )
}

export default Sidebar
