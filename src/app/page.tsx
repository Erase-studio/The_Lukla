import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Dishes } from "@/components/Dishes";
import { Menu } from "@/components/Menu";
import { Reviews } from "@/components/Reviews";
import { FallsBand } from "@/components/FallsBand";
import { Visit } from "@/components/Visit";
import { getHeroPlates } from "@/lib/local-photos";
import { getPlaceData } from "@/lib/google-reviews";

export default async function Home() {
  const [plates, place] = await Promise.all([
    Promise.resolve(getHeroPlates()),
    getPlaceData(),
  ]);

  return (
    <main>
      <Hero
        plates={plates}
        rating={place.rating}
        userRatingCount={place.userRatingCount}
      />
      <Story />
      <Dishes />
      <Menu />
      <Reviews place={place} />
      <FallsBand />
      <Visit />
    </main>
  );
}
