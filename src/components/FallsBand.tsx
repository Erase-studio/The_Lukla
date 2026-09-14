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
      className="relative isolate flex min-h-[78svh] items-center overflow-hidden py-24"
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

      {/* The page dissolves into the spray at the top and settles back at the bottom. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[30%] bg-gradient-to-b from-paper via-paper/60 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-paper to-transparent"
      />

      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        {/* A frosted panel guarantees contrast whatever part of the photo sits behind the text. */}
        <Reveal className="max-w-lg rounded-[28px] border border-white/60 bg-paper/75 p-7 shadow-[0_30px_60px_-40px_rgba(21,34,61,0.6)] backdrop-blur-md sm:p-10">
          <p className="eyebrow text-cobalt">Niagara Falls, New York</p>
          <h2
            id="falls-heading"
            className="mt-4 font-display text-[clamp(2.3rem,4.6vw,3.9rem)] leading-[1.03] text-ink"
          >
            Three minutes from the Falls
          </h2>
          <p className="mt-5 text-[18px] leading-[1.6] text-ink/80">
            Spend the afternoon by the water, then come up the road for momos
            and a cup of chai.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-ink/75">
            {["Free parking on site", "Takeout and curbside pickup"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cobalt" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid"
            >
              Get directions
              <IconArrowUpRight className="h-4 w-4" />
            </a>
            <a href={PHONE_HREF} className="btn btn-line gap-2.5">
              <IconPhone className="h-4 w-4" />
              Call to order
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
