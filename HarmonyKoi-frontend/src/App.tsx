import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar/Navbar'
import HomePage from './pages/Home/HomePage'
import ConsultingPage from './pages/Consulting/ConsultingPage'
import PostPage from './pages/Post/PostPage'
import NewsPage from './pages/News/NewsPage'
import LoginPage from './pages/Login/LoginPage'
import Footer from './components/common/Footer/Footer'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/consulting' element={<ConsultingPage />} />
        <Route path='/post' element={<PostPage />} />
        <Route path='/news' element={<NewsPage />} />
        <Route path='/register' element={<Register />} />
        {/* <Route path='/forgot-password' element={<ForgotPassword/>}/> */}
        {/* <Route path='/reset-password' element={< ResetPassword />} /> */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/not-found' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
