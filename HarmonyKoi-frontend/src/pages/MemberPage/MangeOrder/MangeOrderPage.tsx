'use client'

import React, { useState, useEffect } from 'react'
import styles from './ManageOrderPage.module.css'
import { getOrderHistory } from '../../../apis/order.api'
import { Order } from '../../../types/order.type'

type OrderData = {
  totalOrders: number
  totalSpent: number
  formatOrders: Order[]
}

type Pagination = {
  pageSize: number
  totalItem: number
  currentPage: number
  maxPageSize: number
  totalPage: number
}

const mockPagination: Pagination = {
  pageSize: 10,
  totalItem: 4,
  currentPage: 1,
  maxPageSize: 100,
  totalPage: 1
}

const ManageOrderPage: React.FC = () => {
  const [data, setData] = useState<OrderData | null>(null)
  const [pagination, setPagination] = useState<Pagination>(mockPagination)
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED'>('ALL')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await getOrderHistory({
          pageIndex: 1, // Trang hiện tại
          pageSize: 10
        })
        console.log('orderResponse:', orderResponse) // In ra cấu trúc dữ liệu

        // Kiểm tra orderResponse.data.data trước khi truy cập thuộc tính
        if (orderResponse && orderResponse.data && orderResponse.data.data) {
          setData({
            totalOrders: orderResponse.data.data.totalOrders,
            totalSpent: orderResponse.data.data.totalSpent,
            formatOrders: orderResponse.data.data.formatOrders
          })
          setPagination(orderResponse.data.pagination)
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin order:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }))
    // Here you would typically fetch new data for the selected page
  }

  const handlePayOrder = (orderId: string) => {
    // Implement pay logic here
    console.log(`Paying order ${orderId}`)
  }

  const handleCancelOrder = (orderId: string) => {
    // Implement cancel logic here
    console.log(`Cancelling order ${orderId}`)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order Management</h1>

      {isLoading && <div>Loading...</div>}
      {!isLoading && data && (
        <>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Total Orders</h2>
              <p className={styles.cardValue}>{data.totalOrders}</p>
            </div>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Total Spent</h2>
              <p className={styles.cardValue}>{data.totalSpent.toLocaleString()} VND</p>
            </div>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Filter by Status</h2>
              <select
                className={styles.select}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'ALL' | 'PENDING' | 'COMPLETED')}
              >
                <option value='ALL'>All</option>
                <option value='PENDING'>Pending</option>
                <option value='COMPLETED'>Completed</option>
              </select>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.th}>Order ID</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Total Amount</th>
                  <th className={styles.th}>Created At</th>
                  <th className={styles.th}>Username</th>
                  <th className={styles.th}>Payment Code</th>
                  <th className={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {data.formatOrders.map((order) => (
                  <tr key={order.id}>
                    <td className={styles.td}>{order.id.slice(0, 8)}...</td>
                    <td className={styles.td}>
                      <span
                        className={`${styles.status} ${
                          order.status === 'COMPLETED' ? styles.completed : styles.pending
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className={styles.td}>{order.totalAmount.toLocaleString()} VND</td>
                    <td className={styles.td}>{order.createdAt}</td>
                    <td className={styles.td}>{order.user.username}</td>
                    <td className={styles.td}>{order.payment.paymentCode}</td>
                    <td className={styles.td}>
                      <button onClick={() => handlePayOrder(order.id)} className={styles.payButton}>
                        Pay
                      </button>
                      <button onClick={() => handleCancelOrder(order.id)} className={styles.cancelButton}>
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <div className={styles.pageInfo}>
              <p className={styles.paginationText}>
                Showing{' '}
                <span className={styles.paginationHighlight}>
                  {(pagination.currentPage - 1) * pagination.pageSize + 1}
                </span>{' '}
                to{' '}
                <span className={styles.paginationHighlight}>
                  {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItem)}
                </span>{' '}
                of <span className={styles.paginationHighlight}>{pagination.totalItem}</span> results
              </p>
            </div>
            <div className={styles.pageNavigation}>
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className={styles.navigationButton}
              >
                Previous
              </button>
              {/* Add page numbers here if needed */}
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPage}
                className={styles.navigationButton}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ManageOrderPage
