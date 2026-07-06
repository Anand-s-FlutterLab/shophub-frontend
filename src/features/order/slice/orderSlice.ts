import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "../types/order.types";

const ORDERS_KEY = "orders";

interface OrderState {
  data: Order[];
}

const loadOrders = (): Order[] => {
  try {
    const orders = localStorage.getItem(ORDERS_KEY);
    return orders ? JSON.parse(orders) : [];
  } catch {
    return [];
  }
};

export const saveOrders = (orders: Order[]): void => {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch {
    // storage unavailable
  }
};

const initialState: OrderState = {
  data: loadOrders(),
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<Order>) => {
      state.data.unshift(action.payload);
    },

    clearOrders: (state) => {
      state.data = [];
    },
  },
});

export const { placeOrder, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
