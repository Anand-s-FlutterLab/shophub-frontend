import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/cartHook";
import { useOrders } from "../../order/hooks/orderHook";
import OrderConfirmationModal from "../../order/components/OrderConfirmationModal";
import type { Order } from "../../order/types/order.types";
import { ROUTES } from "../../../app/router/routes";
import { HiArrowRight, HiOutlineShoppingBag } from "react-icons/hi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { LuShieldCheck } from "react-icons/lu";
import { GiReturnArrow } from "react-icons/gi";
import { MdSupportAgent } from "react-icons/md";

import { LiaCcVisa } from "react-icons/lia";
import { LiaCcMastercard } from "react-icons/lia";
import { LiaCcApplePay } from "react-icons/lia";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, clearCart, removeFromCart } = useCart();
  const { placeOrder } = useOrders();
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = subtotal > 499 ? 0 : 50;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      subtotal,
      shipping,
      total,
      status: "Placed",
      createdAt: new Date().toISOString(),
    };

    placeOrder(order);
    clearCart();
    setPlacedOrder(order);
  };

  return (
    <div className="flex gap-4">
      <div className="flex-5 mt-4 p-4 border border-border rounded-2xl max-h-[88vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-baseline">
          <div>
            <h1 className="font-semibold text-2xl">
              Your Cart ({cartItems.length})
            </h1>
            <p className="text-text-muted text-sm mt-2">
              Review your items and proceed to checkout
            </p>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={clearCart}
          >
            <RiDeleteBin5Line className="text-primary" size={20} />
            <p className="text-primary">Clear Cart</p>
          </div>
        </div>
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
            <div className="bg-primary/10 rounded-full p-4">
              <HiOutlineShoppingBag className="text-primary" size={32} />
            </div>
            <p className="text-lg">Your cart is empty</p>
            <p className="text-text-muted text-sm">
              Looks like you haven't added anything yet
            </p>
            <button
              type="button"
              onClick={() => navigate(ROUTES.HOME)}
              className="btn-primary h-12 px-6 rounded-xl mt-2"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-4 overflow-y-auto scrollbar-hide">
            {cartItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className="border border-border rounded-xl p-4 flex gap-4"
                >
                  <img src={item.image} className="h-30 w-30" />
                  <div className="flex-col flex-1">
                    <p className="text-xl">{item.title}</p>
                    <p className="text-text-muted">{item.category}</p>
                    <p className="text-green-600 text-xs mt-2">In Stock</p>
                  </div>
                  <div className="flex-col flex justify-between items-end">
                    <RiDeleteBin5Line
                      className="text-text"
                      size={15}
                      onClick={() => removeFromCart(item.id)}
                    />
                    <p>{formatPrice(item.price)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex-2 mt-4 p-4 border border-border rounded-2xl">
        <p className="text-2xl">Order Summary</p>
        <div className="flex justify-between mt-4">
          <p className="text-text-muted">Subtotal ({cartItems.length} items)</p>
          <p className="text-xl">{formatPrice(subtotal)}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-text-muted">Shipping</p>
          <p className={`${shipping === 0 ? "text-green-600" : "text-text"}`}>
            {formatPrice(shipping)}
          </p>
        </div>
        <hr className="border-t border-border mt-2" />
        <div className="flex justify-between mt-2">
          <p className="text-text-muted text-xl">Total</p>
          <p className=" text-primary text-2xl">{formatPrice(total)}</p>
        </div>
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={cartItems.length === 0}
          className="btn-primary w-full h-12 rounded-xl mb-5 disabled:opacity-60 mt-10"
        >
          <div className="flex gap-4 justify-center items-center">
            <p className="">Place Order</p>
            <HiArrowRight />
          </div>
        </button>
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <div className="bg-primary/10 rounded-xl p-2">
              <TbTruckDelivery className="text-primary" size={25} />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Free Delivery</p>
              <p className="text-sm text-text-muted">
                On orders above {formatPrice(499)}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-primary/10 rounded-xl p-2">
              <LuShieldCheck className="text-primary" size={25} />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Secure Payment</p>
              <p className="text-sm text-text-muted">100% secure & trusted</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-primary/10 rounded-xl p-2">
              <GiReturnArrow className="text-primary" size={25} />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Easy Returns</p>
              <p className="text-sm text-text-muted">30-day return policy</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-primary/10 rounded-xl p-2">
              <MdSupportAgent className="text-primary" size={25} />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">24/7 Support</p>
              <p className="text-sm text-text-muted">We're here to help</p>
            </div>
          </div>
        </div>
        <hr className="border-t border-border mt-2" />
        <p className="text-sm mt-4">We accept</p>
        <div className="flex gap-4 mt-2">
          <LiaCcVisa size={35} />
          <LiaCcMastercard size={35} />
          <LiaCcApplePay size={35} />
        </div>
      </div>

      <OrderConfirmationModal
        order={placedOrder}
        onContinueShopping={() => {
          setPlacedOrder(null);
          navigate(ROUTES.HOME);
        }}
        onViewOrders={() => {
          setPlacedOrder(null);
          navigate(ROUTES.ORDERS);
        }}
      />
    </div>
  );
}

export default Cart;
