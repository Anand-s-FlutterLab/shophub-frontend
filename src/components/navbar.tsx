import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import {
  IoPersonOutline,
  IoChevronDown,
  IoReceiptOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { SiShopify } from "react-icons/si";
import { useDashboard } from "../features/home/hooks/dashboardHook";
import { useCart } from "../features/cart/hooks/cartHook";
import { useOrders } from "../features/order/hooks/orderHook";
import { useAuth } from "../features/auth/hooks/authHook";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../app/router/routes";

function Navbar() {
  const { cartCount } = useDashboard();
  const { clearCart } = useCart();
  const { clearOrders } = useOrders();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    setIsProfileOpen(false);
    clearCart();
    clearOrders();
    logout();
    navigate(ROUTES.SIGNIN);
  };

  return (
    <div className="flex items-center gap-6 px-6 py-3 bg-surface border-b border-border text-text">
      {/* LEFT */}
      <div
        className="flex items-center font-semibold shrink-0 cursor-pointer select-none"
        onClick={() => navigate(ROUTES.HOME)}
      >
        <SiShopify size={30} className="text-primary " />
        <h1 className="text-xl ml-2">Shop</h1>
        <h1 className="text-xl text-primary">Hub</h1>
      </div>

      {/* CENTER (SEARCH) */}
      <div className="relative flex-1 min-w-0">
        <FiSearch
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          type="search"
          placeholder="Search for products, brands and more..."
          className="h-10 w-full"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-8 shrink-0">
        {/* CART */}
        <div
          className="flex items-center gap-2 relative select-none cursor-pointer"
          onClick={() => navigate(ROUTES.CART)}
        >
          <FiShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-2 right-8 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs">
              {cartCount}
            </span>
          )}
          <p>Cart</p>
        </div>

        {/* PROFILE */}
        <div
          className="relative select-none"
          onMouseEnter={() => setIsProfileOpen(true)}
          onMouseLeave={() => setIsProfileOpen(false)}
        >
          <div className="flex items-center gap-2 cursor-pointer py-2">
            <IoPersonOutline size={22} />
            <p>Anand</p>
            <IoChevronDown
              size={20}
              className={`transition-transform duration-200 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full w-48 bg-surface border border-border rounded-xl shadow-lg overflow-hidden z-50"
              >
                <div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-secondary-hover transition-colors"
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate(ROUTES.ORDERS);
                  }}
                >
                  <IoReceiptOutline size={18} />
                  <p>Orders</p>
                </div>
                <hr className="border-t border-border" />
                <div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer text-danger hover:bg-secondary-hover transition-colors"
                  onClick={handleLogout}
                >
                  <IoLogOutOutline size={18} />
                  <p>Logout</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
