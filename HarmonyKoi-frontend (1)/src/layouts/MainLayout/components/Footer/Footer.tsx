// src/components/Footer/Footer.tsx

import React from 'react'
import styles from './Footer.module.css'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.about}>
          <h3>Về chúng tôi</h3>
          <p>Koi Feng Shui - Cân Bằng Phong Thủy, Koi Vượng Tài Lộc!</p>
          <p>
            Koi Feng Shui là điểm đến lý tưởng cho những người yêu thích cá Koi và nghệ thuật tạo cảnh hồ cá. Chúng tôi
            tự hào cung cấp:
          </p>
          <ul>
            <li>Cá Koi chất lượng cao từ các trại giống uy tín</li>
            <li>Đa dạng sản phẩm trang trí và thiết bị cho hồ cá Koi</li>
            <li>Tư vấn chuyên sâu về cá Koi thông qua các bài blog chia sẻ kinh nghiệm</li>
          </ul>
        </div>
        <div className={styles.contact}>
          <h3>Thông tin liên hệ</h3>
          <p>
            <strong>+ Hotline 24/7:</strong> xxxx.xxxx.xxxx
          </p>
          <p>
            <strong>+ Email:</strong> koifengshui@gmail.com
          </p>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>
          Thiết kế & duy trì bởi Koi Feng Shui | <a href='https://koifengshui.com.vn'>koifengshui.com.vn</a>
        </p>
        <p>© Copy right 2024</p>
      </div>
    </footer>
  )
}

export default Footer
