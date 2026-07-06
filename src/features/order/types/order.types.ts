import type { CartItem } from "../../cart/slice/cartSlice";

export type OrderStatus = "Placed" | "Processing" | "Shipped" | "Delivered";

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}
