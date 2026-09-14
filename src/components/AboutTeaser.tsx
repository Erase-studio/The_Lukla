"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { images } from "@/lib/images";
import { IconArrowRight } from "./icons";
import { Reveal } from "./Reveal";

export function AboutTeaser() {
  const section = useRef<HTMLElement>(null);
  const still = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  // Parallax: image drifts smoothly inside the arch window as the section scrolls
  const imageY = useTransform(progress, [0, 1], still ? ["0%", "0%"] : ["-14%", "14%"]);
  const imageScale = useTransform(progress, [0, 0.5, 1], still ? [1, 1, 1] : [1.12, 1.04, 1.12]);
  const textY = useTransform(progress, [0, 1], still ? [0, 0] : [25, -25]);

  return (
    <section ref={section} aria-labelledby="about-teaser-heading" className="section-y overflow-hidden">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:gap-10 lg:gap-16 lg:px-10">
        <div className="md:col-span-5">
          {/* Arched image container with parallax window */}
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[440px] overflow-hidden rounded-t-full bg-wash shadow-[0_24px_48px_-20px_rgba(21,34,61,0.22)] md:aspect-[4/5]">
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="absolute -inset-y-[15%] inset-x-0 h-[130%] w-full"
            >
              <Image
                src={images.spices}
                alt="Whole spices: cinnamon, cardamom, peppercorns, cumin and dried chillies"
                fill
                sizes="(min-width:768px) 440px, 90vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        <motion.div style={{ y: textY }} className="md:col-span-7 lg:col-span-6 lg:col-start-7">
          <Reveal>
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
        </motion.div>
      </div>
    </section>
  );
}
