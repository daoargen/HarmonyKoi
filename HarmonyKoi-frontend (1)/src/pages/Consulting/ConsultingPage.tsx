import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Consulting.module.css'
import backgroundImage from '~/assets/images/background.jpg'

const ConsultingPage: React.FC = () => {
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate birth date
    if (!birthDate) {
      alert('Vui lòng nhập ngày tháng năm sinh hợp lệ.')
      return
    }

    // Validate gender (even though it's not used in the URL)
    if (!gender) {
      alert('Vui lòng chọn giới tính.')
      return
    }

    // Extract birth year from the birth date
    const birthYear = new Date(birthDate).getFullYear()

    // Navigate to results page with only birth year in the URL
    navigate(`/koiFishForm/${birthYear}`)
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
      <div className={styles['form-container']}>
        <h2>Tư vấn bản mệnh</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='birthDate'>* Nhập ngày tháng năm sinh</label>
          <input
            type='date'
            id='birthDate'
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder='Nhập ngày tháng năm sinh'
            className={styles.input}
          />

          <label htmlFor='gender'>* Chọn giới tính</label>
          <select id='gender' value={gender} onChange={(e) => setGender(e.target.value)} className={styles.input}>
            <option value=''>Chọn giới tính</option>
            <option value='male'>Nam</option>
            <option value='female'>Nữ</option>
          </select>

          <button type='submit' className={styles['submit-button']}>
            Tiến hành tư vấn
          </button>
        </form>
      </div>
    </div>
  )
}

export default ConsultingPage
