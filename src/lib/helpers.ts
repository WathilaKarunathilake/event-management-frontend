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