import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { login, logout, clearError, signup } from "../slice/authSlice";
import type { LoginRequest, SignupRequest } from "../services/authService";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { token, role, isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth,
  );
  

  return {
    token,
    role,
    isAuthenticated,
    isLoading,
    error,
    login: (credentials: LoginRequest) => dispatch(login(credentials)).unwrap(),
    signup: (credentials: SignupRequest) =>
      dispatch(signup(credentials)).unwrap(),
    logout: () => dispatch(logout()),
    clearError: () => dispatch(clearError()),
  };
};
