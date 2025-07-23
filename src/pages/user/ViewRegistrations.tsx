import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { handleCancelRegistration, handleGettingRegistrationsByUserId } from "@/services/RegistrationService";
import type { RegisteredEvent } from "@/models/RegisterModel";
import clsx from "clsx";
import { MapPin, CalendarDays, Clock, Users, XCircle } from "lucide-react";
import { showErrorToast, showSuccessToast } from "@/components/files/toast";
import { getEventTypeLabel, getRegistrationStatusLabel } from "@/lib/helpers";

export function ViewRegistrations() {
  const fetchRegistrations = async () => {
      const response  = await handleGettingRegistrationsByUserId()
      setTickets(response)
  }

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const [tickets, setTickets] = useState<RegisteredEvent[]>([]);

  const handleCancel = async (id: string) => {
    try {
      const response = await handleCancelRegistration(id)
      showSuccessToast(response)
      await fetchRegistrations()
    } catch (err: any) {
      showErrorToast(err.message)
    }
  };

  return (
    <div className="container mx-auto w-full px-4 py-10">
  <h2 className="text-2xl font-semibold ">Your Registration History</h2>
  <span>You have {tickets.length} ticket{tickets.length !== 1 ? "s" : ""}</span>

  <ScrollArea className="max-h-[600px] pr-2 space-y-4 mt-5">
    {tickets.map((ticket) => (
      <Card
        key={ticket.id}
        className="flex flex-col gap-4 p-4 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 mt-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            src={ticket.imageUrl}
            alt={ticket.title || "Event"}
            className="h-24 w-24 rounded-lg object-cover border"
          />

          <div className="flex-1 min-w-0 space-y-1.5">
            <h3 className="text-lg font-semibold">{ticket.title}</h3>
  <p className="text-gray-500 break-all whitespace-pre-wrap pr-3">
  {ticket.description}
</p>

            <div className="flex items-center text-sm text-gray-600 gap-2">
              <MapPin className="h-4 w-4" />
              <span>{ticket.location}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600 gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>{new Date(ticket.startDateTime).toLocaleDateString()} ({getEventTypeLabel(ticket.eventType)})</span>
            </div>

            <div className="flex items-center text-sm text-gray-600 gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {new Date(ticket.startDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                {new Date(ticket.endDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-600 gap-2">
              <Users className="h-4 w-4" />
              <span>Capacity: {ticket.capacity}</span>
            </div>
          </div>

          <div className="flex flex-row items-center gap-2">
            <span
                                className={clsx(
                                  "text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap",
                                  {
                                    "bg-green-100 text-green-700": ticket.registerType === 0,
                                    "bg-red-100 text-red-700": ticket.registerType === 1,
                                  }
                                )}
                              >
                                {getRegistrationStatusLabel(ticket.registerType)}
                              </span>

            {ticket.registerType !== 1 &&
              new Date(ticket.startDateTime) > new Date() && (
                <XCircle
                  className="h-5 w-5 text-gray-400 hover:text-red-600 transition cursor-pointer"
                  onClick={() => handleCancel(ticket.id)}
                />
              )}
          </div>
        </div>
      </Card>
    ))}
  </ScrollArea>
</div>
  );
}
