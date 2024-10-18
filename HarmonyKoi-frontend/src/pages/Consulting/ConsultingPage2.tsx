import React, { useState } from 'react'
import styles from './Consulting.module.css'
import { Link } from 'react-router-dom'

const SuitabilityForm: React.FC = () => {
  const [birthYear, setBirthYear] = useState('')
  const [koiColor, setKoiColor] = useState('')
  const [pondDirection, setPondDirection] = useState('')
  const [pondShape, setPondShape] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logic for handling form submission
    console.log('Form Submitted:', { birthYear, koiColor, pondDirection, pondShape })
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <b>
          <span>Trang chủ</span>
        </b>{' '}
        &gt;{' '}
        <b>
          <span className={styles.highlight}>Đánh giá độ phù hợp</span>
        </b>
      </div>

      <div className={styles['tab-container']}>
        <Link to='/consulting'>
          <button className={styles['tab-button1']}>Tư vấn bản mệnh</button>
        </Link>
        <Link to='/consulting2'>
          <button className={`${styles['tab-button2']} ${styles.tab} ${styles['active-tab']}`}>Tư vấn bản mệnh</button>
        </Link>
      </div>

      <div className={styles['form-container']}>
        <form onSubmit={handleSubmit}>
          <label htmlFor='birthYear'>Năm sinh</label>
          <input
            type='text'
            id='birthYear'
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            placeholder='2003'
            className={styles.input}
          />

          <label htmlFor='koiColor'>Màu sắc cá koi</label>
          <input
            type='text'
            id='koiColor'
            value={koiColor}
            onChange={(e) => setKoiColor(e.target.value)}
            placeholder='Trắng'
            className={styles.input}
          />

          <label htmlFor='pondDirection'>Hướng đặt hồ</label>
          <input
            type='text'
            id='pondDirection'
            value={pondDirection}
            onChange={(e) => setPondDirection(e.target.value)}
            placeholder='Đông'
            className={styles.input}
          />

          <label htmlFor='pondShape'>Hình dạng hồ</label>
          <input
            type='text'
            id='pondShape'
            value={pondShape}
            onChange={(e) => setPondShape(e.target.value)}
            placeholder='Vuông'
            className={styles.input}
          />

          <button type='submit' className={styles['submit-button']}>
            Tính toán độ phù hợp
          </button>
        </form>
      </div>
    </div>
  )
}

export default SuitabilityForm
