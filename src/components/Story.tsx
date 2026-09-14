import { BRAND_LINE, CUISINES } from "@/lib/menu-data";
import { Reveal } from "./Reveal";

export function Story() {
  return (
    <section id="story" aria-labelledby="story-heading" className="section-y">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-8 px-6 md:grid-cols-12 md:gap-10 lg:gap-16 lg:px-10">
        <Reveal className="md:col-span-5">
          <p className="eyebrow">Our story</p>
          <h2
            id="story-heading"
            className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] text-ink"
          >
            Named after a small town in the mountains
          </h2>
        </Reveal>

        <div className="md:col-span-7 md:pt-10 lg:col-span-6 lg:col-start-7">
          <p className="max-w-lg text-[17px] leading-[1.65] text-stone sm:text-[18px]">
            Lukla is a mountainside town in eastern Nepal, and its airstrip is
            where most treks to Everest begin. We named our kitchen after it,
            and cook two cuisines side by side.
          </p>

          <div className="mt-10 grid max-w-lg grid-cols-2 gap-6 border-t border-line pt-8">
            {CUISINES.map((cuisine) => (
              <div key={cuisine.name}>
                <h3 className="eyebrow text-cobalt">{cuisine.name}</h3>
                <ul className="mt-4 space-y-1 font-display text-[1.45rem] leading-snug text-ink sm:text-[1.6rem]">
                  {cuisine.dishes.map((dish) => (
                    <li key={dish}>{dish}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[15px] text-stone">Vegan and Jain plates on request.</p>

          <p className="mt-10 max-w-lg font-display text-[clamp(1.6rem,2.8vw,2.25rem)] leading-[1.15] text-ink">
            {BRAND_LINE}
          </p>
        </div>
      </div>
    </section>
  );
}
