import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Dishes } from "@/components/Dishes";
import { Menu } from "@/components/Menu";
import { Reviews } from "@/components/Reviews";
import { FallsBand } from "@/components/FallsBand";
import { Visit } from "@/components/Visit";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { MotionProvider } from "@/components/MotionProvider";
import { getPlates } from "@/lib/local-photos";

export default function Home() {
  const plates = getPlates();

  return (
    <MotionProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero plates={plates} />
        <Story />
        <Dishes plates={plates} />
        <Menu plates={plates} />
        <Reviews />
        <FallsBand />
        <Visit />
      </main>
      <Footer />
      <MobileActionBar />
    </MotionProvider>
  );
}
