import { Button } from "@/components/ui/button";
import type { EventDetails } from "@/models/EventModel";

type EventCardProps = {
  event: EventDetails;
  onOpen: () => void;
  setEventId: (eventId: string) => void
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
    totalRegistrations
  } = event;

  const formattedStart = new Date(startDateTime).toLocaleString();
  const formattedEnd = new Date(endDateTime).toLocaleString();

  const openModel = (eventId: string) => {
    setEventId(eventId)
    onOpen()
  }

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
        <p className="text-sm text-gray-600 mb-1 line-clamp-1">
          {location || "No location"}
        </p>
        <p className="text-sm text-gray-600 mb-1">Starts: {formattedStart}</p>
        <p className="text-sm text-gray-600 mb-1">Ends: {formattedEnd}</p>
        <p className="text-sm text-gray-600 mb-4">Capacity: {capacity}</p>
        <p className="text-sm text-gray-600 mb-4">{capacity - totalRegistrations} spots remaining</p>
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
