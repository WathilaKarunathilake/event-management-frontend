export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: number;
  phoneNumber: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserDetails {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface User {
  name: string;
  role: Role[];
}

export type Role = "ADMIN" | "PUBLICUSER";
