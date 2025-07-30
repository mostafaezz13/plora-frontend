import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const uniqueCategories = [
    "الكل",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === "الكل"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Error fetching products:", error.message);
    } else {
      setProducts(data);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد أنك تريد حذف هذا المنتج؟")) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        alert("فشل حذف المنتج");
      } else {
        alert("تم حذف المنتج");
        fetchProducts();
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, []);
  return (
    <DashboardLayout>
      <div className="p-6 max-w-5xl mx-auto">
        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            navigate("/login");
          }}
          className="text-sm text-red-600 hover:underline"
        >
          تسجيل الخروج
        </button>

        <h2 className="text-2xl font-bold mb-4">كل المنتجات</h2>
        <div className="overflow-x-auto">
          <div className="mb-4">
            <label className="text-sm font-medium mr-2">فلتر حسب القسم:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 px-3 py-1 rounded"
            >
              {uniqueCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <table className="w-full text-right border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">الصورة</th>
                <th className="p-2">الاسم</th>
                <th className="p-2">السعر</th>
                <th className="p-2">القسم</th>
                <th className="p-2">الحالة</th>
                <th className="p-2">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-2">
                    <img
                      src={
                        Array.isArray(product.image_url)
                          ? product.image_url[0]
                          : product.image_url
                      }
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.price} ج.م</td>
                  <td className="p-2">{product.category}</td>
                  <td className="p-2">{product.stock}</td>
                  <td className="p-2 space-x-2 space-x-reverse">
                    <Link
                      to={`/edit/${product.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      تعديل
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:underline"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllProducts;
