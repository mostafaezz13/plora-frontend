import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../context/cartcontext";
import { toast } from "react-hot-toast";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const { addToCart } = useContext(CartContext);

  if (!product) {
    return (
      <div className="p-4 text-gray-800 dark:text-gray-100 transition-colors duration-300">
        Product not found
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to your cart");
  };

  const handleWheelZoom = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prev) => Math.min(Math.max(prev + delta, 1), 3));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.4 }}
    >
      <section className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="p-4 max-w-4xl mx-auto text-gray-800 dark:text-gray-100 transition-colors duration-300">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-md shadow transition-colors duration-300"
          >
            ← Back
          </button>

<div className="w-full max-w-4xl mx-auto p-4">
  {Array.isArray(product.image) ? (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={1}
      navigation={{
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      }}
      pagination={{ clickable: true }}
      loop={true}
      className="relative"
    >
      {product.image.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt={`product ${index}`}
            className="w-full h-[400px] object-contain rounded-2xl"
          />
        </SwiperSlide>
      ))}

      {/* الأسهم المخصصة */}
      <button className="custom-prev absolute left-0 top-0 h-full w-12 bg-black/10 hover:bg-black/20 transition z-10 flex items-center justify-center">
        <FaChevronLeft className="text-white text-2xl" />
      </button>

      <button className="custom-next absolute right-0 top-0 h-full w-12 bg-black/10 hover:bg-black/20 transition z-10 flex items-center justify-center">
        <FaChevronRight className="text-white text-2xl" />
      </button>
    </Swiper>
  ) : (
    <img
      src={product.image}
      alt={product.title}
      className="w-full h-[400px] object-cover rounded-2xl"
    />
  )}
</div>

          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-pink-600 dark:text-pink-400 text-xl mb-4 transition-colors duration-300">
            {product.price} EGP
          </p>
          <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
            {product.description}
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-5 min-w-[140px] bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl text-sm transition"
          >
            Add To Cart
          </button>
        </div>
      </section>
    </motion.div>
  );
};

export default ProductDetails;
