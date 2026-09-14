"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, MAPS_URL } from "@/lib/menu-data";
import type { Plate } from "@/lib/local-photos";
import { useMotionAmplitude } from "@/lib/use-motion-amplitude";
import { IconArrowUpRight } from "./icons";
import { SkylightGlow } from "./SkylightGlow";

const EASE = [0.22, 1, 0.36, 1] as const;
const HEADLINE = ["Food from", "the Himalayas"];

type Drift = { rotate: number; x: number; y: number };

// Each plate drifts on its own path and at its own rate, so scrolling reads as depth
// rather than one dial turning everything. Values are what a plate reaches by the end of the hero.
const SLOTS: { name: string; box: string; drift: Drift; alt: string; delay: number }[] = [
  {
    name: "momo",
    box: "left-[-3%] top-[7%] w-[17%] lg:w-[14%]",
    drift: { rotate: -65, x: -30, y: -50 },
    alt: "Momos with tomato achar",
    delay: 0.8,
  },
  {
    name: "dosa",
    box: "right-[-3%] top-[5%] w-[18%] lg:w-[15%]",
    drift: { rotate: 75, x: 26, y: -36 },
    alt: "Masala dosa with sambar and coconut chutney",
    delay: 0.9,
  },
  {
    name: "biryani",
    box: "bottom-[-7%] left-[4%] w-[19%] lg:w-[16%]",
    drift: { rotate: 85, x: -22, y: 48 },
    alt: "Biryani in a clay bowl",
    delay: 1,
  },
  {
    name: "chai",
    box: "bottom-[9%] right-[6%] w-[12%] lg:w-[9.5%]",
    drift: { rotate: -50, x: 16, y: 22 },
    alt: "A cup of tea on a saucer",
    delay: 1.1,
  },
];

function useScaled(progress: MotionValue<number>, amplitude: MotionValue<number>, to: number) {
  return useTransform([progress, amplitude], ([p, a]: number[]) => p * a * to);
}

