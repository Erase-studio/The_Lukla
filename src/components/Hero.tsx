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
import { IconArrowRight, IconArrowUpRight } from "./icons";
import { SkylightGlow } from "./SkylightGlow";

const EASE = [0.22, 1, 0.36, 1] as const;
const HEADLINE = ["Food from", "the Himalayas"];

// The Khumbu render split by distance from the camera (near, mid, far), all in one 2400×588 frame.
// Farther layers lag further behind the scroll, which reads as depth.
const RANGE_LAYERS = [
  { src: "/range-far.webp", lag: 18 },
  { src: "/range-mid.webp", lag: 9 },
  { src: "/range-near.webp", lag: 3 },
];

// The two supporting plates: small, at the edges of the thali, each on its own slow path.
const SATELLITES = [
  {
    name: "dosa",
    box: "right-[-2%] top-[-4%] w-[15%]",
    rotate: 26,
    y: 40,
    alt: "Masala dosa with sambar and coconut chutney",
    delay: 0.9,
  },
  {
    name: "momo",
    box: "bottom-[7%] right-[41%] w-[12%]",
    rotate: -34,
    y: -36,
    alt: "Momos with tomato achar",
    delay: 1.05,
  },
];

type Progress = { progress: MotionValue<number>; amplitude: MotionValue<number> };

function useScaled({ progress, amplitude }: Progress, to: number) {
  return useTransform([progress, amplitude], ([p, a]: number[]) => p * a * to);
}

function usePercent({ progress, amplitude }: Progress, to: number) {
  return useTransform([progress, amplitude], ([p, a]: number[]) => `${p * a * to}%`);
}

function RangeLayer({ src, lag, motionInput }: { src: string; lag: number; motionInput: Progress }) {
  const y = usePercent(motionInput, lag);
  return (
    <motion.div style={{ y }} className="absolute inset-x-0 bottom-0">
      <Image
        src={src}
        alt=""
        width={2400}
        height={588}
        loading="eager"
        sizes="(min-width:1024px) 1480px, 140vw"
        className="h-auto w-full"
      />
    </motion.div>
  );
}

