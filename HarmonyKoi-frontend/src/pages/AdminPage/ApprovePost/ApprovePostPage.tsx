import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Post } from '../../../types/post.type'
import { createReject, getPostByAdmin, updatePostStatus } from '../../../apis/post.api'
import styles from './ApprovePostPage.module.css'
import { Check, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { formatDate, parseDate } from '../../../utils/helpers'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, ToastContainer } from 'react-toastify'
import koiImg from '../../../assets/images/PostImage.jpg'
import 'react-toastify/dist/ReactToastify.css'

interface PostDetailPopupProps {
  post: Post
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

interface RejectReasonPopupProps {
  post: Post
  onClose: () => void
  onConfirmReject: (id: string, reason: string) => void
}

const RejectReasonPopup: React.FC<RejectReasonPopupProps> = ({ post, onClose, onConfirmReject }) => {
  const [rejectReason, setRejectReason] = useState('')

  const handleConfirmReject = () => {
    onConfirmReject(post.id, rejectReason)
    onClose()
  }

  return (
    <motion.div className={styles.popupOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className={styles.rejectReasonContainer}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 300 }}
      >
        <div className={styles.rejectReasonCard}>
          <div className={styles.rejectReasonHeader}>
            <h2 className={styles.rejectReasonTitle}>Lý do từ chối</h2>
            <button className={styles.rejectReasonClose} onClick={onClose}>
              <X />
            </button>
          </div>
          <p className={styles.rejectReasonPostTitle}>
            <strong className={styles.rejectReasonTitleStrong}>Bài viết: {post.title}</strong>
          </p>
          <div className={styles.rejectReasonContent}>
            <textarea
              placeholder='Nhập lý do từ chối'
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className={styles.rejectReasonTextarea}
            />
          </div>
          <div className={styles.rejectReasonFooter}>
            <button className={styles.rejectReasonButtonCancel} onClick={onClose}>
              Hủy
            </button>
            <button className={styles.rejectReasonButtonConfirm} onClick={handleConfirmReject}>
              Gửi
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const PostDetailPopup: React.FC<PostDetailPopupProps> = ({ post, onClose, onApprove, onReject }) => {
  const [showRejectPopup, setShowRejectPopup] = useState(false)

  const handleRejectClick = () => {
    setShowRejectPopup(true)
  }

  const handleConfirmReject = async (id: string, reason: string) => {
    try {
      await createReject(id, { rejectReason: reason }) // call createReject API
      onReject(id)

      toast.info('Bài viết đã bị từ chối.')
    } catch (error) {
      toast.error('Lỗi khi từ chối bài viết.')
    }
  }

  return (
    <motion.div className={styles.popupOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className={styles.popup}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 300 }}
      >
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2 className={styles.popupTitle}>{post.title}</h2>
        {koiImg && (
          <div className={styles.imageContainer}>
            <img src={post.imageUrl} alt='Post Image' className={styles.postImage} />
          </div>
        )}
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
          <Button onClick={handleRejectClick} variant='outline' className={styles.rejectButton}>
            <X size={16} />
            Từ chối
          </Button>
        </div>
      </motion.div>
      <AnimatePresence>
        {showRejectPopup && (
          <RejectReasonPopup
            post={post}
            onClose={() => setShowRejectPopup(false)}
            onConfirmReject={handleConfirmReject}
          />
        )}
      </AnimatePresence>
    </motion.div>
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
      toast.success('Bài viết đã được duyệt thành công!')
    } catch (error) {
      toast.error('Lỗi khi duyệt bài viết.')
    }
  }

  const handleReject = async (id: string) => {
    try {
      await updatePostStatus(id, 'REJECTED')
      setPosts(posts.filter((post) => post.id !== id))
      setSelectedPost(null)
      toast.info('Bài viết đã bị từ chối.')
    } catch (error) {
      toast.error('Lỗi khi từ chối bài viết.')
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
      <AnimatePresence>
        {selectedPost && (
          <PostDetailPopup
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
      </AnimatePresence>
      <ToastContainer position='bottom-right' autoClose={3000} />
    </div>
  )
}

export default ApprovePostPage
