import { useSearchParams } from "react-router-dom";
import { Hash, Calendar, Clock, MapPin, Sparkles } from "lucide-react";

export default function EventInformationPage() {
  const [params] = useSearchParams();
  const title = params.get("title") || "Untitled Event";
  const refId = params.get("refId") || "N/A";
  const startDate = params.get("staring") || "N/A";
  const endDate = params.get("ending") || "N/A";
  const start = params.get("start") || "N/A";
  const end = params.get("end") || "N/A";
  const venue = params.get("venue") || "N/A";

  return (
    <section className="min-h-screen bg-purple-50 px-6 py-16 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-3xl p-8 max-w-md w-full border border-purple-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-purple-700 leading-tight">
            {title}
          </h1>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-700 bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
              <Hash className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Reference ID</p>
              <p className="text-gray-800 font-medium">{refId}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-700 bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Start Date</p>
              <p className="text-gray-800 font-medium">{startDate}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-700 bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">End Date</p>
              <p className="text-gray-800 font-medium">{endDate}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-700 bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Time</p>
              <p className="text-gray-800 font-medium">{start} - {end}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-700 bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Venue</p>
              <p className="text-gray-800 font-medium">{venue}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-purple-100">
          <div className="w-12 h-1 bg-purple-700 rounded-full mx-auto"></div>
        </div>
      </div>
    </section>
  );
}