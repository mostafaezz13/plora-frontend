import React from "react";
import { Link } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-pink-100 p-4 shadow-lg">
        <h2 className="text-xl font-bold text-pink-700 mb-6 text-center">Control Panel</h2>
        <nav className="space-y-3">
          <Link to="/add" className="block px-3 py-2 rounded hover:bg-pink-200">
            ➕ إضافة منتج
          </Link>
          <Link to="/productsD" className="block px-3 py-2 rounded hover:bg-pink-200">
            📦 عرض المنتجات
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
};

export default DashboardLayout;
