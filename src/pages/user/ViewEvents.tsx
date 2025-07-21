import { useEffect, useState } from "react";
import { RegisterModel } from "@/components/ui/register-modal";
import { EventCard } from "@/components/ui/event-card";
import type { EventDetails } from "@/models/EventModel";
import { handleEventGetting } from "@/services/EventService";

export default function ViewEvents() {
  const [events, setEvents] = useState<EventDetails[]>([])
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);

  const fetchEvents = async() => {
    const response = await handleEventGetting();
    setEvents(response);
  }

  useEffect(() => {
    fetchEvents()
  }, [])
  
  return (
    <>
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event, idx) => (
            <EventCard key={idx} event={event} onOpen={handleOpenModal} />
          ))}
        </div>
      </div>

      {modalOpen && <RegisterModel onClose={() => setModalOpen(false)} />}
    </>
  );
}
