import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { KoiFishResponse, KoiFishAttributes } from '../../../types/koiFish.type'
import styles from './koiFishDetail.module.css'
import ConfirmModal from '../Confirm/ConfirmModal'
import { createKoiOrderPackage } from '../../../apis/order.api'
import { getToken } from '../../../utils/cookies'

const KoiFishDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [koiFish, setKoiFish] = useState<KoiFishAttributes | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const navigate = useNavigate()

  // Fetch Koi Fish data from API
  useEffect(() => {
    const fetchKoiFishDetail = async () => {
      try {
        const response = await axios.get<KoiFishResponse>(`http://localhost:1412/api/koiFishes/${id}`)
        if (response.data && response.data.data) {
          setKoiFish(response.data.data)
        } else {
          setError('Không có dữ liệu cá koi.')
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu cá koi.')
      } finally {
        setLoading(false)
      }
    }

    fetchKoiFishDetail()
  }, [id])

  // Handle buy action
  const handleBuy = () => {
    const token = getToken()
    if (!token) {
      alert('Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.')
      navigate('/login')
    } else {
      setIsModalOpen(true)
    }
  }

  // Confirm purchase and create order
  const handleConfirmPurchase = async () => {
    setIsProcessing(true)
    try {
      await createKoiOrderPackage({
        koiFishId: id,
        type: 'KOIFISH'
      })
      setIsModalOpen(false)
      alert('Tạo đơn hàng thành công')
      navigate('/member/manage/manage-orders')
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error)
      alert('Lỗi khi tạo đơn hàng. Vui lòng thử lại sau.')
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle loading and error states
  if (loading) {
    return <div className={styles.loading}>Đang tải dữ liệu...</div>
  }

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  // Render Koi Fish details
  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>{koiFish?.name}</h1>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img src={koiFish?.imageUrl} alt={koiFish?.name} className={styles.image} />
          </div>
          <div className={styles.details}>
            {koiFish && (
              <>
                <div className={styles.detailItem}>
                  <strong>Mô tả:</strong> {koiFish.description}
                </div>
                <div className={styles.detailItem}>
                  <strong>Màu sắc:</strong> {koiFish.baseColor}
                </div>
                <div className={styles.detailItem}>
                  <strong>Biểu tượng:</strong> {koiFish.symbolism}
                </div>
                <div className={styles.detailItem}>
                  <strong>Giá:</strong> {koiFish.price.toLocaleString()} VNĐ
                </div>
                {Array.isArray(koiFish.elements) && koiFish.elements.length > 0 ? (
                  <div className={styles.elements}>
                    <strong>Mệnh phù hợp:</strong>
                    <ul>
                      {koiFish.elements.map((element) => (
                        <li key={element.id}>{element.name}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>No elements available.</p>
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={() => window.history.back()} className={`${styles.backButton} ${styles.button}`}>
            <span className={styles.icon}>&lt;</span> Quay lại
          </button>
          <button onClick={handleBuy} className={`${styles.buyButton} ${styles.button}`}>
            <span className={styles.icon}>🛒</span> Mua ngay
          </button>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPurchase}
        packageName={koiFish?.name || ''}
        packagePrice={koiFish?.price || 0}
      />
    </div>
  )
}

export default KoiFishDetail
