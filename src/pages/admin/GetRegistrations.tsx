import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "react-router-dom";
import type { GetRegisteredUsers } from "@/models/RegisterModel";
import { handleGettingRegistrationsByEventId } from "@/services/RegistrationService";
import { handleEventGettingById } from "@/services/EventService";
import { showErrorToast } from "@/components/files/toast";
import { UserDetailsCard } from "@/components/ui/user-details-card";
import { Loader } from "@/components/ui/loader";

export function GetRegistrations() {
  const [users, setUsers] = useState<GetRegisteredUsers[]>([]);
  const [eventName, setEventName] = useState("");
  const [loading, setLoading] = useState(false);
  const { eventId } = useParams();

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await handleGettingRegistrationsByEventId(eventId!);
      const event = await handleEventGettingById(eventId!);
      setEventName(event.title!);
      setUsers(response);
    } catch (error: any) {
      showErrorToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [eventId]);

  return (
    <div className="container mx-auto w-full px-4 py-10">
      <h2 className="text-2xl font-semibold mb-1">
        Registered Users for {eventName}
      </h2>

      <div className="mb-6 text-gray-700 font-medium">
        Total Registered Users: {users.length}
      </div>

      <ScrollArea className="max-h-[600px] space-y-6 pr-2">
        {loading ? (
          <Loader/>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">No registrations found.</p>
        ) : (
          users.map((user) => <UserDetailsCard key={user.email} user={user} />)
        )}
      </ScrollArea>
    </div>
  );
}
