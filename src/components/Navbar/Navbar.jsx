import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navlogo } from "../../assets";
import Profile from "./Profile"; // Import the Profile dropdown component
import useAuthStore from "../../store/authStore"; // Import your auth store

const Navbar = ({ setNavMargin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [navMarginTop, setNavMarginTop] = useState("mt-5");

  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setShowNavbar(currentScrollY <= lastScrollY);
      setLastScrollY(currentScrollY);

      setHideTopBar(currentScrollY > 50);
      // Change margin dynamically
      if (currentScrollY > 0) {
        setNavMarginTop("mt-0");
      } else {
        setNavMarginTop("mt-5");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, hideTopBar, showNavbar, setNavMargin]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top Bar */}
      <div
        className={`bg-black text-white  flex justify-between items-center px-4 md:px-10 text-sm transition-transform duration-500 ${
          hideTopBar ? "-translate-y-full" : "translate-y-0"
        } fixed top-0 left-0 w-full`}
      >
        <div className="flex space-x-4 text-white">
          <a href="mailto:B9Concept@gmail.com" className="hover:underline">
            B9Concept@gmail.com
          </a>
          <span className="hidden md:block mx-2">|</span>
          <a href="tel:+919970436943" className="hover:underline">
            +91 9970436943
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={` md:rounded-b-full bg-white 0 h-20 text-black shadow-md md:px-10 flex justify-between items-center transition-all duration-500 z-50 ${navMarginTop}`}
      >
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <div className="p-2 my-6 rounded-full mt-5 flex items-center space-x-2">
            <img
              className="h-15 object-cover rounded-2xl shadow-md active:scale-95"
              src={navlogo}
              alt="b9concept"
            />
            <span className="font-extrabold text-3xl uppercase">
              B9 Concept
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden justify-center items-center lg:flex space-x-8 text-md font-semibold">
          {[
            "HOME",
            "ABOUT US",
            "PROCESS",
            "ACHIEVEMENT",
            "BLOG",
            "CONTACT US",
          ].map((item, index) => (
            <button
              key={index}
              onClick={() =>
                navigate(`/${item.toLowerCase().replace(/\s/g, "")}`)
              }
              className="hover:text-[#79b7c8]"
            >
              {item}
            </button>
          ))}

          {/* Conditionally render Profile dropdown or Login button */}
          {isAuthenticated ? (
            <Profile />
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-black text-white px-7 py-1 rounded-2xl"
            >
              LOGIN
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white-400 px-3 py-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 right-0 h-[200vh]  w-full max-w-sm shadow-md px-6 py-6 lg:hidden space-y-4 z-[110] bg-gradient-to-r from-[#1f6578] via-[#1f6575] to-[#1f6572]"
          >
            {/* User Info Section at Top */}
            {isAuthenticated && (
              <div className="bg-white/10 p-4 rounded-lg mb-4 mt-10">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{user?.username}</h3>
                    <p className="text-sm text-white/80">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-gray-100"
            >
              <X size={28} />
            </button>
            {[
              "HOME",
              "ABOUT US",
              "PROCESS",
              "ACHIEVEMENT",
              "BLOG",
              "CONTACT US",
              isAuthenticated ? "LOGOUT" : "LOGIN",
            ].map((item, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  if (item === "LOGOUT") {
                    useAuthStore.getState().logout();
                  } else {
                    navigate(`/${item.toLowerCase().replace(/\s/g, "")}`);
                  }
                  toggleMenu();
                }}
                className="block w-full text-left text-gray-100 font-semibold p-2 hover:bg-gray-600 rounded transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
