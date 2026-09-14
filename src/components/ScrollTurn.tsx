"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useMotionAmplitude } from "@/lib/use-motion-amplitude";

// Both components map scroll position straight to a rotation, so scrolling back unwinds it exactly.
// The spring only smooths the steps between scroll events; it doesn't add travel of its own.
const SMOOTH = { stiffness: 140, damping: 28, mass: 0.4 };

// Turns over the first screen of scrolling. For art at the top of a page.
export function ScrollTurn({
  degrees,
  lift = 0,
  className,
  children,
}: {
  degrees: number;
  lift?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const still = Boolean(useReducedMotion());
  const amplitude = useMotionAmplitude(still);
  const { scrollY } = useScroll();
  const progress = useSpring(useTransform(scrollY, [0, 700], [0, 1]), SMOOTH);
  const rotate = useTransform([progress, amplitude], ([p, a]: number[]) => p * a * degrees);
  const y = useTransform([progress, amplitude], ([p, a]: number[]) => p * a * lift);

  return (
    <motion.div style={{ rotate, y }} className={className}>
      {children}
    </motion.div>
  );
}

// Turns while the element crosses the viewport: -degrees/2 as it enters, +degrees/2 as it leaves.
export function ScrollSpin({
  degrees,
  className,
  children,
}: {
  degrees: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const still = Boolean(useReducedMotion());
  const amplitude = useMotionAmplitude(still);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, SMOOTH);
  const rotate = useTransform([progress, amplitude], ([p, a]: number[]) => (p - 0.5) * a * degrees);

  return (
    <motion.div ref={ref} style={{ rotate }} className={className}>
      {children}
    </motion.div>
  );
}
