import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import logoImage from '../../../../assets/images/logo.png'
import { getToken } from '../../../../utils/cookies'
import { User } from '../../../../types/user.type'
import Sidebar from '../SideBar/SideBar'
import { Button } from '../../../../components/ui/button'

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md`}>
      <nav className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <Link to='/' className='flex items-center space-x-2'>
          <img src={logoImage} alt='Company Logo' className={styles.logoImage} />

          <span className='text-2xl font-bold text-blue-600'>KoiFengShui</span>
        </Link>
        <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)} aria-label='Toggle menu'>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`flex justify-center items-center space-x-6 ${isOpen ? styles.open : ''}`}>
          <li className='text-blue-600 hover:text-blue-800'>
            <Link to='/package'>Gói dịch vụ</Link>
          </li>
          <li className='text-blue-600 hover:text-blue-800'>
            <Link to='/consulting'>Tư vấn</Link>
          </li>
          <li className='text-blue-600 hover:text-blue-800'>
            <Link to='/koiFish'>Danh sách cá koi</Link>
          </li>
          <li className='text-blue-600 hover:text-blue-800'>
            <Link to='/post'>Bài viết</Link>
          </li>
          <li className='text-blue-600 hover:text-blue-800'>
            <Link to='/news'>Tin tức</Link>
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
              <Link to='/login'>
                <Button>Đăng nhập</Button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
