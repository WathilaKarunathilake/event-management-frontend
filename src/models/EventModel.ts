export interface BaseEvent {
  title?: string;
  description?: string;
  location?: string;
  startDateTime: string;
  endDateTime: string;
  eventType: number;
  capacity: number;
  imageUrl?: string;
  creatorName?: string;
}

export interface AddEvent extends BaseEvent {}

export interface UpdateEvent extends BaseEvent {}

export interface EventDetails extends BaseEvent {
  id: string;
  createdBy: string;
  totalRegistrations: number;
}

export interface EventItems {
  items: EventDetails[];
  totalCount: number;
}

export interface EventSummary {
  totalEvents: number;
  activeEvents: number;
  filledEvents: number;
  upcommingEvents: number;
  totalAttendees: number;
}
