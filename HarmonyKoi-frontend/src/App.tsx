import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/Home/HomePage'
import ConsultingPage from './pages/Consulting/ConsultingPage'
import PostPage from './pages/Post/PostPage'
import NewsPage from './pages/News/NewsPage'
import LoginPage from './pages/Login/LoginPage'
import Footer from './components/Footer/Footer'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/consulting' element={<ConsultingPage />} />
        <Route path='/post' element={<PostPage />} />
        <Route path='/news' element={<NewsPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
