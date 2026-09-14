import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { IconArrowRight } from "./icons";
import { Reveal } from "./Reveal";

export function AboutTeaser() {
  return (
    <section aria-labelledby="about-teaser-heading" className="section-y">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:gap-10 lg:gap-16 lg:px-10">
        <div className="md:col-span-5">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[440px] overflow-hidden rounded-t-full bg-wash md:aspect-[4/5]">
            <Image
              src={images.spices}
              alt="Whole spices: cinnamon, cardamom, peppercorns, cumin and dried chillies"
              fill
              sizes="(min-width:768px) 440px, 90vw"
              className="object-cover"
            />
          </div>
        </div>

        <Reveal className="md:col-span-7 lg:col-span-6 lg:col-start-7">
          <h2
            id="about-teaser-heading"
            className="font-display text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.03] text-ink"
          >
            Named after Lukla, the gateway to Everest
          </h2>
          <p className="mt-7 max-w-lg text-[18px] leading-[1.65] text-stone">
            Lukla is a mountainside town in eastern Nepal, and its airstrip is
            where most treks to Everest begin. We named our kitchen after it,
            and cook Himalayan and South Indian food side by side.
          </p>

          {/* The whole story in two numbers. The full chart lives on the About page. */}
          <div className="mt-9 flex max-w-md items-center gap-4">
            <div>
              <p className="tnum font-display text-[1.9rem] leading-none text-ink">2,860 m</p>
              <p className="mt-1.5 text-[14px] text-stone">Lukla, Nepal</p>
            </div>
            <svg viewBox="0 0 120 40" aria-hidden className="h-10 min-w-0 flex-1" preserveAspectRatio="none">
              <path
                d="M2 6 C 50 6, 70 34, 118 34"
                fill="none"
                stroke="var(--cobalt)"
                strokeWidth={2}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="text-right">
              <p className="tnum font-display text-[1.9rem] leading-none text-ink">175 m</p>
              <p className="mt-1.5 text-[14px] text-stone">Niagara Falls</p>
            </div>
          </div>

          <Link
            href="/about"
            className="group mt-9 inline-flex items-center gap-2 py-1.5 text-[16px] font-medium text-ink underline decoration-ink/25 underline-offset-[6px] transition-colors hover:decoration-ink"
          >
            Read our story
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
