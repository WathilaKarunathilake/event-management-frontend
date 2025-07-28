import { useEffect, useState, useMemo } from "react";
import { RegisterModel } from "@/components/ui/register-modal";
import { EventCard } from "@/components/ui/event-card";
import type { EventDetails } from "@/models/EventModel";
import { handleEventGetting } from "@/services/EventService";
import { showErrorToast } from "@/components/files/toast";

import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { SearchBox } from "@/components/ui/search-box";

type SortOption = "date-asc" | "date-desc" | "name-asc" | "name-desc";

export default function ViewEvents() {
  const [events, setEvents] = useState<EventDetails[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventId, setEventId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date-asc");

  const handleOpenModal = () => setModalOpen(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await handleEventGetting();
      setEvents(response);
    } catch (err: any) {
      showErrorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events.filter(
      (event) =>
        event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return (
            new Date(a.startDateTime || 0).getTime() -
            new Date(b.startDateTime || 0).getTime()
          );
        case "date-desc":
          return (
            new Date(b.startDateTime || 0).getTime() -
            new Date(a.startDateTime || 0).getTime()
          );
        case "name-asc":
          return (a.title || "").localeCompare(b.title || "");
        case "name-desc":
          return (b.title || "").localeCompare(a.title || "");
        default:
          return 0;
      }
    });

    return filtered;
  }, [events, searchTerm, sortBy]);

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-10">
        {/* Search and Filter Section */}
          <SearchBox
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  sortBy={sortBy}
  onSortChange={setSortBy}
/>

        {/* Results Section */}
        <div className="mb-6 px-1 flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-gray-800">
            {searchTerm ? "Search Results" : "Upcoming Events"}
          </h3>
          {!loading && (
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {searchTerm
                ? `${filteredAndSortedEvents.length} of ${events.length} events`
                : `${events.length} events`}
            </div>
          )}
        </div>

        {/* Events Display */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : filteredAndSortedEvents.length === 0 ? (
          <Card className="max-w-md mx-auto p-8 text-center border border-border bg-muted rounded-lg">
            {!searchTerm ? (
              <>
                <CardTitle className="mb-2">No events available</CardTitle>
                <p className="text-muted-foreground">
                  Check back later for upcoming events!
                </p>
              </>
            ) : (
              <>
                <CardTitle className="mb-2">No events found</CardTitle>
                <p className="text-muted-foreground">
                  No events match your search for{" "}
                  <span className="font-semibold">{searchTerm}</span>.
                </p>
                <Button
                  onClick={() => setSearchTerm("")}
                  className="mx-auto cursor-pointer"
                >
                  Clear Search
                </Button>
              </>
            )}
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedEvents.map((event, idx) => (
                <EventCard
                  key={event.id || idx}
                  event={event}
                  onOpen={handleOpenModal}
                  setEventId={setEventId}
                />
              ))}
            </div>

            {/* Show more info if filtered */}
            {searchTerm && filteredAndSortedEvents.length < events.length && (
              <Card className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200 max-w-xl mx-auto text-center">
                <p className="text-yellow-800">
                  <span className="font-medium">
                    {events.length - filteredAndSortedEvents.length}
                  </span>{" "}
                  more events available.
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setSearchTerm("")}
                    className="ml-1"
                  >
                    Clear search to view all
                  </Button>
                </p>
              </Card>
            )}
          </>
        )}
      </div>

      {modalOpen && (
        <RegisterModel onClose={() => setModalOpen(false)} eventId={eventId} fetchEvents={fetchEvents}/>
      )}
    </>
  );
}
