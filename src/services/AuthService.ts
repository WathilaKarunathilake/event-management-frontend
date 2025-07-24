import {
  getJwtInfo,
  getUserInfo,
  loginUser,
  logout,
  registerUser,
} from "@/features/AuthAPI";
import type {
  LoginPayload,
  RegisterPayload,
  Role,
  User,
  UserDetails,
} from "@/models/AuthModel";

export const handleRegister = async (
  payload: RegisterPayload,
): Promise<string> => {
  try {
    const response = await registerUser(payload);
    if (!response.data.success) {
      throw new Error(response.data.data);
    }

    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.data);
  }
};

export const handleLogin = async (payload: LoginPayload): Promise<string> => {
  try {
    const response = await loginUser(payload);
    if (!response.data.success) {
      throw new Error(response.data.data);
    }
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.data);
  }
};

export const handeGettingUserInfo = async (): Promise<UserDetails> => {
  try {
    const response = await getUserInfo();
    if (!response.data.success) {
      throw new Error(response.data.data);
    }
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.data);
  }
};

export const handleGettingJwtInfo = async (): Promise<User> => {
  try {
    const response = await getJwtInfo();
    if (!response.data.success) {
      throw new Error(response.data.data);
    }
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.data);
  }
};

export const handleLogout = async (): Promise<string> => {
  const response = await logout();
  return response.data.data;
};

export const getUserRole = async (): Promise<Role[]> => {
  const response = await handleGettingJwtInfo();
  return response.role;
};
