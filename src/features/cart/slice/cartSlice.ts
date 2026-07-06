import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const CART_KEY = "cart";

export interface CartItem {
  id: number;
  image: string;
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  title: string;
  category: string;
  price: number;
}

interface CartState {
  data: CartItem[];
  error: string | null;
}

const loadCart = (): CartItem[] => {
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

export const saveCart = (items: CartItem[]): void => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // storage unavailable
  }
};

const initialState: CartState = {
  data: loadCart(),
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.data.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + action.payload.quantity,
          existingItem.maxQuantity,
        );
      } else {
        state.data.push(action.payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const item = state.data.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity = Math.max(
          item.minQuantity,
          Math.min(action.payload.quantity, item.maxQuantity),
        );
      }
    },

    clearCart: (state) => {
      state.data = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
