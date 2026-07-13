import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  MapPin,
  Users,
  UserPlus,
  XCircle,
  UsersIcon,
} from "lucide-react";
import type { EventDetails } from "@/models/EventModel";
import { getEventTypeLabel } from "@/lib/helpers";
import DefaultImage from "@/assets/image.png";
import type { RegisteredEvent } from "@/models/RegisterModel";
import { ScrollArea } from "@radix-ui/react-scroll-area";

type EventDetailsModalProps = {
  event: EventDetails | RegisteredEvent | null;
  open: boolean;
  onClose: () => void;
  onRegister?: (eventId: string) => void;
};

const isEventDetails = (
  event: EventDetails | RegisteredEvent,
): event is EventDetails => {
  return "totalRegistrations" in event;
};

const EventDetailsModal = ({
  event,
  open,
  onClose,
  onRegister,
}: EventDetailsModalProps) => {
  if (!event) return null;

  const formatDateTime = (dateStr: string) =>
    new Date(dateStr + "Z").toLocaleString();

  const eventStartUtc = new Date(event.startDateTime + "Z");
  const isExpired = eventStartUtc <= new Date();

  const isFull =
    isEventDetails(event) && event.totalRegistrations >= event.capacity;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl sm:max-w-5xl p-0 overflow-hidden rounded-2xl">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="w-full sm:w-1/3 h-full max-h-30 md:max-h-52">
            <img
              src={
                event.imageUrl
                  ? `${event.imageUrl}?v=${Date.now()}`
                  : DefaultImage
              }
              alt={event.title}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>

          <div className="w-full sm:w-2/3 p-6 space-y-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {event.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                See details and register for the event.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2 text-sm text-gray-700">
              {isEventDetails(event) && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Status:</span>
                  <Badge
                    variant="outline"
                    className={`rounded-full px-3 py-1 text-xs ${
                      isFull || isExpired
                        ? "bg-red-100 text-red-700 border-red-300"
                        : "bg-green-100 text-green-700 border-green-300"
                    }`}
                  >
                    {isFull ? "Full" : isExpired ? "Event Expired" : "Open"}
                  </Badge>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-700" />
                <span className="font-semibold">Location:</span>{" "}
                {event.location}
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-purple-700" />
                <span className="font-semibold">Start:</span>{" "}
                {formatDateTime(event.startDateTime)}
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-purple-700" />
                <span className="font-semibold">End:</span>{" "}
                {formatDateTime(event.endDateTime)}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-700" />
                <span className="font-semibold">Capacity:</span>{" "}
                {event.capacity}
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="w-4 h-4 text-purple-700" />
                <span className="font-semibold">Creator Name:</span>{" "}
                {event.creatorName}
              </div>
              {isEventDetails(event) && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-700" />
                  <span className="font-semibold">Registered:</span>{" "}
                  {event.totalRegistrations}
                </div>
              )}
              <div>
                <span className="font-semibold">Type:</span>{" "}
                {getEventTypeLabel(event.eventType)}
              </div>
              <span className="font-semibold">Description:</span>{" "}
              <ScrollArea className="h-[100px] w-full overflow-auto pt-2">
                <div className="text-sm whitespace-pre-wrap break-all">
                  {event.description || "No description provided."}
                </div>
              </ScrollArea>
            </div>

            {/* Footer buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                <XCircle className="w-4 h-4 mr-1" />
                Close
              </Button>

              {!isFull && onRegister && (
                <Button
                  onClick={() => {
                    onRegister(event.id);
                    onClose();
                  }}
                  className="bg-purple-700 hover:bg-purple-800 text-white"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
