import React, { useState } from 'react'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { Textarea } from '../../../../../components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../../../components/ui/card'
import { createPost } from '../../../../../apis/post.api'
import styles from './AddPostPage.module.css'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, ArrowLeft, Send } from 'lucide-react'

const AddPostPage: React.FC = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleCreatePost = async () => {
    if (!title || !content) {
      setError('Vui lòng nhập đầy đủ tiêu đề và nội dung')
      return
    }

    setIsSubmitting(true)
    try {
      await createPost({ title, content, imageUrl })
      alert('Tạo bài viết thành công, hãy đợi quản trị viên duyệt bài')
      navigate('/member/manage/manage-posts')
    } catch (err) {
      setError('Không thể tạo bài viết')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.addPostContainer}>
      <Card className={styles.addPostCard}>
        <CardHeader>
          <Button variant='ghost' className={styles.backButton} onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            Quay lại
          </Button>
          <CardTitle className={styles.title}>Thêm bài viết mới</CardTitle>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              placeholder='Nhập tiêu đề bài viết'
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
              placeholder='Nhập nội dung bài viết'
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
          <Button onClick={handleCreatePost} className={styles.createButton} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className={styles.spinner}></div>
                Đang tạo...
              </>
            ) : (
              <>
                <Send size={20} />
                Tạo bài viết
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AddPostPage
