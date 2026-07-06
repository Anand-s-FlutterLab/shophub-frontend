import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { DashboardState, ProductList } from "../types/product.types";
import {
  getCategoryProducts,
  getFeaturedProducts,
} from "../services/dashboardService";

const initialState: DashboardState = {
  featuredProductsData: null,
  isFeaturedDataLoading: false,
  featuredByCategory: {},
  error: null,
};

export const featuredProducts = createAsyncThunk<ProductList>(
  "dashboard/featured",
  async (_, { rejectWithValue }) => {
    try {
      return await getFeaturedProducts();
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

export const categoryProducts = createAsyncThunk<
  { category: string; data: ProductList },
  { category: string }
>("dashboard/category", async ({ category }, { rejectWithValue }) => {
  try {
    const data = await getCategoryProducts({ category });

    return { category, data };
  } catch (error: unknown) {
    const axiosError = error as {
      response?: { data?: { message?: string } };
    };

    return rejectWithValue(
      axiosError.response?.data?.message ??
        "Something went wrong. Please try again.",
    );
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(featuredProducts.pending, (state) => {
        state.isFeaturedDataLoading = true;
        state.error = null;
      })
      .addCase(featuredProducts.rejected, (state, action) => {
        state.isFeaturedDataLoading = false;
        state.error = action.payload as string;
      })
      .addCase(featuredProducts.fulfilled, (state, action) => {
        state.isFeaturedDataLoading = false;
        state.error = null;
        state.featuredProductsData = action.payload;
      })
      .addCase(categoryProducts.pending, (state, action) => {
        const { category } = action.meta.arg;

        state.featuredByCategory[category] = {
          data: state.featuredByCategory[category]?.data ?? null,
          isLoading: true,
          error: null,
        };
      })
      .addCase(categoryProducts.fulfilled, (state, action) => {
        const { category, data } = action.payload;

        state.featuredByCategory[category] = {
          data,
          isLoading: false,
          error: null,
        };
      })
      .addCase(categoryProducts.rejected, (state, action) => {
        const { category } = action.meta.arg;

        state.featuredByCategory[category] = {
          data: state.featuredByCategory[category]?.data ?? null,
          isLoading: false,
          error: action.payload as string,
        };
      });
  },
});

export default dashboardSlice.reducer;
