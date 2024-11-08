/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import { Post } from '../../types/post.type'
import { getPost } from '../../apis/post.api'
import Paging from '../../components/common/Paging/Paging'
import { useNavigate } from 'react-router-dom'
import banner from '../../assets/images/banner.gif'

const BlogCard: React.FC<Post> = ({ id, title, content, createdAt, imageUrl }) => {
  const navigate = useNavigate()
  const truncatedContent = content.length > 100 ? content.substring(0, 100) + '...' : content

  const handleViewDetail = () => {
    navigate(`/posts/${id}`) // Chuyển hướng đến trang chi tiết bài viết
  }

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:translate-y-[-5px] flex flex-col h-full'>
      <img src={imageUrl} alt={title} className='w-full h-72 object-cover' />
      <div className='p-6 flex-grow flex flex-col'>
        <h2 className='text-xl font-semibold mb-3 text-gray-900'>{title}</h2>
        <p className='text-gray-600 mb-4 flex-grow'>{truncatedContent}</p> {/* Hiển thị nội dung đã cắt bớt */}
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

const PostPage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null) // Thêm kiểu cho error

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPost()
        console.log(response.data.data)
        console.log(typeof response.data.data[0].createdAt)

        const fetchPosts: Post[] = response.data.data

        setPosts(fetchPosts)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div className='container mx-auto pb-16 mt-[82px]'>
      <div className='w-full h-96 overflow-hidden rounded-2xl mb-12'>
        <img src={banner} className='w-full h-full object-cover' />
      </div>

      {posts.length > 0 ? (
        <Paging data={posts} itemsPerPage={9} renderItem={(post: Post) => <BlogCard key={post.id} {...post} />} />
      ) : (
        <div className='text-center text-gray-500'>Không có bài viết nào</div>
      )}
    </div>
  )
}

export default PostPage
