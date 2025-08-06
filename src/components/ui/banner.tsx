import { Button } from "@/components/ui/button";
import { CalendarDays, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import BannerImage from "../../assets/banner.png";

export function Banner() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 py-12 bg-white">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-4 flex items-center gap-2 text-gray-800">
          <Sparkles className="text-purple-600" />
          Discover & Register for Exciting Events
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Find events that match your interests — workshops, meetups, and
          experiences near you. Register in just a few clicks and secure your
          spot instantly.
        </p>
        <Link to="/user/events">
          <Button className="px-6 py-3 text-lg flex items-center gap-2 bg-purple-600 hover:bg-purple-700 cursor-pointer text-white shadow-md rounded-md">
            <CalendarDays className="w-5 h-5" />
            Explore Events
          </Button>
        </Link>
      </div>
      <div className="flex justify-center">
        <img
          src={BannerImage}
          alt="Event registration"
          className="w-full max-w-md lg:max-w-lg rounded-xl"
        />
      </div>
    </section>
  );
}
