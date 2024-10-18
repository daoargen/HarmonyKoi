import React, { useState } from 'react'
import styles from './Consulting.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ConsultingPage: React.FC = () => {
  const [birthYear, setBirthYear] = useState('')
  const [gender, setGender] = useState('')
  const [carts, setCarts] = useState<CartItem[]>([])

  type CartItem = {
    name: string
  }

  // Updated handleSubmit to send form data to an API using axios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Send form data to API
      const response = await axios.post('/api/carts', {
        birthYear,
        gender
      })

      // Update carts state with the response data if needed
      setCarts(response.data) // Assuming response.data contains the updated carts
      console.log('API Response:', response.data) // You can update the UI or state based on the response
    } catch (error) {
      console.error('Error submitting data:', error) // Handle errors
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <b>
          <span>Trang chủ</span>
        </b>
        &gt;{' '}
        <b>
          <span className={styles.highlight}>Tư vấn bản mệnh</span>
        </b>
      </div>
      <div className={styles['tab-container']}>
        <Link to='/consulting'>
          <button className={`${styles['tab-button1']} ${styles.tab} ${styles['active-tab']}`}>Tư vấn bản mệnh</button>
        </Link>
        <Link to='/consulting2'>
          <button className={styles['tab-button2']}>Đánh giá độ phù hợp</button>
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

      {/* Displaying the carts data */}
      <div className={styles['cart-container']}>
        {carts.length > 0 ? (
          <div>
            <h3>Cart Items:</h3>
            <ul>
              {carts.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
    </div>
  )
}

export default ConsultingPage
