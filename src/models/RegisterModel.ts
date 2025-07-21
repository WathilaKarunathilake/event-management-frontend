import type { BaseEvent } from "./EventModel"

export interface BaseUserDetais {
  name: string,
  email: string,
  phoneNumber: string
}

export interface RegisteredEvent extends BaseEvent {
    registerType: string
}

export interface RegisterEvent extends BaseUserDetais {
}

export interface GetRegisteredUsers extends BaseUserDetais {
    accountName: string,
    accountEmail: string,
    accountPhoneNumber: string
}