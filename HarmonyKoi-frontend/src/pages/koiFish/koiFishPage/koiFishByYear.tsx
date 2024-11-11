import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { KoiFishResponse, KoiFishAttributes } from '../../../types/koiFish.type'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import styles from '../koiFishPage/koiFishPage.module.css'

const ITEMS_PER_PAGE = 9

const KoiFishByYear: React.FC = () => {
  const { yearOfBirth } = useParams<{ yearOfBirth: string }>()
  const [koiFishes, setKoiFishes] = useState<KoiFishAttributes[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    const fetchKoiFishes = async () => {
      setLoading(true)
      try {
        const response = await axios.get<KoiFishResponse>(
          `http://localhost:1412/api/koiFishes?yearOfBirth=${yearOfBirth}`
        )
        if (response.data && response.data.data) {
          setKoiFishes(response.data.data)
        } else {
          setError('Không có dữ liệu cá koi cho năm sinh này.')
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu cá koi.')
      } finally {
        setLoading(false)
      }
    }

    fetchKoiFishes()
  }, [yearOfBirth])

  if (loading) {
    return <div className={styles.loading}>Đang tải dữ liệu...</div>
  }

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  if (koiFishes.length === 0) {
    return <div className={styles.error}>Không có dữ liệu cá koi cho năm sinh này.</div>
  }

  const totalPages = Math.ceil(koiFishes.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentKoiFishes = koiFishes.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleLastPageClick = () => {
    setCurrentPage(totalPages)
  }

  const handleFirstPageClick = () => {
    setCurrentPage(1)
  }

  return (
    <div className={styles.container}>
      <h1 className='text-4xl font-bold text-center text-gray-800 mb-12'>
        Thông tin Cá Koi cho năm sinh {yearOfBirth}
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {currentKoiFishes.map((koi) => (
          <div
            key={koi.id}
            className='bg-white p-6 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105'
          >
            <img src={koi.imageUrl || ''} alt={koi.name} className='w-full h-[500px] object-cover rounded-lg' />
            <div className='flex justify-center items-start flex-col pt-6'>
              {/* Elements */}
              <div>
                {koi.elements &&
                  koi.elements.map((element) => (
                    <span
                      key={element.id}
                      className={`text-sm px-2 py-1 rounded-full mr-2 ${
                        element.name === 'water'
                          ? 'bg-blue-500 text-white'
                          : element.name === 'fire'
                            ? 'bg-red-500 text-white'
                            : element.name === 'wood'
                              ? 'bg-green-800 text-white'
                              : element.name === 'earth'
                                ? 'bg-amber-900 text-white'
                                : element.name === 'metal'
                                  ? 'bg-gray-500 text-white'
                                  : 'bg-green-500 text-white'
                      }`}
                    >
                      {element.name}
                    </span>
                  ))}
              </div>

              <p className='text-2xl font-semibold text-gray-800 mb-2 mt-2'>{koi.name}</p>
              <p className='text-xl font-semibold text-red-500 mb-2'>{koi.price.toLocaleString()} vnd</p>

              <p className='text-gray-600 mb-4 line-clamp-2'>{koi.description}</p>
              <Link
                to={`/koiFishes/${koi.id}`}
                className='bg-blue-500 text-white font-semibold w-full text-center py-2 rounded-md hover:bg-blue-600 transition-colors duration-300'
              >
                Chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-center items-center space-x-2 mt-12'>
        <button
          onClick={handleFirstPageClick}
          disabled={currentPage === 1}
          className='p-2 mr-0 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
          aria-label='First Page'
        >
          <ChevronsLeft size={20} />
        </button>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className='p-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
          aria-label='Previous Page'
        >
          <ChevronLeft size={20} />
        </button>

        <div className='flex space-x-2'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={`px-4 py-2 rounded-md mr-0 ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className='p-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
          aria-label='Next Page'
        >
          <ChevronRight size={20} />
        </button>
        <button
          onClick={handleLastPageClick}
          disabled={currentPage === totalPages}
          className='p-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
          aria-label='Last Page'
        >
          <ChevronsRight size={20} />
        </button>
      </div>
    </div>
  )
}

export default KoiFishByYear
