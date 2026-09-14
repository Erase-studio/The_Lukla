import Image from "next/image";
import { images } from "@/lib/images";
import { BRAND_LINE } from "@/lib/menu-data";
import { ElevationProfile } from "./ElevationProfile";
import { Reveal } from "./Reveal";

export function Story() {
  return (
    <section id="story" aria-labelledby="story-heading" className="section-y">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-10 lg:gap-16 lg:px-10">
        {/* The arch stays in view while the story beside it scrolls. */}
        <div className="md:col-span-5">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px] overflow-hidden rounded-t-full bg-wash md:sticky md:top-28 md:aspect-[4/5]">
            <Image
              src={images.spices}
              alt="Whole spices: cinnamon, cardamom, peppercorns, cumin and dried chillies"
              fill
              sizes="(min-width:768px) 460px, 90vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <h2
              id="story-heading"
              className="font-display text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.03] text-ink"
            >
              Named after Lukla, the gateway to Everest
            </h2>
            <div className="mt-7 max-w-lg space-y-5 text-[18px] leading-[1.65] text-stone">
              <p>
                Lukla is a small town on a mountainside in the Khumbu region of
                eastern Nepal. It sits 2,860 metres up, and its airstrip,
                Tenzing–Hillary Airport, is where most treks to Everest begin.
              </p>
              <p>
                We named our kitchen after it. The momos, thukpa and chowmein
                come from those mountains; the dosa, idli, sambar and biryani
                come from South India. Both are cooked to order, side by side,
                a few minutes from Niagara Falls.
              </p>
            </div>
            <p className="mt-6 text-[15px] text-stone">Vegan and Jain plates on request.</p>
          </Reveal>

          <ElevationProfile />

          <p className="max-w-lg font-display text-[clamp(1.75rem,2.8vw,2.25rem)] leading-[1.15] text-ink">
            {BRAND_LINE}
          </p>
        </div>
      </div>
    </section>
  );
}
