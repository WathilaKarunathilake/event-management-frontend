import { useEffect, useState } from "react";
import type { EventDetails } from "@/models/EventModel";
import {
  handleDeletingEvents,
  handleGettingPostedEvents,
} from "@/services/EventService";
import { showErrorToast, showSuccessToast } from "@/components/files/toast";
import { useNavigate } from "react-router-dom";
import { EventBar } from "@/components/ui/event-bar";
import { Loader } from "@/components/ui/loader";
import { useBoolean } from "@/context/hooks/useBoolean";

export const GetEvents = () => {
  const [events, setEvents] = useState<EventDetails[]>([]);
  const navigate = useNavigate();
  const loading = useBoolean()
  const deleteLoading = useBoolean()

  const navigateToUpdate = (e: any, id: string) => {
    e.stopPropagation();
    navigate("/admin/events/update-event/" + id);
  };

  const navigateToViewRegistrations = (e: any, id: string) => {
    e.stopPropagation();
    navigate("/admin/events/registrations/" + id);
  };

  const deleteEvent = async (e: any, id: string) => {
    e.stopPropagation();
    deleteLoading.setTrue()
    try {
      const response = await handleDeletingEvents(id);
      showSuccessToast(response);
      fetchAllPostedEvents();
    } catch (error: any) {
      showErrorToast(error.message);
    } finally {
      deleteLoading.setFalse()
    }
  };

  const fetchAllPostedEvents = async () => {
    try {
      loading.setTrue()
      const response = await handleGettingPostedEvents();
      setEvents(response);
    } catch (er: any) {
      showErrorToast(er.message);
    } finally {
      loading.setFalse()
    }
  };

  useEffect(() => {
    fetchAllPostedEvents();
  }, []);

  return (
    <div className="container mt-5 p-6 rounded-lg bg-white shadow cart">
      {loading.value ? (
        <Loader />
      ) : (
        <div className="flex flex-col">
          <div className="mb-4">
            <h6 className="text-lg font-semibold mb-2">Your Event Details</h6>
            <span className="text-gray-700">
              You have {events.length} Event{events.length !== 1 ? "s" : ""} in
              your list
            </span>
          </div>

          {events.length === 0 ? (
            <div className="text-gray-500 text-sm italic">
              No events posted yet.
            </div>
          ) : (
            <div className="space-y-3">
              {events.map((event) => (
                <EventBar
                  key={event.id}
                  event={event}
                  loading={deleteLoading.value}
                  onDelete={deleteEvent}
                  onEdit={navigateToUpdate}
                  onViewRegistrations={navigateToViewRegistrations}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
