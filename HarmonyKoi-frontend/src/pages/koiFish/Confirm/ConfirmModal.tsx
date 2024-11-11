import React from 'react'
import { X } from 'lucide-react'

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
            Bạn có chắc chắn muốn mua cá <strong className='text-blue-600'>{packageName}</strong>?
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

export default ConfirmModal
