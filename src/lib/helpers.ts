import type { RegisteredEvent } from "@/models/RegisterModel";
import { createEvent } from 'ics';
import type {EventAttributes} from 'ics'

export function getRegistrationStatusLabel(status: number): string {
  switch (status) {
    case 0:
      return "Registered";
    case 1:
      return "Cancelled";
    default:
      return "Unknown";
  }
}

export function getEventTypeLabel(type: number): string {
  switch (type) {
    case 0:
      return "Conference";
    case 1:
      return "Workshop";
    case 2:
      return "Seminar";
    case 3:
      return "Meetup";
    case 4:
      return "Webinar";
    case 5:
      return "Concert";
    case 6:
      return "Festival";
    case 7:
      return "Competition";
    case 8:
      return "Exhibition";
    default:
      return "Unknown";
  }
}

export const toLocalInputFormat = (utc: string) => {
  const date = new Date(utc);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16); // e.g., "2025-07-24T14:30"
};

export const truncateDescription = (
    description: string,
    wordLimit: number
  ): string => {
    if (!description) return ''
    const words = description.trim().split(/\s+/)
    if (words.length <= wordLimit) return description
    return words.slice(0, wordLimit).join(' ') + ' ...'
  }

export function toLocalDateTimeString(utcString: string): string {
  try {
    const clean = utcString.trim(); 
    const utc = new Date(clean + "Z"); // Append Z to force UTC
    const offset = utc.getTimezoneOffset(); // in minutes
    const local = new Date(utc.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
  } catch (err) {
    console.error("Error in toLocalDateTimeString:", err);
    return "";
  }
}


export function downloadSingleEventAsICS(event: RegisteredEvent) {
  const startDate = new Date(event.startDateTime);
  const endDate = new Date(event.endDateTime);

  const icsEvent: EventAttributes = {
    title: event.title,
    description: event.description || '',
    location: event.location || '',
    start: [
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes(),
    ],
    end: [
      endDate.getFullYear(),
      endDate.getMonth() + 1,
      endDate.getDate(),
      endDate.getHours(),
      endDate.getMinutes(),
    ],
  };

  createEvent(icsEvent, (error, value) => {
    if (error) {
      console.error('ICS generation error:', error);
      return;
    }

    const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${event.title || 'event'}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}