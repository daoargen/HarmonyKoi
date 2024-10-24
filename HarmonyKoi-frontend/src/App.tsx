import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './layouts/MainLayout/components/Navbar/Navbar'
import HomePage from './pages/Home/HomePage'
import ConsultingPage from './pages/Consulting/ConsultingPage'
import PostPage from './pages/Post/PostPage'
import NewsPage from './pages/News/NewsPage'
import LoginPage from './pages/Login/LoginPage'
import Footer from './layouts/MainLayout/components/Footer/Footer'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import KoiFishForm from './pages/koiFish/koiFishForm'

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Render children của route */}
      <Footer />
    </>
  )
}

const AppLayout = () => <App />

export default AppLayout
