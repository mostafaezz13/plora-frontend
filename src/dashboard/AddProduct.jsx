import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
    stock: "متوفر في المخزون",
  });

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (imageFiles.length === 0) {
      alert("اختر صورة واحدة على الأقل");
      setLoading(false);
      return;
    }

    let imageUrls = [];

    for (let file of imageFiles) {
      const fileExt = file.name.split(".").pop();
      const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

      const { data: storageData, error: storageError } = await supabase.storage
        .from("product-images")
        .upload(uniqueName, file);

      if (storageError) {
        console.error("❌ Storage Error:", storageError.message);
        alert("فشل رفع الصورة");
        setLoading(false);
        return;
      }

      const imageUrl = `https://veyqsrkmwywnovdxkwhg.supabase.co/storage/v1/object/public/product-images/${uniqueName}`;
      imageUrls.push(imageUrl);
    }

    const { error: dbError } = await supabase.from("products").insert([
      {
        name,
        description,
        image_url: imageUrls,
        price: parseFloat(price),
        category,
        stock: formData.stock,
        created_at: new Date().toISOString(),
      },
    ]);

    if (dbError) {
      console.error("❌ DB Error:", dbError.message);
      alert("فشل حفظ المنتج: " + dbError.message);
    } else {
      alert("✅ تم رفع المنتج بنجاح 🎉");
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImageFiles([]);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleUpload}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">إضافة منتج جديد</h2>

      <input
        type="text"
        placeholder="اسم المنتج"
        className="input w-full p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <textarea
        placeholder="الوصف"
        className="input w-full p-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="السعر"
        className="input w-full p-2 border rounded"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="القسم (category)"
        className="input w-full p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <label className="block text-sm font-medium text-gray-700 mb-1">
        حالة المخزون
      </label>
      <select
        value={formData.stock}
        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="متوفر في المخزون">متوفر في المخزون</option>
        <option value="غير متوفر في المخزون">غير متوفر في المخزون</option>
      </select>

      <input
        type="file"
        multiple
        onChange={(e) => setImageFiles([...e.target.files])}
        required
      />

      <button
        disabled={loading}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 w-full"
      >
        {loading ? "جارٍ الرفع..." : "رفع المنتج"}
      </button>
    </form>
  );
};

export default AddProduct;
