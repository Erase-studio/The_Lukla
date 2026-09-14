import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Dishes } from "@/components/Dishes";
import { Menu } from "@/components/Menu";
import { Reviews } from "@/components/Reviews";
import { FallsBand } from "@/components/FallsBand";
import { Visit } from "@/components/Visit";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { getHeroPlates } from "@/lib/local-photos";

export default function Home() {
  return (
    <MotionProvider>
      <SiteHeader />
      <main>
        <Hero plates={getHeroPlates()} />
        <Story />
        <Dishes />
        <Menu />
        <Reviews />
        <FallsBand />
        <Visit />
      </main>
      <Footer />
    </MotionProvider>
  );
}
