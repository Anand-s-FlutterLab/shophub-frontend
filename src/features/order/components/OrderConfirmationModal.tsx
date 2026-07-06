import { AnimatePresence, motion } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";
import type { Order } from "../types/order.types";

interface OrderConfirmationModalProps {
  order: Order | null;
  onContinueShopping: () => void;
  onViewOrders: () => void;
}

function OrderConfirmationModal({
  order,
  onContinueShopping,
  onViewOrders,
}: OrderConfirmationModalProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {order && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md mx-4 bg-surface border border-border rounded-2xl p-6 flex flex-col items-center text-center"
          >
            <div className="bg-success/10 rounded-full p-4">
              <IoCheckmarkCircle className="text-success" size={48} />
            </div>

            <h1 className="text-2xl font-semibold mt-4">Order Placed!</h1>
            <p className="text-text-muted text-sm mt-2">
              Thank you for shopping with us. Your order has been placed
              successfully.
            </p>

            <div className="w-full border border-border rounded-xl p-4 mt-6 flex flex-col gap-2">
              <div className="flex justify-between">
                <p className="text-text-muted text-sm">Order ID</p>
                <p className="text-sm">{order.id}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-text-muted text-sm">Items</p>
                <p className="text-sm">{order.items.length}</p>
              </div>
              <hr className="border-t border-border my-1" />
              <div className="flex justify-between">
                <p className="text-text-muted">Total Paid</p>
                <p className="text-primary text-xl">
                  {formatPrice(order.total)}
                </p>
              </div>
            </div>

            <div className="flex gap-3 w-full mt-6">
              <button
                type="button"
                onClick={onContinueShopping}
                className="btn-outline-primary flex-1 h-12 rounded-xl"
              >
                Continue Shopping
              </button>
              <button
                type="button"
                onClick={onViewOrders}
                className="btn-primary flex-1 h-12 rounded-xl"
              >
                View Orders
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default OrderConfirmationModal;
