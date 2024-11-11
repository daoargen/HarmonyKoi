import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import { News } from '../../types/news.type'
import styles from './NewsPage.module.css'
// import koiImage from '../../assets/images/NewsImage.jpg'
import { getNews } from '../../apis/news.api'
// import { formatDate, parseDate } from '../../utils/helpers'
import Paging from '../../components/common/Paging/Paging'
import banner from '../../assets/images/banner.gif'
import { useNavigate } from 'react-router-dom'

export const BlogCard: React.FC<News> = ({ id, tittle, content, imageUrl, createdAt }) => {
  const navigate = useNavigate()
  const truncatedContent = content.length > 100 ? content.substring(0, 100) + '...' : content
  const handleViewDetail = () => {
    navigate(`/news/${id}`) // Chuyển hướng đến trang chi tiết bài viết
  }
  return (
    <div className={styles.blogCard}>
      <img src={imageUrl || ''} alt={tittle} className={styles.blogCardImage} />
      <div className={styles.blogCardContent}>
        <h2 className={styles.blogCardTitle}>{tittle}</h2>
        <p className={styles.blogCardDescription}>{truncatedContent}</p> {/* Hiển thị nội dung đã cắt bớt */}
        <div className={styles.blogCardMeta}>
          <span>{createdAt}</span>
        </div>
        <Button variant='outline' className={styles.blogCardButton} onClick={handleViewDetail}>
          Xem thêm
        </Button>
      </div>
    </div>
  )
}

const NewsPage = () => {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null) // Thêm kiểu cho error

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews()
        console.log(response.data.data)

        const fetchNews: News[] = response.data.data

        setNews(fetchNews)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    // Thêm phần return cho PostPage
    <div className={styles.blogContainer}>
      <div className={styles.bannerImage}>
        <img src={banner} />
      </div>
      {/* <div className={styles.blogGrid}> */}
      {/* {news.map((newsData) => (
        <BlogCard key={newsData.id} {...newsData} />
      ))} */}
      {/* </div> */}

      {news.length > 0 ? (
        <Paging data={news} itemsPerPage={9} renderItem={(news: News) => <BlogCard key={news.id} {...news} />} />
      ) : (
        <div className={styles.noPostsMessage}>Không có tin tức nào</div>
      )}
    </div>
  )
}

export default NewsPage
