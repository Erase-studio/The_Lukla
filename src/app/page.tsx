import { Hero } from "@/components/Hero";
import { AboutTeaser } from "@/components/AboutTeaser";
import { Dishes } from "@/components/Dishes";
import { MenuDiscovery } from "@/components/MenuDiscovery";
import { Reviews } from "@/components/Reviews";
import { FallsBand } from "@/components/FallsBand";
import { Visit } from "@/components/Visit";
import { getExteriorPhoto, getPlates } from "@/lib/local-photos";
import { getPlaceData } from "@/lib/google-reviews";

export default async function Home() {
  const [plates, place] = await Promise.all([
    Promise.resolve(getPlates()),
    getPlaceData(),
  ]);
  const exterior = getExteriorPhoto();

  return (
    <>
      <Hero plates={plates} />
      <AboutTeaser exterior={exterior} />
      <Dishes plates={plates} />
      <MenuDiscovery plates={plates} />
      <Reviews place={place} />
      <FallsBand />
      <Visit />
    </>
  );
}
