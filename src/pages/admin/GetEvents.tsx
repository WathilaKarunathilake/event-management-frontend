import { Button } from "@/components/ui/button";
import type { EventDetails } from "@/models/EventModel"
import { handleDeletingEvents, handleGettingPostedEvents } from "@/services/EventService";
import {
  Trash2,
  Pencil,
  Users,
  MapPin,
  Clock,
  UserPlus,
  Ticket,
  Play,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GetEvents = () => {
  const [events, setEvents] = useState<EventDetails[]>([]);
  const navigate = useNavigate()

  const navigateToUpdate = (id: string) => {
    navigate("/events/" + id)
  }

  const deleteEvent = async (id: string) => {
    const response = await handleDeletingEvents(id)
    console.log(response)
  }

  const fetchAllPostedEvents = async() => {
    const response = await handleGettingPostedEvents();
    setEvents(response)
  }

  useEffect(() => {
    fetchAllPostedEvents()
  }, [])

  return (
    <div className="container mt-5 p-6 rounded-lg bg-white shadow cart">
      <div className="flex flex-col">
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Play className="w-5 h-5" />
            <span className="font-medium">Manage Your Events</span>
          </div>
          <hr className="my-2" />
          <h6 className="text-lg font-semibold mb-2">Your Event Details</h6>
          <span className="text-gray-700">
            You have {events.length} Event{events.length !== 1 ? "s" : ""} in your list
          </span>
        </div>

        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex justify-between items-start p-4 bg-gray-50 rounded-lg shadow-sm"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={typeof event.eventImage === "string" ? event.eventImage : ""}
                  alt={event.title}
                  className="rounded-md w-16 h-16 object-cover"
                />
                <div className="space-y-1 text-sm">
                  <p className="font-semibold">{event.title}</p>
                  {event.description && <p className="text-gray-500">{event.description}</p>}
                  <p className="text-gray-500 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </p>
                  <p className="text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(event.startDateTime).toLocaleString()} –{" "}
                    {new Date(event.endDateTime).toLocaleString()}
                  </p>
                  <p className="text-gray-500 flex items-center gap-1">
                    <UserPlus className="w-4 h-4" />
                    Capacity: {event.capacity}
                  </p>
                  <p className="text-gray-500 flex items-center gap-1">
                    <Ticket className="w-4 h-4" />
                    Type: {event.eventType}
                  </p>
                </div>
              </div>

              <div className="flex flex-col space-y-2 items-end">
                <Button variant="outline" size="icon" aria-label="View Registered Users" className="cursor-pointer">
                  <Users className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Update Event" className="cursor-pointer" onClick={() => navigateToUpdate(event.id)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Delete Event" className="cursor-pointer" onClick={() => deleteEvent(event.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
