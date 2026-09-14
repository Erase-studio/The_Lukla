"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
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

type Slot = {
  name: string;
  title: string;
  cuisine: string;
  notes: string;
  href: string;
  box: string;
  drift: Drift;
  alt: string;
  delay: number;
};

// Each plate drifts with scroll parallax and has an interactive sensory flavor badge on hover
const SLOTS: Slot[] = [
  {
    name: "momo",
    title: "Chicken Jhol Momo",
    cuisine: "Himalayan",
    notes: "Sesame & roasted tomato achar",
    href: "/menu#momos",
    box: "left-[-3%] top-[7%] w-[17%] lg:w-[14%]",
    drift: { rotate: -125, x: -55, y: -85 },
    alt: "Momos with tomato achar",
    delay: 0.8,
  },
  {
    name: "dosa",
    title: "Masala Dosa",
    cuisine: "South Indian",
    notes: "Crisp crepe, spiced potato, sambar",
    href: "/menu#dosa-idli",
    box: "right-[-3%] top-[5%] w-[18%] lg:w-[15%]",
    drift: { rotate: 135, x: 50, y: -70 },
    alt: "Masala dosa with sambar and coconut chutney",
    delay: 0.9,
  },
  {
    name: "biryani",
    title: "Goat Biryani",
    cuisine: "South Indian",
    notes: "Aged basmati, whole spices & saffron",
    href: "/menu#biryani-rice",
    box: "bottom-[-7%] left-[4%] w-[19%] lg:w-[16%]",
    drift: { rotate: 145, x: -45, y: 80 },
    alt: "Biryani in a clay bowl",
    delay: 1,
  },
  {
    name: "chai",
    title: "Masala Chai",
    cuisine: "Himalayan",
    notes: "Fresh ginger, cloves & green cardamom",
    href: "/menu",
    box: "bottom-[9%] right-[6%] w-[12%] lg:w-[9.5%]",
    drift: { rotate: -115, x: 38, y: 55 },
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
  slot: Slot;
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
      <Link
        href={slot.href}
        className="group/plate relative block h-full w-full focus:outline-none"
        aria-label={`View ${slot.title} on menu`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: slot.delay, ease: EASE }}
          className="relative h-full w-full transition-transform duration-500 ease-soft group-hover/plate:scale-[1.08]"
        >
          {/* Warm culinary ambient glow on hover */}
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-saffron/0 blur-xl transition duration-500 group-hover/plate:bg-saffron/20"
          />

          <Image
            src={plate.src}
            alt={slot.alt}
            fill
            sizes="(min-width:1024px) 16vw, 19vw"
            className="object-contain drop-shadow-[0_22px_26px_rgba(21,34,61,0.26)]"
          />

          {/* Interactive glassmorphic flavor badge */}
          <div className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/70 bg-paper/95 px-3.5 py-1 text-center shadow-[0_12px_24px_-8px_rgba(21,34,61,0.3)] backdrop-blur-md opacity-0 translate-y-2 transition-all duration-300 ease-soft group-hover/plate:opacity-100 group-hover/plate:translate-y-0 group-focus-visible/plate:opacity-100 group-focus-visible/plate:translate-y-0">
            <span className="block text-[12px] font-bold text-ink">
              {slot.title}
            </span>
            <span className="block text-[10.5px] font-medium text-stone">
              {slot.notes}
            </span>
          </div>
        </motion.div>
      </Link>
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
  const cardRef = useRef<HTMLDivElement>(null);
  const still = Boolean(useReducedMotion());
  const amplitude = useMotionAmplitude(still);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });

  // Fluid, responsive spring: low mass and tuned damping track the wheel/touch smoothly with zero sluggish drag.
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 });

  // Mouse-movement 3D gyro tilt for desktop interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 100, damping: 22, mass: 0.2 });
  const springMouseY = useSpring(mouseY, { stiffness: 100, damping: 22, mass: 0.2 });

  const cardRotateX = useTransform(springMouseY, [-0.5, 0.5], still ? [0, 0] : [2, -2]);
  const cardRotateY = useTransform(springMouseX, [-0.5, 0.5], still ? [0, 0] : [-2.5, 2.5]);
  const mouseParallaxRidgeX = useTransform(springMouseX, [-0.5, 0.5], still ? [0, 0] : [-16, 16]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (still || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // The thali turns boldly with scroll, giving a tactile, satisfying rotation.
  const thaliRotate = useTransform([progress, amplitude], ([p, a]: number[]) => p * a * 135);
  const thaliScale = useTransform([progress, amplitude], ([p, a]: number[]) => 1 + p * a * 0.12);
  const thaliY = useTransform([progress, amplitude], ([p, a]: number[]) => p * a * 45);

  // The mountains have a deep, unmistakable vertical drift & scale parallax
  const ridgeY = useTransform([progress, amplitude], ([p, a]: number[]) => p * a * 160);
  const ridgeScale = useTransform([progress, amplitude], ([p, a]: number[]) => 1 + p * a * 0.08);
  const ridgeYMobile = useTransform([progress, amplitude], ([p, a]: number[]) => p * a * 65);

  // Foreground text lifts slightly, amplifying the multi-plane 3D depth
  const textY = useTransform([progress, amplitude], ([p, a]: number[]) => p * a * -35);

  return (
    <section ref={section} id="top" className="px-3 pt-[120px] sm:px-5 lg:pt-[140px]">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: cardRotateX,
          rotateY: cardRotateY,
          transformPerspective: 1200,
        }}
        className="relative isolate mx-auto flex max-w-[1480px] flex-col overflow-hidden rounded-[36px] bg-wash transition-shadow duration-500 hover:shadow-[0_40px_80px_-30px_rgba(21,34,61,0.3)]"
      >
        <SkylightGlow />

        {/* A 3D render of the real Khumbu terrain from above Tengboche (AWS Terrain Tiles elevation data):
            Nuptse, Everest and Lhotse left of centre, Ama Dablam to the right. The sky is transparent. */}
        <motion.div
          style={{ y: ridgeY, scale: ridgeScale, x: mouseParallaxRidgeX }}
          className="pointer-events-none absolute bottom-[-40px] left-1/2 -z-10 hidden w-[140%] origin-bottom -translate-x-1/2 md:block lg:bottom-[-60px] lg:w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.15, ease: EASE }}
            className="relative w-full [mask-image:linear-gradient(to_bottom,#000_75%,transparent)]"
          >
            <Image
              src="/himalaya-range.webp"
              alt="Himalayan mountain ridge with Everest, Nuptse, Lhotse and Ama Dablam"
              width={2400}
              height={588}
              loading="eager"
              sizes="(min-width:1024px) 1480px, 140vw"
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: textY }}
          className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-5 pt-10 text-center sm:px-6 sm:pt-16 lg:pt-[5svh]"
        >
          {/* Origin Elevation Pill: connects the Himalayan mountain town with Niagara Falls */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-cobalt/20 bg-paper/85 px-4 py-1.5 shadow-[0_2px_10px_rgba(21,34,61,0.06)] backdrop-blur-md"
          >
            <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cobalt">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Lukla 2,860m
            </span>
            <span aria-hidden className="text-ink/30">·</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/80">
              Niagara Falls 175m
            </span>
          </motion.div>

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

          {/* Phones get their own composition: the plate right under the headline, set on the ridge with parallax. */}
          <div className="relative mt-3 aspect-[5/4] w-full max-w-[380px] md:hidden">
            <motion.div
              style={{ y: ridgeYMobile, scale: ridgeScale }}
              className="pointer-events-none absolute bottom-[6%] left-1/2 w-[250%] origin-bottom -translate-x-1/2 [mask-image:linear-gradient(to_bottom,#000_65%,transparent)]"
            >
              <Image
                src="/himalaya-range.webp"
                alt="Himalayan mountain ridge"
                width={2400}
                height={588}
                loading="eager"
                sizes="250vw"
                className="h-auto w-full"
              />
            </motion.div>
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
        </motion.div>

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
      </motion.div>

      {/* Refined Quick Details Strip */}
      <div className="mx-auto max-w-[1240px] px-3 sm:px-5 lg:px-10">
        <dl className="mt-8 grid grid-cols-1 gap-6 border-b border-line pb-10 text-[16px] sm:grid-cols-3">
          <div>
            <dt className="eyebrow flex items-center gap-1.5">
              <span>Google Verified</span>
              <span className="inline-flex text-saffron">★★★★★</span>
            </dt>
            <dd className="tnum mt-2 font-medium text-ink">
              {rating.toFixed(1)} rating · {userRatingCount.toLocaleString()} real reviews
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Two Living Kitchens</dt>
            <dd className="mt-2 text-ink">
              Himalayan hearth &amp; South Indian griddle
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Location</dt>
            <dd className="mt-2 text-ink">
              1 Prospect Pointe · 3 mins from the Falls
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
