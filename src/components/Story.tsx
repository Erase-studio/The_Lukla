"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { images } from "@/lib/images";
import { BRAND_LINE, CUISINES } from "@/lib/menu-data";
import { Reveal } from "./Reveal";

export function Story() {
  const section = useRef<HTMLElement>(null);
  const still = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const imageY = useTransform(progress, [0, 1], still ? ["0%", "0%"] : ["-16%", "16%"]);
  const imageScale = useTransform(progress, [0, 0.5, 1], still ? [1, 1, 1] : [1.12, 1.04, 1.12]);

  return (
    <section ref={section} id="story" aria-labelledby="story-heading" className="section-y overflow-hidden">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-10 lg:gap-16 lg:px-10">
        {/* The photo stays in view with internal parallax while the story beside it scrolls. */}
        <div className="md:col-span-5">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px] overflow-hidden rounded-[28px] bg-wash shadow-[0_24px_48px_-20px_rgba(21,34,61,0.22)] md:sticky md:top-28 md:aspect-[4/5]">
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="absolute -inset-y-[18%] inset-x-0 h-[136%] w-full"
            >
              <Image
                src={images.spices}
                alt="Whole spices: cinnamon, cardamom, peppercorns, cumin and dried chillies"
                fill
                sizes="(min-width:768px) 460px, 90vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h2
              id="story-heading"
              className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] text-ink"
            >
              Named after a small town in the mountains
            </h2>
            <p className="mt-7 max-w-lg text-[18px] leading-[1.65] text-stone">
              Lukla is a mountainside town in eastern Nepal, and its airstrip is
              where most treks to Everest begin. We named our kitchen after it,
              and cook two cuisines side by side.
            </p>
          </Reveal>

          <div className="mt-10 grid max-w-lg grid-cols-2 gap-6 border-t border-line pt-8">
            {CUISINES.map((cuisine) => (
              <div key={cuisine.name}>
                <h3 className="eyebrow text-cobalt">{cuisine.name}</h3>
                <ul className="mt-4 space-y-1 font-display text-[1.6rem] leading-snug text-ink">
                  {cuisine.dishes.map((dish) => (
                    <li key={dish}>{dish}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[15px] text-stone">Vegan and Jain plates on request.</p>

          <p className="mt-10 max-w-lg font-display text-[clamp(1.75rem,2.8vw,2.25rem)] leading-[1.15] text-ink">
            {BRAND_LINE}
          </p>
        </div>
      </div>
    </section>
  );
}
