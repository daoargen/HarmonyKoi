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
import LoginPage from '../pages/Login/LoginPage'
import RoleBasedGuard from '../Guards/RoleBasedGuard'
import ManageOrder from '../pages/MemberPage/MangeOrder/MangeOrderPage'
import ManageNews from '../pages/AdminPage/ManageNews/ManageNewsPage'
import ManageFish from '../pages/AdminPage/MangeFish/ManageFish'
import ApprovePost from '../pages/AdminPage/ApprovePost/ApprovePostPage'
import ManagePond from '../pages/AdminPage/ManagePond/ManagePondPage'
import ManageUser from '../pages/AdminPage/ManageUser/ManageUser'
import ManangePost from '../pages/MemberPage/MangePost/MangePostPage'
import Dashboard from '../pages/AdminPage/Dashboard/DashboardPage'
import { Role } from '../types/user.type'
import AuthGuard from '../Guards/AuthGuard'
import ManagePage from '../layouts/MainLayout/components/Manage/ManagePage/ManagePage'
import PostDetailPage from '../pages/DetailPage/PostDetail/PostDetailPage'
import NewsDetailPage from '../pages/DetailPage/NewsDetail/NewsDetailPage'

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
        path: 'posts/:id',
        element: <PostDetailPage />
      },
      {
        path: 'news/:id',
        element: <NewsDetailPage />
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
        ]
      }
    ]
  },
  {
    path: 'admin/manage',
    element: (
      <AuthGuard>
        <RoleBasedGuard accessibleRoles={[Role.ADMIN]}>
          <ManagePage />
        </RoleBasedGuard>
      </AuthGuard>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'manage-users',
        element: <ManageUser />
      },
      {
        path: 'manage-fish',
        element: <ManageFish />
      },
      {
        path: 'manage-ponds',
        element: <ManagePond />
      },
      {
        path: 'manage-news',
        element: <ManageNews />
      },
      {
        path: 'approve-posts',
        element: <ApprovePost />
      }
    ]
  },
  {
    path: '/member/manage',
    element: (
      <AuthGuard>
        <RoleBasedGuard accessibleRoles={[Role.MEMBER]}>
          <ManagePage />
        </RoleBasedGuard>
      </AuthGuard>
    ),
    children: [
      {
        path: 'manage-posts',
        element: (
          <RoleBasedGuard accessibleRoles={[Role.MEMBER]}>
            <ManangePost />
          </RoleBasedGuard>
        )
      },
      {
        path: 'manage-orders',
        element: <ManageOrder />
      }
    ]
  },
  {
    path: configs.routes.error,
    element: <NotFound />
  }
])

export default router
