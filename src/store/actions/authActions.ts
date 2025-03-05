import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "@/services/authService";

export const login = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.login(username, password);
      return { token: response.token, username };
    } catch {
      return rejectWithValue("Login failed. Please check your credentials.");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return true;
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    return { token, username: "restored_user" };
  }
  return null;
});
