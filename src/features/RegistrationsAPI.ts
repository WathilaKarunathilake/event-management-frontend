import apiClient from "@/components/files/apiClient"
import type { RegisterEvent } from "@/models/RegisterModel"

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/registrations`

export const getRegistrationsByEventId = async (id: string): Promise<any> => {
  const response = await apiClient.get(`${BASE_URL}/event/${id}`)
  return response
}

export const getRegistrationsByUserId = async (): Promise<any> => {
  const response = await apiClient.get(`${BASE_URL}/user`)
  return response
}

export const registerForEvent = async (data: RegisterEvent): Promise<any> => {
  const response = await apiClient.post(`${BASE_URL}/`, data)
  return response
}

export const cancelEventRegistration = async (id: string): Promise<any> => {
  const response = await apiClient.put(`${BASE_URL}/${id}`)
  return response
}