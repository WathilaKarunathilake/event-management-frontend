import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { EventDetails } from "@/models/EventModel";
import { XCircle } from "lucide-react";
import clsx from "clsx";

type RegistrationType = "Confirmed" | "Cancelled" | "Pending";

interface TicketWithRegistration extends EventDetails {
  registrationType: RegistrationType;
}

export function ViewRegistrations() {
  const [tickets, setTickets] = useState<TicketWithRegistration[]>([
    {
      id: "1",
      title: "Tech Conference 2025",
      description: "Exploring the future of tech.",
      location: "Colombo",
      startDateTime: "2025-08-10T09:00:00",
      endDateTime: "2025-08-10T17:00:00",
      eventType: 1,
      capacity: 100,
      eventImage: "/assets/tech.jpg",
      createdBy: "admin",
      registrationType: "Confirmed",
    },
    {
      id: "2",
      title: "Rock Music Night",
      description: "Feel the energy!",
      location: "Kandy",
      startDateTime: "2025-08-15T18:30:00",
      endDateTime: "2025-08-15T22:00:00",
      eventType: 0,
      capacity: 300,
      eventImage: "/assets/music.jpg",
      createdBy: "user123",
      registrationType: "Pending",
    },
    {
      id: "3",
      title: "Sports Gala",
      description: "Inter-school sports meet",
      location: "Galle",
      startDateTime: "2025-09-01T07:00:00",
      endDateTime: "2025-09-01T14:00:00",
      eventType: 2,
      capacity: 500,
      eventImage: null,
      createdBy: "coach99",
      registrationType: "Confirmed",
    },
  ]);

  const getEventTypeName = (type: number): string => {
    switch (type) {
      case 0: return "Music";
      case 1: return "Education";
      case 2: return "Sports";
      case 3: return "Entertainment";
      default: return "Other";
    }
  };

  const handleCancel = (id: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, registrationType: "Cancelled" } : t
      )
    );
  };

  return (
    <div className="container mx-auto w-full px-4 py-10">
      <h2 className="text-2xl font-semibold mb-4">Your Registration History</h2>

      <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
        <span>You have {tickets.length} ticket{tickets.length !== 1 ? "s" : ""}</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Sort by:</span>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-primary">
            <span className="font-medium">Date</span>
            <i className="fa fa-angle-down" />
          </div>
        </div>
      </div>

      <ScrollArea className="max-h-[500px] space-y-4 pr-2">
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <img
                src={typeof ticket.eventImage === "string" ? ticket.eventImage : "/placeholder-event.jpg"}
                alt={ticket.title || "Event"}
                className="h-16 w-16 rounded-lg object-cover border"
              />
              <div>
                <p className="text-base font-semibold line-clamp-1">{ticket.title}</p>
                <p className="text-sm text-gray-500">
                  {new Date(ticket.startDateTime).toLocaleDateString()} &middot; {getEventTypeName(ticket.eventType)}
                </p>
                <p className="text-sm text-gray-500">
                  Capacity: {ticket.capacity}
                </p>
              </div>
            </div>

            <div className="mt-4 sm:mt-0 flex items-center gap-3 flex-wrap sm:flex-nowrap justify-end">
              <span className="text-sm font-medium text-gray-600">
                {new Date(ticket.startDateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })} -{" "}
                {new Date(ticket.endDateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>

              <span
                className={clsx(
                  "text-xs font-semibold px-2.5 py-1 rounded-full",
                  {
                    "bg-green-100 text-green-700": ticket.registrationType === "Confirmed",
                    "bg-yellow-100 text-yellow-700": ticket.registrationType === "Pending",
                    "bg-red-100 text-red-700": ticket.registrationType === "Cancelled",
                  }
                )}
              >
                {ticket.registrationType}
              </span>

              {ticket.registrationType !== "Cancelled" && (
                <XCircle
                  className="h-5 w-5 text-gray-400 hover:text-red-600 transition cursor-pointer"
                  onClick={() => handleCancel(ticket.id)}
                 
                />
              )}
            </div>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
}
