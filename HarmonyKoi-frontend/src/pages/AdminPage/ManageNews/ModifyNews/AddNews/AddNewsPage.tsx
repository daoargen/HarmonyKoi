import React, { useState } from 'react'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { Textarea } from '../../../../../components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../../../components/ui/card'
import { createNews } from '../../../../../apis/news.api'
import styles from './AddnewsPage.module.css'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, ArrowLeft, Send } from 'lucide-react'

const AddNewsPage: React.FC = () => {
  const [tittle, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleCreateNews = async () => {
    if (!tittle || !content) {
      setError('Vui lòng nhập đầy đủ tiêu đề và nội dung')
      return
    }

    setIsSubmitting(true)
    try {
      await createNews({ tittle, content, imageUrl })
      alert('Tạo tin tức thành công')
      navigate('/admin/manage/manage-news')
    } catch (err) {
      setError('Không thể tạo tin tức')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.addNewsContainer}>
      <Card className={styles.addNewsCard}>
        <CardHeader>
          <Button variant='ghost' className={styles.backButton} onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            Quay lại
          </Button>
          <CardTitle className={styles.tittle}>Thêm tin tức mới</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className={styles.error}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}
          <div className={styles.formGroup}>
            <label htmlFor='tittle' className={styles.label}>
              Tiêu đề
            </label>
            <Input
              type='text'
              id='tittle'
              value={tittle}
              onChange={(e) => setTitle(e.target.value)}
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={styles.input}
              placeholder='Nhập URL hình ảnh'
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCreateNews} className={styles.createButton} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className={styles.spinner}></div>
                Đang tạo...
              </>
            ) : (
              <>
                <Send size={20} />
                Tạo tin tức
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AddNewsPage
