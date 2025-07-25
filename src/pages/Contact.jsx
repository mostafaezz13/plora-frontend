import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  return (
    <section
      id="contact"
      className="h-[100vh] bg-white dark:bg-gray-900 flex items-center justify-center px-6 py-16 transition-colors duration-500"
    >
      <motion.div
        className="bg-gradient-to-br from-pink-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl flex flex-col md:flex-row  transition-colors duration-500"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center text-gray-800 dark:text-white transition-colors duration-500">
          <h2 className="text-4xl font-bold mb-4">Get in Touch 💬</h2>
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-300 transition-colors duration-500">
            Have a question, custom request, or just wanna say hi? We're just a
            message away!
          </p>

          <div className="space-y-4 text-gray-700 dark:text-gray-200 transition-colors duration-500">
            <p>
              <span className="font-semibold">WhatsApp:</span>{" "}
              <a
                href="https://wa.me/201099723943"
                className="text-pink-600 hover:underline"
              >
                +20109 972 3943
              </a>
            </p>
            <p>Based in Egypt – We ship nationwide</p>
          </div>

          <a
            href="https://wa.me/201099723943"
            className="mt-6 inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:scale-105"
          >
            Chat on WhatsApp
          </a>

          {/* Social Icons */}
          <div className="mt-8 flex items-center space-x-6 text-2xl">
            <a
              href="https://wa.me/201099723943"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:scale-125 transition-transform"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61577891240148"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:scale-125 transition-transform"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/plora_accessories/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:scale-125 transition-transform"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Right: Image or Illustration */}
        <div className="w-full md:w-1/2 bg-[url('/products-img/contact-bg.jpeg')] bg-cover bg-center hidden md:block" />
      </motion.div>
    </section>
  );
};

export default Contact;
