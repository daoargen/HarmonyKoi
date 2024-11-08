import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Post } from '../../../types/post.type'
import { deletePostById, getPostByMember, updatePostVisible } from '../../../apis/post.api'
import styles from './ManagePostPage.module.css'
import { useNavigate } from 'react-router-dom'
import koiImage from '../../../assets/images/PostImage.jpg'
import 'react-toastify/dist/ReactToastify.css'
import {
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  Info
} from 'lucide-react'
import { formatDate, parseDate } from '../../../utils/helpers'
import { toast, ToastContainer } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'

interface PostDetailPopupProps {
  post: Post
  onClose: () => void
}

const PostDetailPopup: React.FC<PostDetailPopupProps> = ({ post, onClose }) => {
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
          <X size={24} />
        </button>
        <h2 className={styles.popupTitle}>{post.title}</h2>
        {post.imageUrl && (
          <div className={styles.imageContainer}>
            <img src={koiImage} alt={post.title} className={styles.postImage} />
          </div>
        )}
        <div className={styles.popupContent}>
          <p>
            <strong>Nội dung:</strong> {post.content}
          </p>
          <p>
            <strong>Trạng thái:</strong> {post.status}
          </p>
          <p>
            <strong>Lý do từ chối:</strong> {post.rejectReason || 'Không có'}
          </p>
          <p>
            <strong>Ngày tạo:</strong> {formatDate(parseDate(post.createdAt))}
          </p>
          <p>
            <strong>Hiển thị:</strong> {post.visible ? 'Có' : 'Không'}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

const PostItem: React.FC<{
  post: Post
  onDelete: (id: string) => void
  onToggleVisible: (id: string) => void
  onViewDetail: (post: Post) => void
}> = ({ post, onDelete, onToggleVisible, onViewDetail }) => {
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate(`/edit-post/${post.id}`)
  }

  const handleToggleVisible = () => {
    onToggleVisible(post.id)
  }

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      onDelete(post.id)
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength) + '...'
  }

  return (
    <tr className={styles.postItem}>
      <td className={styles.postTitle}>{truncateText(post.title, 50)}</td>
      <td className={styles.postContent}>{truncateText(post.content, 100)}</td>
      <td className={styles.postStatus}>{post.status}</td>
      <td className={styles.postContent}>{post.rejectReason}</td>
      <td className={styles.postDate}>{formatDate(parseDate(post.createdAt))}</td>
      <td className={styles.actions}>
        <Button
          variant='ghost'
          onClick={() => onViewDetail(post)}
          className={`${styles.actionButton} ${styles.detailButton}`}
        >
          <Info size={16} />
        </Button>
        <Button
          variant='ghost'
          onClick={handleToggleVisible}
          className={`${styles.actionButton} ${styles.visibleButton}`}
        >
          {post.visible ? <Eye size={16} /> : <EyeOff size={16} />}
        </Button>
        <Button variant='ghost' onClick={handleEdit} className={`${styles.actionButton} ${styles.editButton}`}>
          <Edit size={16} />
        </Button>
        <Button variant='ghost' onClick={handleDelete} className={`${styles.actionButton} ${styles.deleteButton}`}>
          <Trash2 size={16} />
        </Button>
      </td>
    </tr>
  )
}

const ManagePostPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const navigate = useNavigate()
  const itemsPerPage = 10

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPostByMember()
        setPosts(response.data.data)
      } catch (err) {
        setError('Không thể tải danh sách bài viết')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await deletePostById(id)
      setPosts(posts.filter((post) => post.id !== id))
      toast.success('Xóa bài viết thành công')
    } catch (err) {
      toast.error('Không thể xóa bài viết')
    }
  }

  const handleToggleVisible = async (id: string) => {
    try {
      const postToUpdate = posts.find((post) => post.id === id)

      if (!postToUpdate) return

      const newVisibleState = !postToUpdate.visible

      await updatePostVisible(id, newVisibleState)

      setPosts(posts.map((post) => (post.id === id ? { ...post, visible: newVisibleState } : post)))
      toast.success(`Bài viết đã được ${newVisibleState ? 'hiển thị' : 'ẩn'}`)
    } catch (error) {
      toast.error('Hãy đợi quản trị viên duyệt bài của bạn')
    }
  }

  const totalPages = Math.ceil(posts.length / itemsPerPage)
  const currentPosts = posts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  if (loading) return <div className={styles.loading}>Đang tải...</div>
  if (error) return <div className={styles.error}>{error}</div>

  return (
    <div className={styles.managePostContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Quản lý bài viết</h1>
        <Button onClick={() => navigate('/add-post')} variant='default' className={styles.addButton}>
          <PlusCircle size={20} />
          Thêm bài viết mới
        </Button>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.postList}>
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Nội dung</th>
              <th>Trạng thái</th>
              <th>Lý do</th>
              <th>Ngày đăng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onDelete={handleDelete}
                onToggleVisible={handleToggleVisible}
                onViewDetail={setSelectedPost}
              />
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
        {selectedPost && <PostDetailPopup post={selectedPost} onClose={() => setSelectedPost(null)} />}
      </AnimatePresence>
      <ToastContainer position='bottom-right' autoClose={3000} />
    </div>
  )
}

export default ManagePostPage
