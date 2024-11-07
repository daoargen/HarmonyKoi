import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { KoiFishResponse, KoiFishAttributes } from '../../types/koiFish.type'
import styles from './koiFishDetail.module.css'

const KoiFishDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [koiFish, setKoiFish] = useState<KoiFishAttributes | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

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

  if (loading) {
    return <div className={styles.loading}>Đang tải dữ liệu...</div>
  }

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.background}></div> {/* Add background div */}
      <h1 className={styles.title}>{koiFish?.name}</h1>
      <div className={styles.content}>
        <img src={koiFish?.imageUrl} alt={koiFish?.name} className={styles.image} />
        <div className={styles.details}>
          {koiFish &&
            Object.keys(koiFish).map((key) => {
              if (
                ![
                  'id',
                  'variety',
                  'name',
                  'imageUrl',
                  'veriety',
                  'isDeleted',
                  'createdAt',
                  'updatedAt',
                  'varietyId' // Exclude varietyId here
                ].includes(key)
              ) {
                const value = koiFish[key as keyof KoiFishAttributes]
                if (key === 'variety' && typeof value === 'object') {
                  return (
                    <div key={key}>
                      <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                      <p>{`Description: ${value.description}`}</p>
                    </div>
                  )
                }
                if (key === 'elements' && Array.isArray(value)) {
                  return (
                    <div key={key}>
                      <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                      <ul>
                        {value.map((element) => (
                          <li key={element.id}>{element.name}</li>
                        ))}
                      </ul>
                    </div>
                  )
                }
                return (
                  <p key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                  </p>
                )
              }
              return null
            })}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={() => window.history.back()} className={styles.backButton}>
          Quay lại
        </button>
        <button onClick={() => alert('Mua ngay!')} className={styles.buyButton}>
          Mua ngay
        </button>
      </div>
    </div>
  )
}

export default KoiFishDetail
