import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./context/cartcontext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { AnimatePresence, motion } from "framer-motion";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [customerName, setCustomerName] = useState("");
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const generateWhatsAppLink = () => {
    if (!cartItems.length || !customerName.trim()) return "#";

    const message = cartItems
      .map(
        (item, index) =>
          `${index + 1}- ${item.name} x ${item.quantity} = ${item.price * item.quantity} EGP`
      )
      .join("\n");

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const finalMessage = `Hello, I’m ${customerName}. I’d like to order the following products:\n\n${message}\n\nTotal: ${total} EGP.\n\nPlease confirm the order.`;

    const encodedMessage = encodeURIComponent(finalMessage);
    const phone = "201099723943";

    return `https://wa.me/${phone}?text=${encodedMessage}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-md shadow  transition-colors duration-300"
      >
        ← رجوع
      </button>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition-all duration-500">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          🛒 Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300 text-lg">
            Your cart is currently empty.
          </p>
        ) : (
          <div className="space-y-6 transition-all duration-500">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 transition duration-300 ease-in-out transform hover:scale-[1.01]"
              >
                <Link
                  to={`/product/${item.id}`}
                  className="flex items-center space-x-4 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        Array.isArray(item.image_url)
                          ? item.image_url[0]
                          : item.image_url
                      }
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover shadow-md"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {item.price} EGP × {item.quantity} ={" "}
                        {item.price * item.quantity} EGP
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Remove one"
                  >
                    <FaMinus size={16} />
                  </button>
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-100">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="text-green-600 hover:text-green-800 transition"
                    title="Add one"
                  >
                    <FaPlus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <>
            <div className="mt-8 transition-opacity duration-500">
              <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                Customer Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                💰 Total:{" "}
                <span className="text-green-600">
                  {cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}{" "}
                  EGP
                </span>
              </p>

              <button
                onClick={() => setShowInstructions(true)}
                className="bg-green-500 hover:bg-green-600 text-white text-center py-3 px-6 rounded-lg text-lg font-medium shadow transition-all duration-300"
              >
                ✅ Complete Order on WhatsApp
              </button>
            </div>
          </>
        )}

        <div className="flash mt-10 bg-yellow-100 dark:bg-yellow-200 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow flex items-center gap-3">
          <svg
            className="w-6 h-6 text-yellow-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <span className="text-sm font-medium">
            Online payment options coming soon to improve your shopping
            experience 💳
          </span>
        </div>
      </div>
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-md w-full shadow-xl relative"
            >
              <button
                onClick={() => setShowInstructions(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>

              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white text-center">
                خطوات إتمام الطلب
              </h3>

              <ul className="text-gray-700 dark:text-gray-200 text-sm space-y-3 mb-6">
                <li>✅ "دوس على زر "متابعة للواتساب.</li>
                <li>📦 هيفتحلك واتساب وفيه رسالة فيها تفاصيل الطلب.</li>
                <li>📝 راجع اسمك والحاجات اللي طلبتها.</li>
                <li>📬 ابعت الرسالة واستنى تأكيد الطلب من خدمة العملاء.</li>
              </ul>

              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-center font-medium"
              >
                متابعة للواتساب
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
