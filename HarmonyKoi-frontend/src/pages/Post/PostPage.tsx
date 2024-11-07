import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import { Post } from '../../types/post.type'
import styles from './PostPage.module.css'
import { getPost } from '../../apis/post.api'
import koiImage from '../../assets/images/PostImage.jpg'
// import { formatDate, parseDate } from '../../utils/helpers'
import Paging from '../../components/common/Paging/Paging'
import { useNavigate } from 'react-router-dom'
import banner from '../../assets/images/banner.gif'

const BlogCard: React.FC<Post> = ({ id, title, content, createdAt, imageUrl }) => {
  const navigate = useNavigate()
  const truncatedContent = content.length > 100 ? content.substring(0, 100) + '...' : content

  const handleViewDetail = () => {
    navigate(`/posts/${id}`) // Chuyển hướng đến trang chi tiết bài viết
  }

  return (
    <div className={styles.blogCard}>
      <img src={imageUrl} alt={title} className={styles.blogCardImage} />
      <div className={styles.blogCardContent}>
        <h2 className={styles.blogCardTitle}>{title}</h2>
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

const PostPage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null) // Thêm kiểu cho error

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPost()
        console.log(response.data.data)
        console.log(typeof response.data.data[0].createdAt)

        const fetchPosts: Post[] = response.data.data

        setPosts(fetchPosts)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
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
      {/* {posts.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))} */}
      {posts.length > 0 ? (
        <Paging data={posts} itemsPerPage={9} renderItem={(post: Post) => <BlogCard key={post.id} {...post} />} />
      ) : (
        <div className={styles.noPostsMessage}>Không có bài viết nào</div>
      )}
      {/* </div> */}
    </div>
  )
}

export default PostPage
