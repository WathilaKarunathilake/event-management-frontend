import { addEvent, deleteEvent, getEventById, getEvents, getPostedEventById, updateEvent } from "@/features/EventsAPI"
import type { AddEvent, EventDetails, UpdateEvent } from "@/models/EventModel"

export const handleEventAdding = async (
  payload: AddEvent
): Promise<string> => {
  try {
    const response = await addEvent(payload)
    if (!response.data.success) {
      throw new Error(response.data.data)
    }

    return response.data.data
  } catch (error: any) {
    throw new Error(error.response.data.data)
  }
}

export const handleEventUpdating = async (
  id: string, payload: UpdateEvent
): Promise<string> => {
  try {
    const response = await updateEvent(id, payload)
    if (!response.data.success) {
      throw new Error(response.data.data)
    }

    return response.data.data
  } catch (error: any) {
    throw new Error(error.response.data.data)
  }
}

export const handleEventGetting = async (): Promise<EventDetails[]> => {
  try {
    const response = await getEvents()
    if (!response.data.success) {
      throw new Error(response.data.data)
    }

    return response.data.data
  } catch (error: any) {
    throw new Error(error.response.data.data)
  }
}

export const handleEventGettingById = async (id: string): Promise<EventDetails> => {
  try {
    const response = await getEventById(id)
    if (!response.data.success) {
      throw new Error(response.data.data)
    }

    return response.data.data
  } catch (error: any) {
    throw new Error(error.response.data.data)
  }
}

export const handleGettingPostedEvents = async (): Promise<EventDetails[]> => {
  try {
    const response = await getPostedEventById()
    if (!response.data.success) {
      throw new Error(response.data.data)
    }

    return response.data.data
  } catch (error: any) {
    throw new Error(error.response.data.data)
  }
}

export const handleDeletingEvents = async (id: string): Promise<string> => {
  try {
    const response = await deleteEvent(id)
    if (!response.data.success) {
      throw new Error(response.data.data)
    }

    return response.data.data
  } catch (error: any) {
    throw new Error(error.response.data.data)
  }
}

