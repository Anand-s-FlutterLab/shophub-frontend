import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { placeOrder, clearOrders } from "../slice/orderSlice";
import type { Order } from "../types/order.types";

export const useOrders = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.order);

  return {
    orders: data,
    placeOrder: (order: Order) => dispatch(placeOrder(order)),
    clearOrders: () => dispatch(clearOrders()),
  };
};
