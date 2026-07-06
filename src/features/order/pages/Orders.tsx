import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useOrders } from "../hooks/orderHook";
import type { Order, OrderStatus } from "../types/order.types";
import { ROUTES } from "../../../app/router/routes";
import { HiOutlineShoppingBag } from "react-icons/hi";
import {
  IoReceiptOutline,
  IoSyncOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";

const STATUS_STYLES: Record<
  OrderStatus,
  { icon: React.ReactNode; className: string }
> = {
  Placed: {
    icon: <IoReceiptOutline size={14} />,
    className: "bg-primary/10 text-primary",
  },
  Processing: {
    icon: <IoSyncOutline size={14} />,
    className: "bg-warning/10 text-warning",
  },
  Shipped: {
    icon: <TbTruckDelivery size={14} />,
    className: "bg-info/10 text-info",
  },
  Delivered: {
    icon: <IoCheckmarkCircle size={14} />,
    className: "bg-success/10 text-success",
  },
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function OrderCard({ order }: { order: Order }) {
  const status = STATUS_STYLES[order.status];

  return (
    <div className="border border-border rounded-xl p-4">
      <div className="flex justify-between items-start flex-wrap gap-2">
        <div>
          <p className="text-lg">{order.id}</p>
          <p className="text-text-muted text-xs mt-1">
            Placed on {format(new Date(order.createdAt), "dd MMM yyyy, hh:mm a")}
          </p>
        </div>
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ${status.className}`}
        >
          {status.icon}
          <p>{order.status}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <img src={item.image} className="h-16 w-16 rounded-lg" />
            <div className="flex-1">
              <p>{item.title}</p>
              <p className="text-text-muted text-sm">{item.category}</p>
            </div>
            <p className="text-text-muted text-sm">Qty: {item.quantity}</p>
            <p className="w-20 text-right">{formatPrice(item.price)}</p>
          </div>
        ))}
      </div>

      <hr className="border-t border-border mt-4" />

      <div className="flex justify-between items-center mt-3">
        <p className="text-text-muted text-sm">
          {order.items.length} item{order.items.length > 1 ? "s" : ""} ·
          {order.shipping === 0 ? " Free shipping" : ` Shipping ${formatPrice(order.shipping)}`}
        </p>
        <p className="text-primary text-xl">{formatPrice(order.total)}</p>
      </div>
    </div>
  );
}

function Orders() {
  const navigate = useNavigate();
  const { orders } = useOrders();

  return (
    <div className="mt-4 p-4 border border-border rounded-2xl max-h-[88vh] overflow-hidden flex flex-col">
      <div>
        <h1 className="font-semibold text-2xl">My Orders</h1>
        <p className="text-text-muted text-sm mt-2">
          Track, view and manage all your orders
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
          <div className="bg-primary/10 rounded-full p-4">
            <HiOutlineShoppingBag className="text-primary" size={32} />
          </div>
          <p className="text-lg">No orders yet</p>
          <p className="text-text-muted text-sm">
            When you place an order, it will show up here
          </p>
          <button
            type="button"
            onClick={() => navigate(ROUTES.HOME)}
            className="btn-primary h-12 px-6 rounded-xl mt-2"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-4 overflow-y-auto scrollbar-hide">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
