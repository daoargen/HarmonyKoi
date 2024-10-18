// import { BsBoxSeam } from "react-icons/bs";
import {
  TbApps,
  // TbBarrierBlock,
  // TbChartHistogram,
  TbChecklist,
  // TbComponents,
  // TbError404,
  // TbExclamationCircle,
  // TbHexagonNumber1,
  // TbHexagonNumber2,
  // TbHexagonNumber3,
  // TbHexagonNumber4,
  // TbHexagonNumber5,
  TbLayoutDashboard,
  TbMessages,
  // TbRouteAltLeft,
  // TbServerOff,
  TbSettings,
  // TbTruck,
  // TbUsers,
  // TbUserShield,
} from "react-icons/tb";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sideLinks: SideLink[] = [
  {
    title: "Tổng Quan",
    label: "",
    href: "/admin",
    icon: <TbLayoutDashboard size={18} />,
  },
  {
    title: "Tạo Công Thức Mới",
    label: "",
    href: "/tasks",
    icon: <TbChecklist size={18} />,
  },
  {
    title: "Tạo Gói Nguyên Liệu",
    label: "",
    href: "/apps",
    icon: <TbApps size={18} />,
  },
  {
    title: "Danh Sách Đơn Hàng",
    label: "",
    href: "/chats",
    icon: <TbMessages size={18} />,
  },
  // {
  //   title: "Apps",
  //   label: "",
  //   href: "/apps",
  //   icon: <TbApps size={18} />,
  // },
  // {
  //   title: "Authentication",
  //   label: "",
  //   href: "",
  //   icon: <TbUserShield size={18} />,
  //   sub: [
  //     {
  //       title: "Sign In (email + password)",
  //       label: "",
  //       href: "/sign-in",
  //       icon: <TbHexagonNumber1 size={18} />,
  //     },
  //     {
  //       title: "Sign In (Box)",
  //       label: "",
  //       href: "/sign-in-2",
  //       icon: <TbHexagonNumber2 size={18} />,
  //     },
  //     {
  //       title: "Sign Up",
  //       label: "",
  //       href: "/sign-up",
  //       icon: <TbHexagonNumber3 size={18} />,
  //     },
  //     {
  //       title: "Forgot Password",
  //       label: "",
  //       href: "/forgot-password",
  //       icon: <TbHexagonNumber4 size={18} />,
  //     },
  //     {
  //       title: "OTP",
  //       label: "",
  //       href: "/otp",
  //       icon: <TbHexagonNumber5 size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: "Users",
  //   label: "",
  //   href: "/users",
  //   icon: <TbUsers size={18} />,
  // },
  // {
  //   title: "Requests",
  //   label: "10",
  //   href: "/requests",
  //   icon: <TbRouteAltLeft size={18} />,
  //   sub: [
  //     {
  //       title: "Trucks",
  //       label: "9",
  //       href: "/trucks",
  //       icon: <TbTruck size={18} />,
  //     },
  //     {
  //       title: "Cargos",
  //       label: "",
  //       href: "/cargos",
  //       icon: <BsBoxSeam size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: "Analysis",
  //   label: "",
  //   href: "/analysis",
  //   icon: <TbChartHistogram size={18} />,
  // },
  // {
  //   title: "Extra Components",
  //   label: "",
  //   href: "/extra-components",
  //   icon: <TbComponents size={18} />,
  // },
  // {
  //   title: "Error Pages",
  //   label: "",
  //   href: "",
  //   icon: <TbExclamationCircle size={18} />,
  //   sub: [
  //     {
  //       title: "Not Found",
  //       label: "",
  //       href: "/404",
  //       icon: <TbError404 size={18} />,
  //     },
  //     {
  //       title: "Internal Server Error",
  //       label: "",
  //       href: "/500",
  //       icon: <TbServerOff size={18} />,
  //     },
  //     {
  //       title: "Maintenance Error",
  //       label: "",
  //       href: "/503",
  //       icon: <TbBarrierBlock size={18} />,
  //     },
  //   ],
  // },
  {
    title: "Cài Đặt",
    label: "",
    href: "/settings",
    icon: <TbSettings size={18} />,
  },
];
