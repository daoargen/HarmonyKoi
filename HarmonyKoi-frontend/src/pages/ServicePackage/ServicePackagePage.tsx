import React, { useEffect, useState } from 'react'
import { Package } from '../../types/package.type'
import { getPackage, getPackageById } from '../../apis/package.api'
import { checkExistingOrder, createOrderPackage } from '../../apis/order.api'
import styles from './ServicePackagePage.module.css'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  packageName: string
  packagePrice: number
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, packageName, packagePrice }) => {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          <X size={20} />
        </button>
        <h3 className={styles.modalTitle}>Xác nhận mua gói</h3>
        <div className={styles.modalBody}>
          <p>
            Bạn có chắc chắn muốn mua gói <strong>{packageName}</strong>?
          </p>
          <p className={styles.modalPrice}>Giá: {packagePrice.toLocaleString()} VND</p>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            Xác nhận
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  )
}

const PackageCard: React.FC<Package> = ({ name, description, duration, amountPost, price, id }) => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleBuy = async () => {
    setIsModalOpen(true)
  }

  const handleConfirmPurchase = async () => {
    setIsProcessing(true)
    try {
      const existingOrder = await checkExistingOrder(id) // Kiểm tra đơn hàng đã tồn tại

      if (existingOrder) {
        alert('Bạn đã có gói này hoặc chưa thanh toán. Vui lòng chọn gói khác.')
        setIsModalOpen(false)
        return // Dừng xử lý nếu đơn hàng đã tồn tại
      }

      const packageDetail = await getPackageById(id)
      // Tạo đơn hàng sử dụng packageId từ packageDetail
      await createOrderPackage({ packageId: packageDetail.data.data.id, type: 'PACKAGE' })
      // await createOrderPackage({ packageId, type: 'PACKAGE' })
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

  return (
    <>
      <div className={styles.packageCard}>
        <h2 className={styles.packageTitle}>{name}</h2>
        <div className={styles.packageDescriptionWrapper}>
          <p className={styles.packageDescription}>{description}</p>
        </div>
        <ul className={styles.packageFeatures}>
          <li>
            <span className={styles.featureLabel}>Thời hạn:</span>
            <span className={styles.featureValue}>{duration} ngày</span>
          </li>
          <li>
            <span className={styles.featureLabel}>Số lượng bài đăng:</span>
            <span className={styles.featureValue}>{amountPost}</span>
          </li>
          <li>
            <span className={styles.featureLabel}>Giá:</span>
            <span className={styles.featureValue}>{price.toLocaleString()} VND</span>
          </li>
        </ul>
        <button className={styles.buyButton} onClick={handleBuy} disabled={isProcessing}>
          {isProcessing ? 'Đang xử lý...' : 'Mua ngay'}
        </button>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPurchase}
        packageName={name}
        packagePrice={price}
      />
    </>
  )
}

// Rest of the PackagePage component remains the same
const PackagePage: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await getPackage()
        setPackages(response.data.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  if (loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Các Gói Dịch Vụ</h1>
      <div className={styles.packageGrid}>
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} {...pkg} />
        ))}
      </div>
    </div>
  )
}

export default PackagePage
