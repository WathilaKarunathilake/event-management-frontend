import { Banner } from "@/components/ui/banner";
import { DescriptionComponent } from "@/components/ui/descriptor";

export default function HomePage() {
  return (
    <div className="w-full">
      <Banner />
      <DescriptionComponent />
    </div>
  );
}
