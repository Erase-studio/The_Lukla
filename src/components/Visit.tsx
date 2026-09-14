import Link from "next/link";
import {
  ADDRESS,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/menu-data";
import { IconArrowRight, IconArrowUpRight, IconPhone } from "./icons";
import { HoursTiles, OpenStatus } from "./OpeningHours";
import { Reveal } from "./Reveal";

export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-heading" className="px-3 sm:px-5">
      <div className="mx-auto max-w-[1480px] rounded-[36px] bg-ink px-6 py-16 text-paper sm:px-12 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[1160px]">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-paper/65">Visit</p>
              <h2
                id="visit-heading"
                className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05]"
              >
                Plan your visit
              </h2>
            </div>
            <OpenStatus tone="dark" className="self-start md:self-auto" />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-12 border-t border-paper/10 pt-12 md:grid-cols-2 md:gap-16">
            {/* Location & Ordering */}
            <div>
              <h3 className="eyebrow text-paper/65">Find us</h3>
              <p className="mt-4 text-[20px] font-medium leading-[1.45] text-paper">
                {ADDRESS[0]}
                <br />
                {ADDRESS[1]}
              </p>
              <p className="mt-2 text-[15px] text-paper/70">
                Inside Comfort Inn The Pointe · Free parking on site
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-paper text-ink hover:bg-wall"
                >
                  Get directions
                  <IconArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={PHONE_HREF}
                  className="btn gap-2.5 border border-paper/25 hover:border-paper"
                >
                  <IconPhone className="h-4 w-4" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* Hours & Service */}
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="eyebrow text-paper/65">Opening hours</h3>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center gap-1.5 text-[14px] text-paper/75 transition-colors hover:text-paper"
                >
                  View full details
                  <IconArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <HoursTiles tone="dark" className="mt-4 grid-cols-1 sm:grid-cols-2" />

              <p className="mt-6 text-[14px] text-paper/65">
                Dine-in, takeout, curbside pickup &amp; outdoor seating · Halal options available
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
