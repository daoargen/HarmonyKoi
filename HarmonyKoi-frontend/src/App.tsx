import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './layouts/MainLayout/components/Navbar/Navbar'
import './index.css'
import Footer from './layouts/MainLayout/components/Footer/Footer'

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
