export interface BaseEvent {
  title?: string;
  description?: string;
  location?: string;
  startDateTime: string;
  endDateTime: string;
  eventType: number;
  capacity: number;
  eventImage?: File | string | null;  
}

export interface AddEvent extends BaseEvent {
  createdBy: string;
}

export interface UpdateEvent extends BaseEvent {
}

export interface EventDetails extends BaseEvent {
  id: string,
  createdBy: string;
}
