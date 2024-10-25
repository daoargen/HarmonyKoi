import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './layouts/MainLayout/components/Navbar/Navbar'

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
