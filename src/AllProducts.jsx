import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "./context/cartcontext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { supabase } from "./supabaseClient";

const categories = [
  "All Products",
  "Rings",
  "Necklaces",
  "Earrings",
  "Bracelets",
];

const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "All Products"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <motion.div
      className="bg-gray-50 dark:bg-gray-900"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <aside className="hidden md:block md:w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-6 transition-colors duration-500 sticky top-0 h-screen overflow-y-auto">
          <h2 className="text-pink-600 dark:text-pink-400 font-bold mb-4 text-lg text-left">
            Categories
          </h2>
          <ul className="space-y-2 text-left">
            {categories.map((category, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full text-left px-4 py-2 rounded transition text-sm font-medium ${
                    selectedCategory === category
                      ? "bg-pink-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900"
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="block md:hidden w-full">
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 py-3">
            <Link
              to="/cart"
              className="text-gray-700 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 font-medium"
            >
              <FaShoppingCart className="text-2xl" />
            </Link>
            <h2 className="text-gray-700 dark:text-gray-200 font-bold text-lg">
              Categories
            </h2>
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className="text-pink-600 dark:text-pink-400 focus:outline-none"
            >
              <motion.svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </motion.svg>
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4"
              >
                {categories.map((category, index) => (
                  <li key={index} className="mb-2 last:mb-0">
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition ${
                        selectedCategory === category
                          ? "bg-pink-600 text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <main className="flex-1 p-4 md:p-6">
          <h1 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-6">
            {selectedCategory}
          </h1>

          {loading ? (
            <p className="text-gray-500 dark:text-gray-400">
              Loading products...
            </p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No products found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {filteredProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <div className="bg-gray-50 dark:bg-gray-900 overflow-hidden flex flex-col hover:scale-[1.02] group h-full transition-colors duration-500">
                    <img
                      src={
                        Array.isArray(product.image_url)
                          ? product.image_url[0]
                          : product.image_url || "/default.jpg"
                      }
                      alt={product.name}
                      className="w-full h-48 sm:h-56 md:h-auto object-cover mb-2"
                    />
                    <h3 className="text-center text-lg font-semibold text-gray-800 mb-1 dark:text-gray-100 group-hover:text-pink-600 transition">
                      {product.name}
                    </h3>
                    <p className="text-center text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                      {product.description}
                    </p>
                    <span className="text-center text-pink-600 dark:text-pink-400 font-bold text-md my-3">
                      {product.price} EGP
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                        toast.success("Added to your cart");
                      }}
                      className="mt-auto hover:scale-105 active:scale-95 duration-200 shadow-mdmt-auto w-full bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </motion.div>
  );
};

export default AllProducts;
