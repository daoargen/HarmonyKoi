import React from 'react'
import { Button } from '../../components/ui/button'
import { News } from '../../types'
import styles from './NewsPage.module.css'
import koiImage from '../../assets/images/koiImage.jpg'

const BlogCard: React.FC<News> = ({ title, content, author, imageUrl, createdAt }) => {
  const truncatedContent = content.length > 500 ? content.substring(0, 500) + '...' : content

  return (
    <div className={styles.blogCard}>
      <img src={imageUrl} alt={title} className={styles.blogCardImage} />
      <div className={styles.blogCardContent}>
        <h2 className={styles.blogCardTitle}>{title}</h2>
        <p className={styles.blogCardDescription}>{truncatedContent}</p> {/* Hiển thị nội dung đã cắt bớt */}
        <div className={styles.blogCardMeta}>
          <span>By {author}</span>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
        <Button variant='outline' className={styles.blogCardButton}>
          Xem thêm
        </Button>
      </div>
    </div>
  )
}

const blogPosts: News[] = [
  {
    id: 1,
    title: 'Koi Fish: Symbols of Luck and Prosperity',
    content: 'Koi fish have long been revered in Asian cultures as symbols of good fortune, perseverance, and success',
    author: 'John Doe',
    imageUrl: koiImage,
    createdAt: new Date('2023-05-15')
  },
  {
    id: 2,
    title: 'The Art of Koi Breeding',
    content:
      'Breeding koi fish is a delicate and rewarding process that requires patience, knowledge, and dedication...',
    author: 'Jane Smith',
    imageUrl: koiImage,
    createdAt: new Date('2023-05-20')
  },
  {
    id: 3,
    title: 'Creating the Perfect Koi Pond',
    content: 'A well-designed koi pond can be a beautiful and tranquil addition to any garden or outdoor space...',
    author: 'Bob Johnson',
    imageUrl: koiImage,
    createdAt: new Date('2023-05-25')
  },
  {
    id: 4,
    title: 'Koi Health: Common Issues and Treatments',
    content:
      'Maintaining the health of your koi fish is crucial for their longevity and the overall well-being of your pond...',
    author: 'Alice Brown',
    imageUrl: koiImage,
    createdAt: new Date('2023-05-30')
  },
  {
    id: 5,
    title: 'The History of Koi Fish in Japanese Culture',
    content: 'Koi fish have a rich history in Japanese culture, dating back over a thousand years...',
    author: 'Charlie Davis',
    imageUrl: koiImage,
    createdAt: new Date('2023-06-04')
  },
  {
    id: 6,
    title: 'Koi Varieties: A Colorful Guide',
    content: 'There are numerous varieties of koi fish, each with its own unique coloration and pattern...',
    author: 'Eva Wilson',
    imageUrl: koiImage,
    createdAt: new Date('2023-06-09')
  }
]

const NewsPage = () => {
  return (
    <div className={styles.blogContainer}>
      <div className={styles.blogGrid}>
        {blogPosts.map((news) => (
          <BlogCard key={news.id} {...news} />
        ))}
      </div>
    </div>
  )
}
export default NewsPage
