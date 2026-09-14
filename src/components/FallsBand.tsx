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
import { MAPS_URL } from "@/lib/menu-data";
import { IconArrowUpRight } from "./icons";
import { Reveal } from "./Reveal";

export function FallsBand() {
  const band = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: band,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={band}
      aria-labelledby="falls-heading"
      className="relative isolate flex min-h-[92svh] items-start overflow-hidden"
    >
      <motion.div
        style={{ y: reduce ? 0 : drift }}
        className="absolute inset-x-0 -inset-y-[10%] -z-10"
      >
        <Image
          src={images.falls}
          alt="The Maid of the Mist boat in the spray below Horseshoe Falls"
          fill
          sizes="100vw"
          className="object-cover object-[60%_center]"
        />
      </motion.div>

      {/* The page dissolves into the spray at the top and settles back at the bottom. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[45%] bg-gradient-to-b from-paper via-paper/70 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 w-full bg-gradient-to-r from-paper/80 via-paper/30 to-transparent md:w-2/3"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-paper to-transparent"
      />

      <div className="mx-auto w-full max-w-[1240px] px-6 pt-28 sm:pt-36 lg:px-10">
        <Reveal className="max-w-md">
          <p className="eyebrow text-ink/70">Niagara Falls, New York</p>
          <h2
            id="falls-heading"
            className="mt-5 font-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.02] text-ink"
          >
            Three minutes from the Falls
          </h2>
          <p className="mt-6 text-[18px] leading-[1.6] text-ink/80">
            Spend the afternoon by the water, then come up the road for momos
            and a cup of chai.
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid mt-9"
          >
            Get directions
            <IconArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
