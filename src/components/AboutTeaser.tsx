import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import type { Photo } from "@/lib/local-photos";
import { MAPS_URL } from "@/lib/menu-data";
import { IconArrowRight, IconArrowUpRight, IconPin } from "./icons";
import { Reveal } from "./Reveal";

// The home page's story section, led by the outside of the restaurant: the first thing a visitor
// will actually see. The photo is shown still and in its own proportions (within limits) so the
// sign and entrance aren't cropped away.
export function AboutTeaser({ exterior }: { exterior: Photo | null }) {
  const ratio = exterior
    ? Math.min(Math.max(exterior.width / exterior.height, 4 / 5), 16 / 10)
    : 4 / 3;
  const portrait = ratio < 1;

  return (
    <section aria-labelledby="about-teaser-heading" className="section-y">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-8 px-6 md:grid-cols-12 md:gap-10 lg:gap-16 lg:px-10">
        <figure className={portrait ? "md:col-span-5" : "md:col-span-7"}>
          <div
            className="relative -mx-3 overflow-hidden rounded-[24px] bg-wash shadow-[0_30px_60px_-34px_rgba(21,34,61,0.45)] sm:mx-0 sm:rounded-[28px]"
            style={{ aspectRatio: String(ratio) }}
          >
            <Image
              src={exterior?.src ?? images.spices}
              alt={
                exterior
                  ? "The front of The Lukla at 1 Prospect Pointe, Niagara Falls"
                  : "Whole spices: cinnamon, cardamom, peppercorns, cumin and dried chillies"
              }
              fill
              sizes={portrait ? "(min-width:768px) 40vw, 100vw" : "(min-width:768px) 56vw, 100vw"}
              className="object-cover"
            />

            {exterior && (
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-x-3 bottom-3 flex min-h-11 items-center gap-2.5 rounded-full bg-paper/95 px-4 py-2.5 text-[14px] font-medium text-ink shadow-[0_10px_30px_-12px_rgba(21,34,61,0.5)] backdrop-blur transition-colors hover:bg-paper sm:inset-x-auto sm:left-4 sm:bottom-4"
              >
                <IconPin className="h-4 w-4 shrink-0 text-cobalt" />
                <span className="truncate">1 Prospect Pointe, Niagara Falls</span>
                <IconArrowUpRight className="ml-auto h-4 w-4 shrink-0 sm:ml-1" />
              </a>
            )}
          </div>
          {exterior && (
            <figcaption className="mt-3 text-[14px] text-stone">
              Inside Comfort Inn The Pointe · free parking on site
            </figcaption>
          )}
        </figure>

        <Reveal className={portrait ? "md:col-span-7" : "md:col-span-5"}>
          <p className="eyebrow">Our story</p>
          <h2
            id="about-teaser-heading"
            className="mt-4 font-display text-[clamp(2.1rem,3.6vw,3.25rem)] leading-[1.05] text-ink"
          >
            Named after a small town in the mountains
          </h2>
          <p className="mt-5 max-w-lg text-[17px] leading-[1.65] text-stone sm:text-[18px]">
            Lukla is a mountainside town in eastern Nepal, and its airstrip is
            where most treks to Everest begin. We named our kitchen after it,
            and cook Himalayan and South Indian food side by side.
          </p>
          <Link href="/about" className="btn btn-line mt-7">
            Read our story
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
