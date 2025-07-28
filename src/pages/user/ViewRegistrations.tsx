import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  handleCancelRegistration,
  handleGettingRegistrationsByUserId,
} from "@/services/RegistrationService";
import { showErrorToast, showSuccessToast } from "@/components/files/toast";
import type { RegisteredEvent } from "@/models/RegisterModel";
import { EventBar } from "@/components/ui/event-bar";
import { downloadSingleEventAsICS } from "@/lib/helpers";

export function ViewRegistrations() {
  const [registrations, setRegistrations] = useState<RegisteredEvent[]>([]);

  const fetchRegistrations = async () => {
    try {
      const response = await handleGettingRegistrationsByUserId();
      setRegistrations(response);
    } catch (err: any) {
      showErrorToast(err.message);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleCancel = async (e: any, id: string) => {
    e.stopPropagation(); 
    try {
      const response = await handleCancelRegistration(id);
      showSuccessToast(response);
      await fetchRegistrations();
    } catch (err: any) {
      showErrorToast(err.message);
    }
  };

  return (
    <div className="container mx-auto w-full px-4 py-10">
      <h2 className="text-2xl font-semibold ">Your Registration History</h2>
      <span>
        You have {registrations.length} registration
        {registrations.length !== 1 ? "s" : ""}
      </span>

      <ScrollArea className="pr-2 space-y-4 mt-5">
        {registrations.length === 0 ? (
          <div className="text-gray-500 text-sm italic">
            You haven’t registered for any events yet.
          </div>
        ) : (
          registrations.map((registration) => (
            <Card key={registration.id}>
              <EventBar event={registration} onCancel={handleCancel} onDownloadICS={downloadSingleEventAsICS}/>
            </Card>
          ))
        )}
      </ScrollArea>
    </div>
  );
}
