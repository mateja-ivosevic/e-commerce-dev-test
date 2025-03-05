import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout, checkAuth } from "@/store/actions/authActions";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
  user: {
    username: string;
  } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
  user: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restoreSession: (state, action: PayloadAction<{ username: string }>) => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        state.isAuthenticated = true;
        state.token = token;
        state.user = { username: action.payload.username };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.token) {
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = { username: action.payload.username };
          localStorage.setItem("auth_token", action.payload.token);
        }
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Login failed";
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        localStorage.removeItem("auth_token");
      })

      // Check auth
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = { username: action.payload.username };
        }
      });
  },
});

export const { restoreSession } = authSlice.actions;
export default authSlice.reducer;
