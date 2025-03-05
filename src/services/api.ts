// Shared API utilities
export const API_BASE_URL = "https://fakestoreapi.com";

// Common utility functions
export const getAuthToken = () => localStorage.getItem("auth_token");

export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {}
) => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  const authOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, authOptions);
  return handleResponse(response);
};

export const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    localStorage.removeItem("auth_token");
    window.location.href = "/login";
    throw new Error("Unauthorized access");
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return await response.json();
};
