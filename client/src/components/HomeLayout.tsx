import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional: install lucide-react or use any icon

const HomeLayout = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "#about", label: "About" },
    { path: "#testimonials", label: "Testimonials" },
    { path: "/contact", label: "Contact" },
    { path: "/login", label: "Login" },
    { path: "/register", label: "Register" },
  ];

  return (
    <main className="relative">
      <nav className="flex justify-between items-center p-4 bg-black text-white fixed w-full z-50 shadow-md">
        <div className="text-2xl font-bold px-4">Delta Ride</div>

        <div className="md:hidden px-4">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <ul className="hidden md:flex gap-4 px-4">
          {navItems.map(({ path, label }) => (
            <Link key={label} to={path}>
              <li
                className={`p-2 font-medium rounded ${
                  pathname === path ? "bg-cyan-600" : ""
                }`}
              >
                {label}
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="flex flex-col gap-2 px-4 py-6 bg-black text-white md:hidden absolute top-16 left-0 w-full shadow-md z-40">
          {navItems.map(({ path, label }) => (
            <Link key={label} to={path} onClick={() => setMenuOpen(false)}>
              <li
                className={`p-2 font-medium ${
                  pathname === path ? "bg-cyan-600" : ""
                }`}
              >
                {label}
              </li>
            </Link>
          ))}
        </ul>
      )}

      <div className="pt-20">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default HomeLayout;
