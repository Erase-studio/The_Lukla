"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useMotionAmplitude } from "@/lib/use-motion-amplitude";

// Turns and floats its contents with tactile scroll parallax across subpage headers.
export function ScrollTurn({
  degrees,
  lift = 25,
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
  const progress = useSpring(useTransform(scrollY, [0, 600], [0, 1]), {
    stiffness: 140,
    damping: 24,
    mass: 0.3,
  });
  const rotate = useTransform([progress, amplitude], ([p, a]: number[]) => p * a * degrees * 1.6);
  const y = useTransform([progress, amplitude], ([p, a]: number[]) => p * a * lift);
  const scale = useTransform([progress, amplitude], ([p, a]: number[]) => 1 + p * a * 0.08);

  return (
    <motion.div style={{ rotate, y, scale }} className={className}>
      {children}
    </motion.div>
  );
}
