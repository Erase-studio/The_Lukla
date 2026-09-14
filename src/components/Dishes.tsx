import Image from "next/image";
import { SIGNATURES } from "@/lib/menu-data";
import { Reveal } from "./Reveal";

export function Dishes() {
  return (
    <section className="pb-28 sm:pb-40">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <Reveal className="border-t border-line pt-28 sm:pt-40">
          <p className="eyebrow">First visit?</p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] text-ink">
            Start with one of these
          </h2>
        </Reveal>

        <div className="-mx-6 mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:gap-10">
          {SIGNATURES.map((dish, i) => (
            <Reveal
              key={dish.name}
              delay={i * 0.08}
              className="w-[78%] shrink-0 snap-start md:w-auto"
            >
              <article className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-wash">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(min-width:768px) 32vw, 78vw"
                    className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <p className="eyebrow">{dish.kitchen}</p>
                  <span className="tnum text-[15px] text-ink">${dish.price}</span>
                </div>
                <h3 className="mt-2 font-display text-[1.75rem] leading-tight text-ink">
                  {dish.name}
                </h3>
                <p className="mt-3 max-w-sm text-[15px] leading-[1.65] text-stone">
                  {dish.blurb}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
