import React, { useEffect, useState } from 'react'
import { Package } from '../../types'
import { getPackage } from '../../apis/package.api'
import styles from './HomePage.module.css'

const PackageCard: React.FC<Package> = ({ name, description, duration, amountPost, price }) => (
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
    <button className={styles.buyButton}>Mua ngay</button>
  </div>
)

const HomePage: React.FC = () => {
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

export default HomePage
