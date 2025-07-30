import { useState, useEffect } from "react";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UserDetails } from "@/models/AuthModel";
import { handeGettingUserInfo } from "@/services/AuthService";
import { handleRegisterForEvents } from "@/services/RegistrationService";
import { showErrorToast, showSuccessToast } from "../files/toast";

interface RegisterModelProps {
  onClose: () => void;
  eventId: string;
  fetchEvents: () => void;
  fetchRegs?: () => void;
}

export function RegisterModel({
  onClose,
  eventId,
  fetchEvents,
  fetchRegs,
}: RegisterModelProps) {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await handeGettingUserInfo();
        setUserDetails(response);
      } catch {
        console.log("Failed to fetch user details");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await handleRegisterForEvents({
        ...userDetails,
        eventId: eventId,
      });
      showSuccessToast(response);
      fetchEvents();
      fetchRegs && fetchRegs();
    } catch (error: any) {
      showErrorToast(error.message);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5 cursor-pointer" />
        </button>

        <h2 className="text-xl font-semibold mb-6 text-center">Register Now</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={userDetails.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={userDetails.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium mb-1"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="+1234567890"
              value={userDetails.phoneNumber}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-purple-700 hover:bg-purple-800 text-white w-full cursor-pointer"
          >
            {loading && (
              <Loader2 className="h-6 w-6 animate-spin stroke-[2.5]" />
            )}
            Register Now
          </Button>
        </form>
      </div>
    </div>
  );
}
