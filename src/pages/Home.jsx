import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

const Home = () => {
  return (
    <section className="h-[89.6vh] overflow-hidden bg-[#fff8f6] dark:bg-gray-900 flex flex-col items-center justify-center px-6 relative transition-colors duration-500">
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center space-y-6 max-w-xl"
      >
        <motion.div
          animate={{ y: [-10, 10] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#7a4f3c] dark:text-pink-300 leading-snug">
            Timeless Jewelry by <span className="text-pink-400">PLORA</span>
          </h1>

          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Elegant stainless steel pieces crafted with passion. Explore our
            collection of Necklaces, Rings, Bracelets & more — made to last and
            shine.
          </p>

          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-600 text-white px-6 py-3 my-12 rounded-full shadow hover:bg-pink-700 transition text-sm uppercase tracking-wider"
            >
              Browse Collection
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
