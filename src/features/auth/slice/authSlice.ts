import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "../services/authService";
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from "../services/authService";

const TOKEN_KEY = "token";

interface AuthState {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem(TOKEN_KEY),
  role: null,
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      return await loginUser(credentials);
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      return rejectWithValue(
        axiosError.response?.data?.message ?? "Login failed. Please try again.",
      );
    }
  },
);

export const signup = createAsyncThunk<LoginResponse, SignupRequest>(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      await signupUser(credentials);

      const loginResponse = await loginUser({
        email: credentials.email,
        password: credentials.password,
      });

      return loginResponse;
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };

      return rejectWithValue(
        axiosError.response?.data?.message ??
          "Signup failed. Please try again.",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem(TOKEN_KEY);
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.role = action.payload.role;
        localStorage.setItem(TOKEN_KEY, action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
