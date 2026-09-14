import {
  EMAIL,
  HOURS,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_URL,
} from "@/lib/menu-data";
import { IconArrowUpRight } from "./icons";
import { Reveal } from "./Reveal";

export function Visit() {
  return (
    <section id="visit" className="px-3 sm:px-6">
      <div className="mx-auto max-w-[1400px] rounded-[32px] bg-ink px-6 py-20 text-paper sm:px-12 sm:py-28 lg:px-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-paper/55">Visit</p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05]">
              Plan your visit
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-[1.7] text-paper/70">
              We&apos;re inside Comfort Inn The Pointe, with parking on site.
              Walk in, call ahead for a table, or order for pickup.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-paper text-ink hover:bg-saffron"
              >
                Get directions
                <IconArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={PHONE_HREF}
                className="btn tnum border border-paper/25 hover:border-paper"
              >
                Call {PHONE_DISPLAY}
              </a>
            </div>

            <dl className="mt-14 grid grid-cols-1 gap-8 text-[15px] sm:grid-cols-2">
              <div>
                <dt className="eyebrow text-paper/55">Address</dt>
                <dd className="mt-3 leading-[1.7] text-paper/90">
                  1 Prospect Pointe, Unit 5
                  <br />
                  Niagara Falls, NY 14303
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-paper/55">Get in touch</dt>
                <dd className="mt-3 flex flex-col items-start gap-1.5 leading-[1.7]">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-paper/90 underline decoration-paper/25 underline-offset-4 transition-colors hover:decoration-paper"
                  >
                    {EMAIL}
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paper/90 underline decoration-paper/25 underline-offset-4 transition-colors hover:decoration-paper"
                  >
                    Message us on WhatsApp
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <h3 className="eyebrow text-paper/55">Opening hours</h3>
            <dl className="mt-6 border-b border-paper/10">
              {HOURS.map((h) => (
                <div
                  key={h.day}
                  className="flex items-baseline justify-between gap-6 border-t border-paper/10 py-5 text-[16px]"
                >
                  <dt className="text-paper/70">{h.day}</dt>
                  <dd className="tnum text-paper">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-[15px] leading-[1.7] text-paper/60">
              Dine-in, takeout, curbside pickup and outdoor seating. Halal
              options available.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
