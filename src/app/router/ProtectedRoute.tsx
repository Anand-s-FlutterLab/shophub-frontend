import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { ROUTES } from "./routes";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.SIGNIN} replace />
  );
}
