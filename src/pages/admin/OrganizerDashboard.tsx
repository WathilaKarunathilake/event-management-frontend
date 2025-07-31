import { showErrorToast } from "@/components/files/toast";
import { Loader } from "@/components/ui/loader";
import StatCard from "@/components/ui/stats-card";
import type { EventSummary } from "@/models/EventModel";
import { handleGettingEventsSummary } from "@/services/EventService";
import {
  Calendar,
  CheckCircle,
  Users,
  BarChart2,
  PlusCircle,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function OrganizerDashboard() {
  const [summary, setSummary] = useState<EventSummary>();
  const [loading, setLoading] = useState(false);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await handleGettingEventsSummary();
      setSummary(response);
    } catch (e: any) {
      showErrorToast(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="p-8 mx-auto mt-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-purple-700">
        Welcome to Organizer Dashboard
      </h1>
      <p className="text-gray-600 mb-8">
        Here’s a quick overview of your event performance and upcoming
        activities.
      </p>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              icon={<Calendar className="text-purple-700 w-6 h-6" />}
              title="Total Events"
              value={summary?.totalEvents ?? 0}
              color="purple"
            />
            <StatCard
              icon={<CheckCircle className="text-emerald-600 w-6 h-6" />}
              title="Non-filled Events"
              value={summary?.activeEvents ?? 0}
              color="emerald"
            />
            <StatCard
              icon={<Users className="text-blue-600 w-6 h-6" />}
              title="Filled Events"
              value={summary?.filledEvents ?? 0}
              color="blue"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <StatCard
              icon={<BarChart2 className="text-orange-600 w-6 h-6" />}
              title="Upcoming Events"
              value={summary?.upcommingEvents ?? 0}
              color="orange"
            />
            <StatCard
              icon={<Users className="text-slate-600 w-6 h-6" />}
              title="Total Registrations (All Events)"
              value={summary?.totalAttendees.toLocaleString() ?? 0}
              color="slate"
            />
          </div>

          <h2 className="text-2xl font-bold mb-6 text-purple-700">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/admin/add-event">
              <button className="cursor-pointer w-full flex items-center gap-3 bg-purple-700 hover:bg-purple-800 text-white rounded-lg px-6 py-4 font-semibold shadow-sm transition-colors">
                <PlusCircle className="w-5 h-5" />
                Create New Event
              </button>
            </Link>

            <Link to="/admin/events">
              <button className="cursor-pointer w-full flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg px-6 py-4 font-semibold shadow-sm transition-colors">
                <Eye className="w-5 h-5" />
                View Events
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default OrganizerDashboard;
