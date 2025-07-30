import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CartContext } from "../context/cartcontext";
import { toast } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { supabase } from "../supabaseClient";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper-custom.css";
import { Dialog } from "@headlessui/react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);

  const openSizeGuide = () => {
    if (product?.category === "Necklaces") {
      setSelectedGuide("necklace");
    } else if (product?.category === "Rings") {
      setSelectedGuide("ring");
    } else {
      setSelectedGuide(null);
    }
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("❌ Error fetching product:", error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!product?.category) return;

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", product.category)
        .neq("id", id)
        .limit(6);

      if (!error) setRelatedProducts(data || []);
    };

    fetchRelated();
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("تمت الإضافة إلى السلة");
  };

  if (loading) {
    return (
      <p className="p-6 text-center text-gray-500">جاري تحميل المنتج...</p>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center text-red-500 dark:text-red-400">
        المنتج غير موجود 😢
      </div>
    );
  }

  let images = [];

  if (Array.isArray(product.image)) {
    images = product.image.filter(Boolean);
  } else if (product.image) {
    images = [product.image];
  } else if (Array.isArray(product.image_url)) {
    images = product.image_url.filter(Boolean);
  } else if (typeof product.image_url === "string") {
    images = [product.image_url];
  }

  return (
    <>
      <motion.div
        className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6 md:p-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-md shadow"
          >
            ← رجوع
          </button>

          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            {/* الصور */}
            <div className="w-full lg:w-1/2">
              {images.length > 0 ? (
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation={images.length > 1}
                  pagination={images.length > 1 ? { clickable: true } : false}
                  loop={images.length > 1}
                  spaceBetween={20}
                  slidesPerView={1}
                  className="rounded-2xl overflow-hidden"
                >
                  {images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="absolute inset-0 bg-center bg-cover blur-sm scale-105"
                        style={{
                          backgroundImage: `url(${typeof img === "string" ? img : img.url})`,
                        }}
                      ></div>
                      <div className="relative z-10 flex items-center justify-center w-full h-full">
                        <img
                          src={typeof img === "string" ? img : img.url}
                          alt={`product ${index}`}
                          className="w-full max-h-[400px] object-contain"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <p className="text-center text-gray-500">لا توجد صور متاحة</p>
              )}
            </div>

            {/* التفاصيل */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center lg:text-right">
                {product.name}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center lg:text-right">
                {product.description}
              </p>

              <p className="text-xl sm:text-2xl text-pink-600 dark:text-pink-400 font-semibold mb-2 text-center lg:text-right">
                {product.price} EGP
              </p>

              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center lg:text-right">
                {product.stock}
              </p>

              <button
                onClick={openSizeGuide}
                className="sizes-btn bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-xl mb-4 shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                📏 دليل المقاسات
              </button>
              <hr className="border-t border-gray-300 dark:border-gray-600 mb-4" />

              <button
                onClick={handleAddToCart}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 rounded-xl text-lg transition-transform transform hover:scale-105 active:scale-95 duration-200 shadow-md"
              >
                أضف إلى السلة 🛒
              </button>
            </div>
          </div>
        </div>

        {/* منتجات ذات صلة */}
        {relatedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto mt-12 px-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              منتجات مشابهة
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="bg-gray-50 dark:bg-gray-900 overflow-hidden flex flex-col hover:scale-[1.02] group h-full transition-colors duration-500 text-center cursor-pointer max-w-xs w-full
"
                >
                  <img
                    src={
                      Array.isArray(item.image_url)
                        ? item.image_url[0] || "/default.jpg"
                        : typeof item.image_url === "string"
                          ? item.image_url
                          : "/default.jpg"
                    }
                    alt={item.name}
                    className="w-full h-40 object-contain mb-2"
                  />
                  <h4 className="text-gray-800 dark:text-white font-semibold truncate">
                    {item.name}
                  </h4>
                  <p className="text-center text-gray-600 dark:text-gray-400 text-sm my-3">
                    {item.description}
                  </p>
                  <p className="text-pink-500 font-bold">{item.price} EGP</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* مودال دليل المقاسات */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2 sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.25, ease: "easeIn" }}
              className="bg-white dark:bg-gray-900 p-4 sm:p-8 rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-xs lg:max-w-xs relative shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedGuide(null);
                }}
                className="absolute top-2 sm:top-3 right-2 sm:right-3 w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-pink-600 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-md"
              >
                ✕
              </button>

              <h3 className="text-xl sm:text-2xl font-extrabold mb-4 text-center text-gray-800 dark:text-white">
                دليل المقاسات
              </h3>

              <div className="flex justify-center gap-2 mb-4">
                <button
                  onClick={() => setSelectedGuide("necklace")}
                  className={`px-4 py-2 rounded-full font-semibold shadow border-2 ${
                    selectedGuide === "necklace"
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300"
                  }`}
                >
                  سلاسل
                </button>
                <button
                  onClick={() => setSelectedGuide("ring")}
                  className={`px-4 py-2 rounded-full font-semibold shadow border-2 ${
                    selectedGuide === "ring"
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300"
                  }`}
                >
                  خواتم
                </button>
              </div>

              {selectedGuide === "necklace" && (
                <img
                  src="/necklace-size.jpg"
                  alt="دليل مقاسات السلاسل"
                  className="w-full rounded-xl shadow nec"
                />
              )}
              {selectedGuide === "ring" && (
                <img
                  src="/Measure.png"
                  alt="دليل مقاسات الخواتم"
                  className="w-full rounded-xl shadow"
                />
              )}
            </motion.div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default ProductDetails;
