import React, { useState } from 'react'
import styles from './Consulting.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import backgroundImage from '~/assets/images/background.jpg'

const ConsultingPage: React.FC = () => {
  const [birthYear, setBirthYear] = useState('')
  const [gender, setGender] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/carts', {
        birthYear,
        gender
      })
      console.log('API Response:', response.data)
    } catch (error) {
      console.error('Error submitting data:', error)
    }
  }

  return (
    <div className={styles.container}>
      <img src={backgroundImage} alt='background' className={styles.backgroundImage} />
      <div className={styles.breadcrumb}>
        <b>
          <span>Trang chủ</span>
        </b>{' '}
        &gt;{' '}
        <b>
          <span className={styles.highlight}>Tư vấn bản mệnh</span>
        </b>
      </div>
      <div className={styles['tab-container']}>
        <Link to='/consulting'>
          <button className={`${styles['tab-button1']} ${styles.tab} ${styles['active-tab']}`}>Tư vấn bản mệnh</button>
        </Link>
      </div>
      <div className={styles['form-container']}>
        <h2>Tư vấn bản mệnh</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='birthYear'>* Nhập năm sinh</label>
          <input
            type='text'
            id='birthYear'
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            placeholder='Nhập năm sinh'
            className={styles.input}
          />
          <label>* Giới tính</label>
          <div className={styles['radio-group']}>
            <input
              type='radio'
              id='male'
              name='gender'
              value='Nam'
              checked={gender === 'Nam'}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor='male'>Nam</label>
            <input
              type='radio'
              id='female'
              name='gender'
              value='Nữ'
              checked={gender === 'Nữ'}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor='female'>Nữ</label>
          </div>
          <button type='submit' className={styles['submit-button']}>
            Tiến hành tính toán
          </button>
        </form>
      </div>
    </div>
  )
}

export default ConsultingPage
