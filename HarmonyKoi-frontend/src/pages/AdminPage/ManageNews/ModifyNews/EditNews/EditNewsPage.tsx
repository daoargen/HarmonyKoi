import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getNewsById, updateNews } from '../../../../../apis/news.api'
import { News } from '../../../../../types/news.type'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { Textarea } from '../../../../../components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../../../components/ui/card'
import { AlertCircle, ArrowLeft, Save, Eye, EyeOff } from 'lucide-react'
import styles from './EditNewsPage.module.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditNewsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [news, setNews] = useState<News | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNewsById(id!)
        if (news?.imageUrl) {
          setImageUrl(news.imageUrl) // Initialize imageUrl state
        }
        setNews(response.data.data)
      } catch (err) {
        setError('Không thể tải bài viết')
        toast.error('Không thể tải bài viết')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [id, news?.imageUrl])

  const handleUpdateNews = async () => {
    if (news) {
      setIsSubmitting(true)
      //   const updatedStatus = news.status === 'APPROVED' || news.status === 'REJECTED' ? 'PENDING' : news.status // Reset status to PENDING
      try {
        await updateNews(news.id, {
          tittle: news.tittle,
          content: news.content,
          imageUrl: news.imageUrl
          //   status: updatedStatus,
          //   visible: news.visible
        })

        toast.success('Bài viết đã được cập nhật thành công.')

        navigate('/admin/manage/manage-news')
      } catch (err) {
        setError('Không thể cập nhật bài viết')
        toast.error('Không thể cập nhật bài viết')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'imageUrl') {
      setImageUrl(value) // Update imageUrl state directly
    } else if (news) {
      setNews({ ...news, [name]: value })
    }
    // setNews((prevNews) => (prevNews ? { ...prevNews, [name]: value } : null))
  }

  //   const handleVisibilityToggle = () => {
  //     setNews((prevNews) => {
  //       if (prevNews) {
  //         const newVisibility = !prevNews.visible
  //         toast.info(`Bài viết đã được ${newVisibility ? 'hiển thị' : 'ẩn'}`)
  //         return { ...prevNews, visible: newVisibility }
  //       }
  //       return null
  //     })
  //   }

  if (loading) return <div className={styles.loading}>Đang tải...</div>

  return (
    <div className={styles.editNewsContainer}>
      <Card className={styles.editNewsCard}>
        <CardHeader>
          <Button variant='ghost' className={styles.backButton} onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            Quay lại
          </Button>
          <CardTitle className={styles.title}>Chỉnh sửa tin tức</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className={styles.error}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}
          <div className={styles.formGroup}>
            <label htmlFor='title' className={styles.label}>
              Tiêu đề
            </label>
            <Input
              type='text'
              id='title'
              name='title'
              value={news?.tittle || ''}
              onChange={handleChange}
              className={styles.input}
              placeholder='Nhập tiêu đề tin tức'
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='content' className={styles.label}>
              Nội dung
            </label>
            <Textarea
              id='content'
              name='content'
              value={news?.content || ''}
              onChange={handleChange}
              className={styles.textarea}
              placeholder='Nhập nội dung tin tức'
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='imageUrl' className={styles.label}>
              URL hình ảnh
            </label>
            <Input
              type='text'
              id='imageUrl'
              name='imageUrl' // Add name attribute
              value={imageUrl} // Bind to imageUrl state
              onChange={handleChange}
              className={styles.input}
              placeholder='Nhập URL hình ảnh'
            />
          </div>
          {/* <div className={styles.visibilityToggle}>
            <Button variant='outline' onClick={handleVisibilityToggle} className={styles.visibilityButton}>
              {news?.visible ? (
                <>
                  <Eye size={20} />
                  Hiển thị
                </>
              ) : (
                <>
                  <EyeOff size={20} />
                  Ẩn
                </>
              )}
            </Button>
          </div> */}
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpdateNews} className={styles.updateButton} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className={styles.spinner}></div>
                Đang cập nhật...
              </>
            ) : (
              <>
                <Save size={20} />
                Cập nhật
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      <ToastContainer position='bottom-right' autoClose={3000} />
    </div>
  )
}

export default EditNewsPage
