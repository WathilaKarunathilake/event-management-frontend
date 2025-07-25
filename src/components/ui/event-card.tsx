import { Button } from "@/components/ui/button";
import type { EventDetails } from "@/models/EventModel";
import { MapPin, CalendarDays, Users } from "lucide-react";

type EventCardProps = {
  event: EventDetails;
  onOpen: () => void;
  setEventId: (eventId: string) => void;
};

export function EventCard({ event, onOpen, setEventId }: EventCardProps) {
  const {
    id,
    title,
    location,
    startDateTime,
    endDateTime,
    capacity,
    imageUrl,
    totalRegistrations,
  } = event;

  const formattedStart = new Date(startDateTime + "Z").toLocaleString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

const formattedEnd = new Date(endDateTime + "Z").toLocaleString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

  const openModel = (eventId: string) => {
    setEventId(eventId);
    onOpen();
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <img
        src={imageUrl}
        alt={title || "Event"}
        className="h-40 w-full object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {title || "Untitled Event"}
        </h3>
        <p className="text-sm text-gray-600 mb-1 flex items-center gap-1 line-clamp-1">
          <MapPin className="w-4 h-4 text-gray-500" />
          {location || "No location"}
        </p>
        <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          Starts: {formattedStart}
        </p>
        <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          Ends: {formattedEnd}
        </p>
        <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
          <Users className="w-4 h-4 text-gray-500" />
          Capacity: {capacity}
        </p>
        <p className="text-sm text-gray-600 mb-4 flex items-center gap-1">
          <Users className="w-4 h-4 text-gray-500" />
          {capacity - totalRegistrations} spots remaining
        </p>
        <Button
          className="mt-auto bg-purple-700 hover:bg-purple-800 text-white text-sm shadow-none cursor-pointer"
          onClick={() => openModel(id)}
        >
          Register Now
        </Button>
      </div>
    </div>
  );
}
