"use client";

import React from "react";
import Link from "next/link";

const NavigationMenu: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg z-10 flex flex-col">
      <div className="p-5 border-b border-gray-700">
        <h3 className="text-xl font-bold text-red-500">E-Commerce App</h3>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/products"
              className="block p-2 hover:bg-gray-700 rounded transition"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/categories"
              className="block p-2 hover:bg-gray-700 rounded transition"
            >
              Categories
            </Link>
          </li>
          <li className="pt-5 mt-5 border-t border-gray-700">
            <Link
              href="/admin/users"
              className="block p-2 hover:bg-gray-700 rounded transition"
            >
              Manage Users
            </Link>
          </li>
          <li>
            <Link
              href="/admin/products"
              className="block p-2 hover:bg-gray-700 rounded transition"
            >
              Manage Products
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationMenu;
