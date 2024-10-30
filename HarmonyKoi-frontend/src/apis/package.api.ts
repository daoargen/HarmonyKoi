import { Package, PackageResponse } from './../types/package.type'
import http from '../utils/http'

export const getPackage = async () => await http.get<PackageResponse>('/packages')

export const getPackageById = async (id: string) => await http.get<Package>(`/packages/${id}`)

export const checkExistingOrder = async (id: string) => {
  try {
    const response = await http.get(`/orders/${id}`)
    return response.data.data.exists // Trả về true nếu đơn hàng tồn tại, false nếu không
  } catch (error) {
    console.error('Error checking existing order:', error)
    return false // Hoặc xử lý lỗi theo cách khác
  }
}
