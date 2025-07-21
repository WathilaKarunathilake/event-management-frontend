import { cancelEventRegistration, getRegistrationsByEventId, getRegistrationsByUserId, registerForEvent } from "@/features/RegistrationsAPI"
import type { GetRegisteredUsers, RegisteredEvent, RegisterEvent } from "@/models/RegisterModel"

export const handleRegisterForEvents = async (payload: RegisterEvent): Promise<string> => {
  try {
    const response = await registerForEvent(payload)
    if (!response.data.success) {
      throw new Error(response.data.data)
    }

    return response.data.data
  } catch (error: any) {
    throw new Error(error.response.data.data)
  }
}

export const handleCancelRegistration = async (id: string): Promise<string> => {
  try {
    const response = await cancelEventRegistration(id)
    if (!response.data.success) {
      throw new Error(response.data.data)
    }

    return response.data.data
  } catch (error: any) {
    throw new Error(error.response.data.data)
  }
}

export const handleGettingRegistrationsByUserId = async (): Promise<RegisteredEvent[]> => {
  try {
    const response = await getRegistrationsByUserId()
    if (!response.data.success) {
      throw new Error(response.data.data)
    }

    return response.data.data
  } catch (error: any) {
    throw new Error(error.response.data.data)
  }
}

export const handleGettingRegistrationsByEventId = async (id: string): Promise<GetRegisteredUsers[]> => {
  try {
    const response = await getRegistrationsByEventId(id)
    if (!response.data.success) {
      throw new Error(response.data.data)
    }

    return response.data.data
  } catch (error: any) {
    throw new Error(error.response.data.data)
  }
}

