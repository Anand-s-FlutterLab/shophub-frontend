import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  type CartItem,
} from "../slice/cartSlice";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { data, error } = useAppSelector((state) => state.cart);

  return {
    cartItems: data,
    cartCount: data.length,
    error,
    addToCart: (item: CartItem) => dispatch(addToCart(item)),
    removeFromCart: (id: number) => dispatch(removeFromCart(id)),
    updateQuantity: (id: number, quantity: number) =>
      dispatch(updateQuantity({ id, quantity })),
    clearCart: () => dispatch(clearCart()),
  };
};
