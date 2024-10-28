import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Post } from '../../../types/post.type'
import { getPostByAdmin, updatePostStatus } from '../../../apis/post.api'
import styles from './ApprovePostPage.module.css'
import { Check, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { formatDate, parseDate } from '../../../utils/helpers'

interface PostDetailPopupProps {
  post: Post
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

const PostDetailPopup: React.FC<PostDetailPopupProps> = ({ post, onClose, onApprove, onReject }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2 className={styles.popupTitle}>{post.title}</h2>
        <div className={styles.popupContent}>
          <p>
            <strong>Người đăng:</strong> {post.user?.username}
          </p>
          <p>{post.content}</p>
          <p>Ngày tạo: {formatDate(parseDate(post.createdAt))}</p>
        </div>
        <div className={styles.popupActions}>
          <Button onClick={() => onApprove(post.id)} className={styles.approveButton}>
            <Check size={16} />
            Duyệt
          </Button>
          <Button onClick={() => onReject(post.id)} variant='outline' className={styles.rejectButton}>
            <X size={16} />
            Từ chối
          </Button>
        </div>
      </div>
    </div>
  )
}

const PostItem: React.FC<{ post: Post; onViewDetail: (post: Post) => void }> = ({ post, onViewDetail }) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength) + '...'
  }

  return (
    <tr className={styles.postItem}>
      <td className={styles.postTitle}>{truncateText(post.title, 50)}</td>
      <td className={styles.postContent}>{truncateText(post.content, 100)}</td>
      <td className={styles.postContent}>{post.user?.username}</td>
      <td>{formatDate(parseDate(post.createdAt))}</td>
      <td className={styles.actions}>
        <Button variant='outline' onClick={() => onViewDetail(post)} className={styles.viewDetailButton}>
          Xem thêm
        </Button>
      </td>
    </tr>
  )
}

const ApprovePostPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPostByAdmin()
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
      await updatePostStatus(id, 'APPROVED')
      setPosts(posts.filter((post) => post.id !== id))
      setSelectedPost(null)
    } catch (error) {
      setError('Lỗi khi duyệt bài viết.')
    }
  }

  const handleReject = async (id: string) => {
    try {
      await updatePostStatus(id, 'REJECTED')
      setPosts(posts.filter((post) => post.id !== id))
      setSelectedPost(null)
    } catch (error) {
      setError('Lỗi khi từ chối bài viết.')
    }
  }

  const totalPages = Math.ceil(posts.length / itemsPerPage)
  const currentPosts = posts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  if (loading) return <div className={styles.loading}>Đang tải...</div>
  if (error) return <div className={styles.error}>Lỗi: {error}</div>

  return (
    <div className={styles.managePostContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Duyệt Bài Viết</h1>
      </header>
      <div className={styles.tableContainer}>
        <table className={styles.postList}>
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Nội dung</th>
              <th>Người đăng</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <PostItem key={post.id} post={post} onViewDetail={setSelectedPost} />
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.paginationControls}>
        <Button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} variant='outline' size='icon'>
          <ChevronsLeft size={16} />
        </Button>
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          variant='outline'
          size='icon'
        >
          <ChevronLeft size={16} />
        </Button>
        <span className={styles.pageInfo}>
          Trang {currentPage} / {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant='outline'
          size='icon'
        >
          <ChevronRight size={16} />
        </Button>
        <Button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          variant='outline'
          size='icon'
        >
          <ChevronsRight size={16} />
        </Button>
      </div>
      {selectedPost && (
        <PostDetailPopup
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  )
}

export default ApprovePostPage
