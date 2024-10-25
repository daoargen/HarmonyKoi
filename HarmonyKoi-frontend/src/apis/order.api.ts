import { OrderListResponse } from '../types/order.type'
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

  console.log(await http.get<OrderListResponse>('/orders/user/history'))

  return await http.get<OrderListResponse>(`/api/orders/user/history${queryString ? `?${queryString}` : ''}`)
}
