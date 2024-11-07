import React, { useEffect, useState } from 'react'
import { getAllUsers, deleteUser } from '../../../apis/users.api'
import { User } from '../../../types/user.type'
import styles from './UserPageManagement.module.css'

const ManageUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers()
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data)
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
  }, [])

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id)
      setUsers(users.filter((user) => user.id !== id))
    } catch (error) {
      setError('Xóa người dùng không thành công')
    }
  }

  if (loading) return <p className={styles.loading}>Đang tải...</p>
  if (error) return <p className={styles.error}>{error}</p>

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quản lý người dùng</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Chức vụ</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className={styles.deleteButton} onClick={() => handleDeleteUser(user.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageUser
