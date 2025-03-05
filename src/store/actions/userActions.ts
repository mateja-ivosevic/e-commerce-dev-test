import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL, handleResponse } from "@/services/api";

export interface UserFormData {
  id?: number;
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  username: string;
  password?: string;
  address?: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone?: string;
}

// Fetch all users
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      return await handleResponse(response);
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

// Create new user
export const createUser = createAsyncThunk(
  "users/create",
  async (userData: UserFormData, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        id: Date.now(),
        ...userData,
      };
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "users/update",
  async (
    { id, userData }: { id: number; userData: UserFormData },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        id,
        ...userData,
      };
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (userId: number, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return userId;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);
