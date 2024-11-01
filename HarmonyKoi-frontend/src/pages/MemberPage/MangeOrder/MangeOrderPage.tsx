'use client'

import React, { useState, useEffect } from 'react'
import styles from './ManageOrderPage.module.css'
import { deleteOrder, getOrderHistory, getOrderId } from '../../../apis/order.api'
import { Order } from '../../../types/order.type'
import PaymentButton from '../../../components/common/PaymentModal/PaymentModal'
import { X } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import { getPayment, getPaymentById } from '../../../apis/payment.api'

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

interface CancelModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  orderAmount: number
}

const CancelModal: React.FC<CancelModalProps> = ({ isOpen, onClose, onConfirm, orderAmount }) => {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          <X size={20} />
        </button>
        <h3 className={styles.modalTitle}>Xác nhận hủy đơn hàng</h3>
        <div className={styles.modalBody}>
          <p>Bạn có chắc chắn muốn hủy đơn hàng này?</p>
          <p className={styles.modalPrice}>Số tiền: {orderAmount.toLocaleString()} VND</p>
          <p className={styles.modalWarning}>Lưu ý: Hành động này không thể hoàn tác!</p>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            Xác nhận hủy
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}

const ManageOrderPage: React.FC = () => {
  const [data, setData] = useState<OrderData | null>(null)
  const [pagination, setPagination] = useState<Pagination>({
    pageSize: 3,
    totalItem: 0,
    currentPage: 1,
    maxPageSize: 100,
    totalPage: 1
  })
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED'>('ALL')
  const [isLoading, setIsLoading] = useState(true)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const orderResponse = await getOrderHistory({
        pageIndex: pagination.currentPage,
        pageSize: pagination.pageSize
      })

      if (orderResponse && orderResponse.data) {
        setData({
          totalOrders: orderResponse.data.data.totalOrders,
          totalSpent: orderResponse.data.data.totalSpent,
          formatOrders: orderResponse.data.data.formatOrders
        })
        setPagination(orderResponse.data.pagination)
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin order:', error)
      toast.error('Không thể tải danh sách đơn hàng')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pagination.currentPage, pagination.pageSize, statusFilter])

  const handlePayment = async (order: Order) => {
    const response = await getOrderId(order.id)
    console.log(response.data.data.payment)
  }

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }))
  }

  const handleCancelOrder = async (order: Order) => {
    setSelectedOrder(order)
    setCancelModalOpen(true)
  }

  const handleConfirmCancel = async () => {
    if (!selectedOrder) return

    setIsCancelling(true)
    try {
      await deleteOrder(selectedOrder.id)
      toast.success('Đã hủy đơn hàng thành công')
      fetchData() // Refresh the data
    } catch (error) {
      console.error('Lỗi khi hủy đơn hàng:', error)
      toast.error('Không thể hủy đơn hàng')
    } finally {
      setIsCancelling(false)
      setCancelModalOpen(false)
      setSelectedOrder(null)
    }
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
                      <div className={styles.actionButtons}>
                        {/* <button onClick={() => handlePayment(order)}> click </button> */}

                        <PaymentButton />
                        <button
                          onClick={() => handleCancelOrder(order)}
                          className={styles.cancelButton}
                          disabled={order.status === 'COMPLETED' || isCancelling}
                        >
                          Cancel
                        </button>
                      </div>
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
      <CancelModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        orderAmount={selectedOrder?.totalAmount || 0}
      />

      <ToastContainer position='bottom-right' autoClose={3000} />
    </div>
  )
}

export default ManageOrderPage
