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
import { IconArrowUpRight } from "./icons";
import { Reveal } from "./Reveal";

export function FallsBand() {
  const band = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: band,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  // Deep background parallax: Horseshoe Falls image drifts across the viewport
  const drift = useTransform(progress, [0, 1], reduce ? ["0%", "0%"] : ["-18%", "18%"]);
  const photoScale = useTransform(progress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.12, 1.05, 1.12]);

  // Foreground frosted card counter-parallax
  const cardY = useTransform(progress, [0, 1], reduce ? [0, 0] : [45, -45]);

  return (
    <section
      ref={band}
      aria-labelledby="falls-heading"
      className="relative isolate flex min-h-[82svh] items-center overflow-hidden py-28"
    >
      <motion.div
        style={{ y: drift, scale: photoScale }}
        className="absolute inset-x-0 -inset-y-[22%] -z-10"
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
        className="absolute inset-x-0 top-0 -z-10 h-[35%] bg-gradient-to-b from-paper via-paper/70 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-paper to-transparent"
      />

      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        <motion.div style={{ y: cardY }} className="max-w-lg">
          {/* A frosted panel guarantees contrast whatever part of the photo sits behind the text. */}
          <Reveal className="rounded-[28px] border border-white/60 bg-paper/80 p-7 shadow-[0_30px_60px_-40px_rgba(21,34,61,0.6)] backdrop-blur-md sm:p-10">
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
            <div className="mt-8">
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
