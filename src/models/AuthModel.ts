export interface RegisterPayload {
  name: string
  email: string
  password: string
  role: number
  phoneNumber: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthData {
  token: string
  message: string
}

export interface AuthResponse {
  success: boolean
  data: AuthData
}

export interface JwtPayload {
  sub: string
  role: string
  [key: string]: any
}

export interface UserDetails {
  name: string
  email: string
  phone: string
}

export interface User {
  name: string
  role: Role[]
}

export type Role = 'ADMIN' | 'PUBLICUSER'


