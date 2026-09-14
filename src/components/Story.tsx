import Image from "next/image";
import { images } from "@/lib/images";
import { Reveal } from "./Reveal";

const ELEVATIONS = [
  { place: "Lukla (लुक्ला), Nepal", note: "Where the trek to Everest begins", height: "2,860 m" },
  { place: "Niagara Falls, New York", note: "Where we cook", height: "175 m" },
];

export function Story() {
  return (
    <section id="story" className="py-28 sm:py-40">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-12 lg:px-10">
        <Reveal className="md:col-span-5">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-t-full bg-wash">
            <Image
              src={images.spices}
              alt="Whole spices"
              fill
              sizes="(min-width:768px) 420px, 90vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <p className="eyebrow">Our story</p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] text-ink">
            Named after a small town in the mountains
          </h2>
          <div className="mt-8 max-w-lg space-y-5 text-[17px] leading-[1.7] text-stone">
            <p>
              Lukla is a town on a mountainside in eastern Nepal. Its airstrip
              is where most treks to Everest start.
            </p>
            <p>
              Our kitchen cooks two cuisines side by side. From the Himalayas:
              momos, thukpa and chowmein. From South India: dosa, idli, sambar
              and biryani. Vegan and Jain plates are available on request.
            </p>
          </div>

          <dl className="mt-12 max-w-lg">
            {ELEVATIONS.map((e) => (
              <div
                key={e.place}
                className="flex items-baseline justify-between gap-6 border-t border-line py-5 last:border-b"
              >
                <dt>
                  <span className="block text-[15px] font-medium text-ink">
                    {e.place}
                  </span>
                  <span className="mt-0.5 block text-[14px] text-stone">
                    {e.note}
                  </span>
                </dt>
                <dd className="tnum font-display text-2xl text-cobalt">
                  {e.height}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
