/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../components/ui/card'
import { Fish, ShoppingCart, MessageCircle, Package, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { News } from '../../types/news.type'
import { useEffect, useState } from 'react'
import { getNews } from '../../apis/news.api'

export const Header = ({ isScrolled }: any) => (
  <header
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}
  >
    <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
      <a href='/' className='flex items-center space-x-2'>
        <Fish className='h-8 w-8 text-blue-600' />
        <span className='text-2xl font-bold text-blue-600'>FishHub</span>
      </a>
      <nav>
        <ul className='flex space-x-6'>
          <li>
            <a href='#' className='text-blue-600 hover:text-blue-800'>
              Trang chủ
            </a>
          </li>
          <li>
            <a href='#' className='text-blue-600 hover:text-blue-800'>
              Dịch vụ
            </a>
          </li>
          <li>
            <a href='#' className='text-blue-600 hover:text-blue-800'>
              Tin tức
            </a>
          </li>
          <li>
            <a href='#' className='text-blue-600 hover:text-blue-800'>
              Liên hệ
            </a>
          </li>
        </ul>
      </nav>
      <Button>Đăng nhập</Button>
    </div>
  </header>
)

const HeroSection = () => (
  <section className='relative mt-[82px] h-[calc(100vh-82px)] flex items-center justify-center overflow-hidden'>
    <div className='absolute w-full h-full'>
      <iframe
        src='https://www.youtube.com/embed/UK1Qa1kB53E?autoplay=1&mute=1&loop=1&playlist=UK1Qa1kB53E&controls=0'
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        className='absolute top-0 left-0 w-full h-full object-cover'
      ></iframe>
      <div className='absolute inset-0 bg-black bg-opacity-50 m-0'></div>
    </div>

    <div className='relative z-10 text-center text-white'>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-5xl font-bold mb-4 text-white'
      >
        Chào mừng đến với Harmony Koi
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='text-xl mb-8'
      >
        Nền tảng tư vấn và mua bán cá hàng đầu
      </motion.p>
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Button size='lg' className='bg-blue-600 hover:bg-blue-700 text-white'>
          Khám phá ngay
        </Button>
      </motion.div> */}
    </div>
  </section>
)

const ServiceCard = ({ icon: Icon, title, description, buttonText, buttonLink }: any) => {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth() // Sử dụng useAuth

  const handleClick = () => {
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để sử dụng dịch vụ này.')
      navigate('/login') // Chuyển hướng đến trang đăng nhập
    } else if (user?.role === 'ADMIN') navigate('/admin/manage/approve-posts')
    else navigate(buttonLink)
  }
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
      <Card className='h-full flex flex-col justify-between'>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <Icon className='mr-2' />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
        <CardFooter>
          <Button variant='outline' className='w-full' onClick={handleClick}>
            {buttonText}
            <ChevronRight className='ml-2 h-4 w-4' />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

const ServicesSection = () => {
  return (
    <section className='py-20 bg-gradient-to-b from-white to-blue-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>Dịch vụ của chúng tôi</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <ServiceCard
            icon={MessageCircle}
            title='Tư vấn mệnh'
            description='Nhận tư vấn chuyên sâu từ các chuyên gia về nuôi và chăm sóc cá.'
            buttonText='Tìm hiểu thêm'
            buttonLink={'/consulting'} // Hoặc đường dẫn đến trang tư vấn
          />
          <ServiceCard
            icon={ShoppingCart}
            title='Mua bán cá'
            description='Mua và bán các loại cá cảnh, cá kiểng với giá cả hợp lý.'
            buttonText='Xem cửa hàng'
            buttonLink={'/koiFish'} // Đường dẫn đến danh sách cá Koi
          />
          <ServiceCard
            icon={Package}
            title='Đăng dịch vụ'
            description='Đăng và quảng bá dịch vụ liên quan đến cá của bạn.'
            buttonText='Đăng dịch vụ'
            buttonLink={'/member/manage/manage-posts'} // Đường dẫn đến Manage Post Page
          />
        </div>
      </div>
    </section>
  )
}

const NewsCard = ({ newsItem }: { newsItem: News }) => (
  <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }} className='h-full'>
    <Card className='overflow-hidden h-full flex flex-col'>
      <img src={newsItem.imageUrl} alt={newsItem.tittle} className='w-full h-96 object-cover' />
      <CardHeader className='flex-grow min-h-[80px]'>
        <CardTitle className='text-xl mb-15 h-[50px] flex'>{newsItem.tittle}</CardTitle>
        <CardDescription className='text-sm line-clamp-3'>{newsItem.content}</CardDescription>
      </CardHeader>
      <CardFooter>
        {/* <Button
          variant='link'
          className='p-0 h-auto font-semibold bg-transparent hover:bg-transparent text-blue-600 hover:text-blue-800'
        >
          Đọc thêm
          <ChevronRight className='ml-1 h-4 w-4' />
        </Button> */}
        <div>{newsItem.createdAt}</div>
      </CardFooter>
    </Card>
  </motion.div>
)

