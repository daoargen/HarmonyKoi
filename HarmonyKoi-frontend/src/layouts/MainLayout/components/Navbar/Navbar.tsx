import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import logoImage from '../../../../assets/images/logo.png'
import { getToken } from '../../../../utils/cookies'
import { User } from '../../../../types/user.type'
import Sidebar from '../SideBar/SideBar'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null) // Lưu thông tin user
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  // const navigate = useNavigate()
  const accessToken = getToken()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
      console.log(JSON.parse(storedUser))
    }

    setIsSidebarOpen(false)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <header className={styles.navbar}>
      <nav className={styles.nav}>
        <Link to='/home' className={styles.logo}>
          <img src={logoImage} alt='Company Logo' className={styles.logoImage} />
        </Link>
        <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)} aria-label='Toggle menu'>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`${styles.navList} ${isOpen ? styles.open : ''}`}>
          <li>
            <Link to='/consulting' className={styles.navLink}>
              Tư vấn
            </Link>
          </li>
          <li>
            <Link to='/post' className={styles.navLink}>
              Bài viết
            </Link>
          </li>
          <li>
            <Link to='/news' className={styles.navLink}>
              Tin tức
            </Link>
          </li>
          <li>
            {accessToken && user ? ( // Kiểm tra accessToken và user
              <div className={styles.profileContainer}>
                <button onClick={toggleSidebar} className={styles.avatarButton}>
                  <img src={user.avatarUrl} alt='User Avatar' className={styles.avatar} />
                </button>
                <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} userRole={user.user.role} />
              </div>
            ) : (
              <Link to='/login' className={styles.loginButton}>
                Đăng nhập
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
