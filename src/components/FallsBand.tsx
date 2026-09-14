"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { images } from "@/lib/images";
import { MAPS_URL } from "@/lib/menu-data";
import { useMediaQuery } from "@/lib/use-media-query";
import { IconArrowUpRight } from "./icons";
import { Reveal } from "./Reveal";

export function FallsBand() {
  const band = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({
    target: band,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  // The photo drifts behind its frame; phones get a gentler drift to match the shorter frame.
  const drift = useTransform(
    progress,
    [0, 1],
    reduce ? ["0%", "0%"] : wide ? ["-18%", "18%"] : ["-8%", "8%"],
  );
  const photoScale = useTransform(progress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.12, 1.05, 1.12]);

  // Only the floating card on wider screens moves against the photo.
  const cardY = useTransform(progress, [0, 1], reduce || !wide ? [0, 0] : [45, -45]);

  return (
    <section
      ref={band}
      aria-labelledby="falls-heading"
      className="relative isolate overflow-hidden pb-[clamp(3.5rem,8vw,5rem)] md:flex md:min-h-[82svh] md:items-center md:py-28"
    >
      {/* Phones: the photo gets its own full-width frame and the words sit beneath it.
          Tablets and up: it fills the band behind a frosted card. */}
      <div className="relative -z-10 h-[56svh] max-h-[560px] min-h-[340px] overflow-hidden md:absolute md:inset-0 md:h-auto md:max-h-none md:min-h-0">
        <motion.div
          style={{ y: drift, scale: photoScale }}
          className="absolute inset-x-0 -inset-y-[22%]"
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
          className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-paper to-transparent md:h-[35%] md:via-paper/70"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-paper to-transparent md:h-36"
        />
      </div>

      <div className="relative mx-auto -mt-8 w-full max-w-[1240px] px-6 md:mt-0 lg:px-10">
        <motion.div style={{ y: cardY }} className="md:max-w-lg">
          {/* On wider screens a frosted panel keeps the text readable over any part of the photo. */}
          <Reveal className="md:rounded-[28px] md:border md:border-white/60 md:bg-paper/80 md:p-10 md:shadow-[0_30px_60px_-40px_rgba(21,34,61,0.6)] md:backdrop-blur-md">
            <p className="eyebrow text-cobalt">Niagara Falls, New York</p>
            <h2
              id="falls-heading"
              className="mt-4 font-display text-[clamp(2.3rem,4.6vw,3.9rem)] leading-[1.03] text-ink"
            >
              Three minutes from the Falls
            </h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-ink/80 md:mt-5 md:text-[18px]">
              Spend the afternoon by the water, then come up the road for momos
              and a cup of chai.
            </p>
            <div className="mt-7 md:mt-8">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid"
              >
                Get directions
                <IconArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
