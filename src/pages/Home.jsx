import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa6";

const categories = [
  {
    name: "Necklaces",
    path: "/products?category=Necklaces",
    img: "WhatsApp Image 2025-08-09 at 3.22.19 PM.jpeg",
  },
  {
    name: "Rings",
    path: "/products?category=Rings",
    img: "WhatsApp Image 2025-08-09 at 3.22.12 PM.jpeg",
  },
  {
    name: "Bracelets",
    path: "/products?category=Bracelets",
    img: "WhatsApp Image 2025-08-09 at 3.22.10 PM.jpeg",
  },
  {
    name: "Earrings",
    path: "/products?category=Earrings",
    img: "WhatsApp Image 2025-08-09 at 3.22.08 PM.jpeg",
  },
];

const Home = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-r from-black to-pink-900 flex items-center justify-center px-6 py-10">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-white space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-snug">
            Discover Your Perfect <span className="text-pink-600">Jewelry</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-md">
            PLORA – Your Everyday Shine Stylish stainless steel and Italian
            sterling silver accessories made to match your vibe and last for
            years. Wear it, love it, live it.
          </p>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-600 text-white px-8 py-3 my-10 rounded-full shadow-lg hover:bg-white hover:text-pink-600 transition uppercase tracking-wider font-semibold"
            >
              Explore All
            </motion.button>
          </Link>

          {/* Scroll Down Button */}
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center cursor-pointer mt-6 md:hidden"
          >
            <span className="text-sm text-gray-300 mb-1">Scroll Down</span>
            <FaArrowDown className="text-pink-500 text-xl animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Right Categories */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          {/* عنوان التصنيفات */}
          <h2 className="text-3xl font-bold text-white mb-6 text-center md:text-left">
            Our <span className="text-pink-500">Categories</span>
          </h2>

          {/* شبكة التصنيفات */}
          <div className="grid grid-cols-2 gap-6">
            {categories.map((cat, index) => (
              <Link to={cat.path} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white">
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <span className="text-lg font-semibold">{cat.name}</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
