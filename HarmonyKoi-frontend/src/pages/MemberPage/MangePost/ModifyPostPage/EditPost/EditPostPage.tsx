import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPostById, updatePost } from '../../../../../apis/post.api'
import { Post } from '../../../../../types/post.type'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { Textarea } from '../../../../../components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../../../components/ui/card'
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react'
import styles from './EditPostPage.module.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({
    title: '',
    content: '',
    imageUrl: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id!)
        if (post?.imageUrl) {
          setImageUrl(post.imageUrl) // Initialize imageUrl state
        }
        setPost(response.data.data)
      } catch (err) {
        alert('Không thể tải bài viết')
        toast.error('Không thể tải bài viết')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id, post?.imageUrl])

  const handleUpdatePost = async () => {
    if (!post) return // Guard clause

    const newErrors = { title: '', content: '', imageUrl: '' }

    if (!post.title) {
      newErrors.title = 'Vui lòng nhập tiêu đề'
    }
    if (!post.content) {
      newErrors.content = 'Vui lòng nhập nội dung'
    }
    if (!imageUrl) {
      // Validate imageUrl separately
      newErrors.imageUrl = 'Vui lòng nhập URL hình ảnh'
    }

    setError(newErrors)

    if (Object.values(newErrors).some(Boolean)) return

    setIsSubmitting(true)

    const updatedStatus = post.status === 'APPROVED' || post.status === 'REJECTED' ? 'PENDING' : post.status // Reset status to PENDING
    try {
      await updatePost(post.id, {
        title: post.title,
        content: post.content,
        imageurl: post.imageUrl,
        status: updatedStatus,
        visible: post.visible
      })
      if (updatedStatus === 'PENDING') {
        toast.success('Cập nhật thành công. Đợi quản trị viên duyệt bài.') // Thông báo nếu chuyển về PENDING
      } else {
        toast.success('Bài viết đã được cập nhật thành công.')
      }

      navigate('/member/manage/manage-posts')
    } catch (err) {
      alert('Không thể cập nhật bài viết')
      toast.error('Không thể cập nhật bài viết')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'imageUrl') {
      setImageUrl(value) // Update imageUrl state directly
      setError((prevErrors) => ({ ...prevErrors, imageUrl: '' })) // Clear error
    } else if (post) {
      setPost({ ...post, [name]: value })
      setError((prevErrors) => ({ ...prevErrors, [name]: '' })) // Clear error
    }
    // setPost((prevPost) => (prevPost ? { ...prevPost, [name]: value } : null))
  }

  const handleVisibilityToggle = () => {
    setPost((prevPost) => {
      if (prevPost) {
        const newVisibility = !prevPost.visible
        toast.info(`Bài viết đã được ${newVisibility ? 'hiển thị' : 'ẩn'}`)
        return { ...prevPost, visible: newVisibility }
      }
      return null
    })
  }

  if (loading) return <div className={styles.loading}>Đang tải...</div>

  return (
    <div className={styles.editPostContainer}>
      <Card className={styles.editPostCard}>
        <CardHeader>
          <Button variant='ghost' className={styles.backButton} onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            Quay lại
          </Button>
          <CardTitle className={styles.title}>Chỉnh sửa bài viết</CardTitle>
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
              name='title'
              value={post?.title || ''}
              onChange={handleChange}
              className={`${styles.input} ${error.title && styles.invalid}`}
              placeholder='Nhập tiêu đề bài viết'
            />
            {error.title && <p className={styles.errorMessage}>{error.title}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='content' className={styles.label}>
              Nội dung
            </label>
            <Textarea
              id='content'
              name='content'
              value={post?.content || ''}
              onChange={handleChange}
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
              name='imageUrl' // Add name attribute
              value={imageUrl} // Bind to imageUrl state
              onChange={handleChange}
              className={`${styles.input} ${error.imageUrl && styles.invalid}`}
              placeholder='Nhập URL hình ảnh'
            />
            {error.imageUrl && <p className={styles.errorMessage}>{error.imageUrl}</p>}
          </div>
          <div className={styles.visibilityToggle}>
            <Button variant='outline' onClick={handleVisibilityToggle} className={styles.visibilityButton}>
              {post?.visible ? (
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
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpdatePost} className={styles.updateButton} disabled={isSubmitting}>
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

export default EditPostPage
