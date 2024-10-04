import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>Trang chủ</Link>
          </li>
          <li>
            <Link to='/consulting'>Tư vấn</Link>
          </li>
          <li>
            <Link to='/post'>Bài viết</Link>
          </li>
          <li>
            <Link to='/news'>Tin tức</Link>
          </li>
          <li>
            <Link to='/login'>Đăng nhập</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
