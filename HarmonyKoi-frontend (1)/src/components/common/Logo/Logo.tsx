import { Link } from "react-router-dom";

import icons from "../../../assets/icons";
import configs from "../../../configs";

const Logo = ({ to = configs.routes.home }: { to?: string }) => {
  return (
    <Link to={to} className="inline-flex gap-[10px] flex-shrink-0">
      <img src={icons.logo} alt="Prepify" className="h-full" />
      <span className="font-roboto text-secondary text-[32px]">Prepify</span>
    </Link>
  );
};

export default Logo;
