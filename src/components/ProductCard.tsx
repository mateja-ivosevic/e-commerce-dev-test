import React from "react";
import { Product } from "@/store/slices/productsSlice";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 h-48 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={150}
          height={150}
          className="h-full object-contain"
          unoptimized={true}
        />
      </div>
      <div className="p-4 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 truncate">
          {product.title}
        </h3>
        <p className="mt-1 text-gray-500 text-sm truncate">
          {product.category}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <span className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View Product
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
