import { createBrowserRouter } from "react-router-dom";

import configs from "../configs";
import GuestGuard from "../Guards/GuestGuard";
import ResetPasswordGuard from "../Guards/ResetPasswordGuard";
import AdminLayout from "../layouts/AdminLayout";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/HomePage";
import Login from "../pages/Login/LoginPage";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";

const router = createBrowserRouter([
  {
    element: <GuestGuard />,
    children: [
      {
        path: configs.routes.login,
        element: <Login />,
      },
      {
        path: configs.routes.register,
        element: <Register />,
      },
      {
        path: configs.routes.forgotPassword,
        element: <ForgotPassword/>
      },
      {
        path: configs.routes.resetPassword,
        element: (
          <ResetPasswordGuard>
            <ResetPassword />
          </ResetPasswordGuard>
        ),
      },
    ],
  },
  {
    path: configs.routes.home,
    element: <MainLayout />,
    children: [
      {
        path: configs.routes.home,
        element: <Home />,
      },
    ],
  },
  {
    path: configs.routes.admin,
    element: <AdminLayout />,
  },
  {
    path: configs.routes.error,
    element: <NotFound />,
  },
]);

export default router;
