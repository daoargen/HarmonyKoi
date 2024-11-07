import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import React, { useState } from 'react'

interface PagingProps<T> {
  data: T[]
  renderItem: (item: T) => React.ReactNode
  itemsPerPage?: number
}

const Paging = <T,>({ data, renderItem, itemsPerPage = 9 }: PagingProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage)

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
    <div className='flex flex-col items-center'>
      <div className='grid grid-cols-3 gap-5 mb-5'>
        {currentItems.map((item, index) => (
          <div key={index}>{renderItem(item)}</div>
        ))}
      </div>

      {/* <div className='flex items-center justify-center mt-5 gap-2'>
        <button
          onClick={handleFirstPageClick}
          disabled={currentPage === 1}
          className='bg-white border-2 border-green-500 rounded-full w-10 h-10 text-green-500 cursor-pointer transition-transform transform hover:bg-green-500 hover:text-white hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed'
          aria-label='First Page'
        >
          &lt;&lt;
        </button>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className='bg-white border-2 border-green-500 rounded-full w-10 h-10 text-green-500 cursor-pointer transition-transform transform hover:bg-green-500 hover:text-white hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed'
          aria-label='Previous Page'
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={`bg-white border-2 border-green-500 rounded-full w-10 h-10 text-green-500 cursor-pointer transition-transform transform hover:bg-green-500 hover:text-white hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed ${currentPage === index + 1 ? 'bg-green-500 text-white font-bold' : ''}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className='bg-white border-2 border-green-500 rounded-full w-10 h-10 text-green-500 cursor-pointer transition-transform transform hover:bg-green-500 hover:text-white hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed'
          aria-label='Next Page'
        >
          &gt;
        </button>
        <button
          onClick={handleLastPageClick}
          disabled={currentPage === totalPages}
          className='bg-white border-2 border-green-500 rounded-full w-10 h-10 text-green-500 cursor-pointer transition-transform transform hover:bg-green-500 hover:text-white hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed'
          aria-label='Last Page'
        >
          &gt;&gt;
        </button>
      </div> */}

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

export default Paging
