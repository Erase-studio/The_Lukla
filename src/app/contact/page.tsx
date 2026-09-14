import type { Metadata } from "next";
import Image from "next/image";
import { Faq } from "@/components/Faq";
import { HoursTiles, OpenStatus } from "@/components/OpeningHours";
import { PageHeader } from "@/components/PageHeader";
import { ScrollTurn } from "@/components/ScrollTurn";
import {
  IconArrowUpRight,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsapp,
} from "@/components/icons";
import { getPlates } from "@/lib/local-photos";
import {
  ADDRESS,
  EMAIL,
  MAP_EMBED_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_URL,
} from "@/lib/menu-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Find The Lukla at 1 Prospect Pointe, Niagara Falls, NY. Hours, phone, WhatsApp, directions and parking.",
};

const METHODS = [
  {
    label: "Address",
    value: ADDRESS[0],
    note: `${ADDRESS[1]} · Inside Comfort Inn The Pointe`,
    href: MAPS_URL,
    icon: IconPin,
    external: true,
  },
  {
    label: "Call",
    value: PHONE_DISPLAY,
    note: "Tables, takeout and curbside pickup",
    href: PHONE_HREF,
    icon: IconPhone,
    external: false,
  },
  {
    label: "WhatsApp",
    value: "Message us",
    note: PHONE_DISPLAY,
    href: WHATSAPP_URL,
    icon: IconWhatsapp,
    external: true,
  },
  {
    label: "Email",
    value: EMAIL,
    note: null,
    href: `mailto:${EMAIL}`,
    icon: IconMail,
    external: false,
  },
];

export default function Contact() {
  const plates = getPlates();

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Come find us"
        intro="We're inside Comfort Inn The Pointe, three minutes from Niagara Falls State Park. Call ahead, send a message, or walk in."
        art={
          plates.chai && (
            <ScrollTurn degrees={-30} className="relative ml-auto aspect-square w-[78%]">
              <Image
                src={plates.chai.src}
                alt=""
                fill
                sizes="420px"
                className="object-contain drop-shadow-[0_26px_32px_rgba(21,34,61,0.3)]"
              />
            </ScrollTurn>
          )
        }
      >
        {/* What most people on this page want: are you open, and how do I call or get there. */}
        <OpenStatus tone="light" className="mt-8" />
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={PHONE_HREF} className="btn btn-solid tnum h-14 gap-2.5 px-7 text-[16px]">
            <IconPhone className="h-4 w-4" />
            Call {PHONE_DISPLAY}
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-line h-14 bg-paper/60 px-7 text-[16px]"
          >
            Get directions
            <IconArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </PageHeader>

      <section aria-label="Ways to reach us" className="section-y">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <div className="lg:col-span-6">
            <ul className="border-t border-line">
              {METHODS.map((method) => (
                <li key={method.label} className="border-b border-line">
                  <a
                    href={method.href}
                    {...(method.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-5 py-6"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-wash text-cobalt transition-colors duration-300 group-hover:bg-ink group-hover:text-paper">
                      <method.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-semibold uppercase tracking-[0.12em] text-stone">
                        {method.label}
                      </span>
                      <span className="tnum mt-1.5 block break-words font-display text-[clamp(1.35rem,2.2vw,1.7rem)] leading-tight text-ink">
                        {method.value}
                      </span>
                      {method.note && (
                        <span className="tnum mt-1 block text-[15px] text-stone">{method.note}</span>
                      )}
                    </span>
                    <IconArrowUpRight className="h-5 w-5 shrink-0 text-ink/35 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <h2 className="font-display text-[1.9rem] leading-tight text-ink">Opening hours</h2>
              <HoursTiles tone="light" className="mt-5 grid-cols-2" />
              <p className="mt-5 text-[15px] leading-[1.6] text-stone">
                Dine-in, takeout, curbside pickup and outdoor seating.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              {/* Google's embed can't be restyled without an API key, so it's toned down and tinted
                  toward the site's blue. The overlay lets clicks through to the map. */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] border border-line bg-wash lg:aspect-square">
                <iframe
                  title="Map showing The Lukla at 1 Prospect Pointe, Niagara Falls, NY"
                  src={MAP_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0 [filter:saturate(0.45)_contrast(1.02)]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-wall/25 mix-blend-multiply"
                />
              </div>
              <p className="mt-5 text-[15px] text-stone">
                Free parking on site, three minutes from Niagara Falls State Park.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Faq />
    </>
  );
}
