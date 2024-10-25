import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './layouts/MainLayout/components/Navbar/Navbar'

import Footer from './layouts/MainLayout/components/Footer/Footer'
<<<<<<< HEAD
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import KoiFishForm from './pages/koiFish/koiFishForm'
=======
>>>>>>> 3cdbdda66d4956c74990185e2c3f314b3c73d19d

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
