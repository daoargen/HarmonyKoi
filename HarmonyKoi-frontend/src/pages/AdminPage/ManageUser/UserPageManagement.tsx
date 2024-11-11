import React, { useEffect, useState } from 'react'
import { getAllUsers, deleteUser, getUser } from '../../../apis/users.api'
import { User } from '../../../types/user.type'
import styles from './UserPageManagement.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Info } from 'lucide-react'
import { Button } from '../../../components/ui/button'
interface UserDetailPopupProps {
  id: string
  onClose: () => void
}
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

const UserDetailPopup: React.FC<UserDetailPopupProps> = ({ id, onClose }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  console.log(user)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(id)
        setUser(response.data.data) // Lưu data vào state user
      } catch (error) {
        setError('Lỗi khi tải thông tin người dùng')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      // Chỉ fetch khi có id
      fetchUser()
    }
  }, [id])

  if (loading) return <div className={styles.loading}>Đang tải...</div>
  if (error) return <div className={styles.error}>{error}</div>
  if (!user) return null

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
        <h2 className={styles.popupTitle}>{user.username}</h2>
        <div className={styles.imageContainer}>
          <img src={user.avatarUrl} alt='Avatar' className={styles.avatar} />
        </div>
        <div className={styles.popupContent}>
          <p>
            <strong>Email:</strong> {user.user.email}
          </p>
          <p>
            <strong>Giới tính:</strong> {user.gender}
          </p>
          <p>
            <strong>Chức vụ:</strong> {user.user.role}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

const ManageUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 // Số lượng user mỗi trang

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers()
        if (Array.isArray(response.data.data)) {
          // Lọc người dùng với role là "member"
          const memberUsers = response.data.data.filter((user) => user.role === 'MEMBER')
          setUsers(memberUsers)
        } else {
          console.error('API response không phải là mảng', response.data.data)
        }
      } catch (error) {
        setError('Không thể tải danh sách người dùng')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, []) // Chỉ chạy useEffect một lần khi component mount

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id)
      setUsers(users.filter((user) => user.id !== id))
      setShowDeleteConfirmation(null) // Đóng popup sau khi xóa
    } catch (error) {
      setError('Xóa người dùng không thành công')
      setShowDeleteConfirmation(null) // Đóng popup nếu lỗi
    }
  }

  const confirmDelete = (id: string) => {
    setShowDeleteConfirmation(id)
  }

  if (loading) return <p className={styles.loading}>Đang tải...</p>
  if (error) return <p className={styles.error}>{error}</p>

  const totalPages = Math.ceil(users.length / itemsPerPage)
  const indexOfLastUser = currentPage * itemsPerPage
  const indexOfFirstUser = indexOfLastUser - itemsPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quản lý người dùng</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tên</th>
            {/* <th>Email</th> */}
            <th>Chức vụ</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers
            .filter((user) => user.role === 'MEMBER')
            .map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                {/* <td>{user.email}</td> */}
                <td>{user.role}</td>
                <td>
                  <Button variant='ghost' onClick={() => setSelectedUserId(user.id)} className={styles.detailButton}>
                    Chi Tiết
                  </Button>

                  {/* <button className={styles.deleteButton} onClick={() => confirmDelete(user.id)}>
                    Xóa
                  </button> */}
                  <AnimatePresence>
                    {showDeleteConfirmation === user.id && (
                      <motion.div
                        className={styles.deleteConfirmationOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className={styles.deleteConfirmationPopup}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                        >
                          <Info size={20} className={styles.confirmIcon} />
                          <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
                          <div className={styles.confirmationButtons}>
                            <Button onClick={() => handleDeleteUser(user.id)}>Có</Button>
                            <Button variant='outline' onClick={() => setShowDeleteConfirmation(null)}>
                              Không
                            </Button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

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
        {selectedUserId && <UserDetailPopup id={selectedUserId} onClose={() => setSelectedUserId(null)} />}
      </AnimatePresence>
    </div>
  )
}

export default ManageUser
