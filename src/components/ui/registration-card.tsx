import type { RegisteredEvent } from "@/models/RegisterModel";
import { MapPin, CalendarDays, Clock, Users, XCircle } from "lucide-react";
import { IconText } from "./icon-text";
import { StatusBadge } from "./status-badge";
import { getEventTypeLabel, getRegistrationStatusLabel } from "@/lib/helpers";

type RegistrationCardProps = {
  registration: RegisteredEvent;
  onCancel: (id: string) => void;
};

export function RegistrationCard({
  registration,
  onCancel,
}: RegistrationCardProps) {
  const isCancelable =
    registration.registerType !== 1 &&
    new Date(registration.startDateTime) > new Date();

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 mt-4">
      <img
        src={registration.imageUrl}
        alt={registration.title || "Event"}
        className="h-24 w-24 rounded-lg object-cover border"
      />

      <div className="flex-1 min-w-0 space-y-1.5">
        <h3 className="text-lg font-semibold">{registration.title}</h3>
        <p className="text-gray-500 break-all whitespace-pre-wrap pr-3">
          {registration.description}
        </p>

        <IconText icon={<MapPin className="h-4 w-4" />}>
          {registration.location}
        </IconText>

        <IconText icon={<CalendarDays className="h-4 w-4" />}>
          {new Date(registration.startDateTime).toLocaleDateString()} (
          {getEventTypeLabel(registration.eventType)})
        </IconText>

        <IconText icon={<Clock className="h-4 w-4" />}>
          {new Date(registration.startDateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          -{" "}
          {new Date(registration.endDateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </IconText>

        <IconText icon={<Users className="h-4 w-4" />}>
          Capacity: {registration.capacity}
        </IconText>
      </div>

      <div className="flex flex-row items-center gap-2">
        <StatusBadge
          status={registration.registerType}
          label={getRegistrationStatusLabel(registration.registerType)}
        />
        {isCancelable && (
          <XCircle
            className="h-5 w-5 text-gray-400 hover:text-red-600 transition cursor-pointer"
            onClick={() => onCancel(registration.id)}
          />
        )}
      </div>
    </div>
  );
}
