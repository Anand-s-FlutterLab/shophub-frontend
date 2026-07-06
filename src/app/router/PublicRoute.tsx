import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { ROUTES } from "./routes";

export default function PublicRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? (
    <Navigate to={ROUTES.HOME} replace />
  ) : (
    <Outlet />
  );
}
