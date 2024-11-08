import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { KoiFishResponse, KoiFishAttributes } from '../../types/koiFish.type'
import { ArrowLeft, ShoppingCart } from 'lucide-react'

const KoiFishDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [koiFish, setKoiFish] = useState<KoiFishAttributes | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchKoiFishDetail = async () => {
      try {
        const response = await axios.get<KoiFishResponse>(`http://localhost:1412/api/koiFishes/${id}`)
        if (response.data && response.data.data) {
          setKoiFish(response.data.data)
        } else {
          setError('Không có dữ liệu cá koi.')
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu cá koi.')
      } finally {
        setLoading(false)
      }
    }

    fetchKoiFishDetail()
  }, [id])

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
          <span className='block sm:inline'> {error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-gradient-to-br from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8 mt-[82px]'>
      <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
        <div className='md:flex'>
          <div className='md:flex-shrink-0'>
            <img className='h-48 w-full object-cover md:h-full md:w-48' src={koiFish?.imageUrl} alt={koiFish?.name} />
          </div>
          <div className='p-8'>
            <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
              {koiFish?.variety?.name}
            </div>
            <p className='text-3xl leading-tight font-bold text-black'>{koiFish?.name}</p>
            <div className='mt-4 text-gray-700'>
              {koiFish &&
                Object.keys(koiFish).map((key) => {
                  if (
                    ![
                      'id',
                      'variety',
                      'name',
                      'imageUrl',
                      'veriety',
                      'verietyId',
                      'isDeleted',
                      'createdAt',
                      'updatedAt'
                    ].includes(key)
                  ) {
                    const value = koiFish[key as keyof KoiFishAttributes]
                    if (key === 'variety' && typeof value === 'object') {
                      return (
                        <div key={key} className='mb-2'>
                          <strong className='text-gray-900'>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                          <p>{`Description: ${value.description}`}</p>
                        </div>
                      )
                    }
                    if (key === 'elements' && Array.isArray(value)) {
                      return (
                        <div key={key} className='mb-2'>
                          <strong className='text-gray-900'>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                          <ul className='list-disc list-inside'>
                            {value.map((element) => (
                              <li key={element.id}>{element.name}</li>
                            ))}
                          </ul>
                        </div>
                      )
                    }
                    if (key === 'price' && typeof value === 'number') {
                      return (
                        <p key={key} className='mb-2'>
                          <strong className='text-gray-900'>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{' '}
                          {value.toLocaleString()} vnd
                        </p>
                      )
                    }
                    return (
                      <p key={key} className='mb-2'>
                        <strong className='text-gray-900'>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                        {typeof value === 'object' ? ` ${JSON.stringify(value)}` : ` ${value}`}
                      </p>
                    )
                  }
                  return null
                })}
            </div>
          </div>
        </div>
        <div className='px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center'>
          <button
            onClick={() => window.history.back()}
            className='flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            <ArrowLeft className='mr-2 h-5 w-5' />
            Quay lại
          </button>
          <button
            onClick={() => alert('Mua ngay!')}
            className='flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            <ShoppingCart className='mr-2 h-5 w-5' />
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  )
}

export default KoiFishDetail
