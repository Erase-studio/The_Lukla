"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Wraps each page in a fade+lift enter animation keyed on the pathname.
 * When the route changes React swaps the key, triggering a fresh enter.
 * No exit animation needed — the incoming page overlaps instantly.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
