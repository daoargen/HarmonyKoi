/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { Package } from '../../types/package.type'
import { getPackage, getPackageById } from '../../apis/package.api'
import { createOrderPackage } from '../../apis/order.api'
import { useNavigate } from 'react-router-dom'
import { X, Clock, FileText, CreditCard } from 'lucide-react'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  packageName: string
  packagePrice: number
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, packageName, packagePrice }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-8 max-w-md w-full'>
        <div className='flex justify-between items-center mb-6'>
          <h3 className='text-2xl font-bold text-gray-900'>Xác nhận mua gói</h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-500 transition-colors bg-transparent hover:bg-transparent'
          >
            <X size={24} />
          </button>
        </div>
        <div className='mb-10'>
          <p className='text-gray-700 mb-2'>
            Bạn có chắc chắn muốn mua gói <strong className='text-blue-600'>{packageName}</strong>?
          </p>
          <p className='text-2xl font-bold text-gray-900'>Giá: {packagePrice.toLocaleString()} VND</p>
        </div>
        <div className='flex justify-between space-x-4'>
          <button
            onClick={onClose}
            className='w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors'
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className='w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  )
}

const PackageCard: React.FC<Package> = ({ name, description, duration, amountPost, price, id }) => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleBuy = async () => {
    setIsModalOpen(true)
  }

  const handleConfirmPurchase = async () => {
    setIsProcessing(true)
    try {
      const packageDetail = await getPackageById(id)
      await createOrderPackage({ packageId: packageDetail.data.data.id, type: 'PACKAGE' })
      setIsModalOpen(false)
      alert('Tạo đơn hàng thành công')
      navigate('/member/manage/manage-orders')
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error)
      alert('Lỗi khi tạo đơn hàng. Vui lòng thử lại sau.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div>
      <div className='bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105'>
        <div className='bg-gradient-to-r from-blue-500 to-blue-600 p-6'>
          <h2 className='text-2xl font-bold text-white mb-2'>{name}</h2>
          <p className='text-blue-100 h-20 overflow-y-auto'>{description}</p>
        </div>
        <div className='p-6'>
          <ul className='space-y-4 mb-6'>
            <li className='flex items-center'>
              <Clock className='text-blue-500 mr-2' size={20} />
              <span className='text-gray-700'>Thời hạn: {duration} ngày</span>
            </li>
            <li className='flex items-center'>
              <FileText className='text-blue-500 mr-2' size={20} />
              <span className='text-gray-700'>Số lượng bài đăng: {amountPost}</span>
            </li>
            <li className='flex items-center'>
              <CreditCard className='text-blue-500 mr-2' size={20} />
              <span className='text-gray-700'>Giá: {price.toLocaleString()} VND</span>
            </li>
          </ul>
          <button
            className={`w-full py-3 rounded-md text-white font-semibold transition-colors ${
              isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={handleBuy}
            disabled={isProcessing}
          >
            {isProcessing ? 'Đang xử lý...' : 'Mua ngay'}
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPurchase}
        packageName={name}
        packagePrice={price}
      />
    </div>
  )
}

const PackagePage: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await getPackage()
        setPackages(response.data.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
          <strong className='font-bold'>Error!</strong>
          <span className='block sm:inline'> {error.message}</span>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-12 mt-[82px]'>
      <h1 className='text-4xl font-bold text-center text-gray-800 mb-12'>Các Gói Dịch Vụ</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} {...pkg} />
        ))}
      </div>
    </div>
  )
}

export default PackagePage
