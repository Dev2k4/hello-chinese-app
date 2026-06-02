import apiClient from "../../../services/apiClient";
import { API_ROUTES } from "../../../constants/apiRoutes";
import { User } from "../../../types/user.types";

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const { data } = await apiClient.post(API_ROUTES.AUTH.LOGIN, {
      email,
      password,
    });
    return data;
  },

  async register(payload: RegisterPayload): Promise<LoginResponse> {
    const { data } = await apiClient.post(API_ROUTES.AUTH.REGISTER, payload);
    return data;
  },

  async getProfile(): Promise<User> {
    const { data } = await apiClient.get(API_ROUTES.AUTH.PROFILE);
    return data;
  },
};
