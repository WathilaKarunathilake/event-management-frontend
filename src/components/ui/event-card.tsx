import { Button } from "@/components/ui/button";
import { truncateDescription } from "@/lib/helpers";
import type { EventDetails } from "@/models/EventModel";
import { MapPin, CalendarDays, Users, UserIcon } from "lucide-react";
import DefaultImage from "../../assets/image.png";
import { useState } from "react";
import EventDetailsModal from "./event-model";

type EventCardProps = {
  event: EventDetails;
  onOpen: () => void;
  setEventId: (eventId: string) => void;
  isUserRegistered: boolean;
};

export function EventCard({
  event,
  onOpen,
  setEventId,
  isUserRegistered,
}: EventCardProps) {
  const {
    id,
    title,
    location,
    startDateTime,
    endDateTime,
    capacity,
    imageUrl,
    creatorName,
    totalRegistrations,
    description,
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

  const openModel = (e: any, eventId: string) => {
    e.stopPropagation();

    setEventId(eventId);
    onOpen();
  };

  const [eventDetailsModel, setEventDetailsModel] = useState(false);

  const eventStartUtc = new Date(startDateTime + "Z");
  const isExpired = eventStartUtc <= new Date();

  return (
    <>
      <div
        className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
        onClick={() => setEventDetailsModel(true)}
      >
        <img
          src={imageUrl ? `${imageUrl}?v=${Date.now()}` : DefaultImage}
          alt={title || "Event"}
          className="h-40 w-full object-cover"
          loading="lazy"
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

          <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
            <UserIcon className="w-4 h-4 text-gray-500" />
            Created By: {creatorName}
          </p>

          <p className="block sm:hidden text-sm text-muted-foreground mb-2">
            {truncateDescription(description!, 10)}
          </p>

          <p className="hidden sm:block text-sm text-muted-foreground mb-2">
            {truncateDescription(description!, 25)}
          </p>

          <p className="text-sm text-gray-600 mb-4 flex items-center gap-1">
            <Users className="w-4 h-4 text-gray-500" />
            {capacity - totalRegistrations} spots remaining
          </p>
          {!isExpired ? (
            <Button
              className="mt-auto bg-purple-700 hover:bg-purple-800 text-white text-sm shadow-none cursor-pointer"
              onClick={(e) => openModel(e, id)}
              disabled={totalRegistrations >= capacity || isUserRegistered}
            >
              Register Now
            </Button>
          ) : (
            <div className="text-red-600">Event registrations closed !</div>
          )}
        </div>
      </div>
      {eventDetailsModel && (
        <EventDetailsModal
          event={event}
          onClose={() => setEventDetailsModel(false)}
          open={eventDetailsModel}
        />
      )}
    </>
  );
}
