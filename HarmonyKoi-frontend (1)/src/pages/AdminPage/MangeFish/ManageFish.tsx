import React, { useEffect, useState, useCallback, useMemo } from 'react'
import axios from 'axios'
import { KoiFishAttributes, KoiFishResponse } from '../../../types/koiFish.type'
import styles from './manageFish.module.css'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../../utils/cookies'

const ManageFish: React.FC = () => {
  const [koiFishes, setKoiFishes] = useState<KoiFishAttributes[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const navigate = useNavigate()

  const fetchKoiFishes = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const token = getToken()
      const response = await axios.get<KoiFishResponse>('http://localhost:1412/api/koiFishes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data?.data) {
        setKoiFishes(response.data.data)
      } else {
        setError('Không có dữ liệu cá koi.')
      }
    } catch (err) {
      console.error('Error fetching koi fishes:', err)
      setError('Có lỗi xảy ra khi tải dữ liệu cá koi.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchKoiFishes()
  }, [fetchKoiFishes])

  const { totalPages, currentKoiFishes } = useMemo(() => {
    const totalPages = Math.ceil(koiFishes.length / itemsPerPage)
    const currentKoiFishes = koiFishes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    return { totalPages, currentKoiFishes }
  }, [koiFishes, currentPage])

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage)
      }
    },
    [totalPages]
  )

  const handleDelete = useCallback(
    async (id: string) => {
      if (window.confirm('Bạn có chắc chắn muốn xóa cá koi này?')) {
        try {
          const token = getToken()
          await axios.delete(`http://localhost:1412/api/koiFishes/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          await fetchKoiFishes()
        } catch (error) {
          setError('Có lỗi xảy ra khi xóa cá koi.')
        }
      }
    },
    [fetchKoiFishes]
  )

  const handleEditClick = useCallback(
    (koi: KoiFishAttributes) => {
      navigate(`/manage-fish/update-fish/${koi.id}`, { state: { koi } })
    },
    [navigate]
  )

  const handleCreateClick = useCallback(() => {
    navigate('/manage-fish/create-fish')
  }, [navigate])

  if (loading) return <div>Đang tải dữ liệu...</div>
  if (error) return <div className={styles.error}>{error}</div>

  return (
    <div className={styles.container}>
      <h1>Quản lý cá Koi</h1>
      <button onClick={handleCreateClick}>Tạo mới cá Koi</button>
      <table className={styles.fishTable}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Mệnh</th>
            <th>Chi tiết</th>
            <th>Cập nhật</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {currentKoiFishes.map((koi) => (
            <tr key={koi.id}>
              <td>{koi.name}</td>
              <td>{koi.price !== undefined ? koi.price.toLocaleString() + ' đ' : 'N/A'}</td>
              <td>
                {Array.isArray(koi.elements) && koi.elements.length > 0
                  ? koi.elements.map((element, index) => (
                      <React.Fragment key={`${koi.id}-element-${index}`}>
                        {element.name}
                        {index < koi.elements.length - 1 && ', '}
                      </React.Fragment>
                    ))
                  : 'Không có mệnh'}
              </td>
              <td>
                <button onClick={() => navigate(`/koiFishes/${koi.id}`)}>Xem chi tiết</button>
              </td>
              <td>
                <button onClick={() => handleEditClick(koi)}>Cập nhật</button>
              </td>
              <td>
                <button onClick={() => handleDelete(koi.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
          Đầu
        </button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Trước
        </button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Tiếp
        </button>
        <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
          Cuối
        </button>
      </div>
    </div>
  )
}

export default ManageFish