const NewsSection = ({ newsData }: { newsData: News[] }) => {
  const [latestNews, setLatestNews] = useState<News[]>([])
  const [popularNews, setPopularNews] = useState<News[]>([])
  const [featuredNews, setFeaturedNews] = useState<News[]>([])

  useEffect(() => {
    // Giả sử API của bạn trả về tất cả tin tức, bạn cần lọc ra các loại tin tức khác nhau ở đây.
    // Ví dụ:
    setLatestNews(newsData.slice(0, 3)) // Lấy 3 tin tức mới nhất
    setPopularNews(newsData.slice(3, 6)) // Lấy 3 tin tức phổ biến (thay đổi logic lọc nếu cần)
    setFeaturedNews(newsData.slice(6, 9)) // Lấy 3 tin tức nổi bật (thay đổi logic lọc nếu cần)
  }, [newsData])

  return (
    <section className='py-20 bg-blue-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>Tin tức về cá</h2>
        <Tabs defaultValue='latest' className='w-full'>
          <TabsList className='grid w-full grid-cols-3 mb-8'>
            <TabsTrigger value='latest'>Mới nhất</TabsTrigger>
            <TabsTrigger value='popular'>Phổ biến</TabsTrigger>
            <TabsTrigger value='featured'>Nổi bật</TabsTrigger>
          </TabsList>
          <TabsContent value='latest'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 h-full'>
              {latestNews.map((newsItem) => (
                <NewsCard key={newsItem.id} newsItem={newsItem} /> // Truyền newsItem như một prop
              ))}
            </div>
          </TabsContent>
          <TabsContent value='popular'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 h-full'>
              {popularNews.map((newsItem) => (
                <NewsCard key={newsItem.id} newsItem={newsItem} /> // Truyền newsItem như một prop
              ))}
            </div>
          </TabsContent>
          <TabsContent value='featured'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 h-full'>
              {featuredNews.map((newsItem) => (
                <NewsCard key={newsItem.id} newsItem={newsItem} /> // Truyền newsItem như một prop
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

const PricingCard = ({ plan, price, features, isPopular, period }: any) => {
  const navigate = useNavigate()

  const handleViewDetail = () => navigate('/package')

  return (
    <motion.div whileHover={{ y: -10 }} transition={{ type: 'spring', stiffness: 300 }} className='relative'>
      {isPopular && (
        <div className='absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg'>
          Phổ biến nhất
        </div>
      )}
      <Card
        className={`flex flex-col h-full ${
          isPopular
            ? 'border-2 border-blue-500 shadow-xl bg-gradient-to-b from-blue-50 to-white'
            : 'hover:border-blue-200 transition-all duration-300'
        }`}
      >
        <CardHeader className='text-center pb-8 pt-10'>
          <CardTitle className='text-2xl font-bold mb-2'>{plan}</CardTitle>
          <CardDescription className='text-gray-600'>Gói đăng tin {plan.toLowerCase()}</CardDescription>
          <div className='mt-4'>
            <span className='text-4xl font-bold text-blue-600'>{price}</span>
            <span className='text-gray-500 ml-2'>/ {period}</span>
          </div>
        </CardHeader>
        <CardContent className='flex-grow'>
          <ul className='space-y-4'>
            {features.map((feature: string, index: number) => (
              <li key={index} className='flex items-start'>
                <div className='flex-shrink-0 w-5 h-5 mt-1'>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.1 }}>
                    <svg className='w-5 h-5 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                    </svg>
                  </motion.div>
                </div>
                <span className='ml-3 text-gray-700'>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className='pt-6 pb-8'>
          <Button
            className={`w-full h-12 text-lg font-semibold transition-all duration-300 ${
              isPopular
                ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                : 'bg-white hover:bg-blue-50 text-blue-600 border-2 border-blue-600'
            }`}
            onClick={handleViewDetail}
          >
            Chọn gói
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
const PricingSection = () => (
  <section className='py-20 bg-white'>
    <div className='container mx-auto px-4'>
      <h2 className='text-3xl font-bold text-center mb-12'>Gói đăng tin cho thành viên</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <PricingCard
          plan='Cơ bản'
          price='100k'
          features={['10 bài đăng mỗi tháng', 'Hỗ trợ cơ bản', '5 lượt tư vấn', 'Hiển thị 24 giờ']}
          period='tháng'
        />
        <PricingCard
          plan='Nâng cao'
          price='300k'
          features={[
            '50 bài đăng mỗi tháng',
            'Hỗ trợ ưu tiên',
            '15 lượt tư vấn',
            'Hiển thị 72 giờ',
            'Đề xuất bài viết'
          ]}
          isPopular={true}
          period='3 tháng'
        />
        <PricingCard
          plan='Chuyên nghiệp'
          price='5 Triệu'
          features={[
            '1000 bài đăng mỗi tháng',
            'Hỗ trợ 24/7',
            'Không giới hạn lượt tư vấn',
            'Hiển thị vĩnh viễn',
            'Quảng cáo ưu tiên'
          ]}
          period='năm'
        />
      </div>
    </div>
  </section>
)

const TestimonialCard = ({ name, role, content, image }: any) => (
  <Card className='text-center'>
    <CardHeader>
      <div className='flex justify-center'>
        <img src={image} alt={name} className='w-20 h-20 rounded-full object-cover' />
      </div>
      <CardTitle>{name}</CardTitle>
      <CardDescription>{role}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className='italic'>{content}</p>
    </CardContent>
  </Card>
)

const TestimonialSection = () => (
  <section className='py-20 bg-blue-50'>
    <div className='container mx-auto px-4'>
      <h2 className='text-3xl font-bold text-center mb-12'>Khách hàng nói gì về chúng tôi</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <TestimonialCard
          name='Nguyễn Đức Hoàng'
          role='Chủ cửa hàng cá cảnh'
          content='FishHub đã giúp tôi mở rộng kinh doanh và tiếp cận nhiều khách hàng hơn. Dịch vụ tuyệt vời!'
          image='data:image/jpeg;base64,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'
        />
        <TestimonialCard
          name='Trần Vũ Quốc Đại'
          role='Người nuôi cá cảnh'
          content='Tôi đã học được rất nhiều kiến thức bổ ích từ các chuyên gia trên Harmony Koi. Cảm ơn đội ngũ!'
          image='data:image/jpeg;base64,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'
        />
        <TestimonialCard
          name='Lê Văn Đào'
          role='Nhà nghiên cứu thủy sản'
          content='Harmony Koi là nền tảng tuyệt vời để chia sẻ kiến thức và kết nối với cộng đồng yêu cá.'
          image='https://i.pinimg.com/originals/57/3c/e4/573ce40de998ab2523fbbb3675673abb.jpg'
        />
      </div>
    </div>
  </section>
)

export const Footer = () => (
  <footer className='bg-blue-900 text-white py-12'>
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
        <div>
          <h3 className='text-xl font-bold mb-4'>Về Koi Feng Shui</h3>
          <p>Nền tảng tư vấn và mua bán cá hàng đầu, kết nối người yêu cá trên toàn quốc.</p>
        </div>
        <div>
          <h3 className='text-xl font-bold mb-4'>Liên kết nhanh</h3>
          <ul className='space-y-2'>
            <li>
              <a href='#' className='hover:underline'>
                Trang chủ
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Dịch vụ
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Tin tức
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Liên hệ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className='text-xl font-bold mb-4'>Liên hệ</h3>
          <p>Email: info@koifengshui.com</p>
          <p>Điện thoại: (123) 456-7890</p>
          <p>Địa chỉ: 123 Đường Cá, TP. Hồ Chí Minh</p>
        </div>
        <div>
          <h3 className='text-xl font-bold mb-4'>Theo dõi chúng tôi</h3>
          <div className='flex space-x-4'>
            <a href='#' className='hover:text-blue-300'>
              <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
            <a href='#' className='hover:text-blue-300'>
              <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.772-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
            <a href='#' className='hover:text-blue-300'>
              <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className='mt-8 text-center'>
        <p>&copy; 2024 KoiFengShui. Tất cả quyền được bảo lưu.</p>
      </div>
    </div>
  </footer>
)

const App = () => {
  // const [isScrolled, setIsScrolled] = useState(false)

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50)
  //   }
  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  const [newsData, setNewsData] = useState<News[]>([])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews()
        setNewsData(response.data.data)
      } catch (error) {
        console.error('Error fetching news:', error)
      }
    }

    fetchNews()
  }, [])
  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-white'>
      {/* <Header isScrolled={isScrolled} /> */}
      <HeroSection />
      <ServicesSection />
      <NewsSection newsData={newsData} />
      <PricingSection />
      <TestimonialSection />
      {/* <Footer /> */}
    </div>
  )
}

export default App
