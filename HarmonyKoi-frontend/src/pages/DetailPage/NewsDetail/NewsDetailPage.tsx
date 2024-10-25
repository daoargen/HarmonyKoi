import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getNewsById } from '../../../apis/news.api'
import { News } from '../../../types'
import styles from './NewsDetailPage.module.css'
// import { formatDate, parseDate } from '../../../utils/helpers'
import banner from '../../../assets/images/banner.gif'

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await getNewsById(id!)
        const newsDetail = response.data.data
        console.log(newsDetail.createdAt)
        const postWithDate = {
          ...newsDetail,
          createdAt: newsDetail.createdAt,
          updatedAt: newsDetail.updatedAt
        }
        setNews(postWithDate)
      } catch (error) {
        setError('Không thể tải bài viết')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPostDetail()
  }, [id])

  if (loading) return <div className={styles.loading}>Đang tải...</div>
  if (error) return <div className={styles.error}>Lỗi: {error}</div>

  return (
    <div className={styles.newsDetailContainer}>
      <div className={styles.bannerImage}>
        <img src={banner} alt={news?.tittle} />
      </div>
      <div className={styles.newsContent}>
        <header className={styles.newsHeader}>
          <h1 className={styles.newsTitle}>{news?.tittle}</h1>
          <div className={styles.newsMeta}>
            <span className={styles.metaItem}>Ngày đăng: {news?.createdAt}</span>
          </div>
        </header>
        <div className={styles.newsBody}>
          {news?.content.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        <footer className={styles.newsFooter}>
          <div className={styles.newsInfo}>
            <div className={styles.lastUpdated}>Cập nhật lần cuối: {news?.updatedAt}</div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default PostDetailPage
