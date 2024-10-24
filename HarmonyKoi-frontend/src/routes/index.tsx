import { createBrowserRouter } from 'react-router-dom'

import configs from '../configs'
import GuestGuard from '../Guards/GuestGuard'
import ResetPasswordGuard from '../Guards/ResetPasswordGuard'
import AdminLayout from '../layouts/AdminLayout'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/HomePage'
import Login from '../pages/Login/LoginPage'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'
import ResetPassword from '../pages/ResetPassword'
import ForgotPassword from '../pages/ForgotPassword'
import PostPage from '../pages/Post/PostPage'
import NewsPage from '../pages/News/NewsPage'
import ConsultingPage from '../pages/Consulting/ConsultingPage'
import AppLayout from '../App'
import KoiFishForm from '../pages/koiFish/koiFishForm'
import KoiFishDetail from '../pages/koiFish/KoiFishDetail' // Adjust the path as needed

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: configs.routes.home,
        element: <Home />
      },
      {
        path: configs.routes.post,
        element: <PostPage />
      },
      {
        path: configs.routes.news,
        element: <NewsPage />
      },
      {
        path: configs.routes.consult,
        element: <ConsultingPage />
      },
      {
        path: configs.routes.koifish,
        element: <KoiFishForm />
      },
      {
        path: '/koiFishes/:id', // Add the detail route here
        element: <KoiFishDetail />
      },
      // GuestGuard
      {
        element: <GuestGuard />,
        children: [
          {
            path: configs.routes.login,
            element: <Login />
          },
          {
            path: configs.routes.register,
            element: <Register />
          }
          // {
          //   path: configs.routes.resetPassword,
          //   element: (
          //     <ResetPasswordGuard>
          //       <ResetPassword />
          //     </ResetPasswordGuard>
          //   )
          // }
        ]
      }
    ]
  },
  {
    path: configs.routes.admin,
    element: <AdminLayout />
  },
  {
    path: configs.routes.error,
    element: <NotFound />
  }
])

export default router
