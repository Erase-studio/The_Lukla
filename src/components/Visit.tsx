import { ADDRESS, MAPS_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/menu-data";
import { IconArrowUpRight, IconPhone } from "./icons";
import { HoursList } from "./OpeningHours";
import { Reveal } from "./Reveal";

const linkClass =
  "inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink";

// A short closing strip for the home page: where we are and when we're open, nothing more.
export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-heading" className="pb-4">
      
    </section>
  );
}
