import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/cartcontext";
import { Toaster } from "react-hot-toast";
import CursorFollower from "./components/CursorFollower";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <CursorFollower />
        <App />
        <Toaster position="top-center" reverseOrder={false} />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
