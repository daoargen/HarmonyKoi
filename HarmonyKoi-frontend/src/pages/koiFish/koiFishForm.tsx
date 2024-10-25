import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { KoiFishResponse, KoiFishAttributes } from '../../types/koiFish.type'
import styles from './koiFishPage.module.css'

const DEFAULT_ITEMS_PER_PAGE = 9 // Đặt số lượng mặc định cho mỗi trang

const KoiFishDisplay: React.FC = () => {
  const [koiFishes, setKoiFishes] = useState<KoiFishAttributes[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalItems, setTotalItems] = useState<number>(0) // Thêm biến để lưu tổng số mục

  useEffect(() => {
    const fetchKoiFishes = async () => {
      try {
        const response = await axios.get<KoiFishResponse>('http://localhost:1412/api/koiFishes?page_size=30')
        if (response.data && response.data.data) {
          setKoiFishes(response.data.data)
          setTotalItems(response.data.pagination.totalItem) // Lưu tổng số mục từ pagination
          console.log(response.data.pagination)
        } else {
          setError('Không có dữ liệu cá koi.')
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu cá koi.')
      } finally {
        setLoading(false)
      }
    }

    fetchKoiFishes()
  }, [])

  if (loading) {
    return <div>Đang tải dữ liệu...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (koiFishes.length === 0) {
    return <div>Không có dữ liệu cá koi.</div>
  }

  // Tính toán số trang dựa trên totalItems và DEFAULT_ITEMS_PER_PAGE
  const totalPages = Math.ceil(totalItems / DEFAULT_ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * DEFAULT_ITEMS_PER_PAGE
  const currentKoiFishes = koiFishes.slice(startIndex, startIndex + DEFAULT_ITEMS_PER_PAGE)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleLastPageClick = () => {
    setCurrentPage(totalPages)
  }

  const handleFirstPageClick = () => {
    setCurrentPage(1)
  }

  return (
    <div className={styles.container}>
      <h1>Thông tin Cá Koi</h1>
      <div className={styles['koi-list']}>
        {currentKoiFishes.map((koi) => (
          <div key={koi.id} className={styles['koi-card']}>
            <img src={koi.imageUrl || ''} alt={koi.name} className={styles['koi-image']} />
            <h2>{koi.name}</h2>
            <p>{koi.description}</p>
            <Link to={`/koiFishes/${koi.id}`} className={styles.detailsButton}>
              Chi tiết
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          onClick={handleFirstPageClick}
          disabled={currentPage === 1}
          className={styles.pageButton}
          aria-label='First Page'
        >
          &lt;&lt;
        </button>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={styles.pageButton}
          aria-label='Previous Page'
        >
          &lt;
        </button>

        {/* Display page numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={`${styles.pageButton} ${currentPage === index + 1 ? styles.active : ''}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
          aria-label='Next Page'
        >
          &gt;
        </button>
        <button
          onClick={handleLastPageClick}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
          aria-label='Last Page'
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  )
}

export default KoiFishDisplay
