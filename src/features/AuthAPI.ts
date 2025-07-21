import apiClient from '@/components/files/apiClient'
import type { LoginPayload, RegisterPayload } from '@/models/AuthModel'

// Base API URL
const AUTH_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`

export const registerUser = async (data: RegisterPayload): Promise<any> => {
  const response = await apiClient.post(`${AUTH_URL}/register`, data)
  return response
}

export const loginUser = async (data: LoginPayload): Promise<any> => {
  const response = await apiClient.post(`${AUTH_URL}/login`, data)
  return response
}

export const getUserInfo = async (): Promise<any> => {
  const response = await apiClient.get(`${AUTH_URL}/info`)
  return response
}

export const getJwtInfo = async (): Promise<any> => {
  const response = await apiClient.get(`${AUTH_URL}/me`)
  return response
}