function FloatingPlate({
  plate,
  slot,
  progress,
  amplitude,
}: {
  plate: Plate;
  slot: (typeof SLOTS)[number];
  progress: MotionValue<number>;
  amplitude: MotionValue<number>;
}) {
  const rotate = useScaled(progress, amplitude, slot.drift.rotate);
  const x = useScaled(progress, amplitude, slot.drift.x);
  const y = useScaled(progress, amplitude, slot.drift.y);

  return (
    <motion.div
      style={{ rotate, x, y }}
      className={`absolute hidden aspect-square md:block ${slot.box}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: slot.delay, ease: EASE }}
        className="relative h-full w-full"
      >
        <Image
          src={plate.src}
          alt={slot.alt}
          fill
          sizes="(min-width:1024px) 16vw, 19vw"
          className="object-contain drop-shadow-[0_22px_26px_rgba(21,34,61,0.26)]"
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero({
  plates,
  rating = GOOGLE_RATING,
  userRatingCount = GOOGLE_REVIEW_COUNT,
}: {
  plates: Record<string, Plate>;
  rating?: number;
  userRatingCount?: number;
}) {
  const section = useRef<HTMLElement>(null);
  const still = Boolean(useReducedMotion());
  const amplitude = useMotionAmplitude(still);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  // Fluid, responsive spring: low mass and tuned damping track the wheel/touch smoothly with zero sluggish drag.
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 });

  // The thali turns gracefully with scroll, giving a tactile, satisfying rotation.
  const thaliRotate = useTransform([progress, amplitude], ([p, a]: number[]) => p * a * 75);
  const thaliScale = useTransform([progress, amplitude], ([p, a]: number[]) => 1 + p * a * 0.08);
  const thaliY = useTransform([progress, amplitude], ([p, a]: number[]) => `${p * a * 12}%`);
  const ridgeY = useTransform([progress, amplitude], ([p, a]: number[]) => `${p * a * 14}%`);

  return (
    <section ref={section} id="top" className="px-3 pt-[120px] sm:px-5 lg:pt-[140px]">
      <div className="relative isolate mx-auto flex max-w-[1480px] flex-col overflow-hidden rounded-[36px] bg-wash">
        <SkylightGlow />

        {/* A 3D render of the real Khumbu terrain from above Tengboche (AWS Terrain Tiles elevation data):
            Nuptse, Everest and Lhotse left of centre, Ama Dablam to the right. The sky is transparent. */}
        <motion.div
          style={{ y: ridgeY }}
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 hidden w-[140%] -translate-x-1/2 md:block lg:w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.15, ease: EASE }}
          >
            <Image
              src="/himalaya-range.webp"
              alt=""
              width={2400}
              height={588}
              loading="eager"
              sizes="(min-width:1024px) 1480px, 140vw"
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-5 pt-10 text-center sm:px-6 sm:pt-16 lg:pt-[5svh]">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE }}
            className="eyebrow text-cobalt"
          >
            Himalayan &amp; South Indian kitchen · Niagara Falls, NY
          </motion.p>

          <h1 className="mt-5 font-display text-[clamp(2.9rem,min(8.4vw,11.5svh),6.75rem)] leading-[0.94] tracking-[-0.025em] text-ink">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Phones get their own composition: the plate right under the headline, set on the ridge. */}
          <div className="relative mt-3 aspect-[5/4] w-full max-w-[380px] md:hidden">
            <div className="pointer-events-none absolute bottom-[6%] left-1/2 w-[250%] -translate-x-1/2 [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]">
              <Image
                src="/himalaya-range.webp"
                alt=""
                width={2400}
                height={588}
                loading="eager"
                sizes="250vw"
                className="h-auto w-full"
              />
            </div>
            <motion.div
              style={{ rotate: thaliRotate, scale: thaliScale }}
              className="absolute left-1/2 top-[4%] aspect-square w-[72%] -translate-x-1/2"
            >
              <motion.div
                initial={{ opacity: 0, y: "20%", rotate: -40 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
                className="relative h-full w-full"
              >
                <Image
                  src="/thali-plate.png"
                  alt="A thali with rice, dal, curries and raita"
                  fill
                  loading="eager"
                  sizes="72vw"
                  className="object-contain drop-shadow-[0_24px_30px_rgba(21,34,61,0.3)]"
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: EASE }}
            className="flex w-full flex-col items-center"
          >
            <p className="mt-5 max-w-md text-center text-[16px] leading-[1.6] text-stone sm:text-[18px]">
              Momos and thukpa from Nepal, dosa and biryani from South India.
              Cooked to order, three minutes from the Falls.
            </p>
            <div className="mt-7 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center md:mt-8">
              <Link href="/menu" className="btn btn-solid justify-center">
                See the menu
              </Link>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-line justify-center bg-paper/50"
              >
                Get directions
                <IconArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {SLOTS.map((slot) => {
          const plate = plates[slot.name];
          return plate ? (
            <FloatingPlate
              key={slot.name}
              plate={plate}
              slot={slot}
              progress={progress}
              amplitude={amplitude}
            />
          ) : null;
        })}

        {/* Tablet and desktop: the thali rises from the bottom edge like the sun over the ridge.
            Its strip grows with screen height so the plate still shows on short laptop screens. */}
        <div className="relative mt-8 hidden h-[clamp(190px,27svh,330px)] shrink-0 md:block">
          <motion.div
            style={{ rotate: thaliRotate, scale: thaliScale, y: thaliY }}
            className="absolute left-1/2 top-0 aspect-square h-[175%] -translate-x-1/2"
          >
            <motion.div
              initial={{ opacity: 0, y: "30%", rotate: -40 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.8, delay: 0.4, ease: EASE }}
              className="relative h-full w-full"
            >
              <Image
                src="/thali-plate.png"
                alt="A thali with rice, dal, curries and raita"
                fill
                preload
                sizes="(min-width:1024px) 580px, 50vw"
                className="object-contain drop-shadow-[0_30px_40px_rgba(21,34,61,0.3)]"
              />
            </motion.div>
          </motion.div>
        </div>
        <div aria-hidden className="h-8 md:hidden" />
      </div>

      <div className="mx-auto max-w-[1240px] px-3 sm:px-5 lg:px-10">
        <dl className="mt-8 grid grid-cols-1 gap-6 border-b border-line pb-10 text-[16px] sm:grid-cols-3">
          <div>
            <dt className="eyebrow">Google rating</dt>
            <dd className="tnum mt-2 text-ink">
              {rating.toFixed(1)} from {userRatingCount.toLocaleString()} reviews
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Open</dt>
            <dd className="mt-2 text-ink">Every day, breakfast to late dinner</dd>
          </div>
          <div>
            <dt className="eyebrow">Find us</dt>
            <dd className="mt-2 text-ink">1 Prospect Pointe, Niagara Falls</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
