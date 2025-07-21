import apiClient from "@/components/files/apiClient"
import type { AddEvent, UpdateEvent } from "@/models/EventModel"

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`

export const addEvent = async (data: AddEvent): Promise<any> => {
  const response = await apiClient.post(`${BASE_URL}/events`, data)
  return response
}

export const getEvents = async (): Promise<any> => {
  const response = await apiClient.get(`${BASE_URL}/events`)
  return response
}

export const getEventById = async (id: string): Promise<any> => {
  const response = await apiClient.get(`${BASE_URL}/events/${id}`)
  return response
}

export const getPostedEventById = async (): Promise<any> => {
  const response = await apiClient.get(`${BASE_URL}/events/user`)
  return response
}

export const updateEvent = async (id: string, data: UpdateEvent): Promise<any> => {
  const response = await apiClient.put(`${BASE_URL}/events/${id}`, data)
  return response
}

export const deleteEvent = async (id: string): Promise<any> => {
  const response = await apiClient.delete(`${BASE_URL}/events/${id}`)
  return response
}