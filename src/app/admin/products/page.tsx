"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  ProductData,
} from "@/store/actions/productsActions";
import {
  selectProduct,
  clearSelectedProduct,
  Product,
} from "@/store/slices/productsSlice";
import ProductFormModal from "@/components/Modal/ProductFormModal";
import NavigationMenu from "@/components/NavigationMenu";
import TopNavBar from "@/components/TopNavBar";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ManageProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, selectedProduct, status, error } = useSelector(
    (state: RootState) => state.products
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    dispatch(clearSelectedProduct());
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    dispatch(selectProduct(product));
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await dispatch(deleteProduct(id));
    }
  };

  const handleSubmitProduct = async (data: ProductData) => {
    setIsModalOpen(false);

    if (modalMode === "add") {
      await dispatch(createProduct(data));
    } else {
      await dispatch(
        updateProduct({
          id: selectedProduct!.id,
          productData: data,
        })
      );
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(clearSelectedProduct());
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavigationMenu />
      <TopNavBar />
      <div className="pl-64 pt-16">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Products</h1>
            <button
              onClick={handleAddProduct}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Add New Product
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && (
            <p className="text-red-500">Error: {error}</p>
          )}

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={40}
                          height={40}
                          className="h-10 w-10 object-contain"
                          onError={() => {}}
                        />
                      </td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 cursor-pointer hover:text-indigo-600"
                        onClick={() => router.push(`/products/${product.id}`)}
                      >
                        {product.title.length > 20
                          ? `${product.title.substring(0, 20)}...`
                          : product.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-3 py-4 text-center text-sm text-gray-500"
                      >
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <ProductFormModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={handleSubmitProduct}
            product={selectedProduct}
            title={modalMode === "add" ? "Add New Product" : "Edit Product"}
          />
        </div>
      </div>
    </>
  );
};

export default ManageProductsPage;
