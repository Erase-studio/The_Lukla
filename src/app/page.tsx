import { Hero } from "@/components/Hero";
import { AboutTeaser } from "@/components/AboutTeaser";
import { Dishes } from "@/components/Dishes";
import { MenuDiscovery } from "@/components/MenuDiscovery";
import { Reviews } from "@/components/Reviews";
import { FallsBand } from "@/components/FallsBand";
import { Visit } from "@/components/Visit";
import { getPlates } from "@/lib/local-photos";
import { getPlaceData } from "@/lib/google-reviews";

export default async function Home() {
  const [plates, place] = await Promise.all([
    Promise.resolve(getPlates()),
    getPlaceData(),
  ]);

  return (
    <>
      <Hero
        plates={plates}
        rating={place.rating}
        userRatingCount={place.userRatingCount}
      />
      <AboutTeaser />
      <Dishes plates={plates} />
      <MenuDiscovery plates={plates} />
      <Reviews place={place} />
      <FallsBand />
      <Visit />
    </>
  );
}
