import type { BaseEvent } from "./EventModel"

export interface BaseUserDetais {
  name: string,
  email: string,
  phoneNumber: string
}

export interface RegisteredEvent extends BaseEvent {
    id: string
    registerType: number
}

export interface RegisterEvent extends BaseUserDetais {
  eventId: string
}

export interface GetRegisteredUsers extends BaseUserDetais {
    accountName: string,
    accountEmail: string,
    accountPhoneNumber: string
    registerType: number
}