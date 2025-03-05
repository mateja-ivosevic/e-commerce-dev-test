import { API_BASE_URL, authenticatedFetch } from "./api";

const USERS_URL = `${API_BASE_URL}/users`;
const USER_BY_ID_URL = (id: string | number) => `${API_BASE_URL}/users/${id}`;

export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(USERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return await response.json();
};

export const getUsers = async () => {
  return await authenticatedFetch(USERS_URL);
};

export const getUserById = async (id: string | number) => {
  return await authenticatedFetch(USER_BY_ID_URL(id));
};

export const updateUser = async (
  id: string | number,
  userData: Partial<{ username: string; email: string; password: string }>
) => {
  return await authenticatedFetch(USER_BY_ID_URL(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const deleteUser = async (id: string) => {
  return await authenticatedFetch(USER_BY_ID_URL(id), {
    method: "DELETE",
  });
};
