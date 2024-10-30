import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPostById, updatePost } from '../../../../../apis/post.api'
import { Post } from '../../../../../types/post.type'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { Textarea } from '../../../../../components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../../../components/ui/card'
import { AlertCircle, ArrowLeft, Save, Eye, EyeOff } from 'lucide-react'
import styles from './EditPostPage.module.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id!)
        setPost(response.data.data)
      } catch (err) {
        setError('Không thể tải bài viết')
        toast.error('Không thể tải bài viết')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleUpdatePost = async () => {
    if (post) {
      setIsSubmitting(true)
      const updatedStatus = post.status === 'APPROVED' || post.status === 'REJECTED' ? 'PENDING' : post.status // Reset status to PENDING
      try {
        await updatePost(post.id, {
          title: post.title,
          content: post.content,
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
        setError('Không thể cập nhật bài viết')
        toast.error('Không thể cập nhật bài viết')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPost((prevPost) => (prevPost ? { ...prevPost, [name]: value } : null))
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
              value={post?.title || ''}
              onChange={handleChange}
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
              name='content'
              value={post?.content || ''}
              onChange={handleChange}
              className={styles.textarea}
              placeholder='Nhập nội dung bài viết'
            />
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
