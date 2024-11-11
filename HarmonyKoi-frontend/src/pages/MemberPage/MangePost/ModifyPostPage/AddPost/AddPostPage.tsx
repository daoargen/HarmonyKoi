import React, { useState } from 'react'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { Textarea } from '../../../../../components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../../../components/ui/card'
import { createPost } from '../../../../../apis/post.api'
import styles from './AddPostPage.module.css'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Send } from 'lucide-react'

const AddPostPage: React.FC = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState({
    title: '',
    content: '',
    imageUrl: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleCreatePost = async () => {
    const newErrors = { title: '', content: '', imageUrl: '' }

    if (!title) newErrors.title = 'Vui lòng nhập tiêu đề'

    if (!content) newErrors.content = 'Vui lòng nhập nội dung'

    if (!imageUrl) newErrors.imageUrl = 'Vui lòng nhập url hình ảnh '
    // You can optionally validate imageUrl as well

    setError(newErrors) // Set error immediately

    if (Object.values(newErrors).some(Boolean)) return // Stop if there are error
    setIsSubmitting(true)
    try {
      await createPost({ title, content, imageUrl })
      alert('Tạo bài viết thành công, hãy đợi quản trị viên duyệt bài')
      navigate('/member/manage/manage-posts')
    } catch (err) {
      alert('Không thể tạo bài viết')
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
          {/* {error && (
            <div className={styles.error}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )} */}
          <div className={styles.formGroup}>
            <label htmlFor='title' className={styles.label}>
              Tiêu đề
            </label>
            <Input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${styles.input} ${error.title && styles.invalid}`}
              placeholder='Nhập tiêu đề bài viết'
            />
          </div>
          {error.title && <p className={styles.errorMessage}>{error.title}</p>}
          <div className={styles.formGroup}>
            <label htmlFor='content' className={styles.label}>
              Nội dung
            </label>
            <Textarea
              id='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`${styles.textarea} ${error.content && styles.invalid}`}
              placeholder='Nhập nội dung bài viết'
            />
            {error.content && <p className={styles.errorMessage}>{error.content}</p>}
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
              className={`${styles.input} ${error.imageUrl && styles.invalid}`}
              placeholder='Nhập URL hình ảnh'
            />
            {error.imageUrl && <p className={styles.errorMessage}>{error.imageUrl}</p>}
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
