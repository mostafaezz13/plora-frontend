import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert("حدث خطأ أثناء جلب المنتج");
      } else {
        setProduct(data);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    let updatedImageUrls = Array.isArray(product.image_url)
      ? [...product.image_url]
      : [product.image_url];

    // رفع الصور الجديدة (لو في)
    for (let file of newImages) {
      const fileExt = file.name.split(".").pop();
      const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(uniqueName, file);

      if (uploadError) {
        alert("فشل رفع الصور الجديدة");
        setLoading(false);
        return;
      }

      const imageUrl = `https://veyqsrkmwywnovdxkwhg.supabase.co/storage/v1/object/public/product-images/${uniqueName}`;
      updatedImageUrls.push(imageUrl);
    }

    // تحديث المنتج
    const { error: updateError } = await supabase
      .from("products")
      .update({
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        category: product.category,
        stock: product.stock,
        image_url: updatedImageUrls,
      })
      .eq("id", id);

    if (updateError) {
      alert("فشل تحديث المنتج");
    } else {
      alert("✅ تم تحديث المنتج بنجاح");
      navigate("/products");
    }

    setLoading(false);
  };

  if (!product)
    return <div className="p-4 text-center">جاري تحميل بيانات المنتج...</div>;

  const navigated = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigated("/login");
    }
  }, []);
  return (
    <form
      onSubmit={handleUpdate}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">تعديل المنتج</h2>

      <input
        type="text"
        className="input w-full p-2 border rounded"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        required
      />

      <textarea
        className="input w-full p-2 border rounded"
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
        required
      />

      <input
        type="number"
        className="input w-full p-2 border rounded"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
        required
      />

      <input
        type="text"
        className="input w-full p-2 border rounded"
        value={product.category}
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
        required
      />

      <label className="block text-sm font-medium text-gray-700">
        حالة المخزون
      </label>
      <select
        value={product.stock}
        onChange={(e) => setProduct({ ...product, stock: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="متوفر في المخزون">متوفر في المخزون</option>
        <option value="غير متوفر في المخزون">غير متوفر في المخزون</option>
      </select>

      <div>
        <label className="block font-medium mb-1">الصور الحالية:</label>
        <div className="flex gap-2 flex-wrap">
          {(Array.isArray(product.image_url)
            ? product.image_url
            : [product.image_url]
          ).map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt="صورة المنتج"
              className="w-16 h-16 object-cover rounded border"
            />
          ))}
        </div>
      </div>

      <input
        type="file"
        multiple
        onChange={(e) => setNewImages([...e.target.files])}
        className="mt-2"
      />

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {loading ? "جارٍ التحديث..." : "تحديث المنتج"}
      </button>
    </form>
  );
};

export default EditProduct;
