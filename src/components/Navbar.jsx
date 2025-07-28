import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-pink-600 dark:text-pink-400 transition-colors duration-300"
        >
          PLORA
        </Link>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl text-gray-800 dark:text-white mr-4 md:hidden transition-colors duration-300"
            title="Dark Mode Toggler"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="md:hidden text-pink-600 dark:text-pink-400 focus:outline-none transition-colors duration-300"
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 12h16"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 18h16"
                  />
                </>
              )}
            </motion.svg>
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="nav-link text-white">
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Products
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
          <Link to="/cart" className="nav-link">
            <FaShoppingCart className="text-2xl" />
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl text-gray-800 dark:text-white ml-4"
            title="Dark Mode Toggler"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-md"
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link to="/" onClick={closeMenu} className="nav-link">
                Home
              </Link>
              <Link to="/products" onClick={closeMenu} className="nav-link">
                Products
              </Link>
              <Link to="/about" onClick={closeMenu} className="nav-link">
                About
              </Link>
              <Link to="/contact" onClick={closeMenu} className="nav-link">
                Contact
              </Link>
              <Link to="/cart" onClick={closeMenu} className="nav-link">
                Cart
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
