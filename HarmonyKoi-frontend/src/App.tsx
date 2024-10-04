import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ConsultingPage from './pages/ConsultingPage'
import PostPage from './pages/PostPage'
import NewsPage from './pages/NewsPage'
import LoginPage from './pages/LoginPage'
import './App.css'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/consulting' element={<ConsultingPage />} />
        <Route path='/articles' element={<PostPage />} />
        <Route path='/news' element={<NewsPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
