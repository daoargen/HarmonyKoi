import { FC, PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

// import Loading from "../components/common/Loading";
import HomePage from "../pages/Home/HomePage";
import configs from "../configs";
import useAuth from "../hooks/useAuth";

// GuestGuard is a component that will be used to protect routes
// that should only be accessed by unauthenticated users.
const GuestGuard: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading, isLoggedIn } = useAuth();

  if (!isLoading) return <HomePage />; //chuyền lại về tới trang thông báo 
  if (isLoggedIn) return <Navigate to={configs.routes.home} replace />;

  return children || <Outlet />;
};

export default GuestGuard;
