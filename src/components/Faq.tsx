import { PHONE_DISPLAY } from "@/lib/menu-data";
import { IconPlus } from "./icons";
import { Reveal } from "./Reveal";

const FAQS = [
  {
    q: "Can I book a table?",
    a: `Call us on ${PHONE_DISPLAY} and we'll let you know what's available. Walk-ins are welcome too.`,
  },
  {
    q: "Is there parking?",
    a: "Yes. There's free parking on site at Comfort Inn The Pointe.",
  },
  {
    q: "Do you have vegan, Jain or halal options?",
    a: "Yes. Vegan and Jain plates are made on request, and halal options are available. Let us know when you order.",
  },
  {
    q: "Can I order takeout?",
    a: "Yes. Call ahead for takeout or curbside pickup.",
  },
  {
    q: "How far are you from the Falls?",
    a: "About three minutes by car from Niagara Falls State Park.",
  },
  {
    q: "Is there outdoor seating?",
    a: "Yes, weather permitting.",
  },
];

export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="section-y bg-wash">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <Reveal className="lg:col-span-4">
          <h2
            id="faq-heading"
            className="font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] text-ink"
          >
            Before you visit
          </h2>
        </Reveal>

        <div className="border-t border-ink/15 lg:col-span-8">
          {FAQS.map((item) => (
            <details key={item.q} className="group border-b border-ink/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-[clamp(1.3rem,2vw,1.6rem)] leading-snug text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/20 transition-transform duration-500 ease-soft group-open:rotate-45"
                >
                  <IconPlus className="h-4 w-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 text-[17px] leading-[1.65] text-stone">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
