/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../components/ui/card'
import { Fish, ShoppingCart, MessageCircle, Package, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'

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
        Chào mừng đến với FishHub
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='text-xl mb-8'
      >
        Nền tảng tư vấn và mua bán cá hàng đầu
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Button size='lg' className='bg-blue-600 hover:bg-blue-700 text-white'>
          Khám phá ngay
        </Button>
      </motion.div>
    </div>
  </section>
)

const ServiceCard = ({ icon: Icon, title, description, buttonText }: any) => (
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
        <Button variant='outline' className='w-full'>
          {buttonText}
          <ChevronRight className='ml-2 h-4 w-4' />
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
)

const ServicesSection = () => (
  <section className='py-20 bg-gradient-to-b from-white to-blue-50'>
    <div className='container mx-auto px-4'>
      <h2 className='text-3xl font-bold text-center mb-12'>Dịch vụ của chúng tôi</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <ServiceCard
          icon={MessageCircle}
          title='Tư vấn cá'
          description='Nhận tư vấn chuyên sâu từ các chuyên gia về nuôi và chăm sóc cá.'
          buttonText='Tìm hiểu thêm'
        />
        <ServiceCard
          icon={ShoppingCart}
          title='Mua bán cá'
          description='Mua và bán các loại cá cảnh, cá kiểng với giá cả hợp lý.'
          buttonText='Xem cửa hàng'
        />
        <ServiceCard
          icon={Package}
          title='Đăng dịch vụ'
          description='Đăng và quảng bá dịch vụ liên quan đến cá của bạn.'
          buttonText='Đăng dịch vụ'
        />
      </div>
    </div>
  </section>
)

const NewsCard = ({ image, title, description }: any) => (
  <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }} className='h-full'>
    <Card className='overflow-hidden h-full flex flex-col'>
      <img src={image} alt={title} className='w-full h-48 object-cover' />
      <CardHeader className='flex-grow'>
        <CardTitle className='text-xl mb-2'>{title}</CardTitle>
        <CardDescription className='text-sm line-clamp-3'>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          variant='link'
          className='p-0 h-auto font-semibold bg-transparent hover:bg-transparent text-blue-600 hover:text-blue-800'
        >
          Đọc thêm
          <ChevronRight className='ml-1 h-4 w-4' />
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
)

const NewsSection = () => (
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
            <NewsCard
              image='https://assets.wwf.org.au/image/upload/c_fill,g_auto,w_1400/f_auto/q_auto/v1/website-media/news-blogs/img_fish_osprey_reef_coral_sea?q=75'
              title='Khám phá loài cá mới ở vùng biển sâu'
              description='Các nhà khoa học đã phát hiện một loài cá chưa từng được biết đến ở độ sâu 7.000m.'
            />
            <NewsCard
              image='https://canhquanhoanggia.com/sites/default/files/4Becacanh/ho-ca-ban-cong-1.jpg'
              title='Xu hướng thiết kế bể cá 2024'
              description='Khám phá những xu hướng mới nhất trong thiết kế và bố trí bể cá cảnh.'
            />
            <NewsCard
              image='https://shoptech.com.vn/wp-content/uploads/2019/08/1.jpg'
              title='Kỹ thuật câu cá mới cho người mới bắt đầu'
              description='Hướng dẫn chi tiết về các kỹ thuật câu cá hiệu quả cho người mới.'
            />
          </div>
        </TabsContent>
        <TabsContent value='popular'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 h-full'>
            <NewsCard
              image='https://cdn.tgdd.vn/Files/2020/09/29/1294515/10-loai-ca-canh-nuoi-trong-nha-vua-dep-lai-con-thu-hut-tai-loc-cho-gia-chu-202201200934534983.jpg'
              title='Top 10 loài cá cảnh được ưa chuộng nhất'
              description='Danh sách 10 loài cá cảnh được yêu thích nhất trong năm qua.'
            />
            <NewsCard
              image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWbYHgm-nZkWCk11gwZog3ev4ki1sXZjD-Ng&s'
              title='Cách chọn thức ăn phù hợp cho cá cảnh'
              description='Hướng dẫn chi tiết về việc lựa chọn thức ăn phù hợp cho từng loại cá cảnh.'
            />
            <NewsCard
              image='https://becadaukeo.com/wp-content/uploads/2023/06/cach-lam-be-ca-nuoc-man-vua-dep-vua-don-gian.jpg'
              title='Bí quyết duy trì bể cá sạch đẹp'
              description='Những mẹo hữu ích giúp bạn duy trì bể cá luôn sạch sẽ và đẹp mắt.'
            />
          </div>
        </TabsContent>
        <TabsContent value='featured'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 h-full'>
            <NewsCard
              image='https://kyluc.vn/Userfiles/Upload/images/co-ca-koi-dai-nhat-ky-luc%203.png'
              title='Lễ hội cá Koi lớn nhất Việt Nam'
              description='Thông tin chi tiết về lễ hội cá Koi sắp diễn ra tại Hà Nội.'
            />
            <NewsCard
              image='https://baodaklak.vn/file/fb9e3a03798789de0179a1704dea238e/old-data/dataimages/201804/original/images2642224_142.jpg'
              title='Kỹ thuật nhân giống cá hiếm'
              description='Chuyên gia chia sẻ về kỹ thuật nhân giống thành công các loài cá quý hiếm.'
            />
            <NewsCard
              image='https://hoalily.com.vn/upload/userfiles/images/image-20220711174425-2.jpeg'
              title='Aquaponics: Tương lai của nuôi trồng thủy sản'
              description='Khám phá hệ thống Aquaponics và lợi ích của nó trong nuôi trồng thủy sản.'
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </section>
)

