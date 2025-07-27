import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let { data, error } = await supabase.from('products').select('*');
      if (error) console.error("Error fetching products:", error);
      else setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow-md p-4">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-700">{product.price} جنيه</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
