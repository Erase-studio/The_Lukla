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
          <p className="eyebrow">Our story</p>
          <h2
            id="about-teaser-heading"
            className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] text-ink"
          >
            Named after a small town in the mountains
          </h2>
          <p className="mt-7 max-w-lg text-[18px] leading-[1.65] text-stone">
            Lukla is a mountainside town in eastern Nepal, and its airstrip is
            where most treks to Everest begin. We named our kitchen after it,
            and cook Himalayan and South Indian food side by side.
          </p>
          <Link href="/about" className="btn btn-line mt-8">
            Read our story
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
