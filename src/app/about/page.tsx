import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { Reveal } from "@/components/Reveal";
import { IconArrowUpRight } from "@/components/icons";

export const metadata = {
  title: "About · The Lukla",
  description:
    "The story behind The Lukla — a Himalayan and South Indian kitchen named after the mountain town that is the gateway to Everest, now cooking in Niagara Falls, NY.",
};

const ELEVATIONS = [
  {
    place: "Lukla (लुक्ला), Nepal",
    note: "Where the trek to Everest begins",
    height: "2,860 m",
  },
  { place: "Niagara Falls, New York", note: "Where we cook", height: "175 m" },
];

const KITCHENS = [
  {
    name: "Himalayan",
    flag: "🇳🇵",
    headline: "From the mountains of Nepal",
    body: "Momos — steamed or fried dumplings, served with house achar. Thukpa — a warming noodle broth that mountain porters have eaten for centuries. Chowmein. Jhol momo — dumplings in a rich sesame and tomato broth. These are the flavours of the teahouses along the Everest trail.",
  },
  {
    name: "South Indian",
    flag: "🇮🇳",
    headline: "From the kitchens of South India",
    body: "Dosa — a thin, crisp fermented rice crepe, served with sambar and chutneys. Idli. Vada. Biryani layered with whole spices and slow-cooked meat. These dishes come from a tradition that has been refined over thousands of years across Tamil Nadu, Kerala and Karnataka.",
  },
];

export default function AboutPage() {
  return (
    <main className="pt-[120px] lg:pt-[140px]">
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-12 lg:px-10">
          <Reveal className="md:col-span-5">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-t-full bg-wash">
              <Image
                src={images.spices}
                alt="Whole spices arranged on a wooden board"
                fill
                sizes="(min-width:768px) 420px, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <p className="eyebrow">Our story</p>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.02em] text-ink">
              Named after a small town in the mountains
            </h1>
            <div className="mt-8 max-w-lg space-y-5 text-[17px] leading-[1.7] text-stone">
              <p>
                Lukla is a small town perched on a hillside in the Solukhumbu
                district of eastern Nepal, at an elevation of 2,860 metres. Its
                Tenzing-Hillary Airport — one of the most dramatic in the world
                — is where most treks to Everest Base Camp begin. For many
                climbers and trekkers, Lukla is the last taste of civilisation
                before the high mountains.
              </p>
              <p>
                We named our kitchen after that town because it represents
                something we believe in: the idea that food is the warmth you
                find after a long journey. Whether you are a visitor discovering
                Niagara Falls for the first time, or a local who has eaten here a
                hundred times, we want every meal to feel like arriving somewhere
                that is glad you came.
              </p>
              <p>
                Our kitchen runs two cuisines side by side. From the Himalayas,
                the food of Nepal. From the south, the food of Tamil Nadu and
                Kerala. Vegan and Jain plates are available on request.
              </p>
            </div>

            {/* Elevation table */}
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

      {/* The two kitchens */}
      <section className="bg-wash py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow">The kitchen</p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] text-ink">
              Two cuisines, one hearth
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:gap-16">
            {KITCHENS.map((k, i) => (
              <Reveal key={k.name} delay={i * 0.1}>
                <div className="rounded-[24px] bg-paper px-8 py-10">
                  <p className="text-4xl">{k.flag}</p>
                  <p className="eyebrow mt-6">{k.name}</p>
                  <h3 className="mt-3 font-display text-[1.75rem] leading-tight text-ink">
                    {k.headline}
                  </h3>
                  <p className="mt-5 text-[16px] leading-[1.75] text-stone">
                    {k.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dining room photo */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <div className="relative aspect-[16/7] overflow-hidden rounded-[28px] bg-wash">
              <Image
                src="/dining-room.jpg"
                alt="The dining room at The Lukla — warm lighting, periwinkle walls, wooden furniture"
                fill
                sizes="(min-width:1240px) 1240px, 95vw"
                className="object-cover"
              />
            </div>
            <p className="mt-6 text-center text-[15px] text-stone">
              Our dining room in Niagara Falls — inside Comfort Inn The Pointe.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <Reveal>
        <div className="mx-auto mb-20 max-w-[1240px] px-6 lg:px-10">
          <div className="flex flex-wrap items-center gap-4 border-t border-line pt-12">
            <Link href="/menu" className="btn btn-solid">
              Explore the menu
            </Link>
            <Link href="/contact" className="btn btn-line">
              Plan your visit
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
