import { configureStore, type Middleware } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/slice/authSlice";
import dashboardReducer from "../../features/home/slice/dashboardSlice";
import cartReducer, {
  saveCart,
} from "../../features/cart/slice/cartSlice";
import orderReducer, {
  saveOrders,
} from "../../features/order/slice/orderSlice";

const cartPersistMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  if (typeof action === "object" && action !== null && "type" in action) {
    if ((action.type as string).startsWith("cart/")) {
      saveCart(storeAPI.getState().cart.data);
    }
    if ((action.type as string).startsWith("order/")) {
      saveOrders(storeAPI.getState().order.data);
    }
  }
  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartPersistMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
