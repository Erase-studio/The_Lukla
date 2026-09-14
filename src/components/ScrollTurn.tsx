"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useMotionAmplitude } from "@/lib/use-motion-amplitude";

// Turns its contents slowly over the first screen of scrolling, with the same eased,
// slightly lagging feel as the plates in the home hero.
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
  const progress = useSpring(useTransform(scrollY, [0, 700], [0, 1]), {
    stiffness: 80,
    damping: 22,
    mass: 0.7,
  });
  const rotate = useTransform([progress, amplitude], ([p, a]: number[]) => p * a * degrees);
  const y = useTransform([progress, amplitude], ([p, a]: number[]) => p * a * lift);

  return (
    <motion.div style={{ rotate, y }} className={className}>
      {children}
    </motion.div>
  );
}
