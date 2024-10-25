import { createBrowserRouter } from 'react-router-dom'

import configs from '../configs'
import GuestGuard from '../Guards/GuestGuard'
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
import KoiFishForm from '../pages/koiFish/koiFishForm'
import KoiFishDetail from '../pages/koiFish/KoiFishDetail' // Adjust the path as needed
import LoginPage from '../pages/Login/LoginPage'
import AuthGuard from '../Guards/AuthGuard'
import KoiFishByYear from '../pages/koiFish/koiFishByYear'
import ManagePage from '../layouts/MainLayout/components/Manage/ManagePage/ManagePage'

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
      {
        path: configs.routes.koifish,
        element: <KoiFishForm />
      },
      {
        path: '/koiFishes/:id', // Add the detail route here
        element: <KoiFishDetail />
      },
      {
        path: '/koiFishForm/:yearOfBirth', // Add the detail route here
        element: <KoiFishByYear />
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
  // {
  //   path: configs.routes.home,
  //   element: <Home />
  // },
  {
    path: '/admin/manage',
    element: (
      <AuthGuard>
        <ManagePage />
      </AuthGuard>
    )
  },
  {
    path: '/member/manage',
    element: (
      <AuthGuard>
        <ManagePage />
      </AuthGuard>
    )
  },
  {
    path: configs.routes.error,
    element: <NotFound />
  }
])

export default router
