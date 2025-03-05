"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchProductById } from "@/store/actions/productsActions";
import NavigationMenu from "@/components/NavigationMenu";
import TopNavBar from "@/components/TopNavBar";
import Image from "next/image";

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const id = params?.id as string;

  const { selectedProduct, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(parseInt(id, 10)));
    }
  }, [id, dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading product...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-xl">Product not found</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <NavigationMenu />
      <TopNavBar />
      <div className="pl-64 pt-16">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-white rounded-lg shadow overflow-hidden p-6 flex items-center justify-center">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                width={400}
                height={400}
                className="object-contain h-96 w-full"
              />
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-3xl font-bold mb-2">
                {selectedProduct.title}
              </h1>

              <div className="flex items-center mb-4">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {selectedProduct.category}
                </span>
              </div>

              <div className="text-3xl font-bold text-indigo-600 mb-6">
                ${selectedProduct.price.toFixed(2)}
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">Description</h2>
                <p className="text-gray-700">{selectedProduct.description}</p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => router.back()}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
