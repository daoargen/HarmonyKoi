/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import { News } from '../../types/news.type'
import { getNews } from '../../apis/news.api'
import Paging from '../../components/common/Paging/Paging'
import banner from '../../assets/images/banner.gif'
import { useNavigate } from 'react-router-dom'

const BlogCard: React.FC<News> = ({ id, tittle, content, imageUrl, createdAt }) => {
  const navigate = useNavigate()
  const truncatedContent = content.length > 100 ? content.substring(0, 100) + '...' : content
  const handleViewDetail = () => {
    navigate(`/news/${id}`) // Chuyển hướng đến trang chi tiết bài viết
  }
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:translate-y-[-5px] flex flex-col h-full'>
      <img src={imageUrl || ''} alt={tittle} className='w-full h-72 object-cover' />
      <div className='p-6 flex-grow flex flex-col'>
        <h2 className='text-xl font-semibold mb-3 text-gray-900'>{tittle}</h2>
        <p className='text-gray-600 mb-4 flex-grow'>{truncatedContent}</p>
        <div className='flex justify-between text-gray-500 text-sm mt-auto'>
          <span>{createdAt}</span>
        </div>
        <Button
          variant='outline'
          className='w-full bg-gray-700 text-white py-2 px-4 rounded-md font-medium transition-colors hover:bg-gray-800 mt-4'
          onClick={handleViewDetail}
        >
          Xem thêm
        </Button>
      </div>
    </div>
  )
}

const NewsPage = () => {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null) // Thêm kiểu cho error

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews()
        console.log(response.data.data)

        const fetchNews: News[] = response.data.data

        setNews(fetchNews)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div className='container mx-auto pb-14 mt-[82px]'>
      <div className='w-full h-96 overflow-hidden rounded-2xl mb-12'>
        <img src={banner} className='w-full h-full object-cover' />
      </div>

      {news.length > 0 ? (
        <Paging data={news} itemsPerPage={9} renderItem={(news: News) => <BlogCard key={news.id} {...news} />} />
      ) : (
        <div className='text-center text-gray-500'>Không có tin tức nào</div>
      )}
    </div>
  )
}

export default NewsPage
