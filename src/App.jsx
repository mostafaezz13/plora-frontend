import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./AllProducts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./Cart";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./dashboard/AddProduct";
import ProductList from "./ProductList";
import AllProductsD from "./dashboard/AllProductsD";
import EditProduct from "./dashboard/EditProduct";

import { supabase } from "./supabaseClient";
function App() {
  const [cart, setCart] = useState([]);

  // ⬇️ هنا بنعرف دالة إضافة المنتج للسلة
  const addToCart = (product) => {
    setCart([...cart, product]);
    console.log("تمت إضافة المنتج إلى السلة:", product.name);
  };
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/product/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/productsD" element={<AllProductsD />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </>
  );
}

export default App;
