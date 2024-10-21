import { createBrowserRouter } from 'react-router-dom'

import configs from '../configs'
import GuestGuard from '../Guards/GuestGuard'
import AdminLayout from '../layouts/AdminLayout'
// import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/HomePage'
import Login from '../pages/Login/LoginPage'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'
// import ResetPassword from '../pages/ResetPassword'
// import ForgotPassword from '../pages/ForgotPassword'
import PostPage from '../pages/Post/PostPage'
import NewsPage from '../pages/News/NewsPage'
import ConsultingPage from '../pages/Consulting/ConsultingPage'
import AppLayout from '../App'
import LoginPage from '../pages/Login/LoginPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    // errorElement: <ErrorPage />, // Xử lý lỗi 404 và các lỗi khác
    children: [
      {
        path: configs.routes.home,
        element: <Home />
      },
      {
        path: configs.routes.login,
        element: <LoginPage />
      },
      {
        path: configs.routes.register,
        element: <Register />
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
    path: configs.routes.home,
    element: <Home />
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
