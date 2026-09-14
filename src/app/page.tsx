import { Hero } from "@/components/Hero";
import { AboutTeaser } from "@/components/AboutTeaser";
import { Dishes } from "@/components/Dishes";
import { TwoKitchens } from "@/components/TwoKitchens";
import { MenuDiscovery } from "@/components/MenuDiscovery";
import { Reviews } from "@/components/Reviews";
import { FallsBand } from "@/components/FallsBand";
import { Visit } from "@/components/Visit";
import { getPlates } from "@/lib/local-photos";

// Arrive → why the name → taste → what makes it different → explore → trust → the place → go.
export default function Home() {
  const plates = getPlates();

  return (
    <>
      <Hero plates={plates} />
      <AboutTeaser />
      <Dishes plates={plates} />
      <TwoKitchens plates={plates} />
      <MenuDiscovery plates={plates} />
      <Reviews />
      <FallsBand />
      <Visit />
    </>
  );
}
