import React, { useState } from 'react'
import styles from './Paging.module.css'

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
    <div className={styles.container}>
      <div className={styles['item-list']}>
        {currentItems.map((item, index) => (
          <div key={index}>{renderItem(item)}</div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={handleFirstPageClick}
          disabled={currentPage === 1}
          className={styles.pageButton}
          aria-label='First Page'
        >
          &lt;&lt;
        </button>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={styles.pageButton}
          aria-label='Previous Page'
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={`${styles.pageButton} ${currentPage === index + 1 ? styles.active : ''}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
          aria-label='Next Page'
        >
          &gt;
        </button>
        <button
          onClick={handleLastPageClick}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
          aria-label='Last Page'
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  )
}

export default Paging
