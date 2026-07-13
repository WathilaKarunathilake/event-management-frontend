import {
  Trash2,
  Pencil,
  Users,
  MapPin,
  Clock,
  UserPlus,
  Ticket,
  CalendarDays,
  XCircle,
  UserIcon,
} from "lucide-react";
import {
  getEventTypeLabel,
  getRegistrationStatusLabel,
  truncateDescription,
} from "@/lib/helpers";
import { StatusBadge } from "./status-badge";
import { Button } from "./button";
import type { RegisteredEvent } from "@/models/RegisterModel";
import type { EventDetails } from "@/models/EventModel";
import DefaultImage from "../../assets/image.png";
import { useState } from "react";
import EventDetailsModal from "./event-model";

type EventBarProps = {
  event: RegisteredEvent | EventDetails;
  onEdit?: (e: any, id: string) => void;
  onDelete?: (e: any, id: string) => void;
  onViewRegistrations?: (e: any, id: string) => void;
  onCancel?: (e: any, id: string) => void;
  onDownloadICS?: (event: RegisteredEvent) => void;
  loading: boolean;
};

export const EventBar = ({
  event,
  onEdit,
  onDelete,
  onViewRegistrations,
  onCancel,
  loading, 
  onDownloadICS,
}: EventBarProps) => {
  const [eventsModal, setEventModal] = useState(false);

  const isCancelable =
    isRegisteredEvent(event) &&
    event.registerType !== 1 &&
    new Date(event.startDateTime + "Z") > new Date();

  return (
    <>
      <div
        className="cursor-pointer flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
        onClick={() => setEventModal(true)}
      >
        <img
          src={
            event.imageUrl ? `${event.imageUrl}?v=${Date.now()}` : DefaultImage
          }
          alt={event.title}
          className="h-24 w-24 rounded-lg object-cover border"
          loading="lazy"
        />

        <div className="flex-1 min-w-0 space-y-1.5">
          <h3 className="text-lg font-semibold">{event.title}</h3>
          {event.description && (
            <p className="text-gray-500 break-all whitespace-pre-wrap">
              {truncateDescription(event.description!, 25)}
            </p>
          )}

          <div className="text-sm text-gray-500 space-y-1">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {event.location}
            </div>

            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {new Date(event.startDateTime + "Z").toLocaleDateString()} – {new Date(event.endDateTime + "Z").toLocaleDateString()} (
              {getEventTypeLabel(event.eventType)})
            </div>

            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {new Date(event.startDateTime + "Z").toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(event.endDateTime + "Z").toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            <div className="flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              Capacity: {event.capacity}
            </div>

            <div className="flex items-center gap-1">
              <Ticket className="h-4 w-4" />
              Type: {getEventTypeLabel(event.eventType)}
            </div>

            {isRegisteredEvent(event) ?? (
              <div className="flex items-center gap-1">
                <UserIcon className="h-4 w-4" />
                Creator Name: {event.creatorName}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:items-end gap-2 justify-start">
          <div className="flex flex-col gap-2">
            {onViewRegistrations && (
              <Button
                className=" cursor-pointer"
                variant="outline"
                size="icon"
                onClick={(e) => onViewRegistrations(e, event.id)}
                aria-label="View Registrations"
              >
                <Users className="w-4 h-4 cursor-pointer" />
              </Button>
            )}
            {onEdit && (
              <Button
                className=" cursor-pointer"
                variant="outline"
                size="icon"
                onClick={(e) => onEdit(e, event.id)}
                aria-label="Edit Event"
              >
                <Pencil className="w-4 h-4 cursor-pointer" />
              </Button>
            )}
            {onDelete && (
              <Button
                className=" cursor-pointer"
                variant="outline"
                size="icon"
                onClick={(e) => onDelete(e, event.id)}
                disabled={loading}
                aria-label="Delete Event"
              >
                <Trash2 className="w-4 h-4 cursor-pointer" />
              </Button>
            )}
          </div>

          {/* Registration status + cancel button */}
          {isRegisteredEvent(event) && (
            <div className="flex items-center gap-2 mt-2">
              <StatusBadge
                status={event.registerType}
                label={getRegistrationStatusLabel(event.registerType)}
              />
              {isCancelable && (
                <XCircle
                  className="h-5 w-5 text-gray-400 hover:text-red-600 transition cursor-pointer"
                  onClick={(e) => onCancel?.(e, event.id)}
                />
              )}
            </div>
          )}

          {onDownloadICS && isRegisteredEvent(event) && (
            <Button
              className="cursor-pointer mt-2"
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDownloadICS(event);
              }}
              aria-label="Download ICS"
              title="Add to Calendar (.ics)"
            >
              <CalendarDays className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {eventsModal && (
        <EventDetailsModal
          event={event}
          open={eventsModal}
          onClose={() => setEventModal(false)}
        />
      )}
    </>
  );
};

const isRegisteredEvent = (
  event: RegisteredEvent | EventDetails,
): event is RegisteredEvent => {
  return (event as RegisteredEvent).registerType !== undefined;
};
