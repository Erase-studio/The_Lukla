import { Hero } from "@/components/Hero";
import { AboutTeaser } from "@/components/AboutTeaser";
import { Dishes } from "@/components/Dishes";
import { MenuDiscovery } from "@/components/MenuDiscovery";
import { Reviews } from "@/components/Reviews";
import { FallsBand } from "@/components/FallsBand";
import { Visit } from "@/components/Visit";
import { getPlates } from "@/lib/local-photos";

export default function Home() {
  const plates = getPlates();

  return (
    <>
      <Hero plates={plates} />
      <AboutTeaser />
      <Dishes plates={plates} />
      <MenuDiscovery plates={plates} />
      <Reviews />
      <FallsBand />
      <Visit />
    </>
  );
}
