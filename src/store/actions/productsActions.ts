import { createAsyncThunk } from "@reduxjs/toolkit";
import * as productService from "@/services/productService";
import { ProductData } from "@/services/productService";
export type { ProductData };

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const products = await productService.getAllProducts();
      return products;
    } catch {
      return rejectWithValue("Failed to fetch products");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (productId: string | number, { rejectWithValue }) => {
    try {
      const product = await productService.getProductById(productId);
      return product;
    } catch {
      return rejectWithValue(`Failed to fetch product #${productId}`);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (productData: ProductData, { rejectWithValue }) => {
    try {
      const newProduct = await productService.createProduct(productData);
      return newProduct;
    } catch {
      return rejectWithValue("Failed to create product");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (
    { id, productData }: { id: string | number; productData: ProductData },
    { rejectWithValue }
  ) => {
    try {
      const updatedProduct = await productService.updateProduct(
        id,
        productData
      );
      return updatedProduct;
    } catch {
      return rejectWithValue(`Failed to update product #${id}`);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (productId: string | number, { rejectWithValue }) => {
    try {
      await productService.deleteProduct(productId);
      return productId;
    } catch {
      return rejectWithValue(`Failed to delete product #${productId}`);
    }
  }
);
