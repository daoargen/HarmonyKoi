// ApprovePage.tsx
import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Post } from '../../../types'
import { getPostsForApproval, updatePostStatus } from '../../../apis/post.api' // API calls for approval
import styles from './ApprovePage.module.css' // Import CSS
import { Check, X } from 'lucide-react'
import { formatDate, parseDate } from '../../../utils/helpers'

const PostItem: React.FC<{ post: Post; onApprove: (id: string) => void; onReject: (id: string) => void }> = ({
  post,
  onApprove,
  onReject
}) => {
  const handleApprove = () => {
    onApprove(post.id)
  }

  const handleReject = () => {
    onReject(post.id)
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength) + '...'
  }

  return (
    <tr className={styles.postItem}>
      <td className={styles.postTitle}>{truncateText(post.title, 50)}</td>
      <td className={styles.postContent}>{truncateText(post.content, 100)}</td>
      <td>{formatDate(parseDate(post.createdAt))}</td>
      <td className={styles.actions}>
        <Button variant='ghost' onClick={handleApprove} className={`${styles.actionButton} ${styles.approveButton}`}>
          <Check size={16} />
        </Button>
        <Button variant='ghost' onClick={handleReject} className={`${styles.actionButton} ${styles.rejectButton}`}>
          <X size={16} />
        </Button>
      </td>
    </tr>
  )
}

const ApprovePostPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPostsForApproval()
        setPosts(response.data.data)
      } catch (err) {
        setError('Không thể tải danh sách bài viết.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleApprove = async (id: string) => {
    try {
      await updatePostStatus(id, 'APPROVED') // Update status to APPROVED
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      setError('Lỗi khi duyệt bài viết.')
    }
  }

  const handleReject = async (id: string) => {
    try {
      await updatePostStatus(id, 'REJECTED') // Update status to REJECTED
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      setError('Lỗi khi từ chối bài viết.')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className={styles.container}>
      <h1>Duyệt Bài Viết</h1>
      <table>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Nội dung</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} onApprove={handleApprove} onReject={handleReject} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ApprovePostPage