const PricingCard = ({ plan, price, features, isPopular }: any) => (
  <motion.div whileHover={{ y: -10 }} transition={{ type: 'spring', stiffness: 300 }}>
    <Card className={`flex flex-col h-full ${isPopular ? 'border-blue-500 border-2' : ''}`}>
      <CardHeader>
        <CardTitle>{plan}</CardTitle>
        <CardDescription>Gói đăng tin {plan.toLowerCase()}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-3xl font-bold mb-4'>
          {price}
          <span className='text-sm font-normal'>/tháng</span>
        </p>
        <ul className='space-y-2'>
          {features.map(
            (
              feature:
                | string
                | number
                | boolean
                | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined,
              index: React.Key | null | undefined
            ) => (
              <li key={index} className='flex items-center'>
                <svg
                  className='w-4 h-4 mr-2 text-green-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
                </svg>
                {feature}
              </li>
            )
          )}
        </ul>
      </CardContent>
      <CardFooter className='mt-auto'>
        <Button className='w-full' variant={isPopular ? 'default' : 'outline'}>
          {isPopular ? 'Đăng ký ngay' : 'Chọn gói'}
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
)

const PricingSection = () => (
  <section className='py-20 bg-white'>
    <div className='container mx-auto px-4'>
      <h2 className='text-3xl font-bold text-center mb-12'>Gói đăng tin cho thành viên</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <PricingCard
          plan='Cơ bản'
          price='100k'
          features={['10 bài đăng mỗi tháng', 'Hỗ trợ cơ bản', '5 lượt tư vấn', 'Hiển thị 24 giờ']}
        />
        <PricingCard
          plan='Nâng cao'
          price='200k'
          features={[
            '30 bài đăng mỗi tháng',
            'Hỗ trợ ưu tiên',
            '15 lượt tư vấn',
            'Hiển thị 72 giờ',
            'Đề xuất bài viết'
          ]}
          isPopular={true}
        />
        <PricingCard
          plan='Chuyên nghiệp'
          price='300k'
          features={[
            'Không giới hạn bài đăng',
            'Hỗ trợ 24/7',
            'Không giới hạn lượt tư vấn',
            'Hiển thị vĩnh viễn',
            'Quảng cáo ưu tiên'
          ]}
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
          name='Nguyễn Văn A'
          role='Chủ cửa hàng cá cảnh'
          content='FishHub đã giúp tôi mở rộng kinh doanh và tiếp cận nhiều khách hàng hơn. Dịch vụ tuyệt vời!'
          image='https://source.unsplash.com/random/100x100?portrait,1'
        />
        <TestimonialCard
          name='Trần Thị B'
          role='Người nuôi cá cảnh'
          content='Tôi đã học được rất nhiều kiến thức bổ ích từ các chuyên gia trên FishHub. Cảm ơn đội ngũ!'
          image='https://source.unsplash.com/random/100x100?portrait,2'
        />
        <TestimonialCard
          name='Lê Văn C'
          role='Nhà nghiên cứu thủy sản'
          content='FishHub là nền tảng tuyệt vời để chia sẻ kiến thức và kết nối với cộng đồng yêu cá.'
          image='https://source.unsplash.com/random/100x100?portrait,3'
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

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-white'>
      {/* <Header isScrolled={isScrolled} /> */}
      <HeroSection />
      <ServicesSection />
      <NewsSection />
      <PricingSection />
      <TestimonialSection />
      {/* <Footer /> */}
    </div>
  )
}

export default App
