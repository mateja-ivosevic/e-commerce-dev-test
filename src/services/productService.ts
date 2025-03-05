import {
  API_BASE_URL,
  authenticatedFetch,
  handleResponse,
  getAuthToken,
} from "./api";

const PRODUCTS_URL = `${API_BASE_URL}/products`;
const PRODUCT_BY_ID_URL = (id: string | number) =>
  `${API_BASE_URL}/products/${id}`;

export interface ProductData {
  title: string;
  price: number;
  description: string;
  category: string;
  image?: string;
}

export const getAllProducts = async () => {
  const token = getAuthToken();

  if (token) {
    return await authenticatedFetch(PRODUCTS_URL);
  } else {
    const response = await fetch(PRODUCTS_URL);
    return handleResponse(response);
  }
};

export const getProductById = async (id: string | number) => {
  return await authenticatedFetch(PRODUCT_BY_ID_URL(id));
};

export const createProduct = async (productData: ProductData) => {
  return await authenticatedFetch(PRODUCTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
};

export const updateProduct = async (
  id: string | number,
  productData: ProductData
) => {
  return await authenticatedFetch(PRODUCT_BY_ID_URL(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
};

export const deleteProduct = async (id: string | number) => {
  return await authenticatedFetch(PRODUCT_BY_ID_URL(id), {
    method: "DELETE",
  });
};
