import { API_BASE_URL } from "./api";

const AUTH_URL = `${API_BASE_URL}/auth/login`;

export const login = async (username: string, password: string) => {
  const response = await fetch(AUTH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Authentication failed");
  }

  return await response.json();
};
