import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { handleEventGetting } from "@/services/EventService";
import type { EventDetails } from "@/models/EventModel";
import { toLocalDateTimeString } from "@/lib/helpers";
import { RegisterModel } from "@/components/ui/register-modal";
import { showErrorToast } from "@/components/files/toast";

export default function ViewCalendar() {
  const [events, setEvents] = useState<EventDetails[]>([]);
  const [modal, setModal] = useState(false)
  const [eventId, setEventId] = useState("")
 
  function handleDateClick(clickInfo: any) {
    setEventId(clickInfo.event.id)
    setModal(true)
  }

  function onClose() {
    setModal(false)
  }
  const fetchEvents = async () => {
      try {
        const response = await handleEventGetting();
        setEvents(response);
      } catch (err: any) {
        showErrorToast(err.message);
      } 
    };

  const loadEvents = async () => {
    const registeredEvents = await handleEventGetting();

    // Map your events to FullCalendar format:
    const formattedEvents = registeredEvents.map(event => ({
      ...event,
      start: toLocalDateTimeString(event.startDateTime),
      end: toLocalDateTimeString(event.endDateTime),
    }));

    setEvents(formattedEvents);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <>
    <div className="py-20 px-8">
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events} // Now contains correct start/end
      eventTimeFormat={{
    hour: 'numeric',
    minute: '2-digit',
    hour12: true, // shows AM/PM properly
  }}
  slotLabelFormat={{
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }}
  eventClick={handleDateClick}
  headerToolbar={{
    start: "prev,next today",
    center: "title",
    end: "dayGridMonth,timeGridWeek,timeGridDay",
  }}
  dayMaxEvents={2}
   slotEventOverlap={false}
          eventOverlap={false}
          eventDisplay="block"
          eventOrder="start,-duration,allDay,title"   
  />
    </div>

    {modal && <RegisterModel onClose={onClose} eventId={eventId} fetchEvents={fetchEvents}/>}
    </>
  );
}
