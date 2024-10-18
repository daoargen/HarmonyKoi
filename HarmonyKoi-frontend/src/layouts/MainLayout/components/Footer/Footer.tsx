import { Link, NavLink } from "react-router-dom";

import about from "~layouts/MainLayout/data/about";
import navLinks from "~layouts/MainLayout/data/navLinks";
import social from "~layouts/MainLayout/data/social";
import { cn } from "~lib/utils";

import Container from "../Container";

const Footer = () => {
  return (
    <footer className="py-20 text-[#231900]">
      <Container>
        <div className="flex">
          <section className="max-w-96">
            <h2 className="text-primary text-2xl font-semibold">Prepify</h2>
            <p className="mt-11 text-lg">Mang đến 1 cuộc sống tiện lợi, hiện đại và không lãng phí thực phẩm.</p>
            <div className="flex gap-12 mt-[74px]">
              {social.map((item) => (
                <Link key={item.to} to={item.to} target="_blank">
                  {item.icon}
                </Link>
              ))}
            </div>
          </section>

          <section className="ml-auto">
            <h3 className="text-2xl font-semibold">Trang</h3>
            <ul className="mt-[42px]">
              {navLinks.map((item) => (
                <li key={item.to} className="py-[7px] text-lg">
                  <NavLink to={item.to} className={({ isActive }) => cn("", { "text-primary": isActive })}>
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>

          <section className="max-w-[300px] ml-24">
            <h3 className="text-2xl font-semibold">Về ‘Prepify’</h3>
            <ul className="mt-[42px]">
              {about.map((item) => (
                <li key={item.to} className="py-[7px] text-lg">
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex justify-between mt-40 text-lg">
          <span>Copyright © 2024 Prepify</span>
          <span>Powered by Prepify</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
