import {
  EMAIL,
  HOURS,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_URL,
} from "@/lib/menu-data";
import { IconArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Contact · The Lukla",
  description:
    "Visit The Lukla Himalayan & South Indian Kitchen at 1 Prospect Pointe, Niagara Falls, NY. Open every day for dine-in, takeout and pickup.",
};

export default function ContactPage() {
  return (
    <main className="pt-[120px] lg:pt-[140px]">
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-5 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-ink">
              Plan your visit
            </h1>
            <p className="mt-6 max-w-xl text-[18px] leading-[1.65] text-stone">
              We&apos;re inside Comfort Inn The Pointe, with parking on site.
              Walk in, call ahead for a table, or order for pickup.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12">
            {/* Left column */}
            <Reveal className="lg:col-span-6">
              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-solid"
                >
                  Get directions
                  <IconArrowUpRight className="h-4 w-4" />
                </a>
                <a href={PHONE_HREF} className="btn btn-line tnum">
                  Call {PHONE_DISPLAY}
                </a>
              </div>

              {/* Details grid */}
              <dl className="mt-14 grid grid-cols-1 gap-10 text-[15px] sm:grid-cols-2">
                <div>
                  <dt className="eyebrow">Address</dt>
                  <dd className="mt-3 leading-[1.7] text-ink">
                    1 Prospect Pointe, Unit 5
                    <br />
                    Niagara Falls, NY 14303
                    <br />
                    <span className="text-stone">
                      Inside Comfort Inn The Pointe
                    </span>
                  </dd>
                </div>

                <div>
                  <dt className="eyebrow">Phone</dt>
                  <dd className="mt-3">
                    <a
                      href={PHONE_HREF}
                      className="tnum text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="eyebrow">Email</dt>
                  <dd className="mt-3">
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {EMAIL}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="eyebrow">WhatsApp</dt>
                  <dd className="mt-3">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      Message us
                      <IconArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </dd>
                </div>

                <div className="sm:col-span-2">
                  <dt className="eyebrow">Dining options</dt>
                  <dd className="mt-3 text-stone">
                    Dine-in · Takeout · Curbside pickup · Outdoor seating ·
                    Halal options available
                  </dd>
                </div>
              </dl>
            </Reveal>

            {/* Right column — hours */}
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
              <div className="rounded-[24px] bg-wash px-8 py-10">
                <h2 className="eyebrow">Opening hours</h2>
                <dl className="mt-6 border-b border-ink/10">
                  {HOURS.map((h) => (
                    <div
                      key={h.day}
                      className="flex items-baseline justify-between gap-6 border-t border-ink/10 py-5 text-[16px]"
                    >
                      <dt className="text-stone">{h.day}</dt>
                      <dd className="tnum font-medium text-ink">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-[14px] leading-[1.7] text-stone">
                  Hours subject to change on public holidays. Call ahead to
                  confirm.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map CTA band */}
      <section className="bg-wash py-16 sm:py-20">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[18px] font-medium text-ink">
                Three minutes from Niagara Falls State Park
              </p>
              <p className="mt-2 text-[15px] text-stone">
                Parking on site · accessible entrance
              </p>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid shrink-0"
            >
              Open in Google Maps
              <IconArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
