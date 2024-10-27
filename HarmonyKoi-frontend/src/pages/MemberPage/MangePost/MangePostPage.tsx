import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Post } from '../../../types'
import { deletePostById, getPostByMember, updatePostVisible } from '../../../apis/post.api'
import styles from './ManagePostPage.module.css'
import { useNavigate } from 'react-router-dom'
import { PlusCircle, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { formatDate, parseDate } from '../../../utils/helpers'

const PostItem: React.FC<{ post: Post; onDelete: (id: string) => void; onToggleVisible: (id: string) => void }> = ({
  post,
  onDelete,
  onToggleVisible
}) => {
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
      <td className={styles.postContent}>{post.status}</td>
      <td>{formatDate(parseDate(post.createdAt))}</td>
      <td className={styles.actions}>
        <Button variant='ghost' onClick={handleToggleVisible} className={styles.visibleButton}>
          {post.visible ? <Eye size={16} /> : <EyeOff size={16} />} {/* Hiển thị icon dựa trên visible */}
        </Button>
        <Button variant='link' onClick={handleEdit} className={styles.editButton}>
          <Edit size={16} />
        </Button>
        <Button variant='destructive' onClick={handleDelete} className={styles.deleteButton}>
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
  const navigate = useNavigate()

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
    } catch (err) {
      setError('Không thể xóa bài viết')
    }
  }

  const handleToggleVisible = async (id: string) => {
    try {
      const postToUpdate = posts.find((post) => post.id === id)

      if (!postToUpdate) return

      const newVisibleState = !postToUpdate.visible

      // Gọi API để cập nhật trạng thái visible trên backend
      await updatePostVisible(id, newVisibleState)

      // Nếu API thành công, cập nhật UI
      setPosts(posts.map((post) => (post.id === id ? { ...post, visible: newVisibleState } : post)))

      console.log(posts.map((post) => (post.id === id ? { ...post, visible: newVisibleState } : post)))
    } catch (error) {
      setError('Lỗi khi cập nhật trạng thái hiển thị.')
    }
  }

  if (loading) return <div className={styles.loading}>Đang tải...</div>
  if (error) return <div className={styles.error}>{error}</div>

  return (
    <div className={styles.managePostContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Quản lý bài viết</h1>
        <Button onClick={() => navigate('/add-post')} variant='link' className={styles.addButton}>
          <PlusCircle size={20} />
          Thêm bài viết mới
        </Button>
      </header>
      <table className={styles.postList}>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Nội dung</th>
            <th>Trạng thái</th>
            <th>Ngày đăng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} onDelete={handleDelete} onToggleVisible={handleToggleVisible} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManagePostPage
