import { Lightbulb, PartyPopper, Users } from "lucide-react";
import FeatureCard from "./feature-card";

export function DescriptionComponent() {
  return (
    <section className="text-center px-6 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">
        Why Join Our Events?
      </h2>
      <div className="grid md:grid-cols-3 gap-8 text-left">
        <FeatureCard
          icon={<Users className="text-purple-600 w-6 h-6" />}
          title="Meet Like-minded People"
          description="Connect with others who share your passions. Expand your network and make meaningful connections."
        />
        <FeatureCard
          icon={<Lightbulb className="text-purple-600 w-6 h-6" />}
          title="Learn Something New"
          description="Enjoy engaging workshops and expert sessions. Expand your skills and knowledge."
        />
        <FeatureCard
          icon={<PartyPopper className="text-purple-600 w-6 h-6" />}
          title="Have Fun!"
          description="Make great memories with interactive and enjoyable experiences at every event."
        />
      </div>
    </section>
  );
}
