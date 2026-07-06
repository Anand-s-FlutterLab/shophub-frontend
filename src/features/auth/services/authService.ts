import {api} from "../../../services/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  status: boolean;
  role: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface SignupResponse {
  message: string;
  status: number;
}

export const loginUser = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/login", {data: credentials});
  return data;
};

export const signupUser = async (
  credentials: SignupRequest,
): Promise<SignupResponse> => {
  const { data } = await api.post<SignupResponse>("/signup", {
    data: credentials,
  });
  return data;
};
