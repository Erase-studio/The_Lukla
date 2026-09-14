"use client";

import {
  ADDRESS,
  EMAIL,
  FULL_MENU_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_URL,
} from "@/lib/menu-data";
import { HOURS } from "@/lib/hours";
import { useOpeningStatus } from "@/lib/use-opening-status";
import { IconArrowUpRight, IconPhone } from "./icons";
import { Reveal } from "./Reveal";

export function Visit() {
  const status = useOpeningStatus();

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
            <p
              aria-live="polite"
              className="inline-flex items-center gap-2.5 self-start rounded-full border border-paper/15 px-4 py-2 text-[15px] text-paper/85 md:self-auto"
            >
              <span
                aria-hidden
                className={`h-2 w-2 rounded-full ${
                  status === null ? "bg-wall" : status.open ? "bg-[#7ad7a0]" : "bg-saffron"
                }`}
              />
              <span className="tnum">{status?.text ?? "Open every day"}</span>
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 border-y border-paper/10 md:grid-cols-3">
            <div className="py-8 md:border-r md:border-paper/10 md:pr-8">
              <h3 className="eyebrow text-paper/65">Address</h3>
              <p className="mt-4 text-[18px] leading-[1.55]">
                {ADDRESS[0]}
                <br />
                {ADDRESS[1]}
              </p>
              <p className="mt-2 text-[15px] text-paper/70">
                Inside Comfort Inn The Pointe. Free parking.
              </p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-6 bg-paper text-ink hover:bg-wall"
              >
                Get directions
                <IconArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="border-t border-paper/10 py-8 md:border-r md:border-t-0 md:px-8">
              <h3 className="eyebrow text-paper/65">Order</h3>
              <a
                href={PHONE_HREF}
                className="tnum mt-4 inline-block font-display text-[1.9rem] leading-none transition-colors hover:text-wall"
              >
                {PHONE_DISPLAY}
              </a>
              <p className="mt-3 text-[15px] text-paper/70">
                Call ahead for a table, takeout or curbside pickup.
              </p>
              <a
                href={PHONE_HREF}
                className="btn mt-6 gap-2.5 border border-paper/25 hover:border-paper"
              >
                <IconPhone className="h-4 w-4" />
                Call to order
              </a>
            </div>

            <div className="border-t border-paper/10 py-8 md:border-t-0 md:pl-8">
              <h3 className="eyebrow text-paper/65">Menu</h3>
              <p className="mt-4 text-[18px] leading-[1.55]">
                Momos, dosa, biryani, tandoor and more.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#menu" className="btn border border-paper/25 hover:border-paper">
                  See the menu
                </a>
                <a
                  href={FULL_MENU_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-paper/25 hover:border-paper"
                >
                  Full menu
                  <IconArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-5 text-[15px] text-paper/70">
                <a
                  href={`mailto:${EMAIL}`}
                  className="underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
                >
                  {EMAIL}
                </a>
                {" · "}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </div>

          <div className="pt-10">
            <h3 className="eyebrow text-paper/65">Opening hours</h3>
            <dl className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {HOURS.map((row) => {
                const today = status !== null && row.days.includes(status.today);
                return (
                  <div
                    key={row.label}
                    className={`rounded-2xl px-5 py-4 transition-colors duration-500 ${
                      today ? "bg-paper text-ink" : "bg-paper/[0.06] text-paper"
                    }`}
                  >
                    <dt
                      className={`flex items-center justify-between gap-2 text-[14px] ${
                        today ? "text-ink/70" : "text-paper/70"
                      }`}
                    >
                      <span>
                        <span className="sr-only">{row.label}</span>
                        <span aria-hidden>{row.short}</span>
                      </span>
                      {today && (
                        <span className="rounded-full bg-cobalt px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper">
                          Today
                        </span>
                      )}
                    </dt>
                    <dd className="tnum mt-1.5 text-[16px] font-medium">{row.time}</dd>
                  </div>
                );
              })}
            </dl>
            <p className="mt-8 text-[15px] text-paper/65">
              Dine-in, takeout, curbside pickup and outdoor seating. Halal options available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
