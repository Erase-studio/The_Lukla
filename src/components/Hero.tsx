"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { MAPS_URL } from "@/lib/menu-data";
import type { Plate, PlateSlot } from "@/lib/local-photos";
import { IconArrowUpRight } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;
const HEADLINE = ["Food from", "the Himalayas"];
// Where each of the restaurant's own plates sits around the headline, cropped by the card edge.
const SLOTS: Record<
  PlateSlot,
  { box: string; turn: [number, number]; alt: string; delay: number }
> = {
  momo: {
    box: "left-[-5%] top-[5%] w-[22%] lg:w-[19%]",
    turn: [0, -50],
    alt: "Steamed momos",
    delay: 0.75,
  },
  dosa: {
    box: "right-[-6%] top-[2%] w-[24%] lg:w-[21%]",
    turn: [0, 40],
    alt: "Masala dosa with sambar and chutney",
    delay: 0.85,
  },
  biryani: {
    box: "bottom-[-9%] left-[3%] w-[22%] lg:w-[18%]",
    turn: [0, 60],
    alt: "Goat biryani",
    delay: 0.95,
  },
  chai: {
    box: "bottom-[7%] right-[5%] w-[14%] lg:w-[11%]",
    turn: [0, -70],
    alt: "Masala chai",
    delay: 1.05,
  },
};

function PlatePhoto({
  plate,
  progress,
  still,
}: {
  plate: Plate;
  progress: MotionValue<number>;
  still: boolean;
}) {
  const slot = SLOTS[plate.slot];
  const rotate = useTransform(progress, [0, 1], slot.turn);

  return (
    <motion.div
      style={{ rotate: still ? 0 : rotate }}
      // From md up: below 768px the corner plates would crowd the eyebrow line.
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
          sizes="(min-width:1024px) 22vw, 26vw"
          className={
            plate.cutout
              ? "object-contain drop-shadow-[0_24px_30px_rgba(21,34,61,0.25)]"
              : "rounded-full object-cover shadow-[0_28px_44px_-16px_rgba(21,34,61,0.5)]"
          }
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero({ plates }: { plates: Plate[] }) {
  const section = useRef<HTMLElement>(null);
  const still = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const thaliTurn = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const thaliSink = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const ridgeDrift = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={section} id="top" className="px-3 pt-[120px] sm:px-5 lg:pt-[140px]">
      {/* No fixed height: the card grows to fit the text plus the thali's own space, so the plate never covers the buttons. */}
      <div className="relative isolate mx-auto flex max-w-[1480px] flex-col overflow-hidden rounded-[36px] bg-wash">
        {/* Light through the skylights, as it falls on the dining-room wall. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-[30%] right-[14%] h-[110%] w-[16%] rotate-[30deg] bg-gradient-to-b from-white/75 via-white/25 to-transparent blur-2xl" />
          <div className="absolute -top-[30%] right-[34%] h-[100%] w-[7%] rotate-[30deg] bg-gradient-to-b from-white/60 via-white/15 to-transparent blur-xl" />
        </div>

        {/* A 3D render of the real Khumbu terrain from above Tengboche (AWS Terrain Tiles elevation data):
            Nuptse, Everest and Lhotse left of centre, Ama Dablam to the right. The sky is transparent. */}
        <motion.div
          style={{ y: still ? 0 : ridgeDrift }}
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 w-[290%] -translate-x-1/2 sm:w-[140%] lg:w-full"
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
              sizes="(min-width:1024px) 1480px, 200vw"
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pt-12 text-center sm:pt-16 lg:pt-[5svh]">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE }}
            className="eyebrow text-cobalt"
          >
            Himalayan &amp; South Indian kitchen · Niagara Falls, NY
          </motion.p>

          <h1 className="mt-5 font-display text-[clamp(3rem,min(8.4vw,11.5svh),6.75rem)] leading-[0.94] tracking-[-0.025em] text-ink">
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

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: EASE }}
            className="flex flex-col items-center"
          >
            <p className="mt-5 max-w-md text-[18px] leading-[1.55] text-stone">
              Momos and thukpa from Nepal, dosa and biryani from South India.
              Cooked to order, three minutes from the Falls.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#menu" className="btn btn-solid">
                See the menu
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-line bg-paper/50"
              >
                Get directions
                <IconArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {plates.map((plate) => (
          <PlatePhoto
            key={plate.slot}
            plate={plate}
            progress={scrollYProgress}
            still={still}
          />
        ))}

        {/* The thali's own strip below the buttons. It rises from the bottom edge like the sun over the ridge,
            and its height follows the screen height so the plate still shows on short laptop screens. */}
        <div className="relative mt-8 h-[clamp(190px,27svh,330px)] shrink-0">
          <motion.div
            style={{ rotate: still ? 0 : thaliTurn, y: still ? 0 : thaliSink }}
            className="absolute left-1/2 top-0 aspect-square h-[150%] -translate-x-1/2 sm:h-[175%]"
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
                sizes="(min-width:1024px) 580px, 90vw"
                className="object-contain drop-shadow-[0_30px_40px_rgba(21,34,61,0.3)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-3 sm:px-5 lg:px-10">
        <dl className="mt-10 grid grid-cols-1 gap-6 border-b border-line pb-10 text-[16px] sm:grid-cols-3">
          <div>
            <dt className="eyebrow">Google rating</dt>
            <dd className="tnum mt-2 text-ink">4.3 from 566 reviews</dd>
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
