import { CUISINES } from "@/lib/menu-data";
import type { Plate } from "@/lib/local-photos";
import { PlateArt } from "./PlateArt";
import { Reveal } from "./Reveal";
import { ScrollSpin } from "./ScrollTurn";

const SIDES = [
  { cuisine: CUISINES[0], plate: "momo", alt: "Momos with tomato achar", spin: 44 },
  { cuisine: CUISINES[1], plate: "dosa", alt: "Masala dosa with sambar and coconut chutney", spin: -38 },
];

// The brand in one line: two cuisines on the same menu. Plates sit at the outer edges and turn in opposite directions.
export function TwoKitchens({ plates }: { plates: Record<string, Plate> }) {
  return (
    <section aria-labelledby="two-kitchens-heading" className="section-y overflow-x-clip">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <Reveal className="text-center">
          <h2
            id="two-kitchens-heading"
            className="mx-auto max-w-3xl font-display text-[clamp(2.6rem,6vw,5.25rem)] leading-[1] tracking-[-0.02em] text-ink"
          >
            Two kitchens. <span className="text-cobalt">One table.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[18px] leading-[1.6] text-stone">
            Food from the mountains of Nepal and the south of India, on the same menu.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-6 lg:gap-10">
          {SIDES.map((side, i) => (
            <div
              key={side.cuisine.name}
              className={`flex flex-col items-center gap-6 text-center md:flex-row md:gap-8 ${
                i === 0 ? "md:order-1 md:justify-end md:text-right" : "md:order-3 md:text-left"
              }`}
            >
              <ScrollSpin
                degrees={side.spin}
                className={`w-40 shrink-0 sm:w-48 lg:w-56 ${i === 0 ? "" : "md:order-2"}`}
              >
                <PlateArt
                  plate={plates[side.plate]}
                  alt={side.alt}
                  fallback={side.cuisine.dishes.join(" · ")}
                  sizes="224px"
                />
              </ScrollSpin>
              <div>
                <h3 className="eyebrow text-cobalt">{side.cuisine.name}</h3>
                <ul className="mt-3 font-display text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.15] text-ink">
                  {side.cuisine.dishes.map((dish) => (
                    <li key={dish}>{dish}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <span
            aria-hidden
            className="grid h-16 w-16 place-items-center justify-self-center rounded-full border border-line font-display text-[2rem] text-cobalt md:order-2"
          >
            &amp;
          </span>
        </div>
      </div>
    </section>
  );
}
