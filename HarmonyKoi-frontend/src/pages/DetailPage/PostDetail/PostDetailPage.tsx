import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostById } from '../../../apis/post.api'
import { Post } from '../../../types'
import styles from './PostDetailPage.module.css'
import { formatDate, parseDate } from '../../../utils/helpers'

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await getPostById(id!)
        const postDetail = response.data.data
        const postWithDate = {
          ...postDetail,
          createdAt: formatDate(parseDate(postDetail.createdAt)),
          updatedAt: formatDate(parseDate(postDetail.updatedAt))
        }
        setPost(postWithDate)
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
    <div className={styles.postDetailContainer}>
      <div className={styles.banner}>
        <h1 className={styles.bannerTitle}>Chi tiết bài viết</h1>
      </div>
      <header className={styles.postHeader}>
        <h2 className={styles.postTitle}>{post?.title}</h2>
        <div className={styles.postMeta}>
          <span className={styles.metaItem}>Tác giả: {post?.user?.username || 'Ẩn danh'}</span>
          <span className={styles.metaItem}>Ngày đăng: {post?.createdAt}</span>
          <span className={styles.metaItem}>Trạng thái: {post?.status}</span>
        </div>
      </header>
      <div className={styles.postContent}>
        {post?.content.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
      <footer className={styles.postFooter}>
        <div className={styles.postInfo}>
          <span className={styles.infoItem}>Số ngày còn lại: {post?.dateRemain}</span>
          <span className={styles.infoItem}>Hiển thị: {post?.visible ? 'Có' : 'Không'}</span>
        </div>
        <div className={styles.lastUpdated}>Cập nhật lần cuối: {post?.updatedAt}</div>
      </footer>
    </div>
  )
}

export default PostDetailPage
