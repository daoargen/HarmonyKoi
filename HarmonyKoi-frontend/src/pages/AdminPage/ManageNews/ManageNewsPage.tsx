import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { News } from '../../../types/news.type' // Cần tạo kiểu `News` nếu khác `news`
import { deleteNewsById, getNews } from '../../../apis/news.api'
import styles from './ManageNewsPage.module.css'
import { useNavigate } from 'react-router-dom'
import newsImage from '../../../assets/images/NewsImage.jpg'
import 'react-toastify/dist/ReactToastify.css'
import {
  PlusCircle,
  Edit,
  Trash2,
  // Eye,
  // EyeOff,
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

interface NewsDetailPopupProps {
  news: News
  onClose: () => void
}

const NewsDetailPopup: React.FC<NewsDetailPopupProps> = ({ news, onClose }) => {
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
        <h2 className={styles.popupTitle}>{news.tittle}</h2>
        {/* {news.imageUrl && ( */}
        <div className={styles.imageContainer}>
          <img src={newsImage} alt={news.tittle} className={styles.newsImage} />
        </div>
        {/* )} */}
        <div className={styles.popupContent}>
          <p>
            <strong>Nội dung:</strong> {news.content}
          </p>
          <p>
            <strong>Ngày tạo:</strong> {formatDate(parseDate(news.createdAt))}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

const NewsItem: React.FC<{
  news: News
  onDelete: (id: string) => void
  onToggleVisible: (id: string) => void
  onViewDetail: (news: News) => void
}> = ({ news, onDelete, onViewDetail }) => {
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate(`/edit-news/${news.id}`)
  }

  // const handleToggleVisible = () => {
  //   onToggleVisible(news.id)
  // }

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      onDelete(news.id)
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength) + '...'
  }

  return (
    <tr className={styles.newsItem}>
      <td className={styles.newsTitle}>{truncateText(news.tittle, 50)}</td>
      <td className={styles.newsContent}>{truncateText(news.content, 100)}</td>
      {/* <td className={styles.newsStatus}>{news.status}</td> */}
      {/* <td className={styles.newsContent}>{news.rejectReason}</td> */}
      <td className={styles.newsDate}>{formatDate(parseDate(news.createdAt))}</td>
      <td className={styles.actions}>
        <Button
          variant='ghost'
          onClick={() => onViewDetail(news)}
          className={`${styles.actionButton} ${styles.detailButton}`}
        >
          <Info size={16} />
        </Button>
        {/* <Button
          variant='ghost'
          onClick={handleToggleVisible}
          className={`${styles.actionButton} ${styles.visibleButton}`}
        >
          {news.visible ? <Eye size={16} /> : <EyeOff size={16} />}
        </Button> */}
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

const ManageNewsPage: React.FC = () => {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedNews, setSelectedNews] = useState<News | null>(null)
  const navigate = useNavigate()
  const itemsPerPage = 10

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews()
        setNews(response.data.data)
      } catch (err) {
        setError('Không thể tải danh sách tin tức')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await deleteNewsById(id)
      setNews(news.filter((item) => item.id !== id))
      toast.success('Xóa tin tức thành công')
    } catch (err) {
      toast.error('Không thể xóa tin tức')
    }
  }

  const handleToggleVisible = async (id: string) => {
    try {
      const newsToUpdate = news.find((item) => item.id === id)

      if (!newsToUpdate) return

      // const newVisibleState = !newsToUpdate.visible

      // await updateNewsVisible(id, newVisibleState)

      // setNews(news.map((item) => (item.id === id ? { ...item, visible: newVisibleState } : item)))
      // toast.success(`Tin tức đã được ${newVisibleState ? 'hiển thị' : 'ẩn'}`)
    } catch (error) {
      toast.error('Hãy đợi quản trị viên duyệt tin tức của bạn')
    }
  }

  const totalPages = Math.ceil(news.length / itemsPerPage)
  const currentNews = news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  if (loading) return <div className={styles.loading}>Đang tải...</div>
  if (error) return <div className={styles.error}>{error}</div>

  return (
    <div className={styles.manageNewsContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Quản lý tin tức</h1>
        <Button onClick={() => navigate('/add-news')} variant='default' className={styles.addButton}>
          <PlusCircle size={20} />
          Thêm tin tức mới
        </Button>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.newsList}>
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Nội dung</th>
              <th>Ngày đăng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentNews.map((item) => (
              <NewsItem
                key={item.id}
                news={item}
                onDelete={handleDelete}
                onToggleVisible={handleToggleVisible}
                onViewDetail={setSelectedNews}
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
        {selectedNews && <NewsDetailPopup news={selectedNews} onClose={() => setSelectedNews(null)} />}
      </AnimatePresence>

      <ToastContainer />
    </div>
  )
}

export default ManageNewsPage
