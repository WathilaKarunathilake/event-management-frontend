import { useEffect, useState } from "react";
import { RegisterModel } from "@/components/ui/register-modal";
import { EventCard } from "@/components/ui/event-card";
import type { EventDetails } from "@/models/EventModel";
import { handleEventGetting } from "@/services/EventService";
import { showErrorToast } from "@/components/files/toast";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { SearchBox } from "@/components/ui/search-box";
import { handleGettingRegistrationsByUserId } from "@/services/RegistrationService";
import type { RegisteredEvent } from "@/models/RegisterModel";
import { Pagination } from "@/components/ui/pagination";
import { useBoolean } from "@/context/hooks/useBoolean";

type SortOption =
  | "all"
  | "upc-only"
  | "exp-only"
  | "date-asc"
  | "date-desc"
  | "name-asc"
  | "name-desc";

export default function ViewEvents() {
  const [events, setEvents] = useState<EventDetails[]>([]);
  const [allEvents, setAllEvents] = useState<EventDetails[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventId, setEventId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("all");
  const [registrations, setRegistrations] = useState<RegisteredEvent[]>([]);

  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  const loading = useBoolean()
  const pageSize = 6

  const handleOpenModal = () => setModalOpen(true);

  const fetchEvents = async () => {
    try {
      loading.setTrue()
      const response = await handleEventGetting(page, pageSize, sortBy, searchTerm);
      setEvents(response.items);
      setTotalCount(response.totalCount);
    } catch (err: any) {
      showErrorToast(err.message);
    } finally {
      loading.setFalse()
    }
  };

  const fetchAllEvents = async () => {
    try {
      loading.setTrue()
      const response = await handleEventGetting();
      setAllEvents(response.items);
    } catch (err: any) {
      showErrorToast(err.message);
    } finally {
      loading.setFalse()
    }
  };

  const fetchRegistrations = async () => {
    try {
      loading.setTrue()
      const response = await handleGettingRegistrationsByUserId();
      setRegistrations(response);
    } catch (err: any) {
      showErrorToast(err.message);
    } finally {
      loading.setFalse()
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchRegistrations();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortBy]);

  useEffect(() => {
    fetchEvents();
  }, [page, searchTerm, sortBy]);

  useEffect(() => {
    const shouldFetchAll = searchTerm.trim() !== "" || sortBy !== "all";
    if (shouldFetchAll && allEvents.length === 0) {
      fetchAllEvents();
    }
  }, [searchTerm, sortBy]);

  const totalPages = Math.ceil(totalCount / pageSize);

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
            {searchTerm
              ? "Search Results"
              : sortBy === "upc-only"
                ? "Upcoming Events"
                : sortBy === "exp-only"
                  ? "Expired Events"
                  : "All Events"}
          </h3>
          {!loading.value && (
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {searchTerm || sortBy !== "all"
  ? `${events.length} of ${allEvents.length} events`
  : `${events.length} events`}
            </div>
          )}
        </div>


        {loading.value ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : events.length === 0 ? (
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
              {events.map((event, idx) => (
                <EventCard
                  key={event.id || idx}
                  event={event}
                  onOpen={handleOpenModal}
                  setEventId={setEventId}
                  isUserRegistered={registrations.some(
                    (reg) => reg.id === event.id,
                  )}
                />
              ))}
            </div>

            {/* Show more info if filtered */}
            {searchTerm && events.length < totalCount && (
              <Card className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200 max-w-xl mx-auto text-center">
                <p className="text-yellow-800">
                  <span className="font-medium">{searchTerm || sortBy !== "all"
  ? `${events.length} of ${allEvents.length} events`
  : `${events.length} events`}</span>
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

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>

      {modalOpen && (
        <RegisterModel
          fetchRegs={fetchRegistrations}
          onClose={() => setModalOpen(false)}
          eventId={eventId}
          fetchEvents={fetchEvents}
        />
      )}
    </>
  );
}
