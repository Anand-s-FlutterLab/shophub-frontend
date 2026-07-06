import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { ROUTES } from "./routes";
import AuthLayout from "../../layouts/AuthLayout";
import Login from "../../features/auth/pages/Login";
import MainLayout from "../../layouts/MainLayout";
import Signup from "../../features/auth/pages/Signup";
import Dashboard from "../../features/home/pages/Dashboard";
import Cart from "../../features/cart/pages/Cart";
import Orders from "../../features/order/pages/Orders";

export const router = createBrowserRouter([
  // Public Routes
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.SIGNIN,
            element: <Login />,
          },
          {
            path: ROUTES.SIGNUP,
            element: <Signup />,
          },
        ],
      },
    ],
  },

  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTES.HOME,
            element: <Dashboard />,
          },
          {
            path: ROUTES.CART,
            element: <Cart />,
          },
          {
            path: ROUTES.ORDERS,
            element: <Orders />,
          },
          // {
          //   path: ROUTES.SETTINGS,
          //   element: <Settings />,
          // },
        ],
      },
    ],
  },

  // 404
  {
    path: "*",
    element: <h1>404 - Page Not Found</h1>,
  },
]);
