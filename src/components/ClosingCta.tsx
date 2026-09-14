"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";

export const darkPrimary = "btn bg-paper text-ink hover:bg-wall";
export const darkSecondary = "btn border border-paper/25 hover:border-paper";

// The navy card that closes a page and points to the next thing to do.
export function ClosingCta({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  const section = useRef<HTMLElement>(null);
  const still = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const mountainY = useTransform(progress, [0, 1], still ? ["0%", "0%"] : ["-18%", "18%"]);
  const mountainScale = useTransform(progress, [0, 0.5, 1], still ? [1, 1, 1] : [1.08, 1.02, 1.08]);

  return (
    <section ref={section} aria-labelledby="closing-heading" className="px-3 sm:px-5">
      <div className="relative isolate mx-auto max-w-[1480px] overflow-hidden rounded-[36px] bg-ink px-6 py-16 text-paper sm:px-12 sm:py-20 lg:px-16">
        {/* Parallax mountain horizon watermark in the dark background */}
        <motion.div
          style={{ y: mountainY, scale: mountainScale }}
          className="pointer-events-none absolute -bottom-[10%] left-1/2 -z-10 w-[160%] -translate-x-1/2 opacity-[0.07] invert lg:w-full"
        >
          <Image
            src="/himalaya-range.webp"
            alt=""
            width={2400}
            height={588}
            className="h-auto w-full"
          />
        </motion.div>

        <Reveal className="mx-auto flex max-w-[1160px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-paper/65">{eyebrow}</p>
            <h2
              id="closing-heading"
              className="mt-5 max-w-2xl font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05]"
            >
              {title}
            </h2>
            <p className="mt-5 max-w-lg text-[18px] leading-[1.6] text-paper/75">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
