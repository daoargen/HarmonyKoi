import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { KoiFishAttributes } from './api/koiFish'
import styles from './koiFishList.module.css'

interface KoiFishProps {
  fish: KoiFishAttributes
}

const KoiFishList: React.FC = () => {
  const [koiFishes, setKoiFishes] = useState<KoiFishAttributes[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const totalPages = Math.ceil(koiFishes.length / itemsPerPage)
  const currentFishList = Array.isArray(koiFishes)
    ? koiFishes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : []

  const changePage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  useEffect(() => {
    const fetchKoiFishes = async () => {
      try {
        const response = await axios.get<KoiFishAttributes[]>('http://localhost:1412/api/koiFishes')
        console.log(response.data) // Check if the response is an array
        setKoiFishes(response.data)
      } catch (error) {
        console.error('Error fetching koi fish data:', error)
      }
    }
    fetchKoiFishes()
  }, [])

  const KoiFishCard: React.FC<KoiFishProps> = ({ fish }) => (
    <div className={styles.fishCard}>
      <img src={fish.imageUrl || ''} alt={fish.name} className={styles.fishImage} />
      <div className={styles.fishInfo}>
        <h2>{fish.name}</h2>
        <p>
          <strong>Giá:</strong> {fish.price.toLocaleString('vi-VN')} VND
        </p>
        <p>
          <strong>Màu cơ bản:</strong> {fish.baseColor}
        </p>
      </div>
    </div>
  )

  return (
    <div className='container'>
      <h1 className={styles.title}>Cá koi</h1>
      <div className={styles.grid}>
        {currentFishList.map((fish) => (
          <KoiFishCard key={fish.id} fish={fish} />
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} className={styles.pageButton}>
          «
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => changePage(index + 1)}
            className={`${styles.pageButton} ${currentPage === index + 1 ? styles.active : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          »
        </button>
      </div>
    </div>
  )
}

export default KoiFishList
