import { Order, OrderListResponse } from '../types/order.type'
import http from '../utils/http'

export const getOrderHistory = async ({
  pageIndex,
  pageSize,
  keyword,
  status
}: {
  pageIndex?: number
  pageSize?: number
  keyword?: string
  status?: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'CANCELLED' | 'COMPLETED'
}) => {
  const params = new URLSearchParams()

  if (pageIndex !== undefined) {
    params.append('page_index', pageIndex.toString())
  }

  if (pageSize !== undefined) {
    params.append('page_size', pageSize.toString())
  }

  if (keyword !== undefined) {
    params.append('keyword', keyword)
  }

  if (status !== undefined) {
    params.append('status', status)
  }

  const queryString = params.toString()

  return await http.get<OrderListResponse>(`/orders/user/history${queryString ? `?${queryString}` : ''}`)
}

export const deleteOrder = async (id: string) => await http.delete<Order>(`/orders/${id}`)

export const createOrderPackage = async (order: { packageId: string; type: 'PACKAGE' }) =>
  await http.post<Order>('/orders', order)

export const checkExistingOrder = async (id: string) => {
  try {
    const response = await http.get(`/packages/${id}`)
    return response.data.data // Trả về true nếu đơn hàng tồn tại, false nếu không
  } catch (error) {
    console.error('Error checking existing order:', error)
    return false // Hoặc xử lý lỗi theo cách khác
  }
}
