"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/actions/productsActions";
import { RootState, AppDispatch } from "@/store";
import { Product } from "@/store/slices/productsSlice";
import AppLayout from "../AppLayout";
import Link from "next/link";
import Image from "next/image";

const CategoriesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status } = useSelector(
    (state: RootState) => state.products
  );

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const categoriesMap: Record<string, Product[]> = {};

  if (products && products.length > 0) {
    products.forEach((product: Product) => {
      if (!categoriesMap[product.category]) {
        categoriesMap[product.category] = [];
      }
      categoriesMap[product.category].push(product);
    });

    if (Object.keys(openCategories).length === 0) {
      const firstCategory = Object.keys(categoriesMap)[0];
      setOpenCategories({ [firstCategory]: true });
    }
  }

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  if (status === "loading") {
    return (
      <AppLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Product Categories</h1>

        <div className="space-y-4">
          {Object.keys(categoriesMap).map((category) => (
            <div
              key={category}
              className="border border-gray-300 rounded-md overflow-hidden"
            >
              {/* Category header - clickable to expand/collapse */}
              <div
                className="bg-gray-200 px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                <h2 className="font-semibold text-gray-800 capitalize">
                  {category}
                </h2>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    openCategories[category] ? "" : "transform rotate-180"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </div>

              {openCategories[category] && (
                <div className="bg-white">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {categoriesMap[category].map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {product.image && (
                                <div className="flex-shrink-0 h-10 w-10 mr-4">
                                  <Image
                                    src={product.image}
                                    alt={product.title}
                                    width={40}
                                    height={40}
                                    className="object-cover rounded-md"
                                  />
                                </div>
                              )}
                              <div className="truncate max-w-xs">
                                {product.title}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.rating?.rate || "N/A"} (
                            {product.rating?.count || 0})
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.hasOwnProperty("stock")
                              ? product.stock
                              : "In Stock"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <Link
                              href={`/products/${product.id}`}
                              className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default CategoriesPage;