function Satellite({
  plate,
  slot,
  motionInput,
}: {
  plate: Plate;
  slot: (typeof SATELLITES)[number];
  motionInput: Progress;
}) {
  const rotate = useScaled(motionInput, slot.rotate);
  const y = useScaled(motionInput, slot.y);

  return (
    <motion.div
      style={{ rotate, y }}
      className={`pointer-events-none absolute hidden aspect-square lg:block ${slot.box}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, delay: slot.delay, ease: EASE }}
        className="relative h-full w-full"
      >
        <Image
          src={plate.src}
          alt={slot.alt}
          fill
          sizes="15vw"
          className="object-contain drop-shadow-[0_20px_24px_rgba(21,34,61,0.24)]"
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero({ plates }: { plates: Record<string, Plate> }) {
  const section = useRef<HTMLElement>(null);
  const still = Boolean(useReducedMotion());
  const amplitude = useMotionAmplitude(still);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  // Tied to scroll position: scroll back and everything returns. The spring only smooths the steps.
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  const motionInput = { progress, amplitude };

  // The thali is the one hero dish: a slow clockwise turn, about 40° across the whole hero.
  const thaliRotate = useScaled(motionInput, 40);
  const thaliY = usePercent(motionInput, 6);

  return (
    <section ref={section} id="top" className="px-3 pt-[120px] sm:px-5 lg:pt-[140px]">
      <div className="relative isolate mx-auto max-w-[1480px] overflow-hidden rounded-[36px] bg-wash md:min-h-[min(780px,calc(100svh-170px))]">
        <SkylightGlow />

        <motion.div
          aria-hidden
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.1, ease: EASE }}
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 hidden md:block"
        >
          <div className="relative left-1/2 aspect-[2400/588] w-[140%] -translate-x-1/2 lg:w-full">
            {RANGE_LAYERS.map((layer) => (
              <RangeLayer key={layer.src} src={layer.src} lag={layer.lag} motionInput={motionInput} />
            ))}
          </div>
        </motion.div>

        <div className="relative z-10 mx-auto max-w-[1240px] px-6 pt-10 sm:pt-14 md:pb-[clamp(260px,36vw,380px)] lg:px-10 lg:pb-28 lg:pt-[clamp(3.5rem,9svh,6.5rem)]">
          <div className="text-center md:max-w-[36rem] md:text-left lg:max-w-[676px]">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: EASE }}
              className="eyebrow text-cobalt"
            >
              Himalayan × South Indian · Niagara Falls, NY
            </motion.p>

            <h1 className="mt-5 font-display text-[clamp(2.9rem,min(7.4vw,12svh),6.5rem)] leading-[0.92] tracking-[-0.025em] text-ink">
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
            <div className="relative mx-auto mt-3 aspect-[5/4] w-full max-w-[380px] md:hidden">
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
                style={{ rotate: thaliRotate }}
                className="absolute left-1/2 top-[4%] aspect-square w-[72%] -translate-x-1/2"
              >
                <motion.div
                  initial={{ opacity: 0, y: "20%", rotate: -40 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
                  className="relative h-full w-full"
                >
                  <Image
                    src="/thali-plate.webp"
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
            >
              <p className="mx-auto mt-6 hidden max-w-md text-[19px] leading-[1.55] text-stone md:mx-0 md:block">
                From the mountains of Nepal to Niagara Falls: momos, dosa and
                biryani, cooked to order three minutes from the Falls.
              </p>
              <p className="text-[15px] font-semibold uppercase tracking-[0.14em] text-ink md:hidden">
                Momo · Thukpa · Dosa · Biryani
              </p>
              <p className="mt-2 text-[16px] text-stone md:hidden">
                Made to order, three minutes from the Falls.
              </p>

              {/* One clear primary action; directions is the quieter second choice. */}
              <div className="mx-auto mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center md:justify-start">
                <Link href="/menu" className="group btn btn-solid h-14 justify-center px-7 text-[16px]">
                  Explore the menu
                  <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-line h-14 justify-center bg-paper/50 px-7 text-[16px]"
                >
                  Get directions
                  <IconArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <div
                aria-hidden
                className="mt-14 hidden items-center gap-3 text-[13px] font-medium uppercase tracking-[0.16em] text-stone lg:flex"
              >
                <span className="scroll-cue relative h-10 w-px overflow-hidden bg-ink/15" />
                Scroll
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tablet and desktop: the thali is the one hero dish, large and breaking out of the card's edge. */}
        <motion.div
          style={{ y: thaliY }}
          className="pointer-events-none absolute hidden aspect-square md:bottom-[-34%] md:right-[-8%] md:block md:w-[64%] lg:bottom-auto lg:right-[-7%] lg:top-[3%] lg:w-[46%]"
        >
          {/* A round plate casts a round shadow, so it stays put while the plate turns above it.
              A blurred shape here is also far cheaper than a drop-shadow filter on a rotating image. */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.6, ease: EASE }}
            className="absolute inset-[10%] translate-y-[7%] rounded-full bg-ink/30 blur-[48px]"
          />
          <motion.div style={{ rotate: thaliRotate }} className="relative h-full w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.8, delay: 0.35, ease: EASE }}
              className="relative h-full w-full"
            >
              <Image
                src="/thali-plate.webp"
                alt="A thali with rice, dal, curries and raita"
                fill
                preload
                sizes="(min-width:1024px) 46vw, 64vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {SATELLITES.map((slot) => {
          const plate = plates[slot.name];
          return plate ? (
            <Satellite key={slot.name} plate={plate} slot={slot} motionInput={motionInput} />
          ) : null;
        })}
      </div>

      <div className="mx-auto max-w-[1240px] px-3 sm:px-5 lg:px-10">
        <dl className="mt-8 grid grid-cols-1 gap-6 border-b border-line pb-10 text-[16px] sm:grid-cols-3">
          <div>
            <dt className="eyebrow">Google rating</dt>
            <dd className="tnum mt-2 text-ink">
              {GOOGLE_RATING.toFixed(1)} from {GOOGLE_REVIEW_COUNT} reviews
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
