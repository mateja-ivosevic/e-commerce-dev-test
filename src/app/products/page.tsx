"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchProducts } from "@/store/actions/productsActions";
import NavigationMenu from "@/components/NavigationMenu";
import TopNavBar from "@/components/TopNavBar";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/navigation";

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { products, status, error } = useSelector(
    (state: RootState) => state.products
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" ||
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  return (
    <>
      <NavigationMenu />
      <TopNavBar />
      <div className="pl-64 pt-16">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              Products
            </h1>
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Category filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(category === "all" ? "" : category)
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    (category === "all" && selectedCategory === "") ||
                    selectedCategory === category
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {status === "loading" && (
            <p className="text-center py-8">Loading products...</p>
          )}
          {status === "failed" && (
            <p className="text-center py-8 text-red-500">Error: {error}</p>
          )}

          {/* Products grid */}
          {status === "succeeded" && (
            <>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="h-full cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8">
                  No products found matching your criteria.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
