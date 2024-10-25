import { Outlet } from 'react-router-dom'

import Footer from '../MainLayout/components/Footer/Footer'
import Navbar from '../MainLayout/components/Navbar/Navbar'

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}

export default MainLayout
