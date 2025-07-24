import { useEffect, useState, useMemo } from "react";
import { RegisterModel } from "@/components/ui/register-modal";
import { EventCard } from "@/components/ui/event-card";
import type { EventDetails } from "@/models/EventModel";
import { handleEventGetting } from "@/services/EventService";
import { showErrorToast } from "@/components/files/toast";

import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Find Your Perfect Event
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="lg:col-span-2">
                <Label htmlFor="searchInput" className="mb-2">
                  Search Events
                </Label>
                <div className="relative">
                  <Input
                    id="searchInput"
                    type="text"
                    placeholder="Search by title, description, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute inset-y-0 right-0 pr-1"
                      onClick={() => setSearchTerm("")}
                      aria-label="Clear search"
                    >
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </Button>
                  )}
                </div>
              </div>

              {/* Sort Dropdown */}
              <div>
                <Label htmlFor="sortSelect" className="mb-2">
                  Sort By
                </Label>
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as SortOption)}
                >
                  <SelectTrigger id="sortSelect" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="date-asc">
                        Date (Oldest First)
                      </SelectItem>
                      <SelectItem value="date-desc">
                        Date (Newest First)
                      </SelectItem>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

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
        <RegisterModel onClose={() => setModalOpen(false)} eventId={eventId} />
      )}
    </>
  );
}
