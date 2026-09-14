import Image from "next/image";
import { SIGNATURES } from "@/lib/menu-data";
import type { Plate } from "@/lib/local-photos";
import { IconArrowRight } from "./icons";
import { Reveal } from "./Reveal";

export function Dishes({ plates }: { plates: Record<string, Plate> }) {
  return (
    <section aria-labelledby="dishes-heading" className="pb-[clamp(4.5rem,8vw,7rem)]">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <Reveal className="flex flex-col gap-5 border-t border-line pt-14 sm:flex-row sm:items-end sm:justify-between sm:pt-20">
          <div>
            <p className="eyebrow">First visit?</p>
            <h2
              id="dishes-heading"
              className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] text-ink"
            >
              Start with one of these
            </h2>
          </div>
          <p className="max-w-xs text-[16px] leading-[1.6] text-stone">
            Three dishes that show both sides of the kitchen.
          </p>
        </Reveal>

        {/* One art-directed set: every dish is the same round plate, shot from above, on the same blue tile. */}
        <ul className="-mx-6 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:gap-10">
          {SIGNATURES.map((dish) => {
            const plate = plates[dish.plate];
            return (
              <li key={dish.name} className="w-[80%] shrink-0 snap-start md:w-auto">
                <a href={dish.href} className="group block rounded-[24px]">
                  <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[24px] bg-wash">
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(60%_48%_at_50%_46%,rgba(255,255,255,0.85),transparent_72%)]"
                    />
                    {plate ? (
                      <div className="relative aspect-square w-[74%] transition-transform duration-[900ms] ease-soft group-hover:rotate-[8deg] group-hover:scale-[1.04] group-focus-visible:rotate-[8deg] group-focus-visible:scale-[1.04]">
                        <Image
                          src={plate.src}
                          alt={dish.plateAlt}
                          fill
                          sizes="(min-width:768px) 26vw, 60vw"
                          className="object-contain drop-shadow-[0_26px_30px_rgba(21,34,61,0.28)]"
                        />
                      </div>
                    ) : (
                      <span className="relative font-display text-3xl text-ink/40">{dish.name}</span>
                    )}
                    <span
                      aria-hidden
                      className="absolute right-4 top-4 grid h-11 w-11 -translate-x-1 place-items-center rounded-full bg-paper text-ink opacity-0 transition duration-500 ease-soft group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                    >
                      <IconArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <p className="eyebrow">{dish.kitchen}</p>
                    <p className="tnum text-[16px] font-medium text-ink">${dish.price}</p>
                  </div>
                  <h3 className="mt-2 font-display text-[1.75rem] leading-tight text-ink transition-transform duration-500 ease-soft group-hover:translate-x-1">
                    {dish.name}
                  </h3>
                  <p className="mt-2.5 max-w-sm text-[16px] leading-[1.6] text-stone">
                    {dish.blurb}
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
