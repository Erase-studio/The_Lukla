import type { Metadata } from "next";
import Image from "next/image";
import { Faq } from "@/components/Faq";
import { HoursTiles } from "@/components/OpeningHours";
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
  {
    label: "Address",
    value: ADDRESS[0],
    note: `${ADDRESS[1]} · Inside Comfort Inn The Pointe`,
    href: MAPS_URL,
    icon: IconPin,
    external: true,
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
      />

      <section aria-label="Ways to reach us" className="section-y">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <div className="lg:col-span-5">
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
                      <span className="eyebrow block">{method.label}</span>
                      <span className="tnum mt-1.5 block break-words font-display text-[clamp(1.2rem,2.2vw,1.7rem)] leading-tight text-ink">
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
              <h2 className="eyebrow">Opening hours</h2>
              <HoursTiles tone="light" className="mt-5 grid-cols-1 sm:grid-cols-2" />
              <p className="mt-5 text-[15px] leading-[1.6] text-stone">
                Dine-in, takeout, curbside pickup and outdoor seating.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] border border-line bg-wash lg:aspect-[5/6]">
                <iframe
                  title="Map showing The Lukla at 1 Prospect Pointe, Niagara Falls, NY"
                  src={MAP_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0 [filter:saturate(0.85)]"
                />
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <p className="text-[15px] text-stone">Free parking on site.</p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-solid"
                >
                  Get directions
                  <IconArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Faq />
    </>
  );
}
