import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import logoImage from '~/assets/images/logo.png'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

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
            <Link to='/koiFish' className={styles.navLink}>
              Danh sách cá koi
            </Link>
          </li>
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
            <Link to='/login' className={styles.loginButton}>
              Đăng nhập
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
