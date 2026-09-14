"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { images } from "@/lib/images";
import { MAPS_URL, PHONE_HREF } from "@/lib/menu-data";
import { IconArrowUpRight, IconPhone } from "./icons";
import { Reveal } from "./Reveal";

// Full-bleed and cinematic: the place, then the reason to come. A navy gradient behind the
// text guarantees contrast whatever part of the spray is behind it.
export function FallsBand() {
  const band = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: band,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={band}
      aria-labelledby="falls-heading"
      className="relative isolate flex min-h-[82svh] items-end overflow-hidden text-paper"
    >
      <motion.div
        style={{ y: reduce ? 0 : drift }}
        className="absolute inset-x-0 -inset-y-[8%] -z-10"
      >
        <Image
          src={images.falls}
          alt="The Maid of the Mist boat in the spray below Horseshoe Falls"
          fill
          sizes="100vw"
          className="object-cover object-[60%_center]"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/5"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 w-full bg-gradient-to-r from-ink/75 via-ink/25 to-transparent md:w-3/4"
      />

      <div className="mx-auto w-full max-w-[1240px] px-6 pb-16 pt-44 sm:pb-24 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-[16px] font-medium text-paper/85">Visiting Niagara Falls?</p>
          <h2
            id="falls-heading"
            className="mt-4 font-display text-[clamp(2.8rem,6.4vw,5.5rem)] leading-[0.98] tracking-[-0.02em]"
          >
            Three minutes from the Falls.
          </h2>
          <p className="mt-6 max-w-md text-[19px] leading-[1.55] text-paper/85">
            Come for the view. Stay for the momos and a cup of chai.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn h-14 bg-paper px-7 text-[16px] text-ink hover:bg-wall"
            >
              Get directions
              <IconArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={PHONE_HREF}
              className="btn h-14 gap-2.5 border border-paper/35 px-7 text-[16px] hover:border-paper"
            >
              <IconPhone className="h-4 w-4" />
              Call to order
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
