import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import { News } from '../../types'
import styles from './NewsPage.module.css'
import koiImage from '../../assets/images/koiImage.jpg'
import { getNews } from '../../apis/news.api'
import { formatDate, parseDate } from '../../utils/helpers'
import Paging from '../../components/common/Paging/Paging'

const BlogCard: React.FC<News> = ({ tittle, content, createdAt }) => {
  const truncatedContent = content.length > 100 ? content.substring(0, 100) + '...' : content

  return (
    <div className={styles.blogCard}>
      <img src={koiImage} alt={tittle} className={styles.blogCardImage} />
      <div className={styles.blogCardContent}>
        <h2 className={styles.blogCardTitle}>{tittle}</h2>
        <p className={styles.blogCardDescription}>{truncatedContent}</p> {/* Hiển thị nội dung đã cắt bớt */}
        <div className={styles.blogCardMeta}>
          <span>{formatDate(createdAt)}</span>
        </div>
        <Button variant='outline' className={styles.blogCardButton}>
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

        const newsWithData = fetchNews.map((newsData) => ({
          ...newsData,
          createdAt: parseDate(newsData.createdAt),
          updatedAt: parseDate(newsData.updatedAt)
        }))
        setNews(newsWithData)
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
      {/* <div className={styles.blogGrid}> */}
      {/* {news.map((newsData) => (
        <BlogCard key={newsData.id} {...newsData} />
      ))} */}
      {/* </div> */}

      <Paging
        data={news}
        itemsPerPage={9} // hoặc số lượng items mỗi trang bạn muốn
        renderItem={(newsData: News) => <BlogCard key={newsData.id} {...newsData} />}
      />
    </div>
  )
}

export default NewsPage
