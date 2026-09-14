import { useEffect } from "react";
import { useMotionValue } from "framer-motion";

// How much of the scroll choreography a screen gets: all of it on desktop, 60% on tablets,
// 30% on phones, and none when the visitor asks for reduced motion.
export function useMotionAmplitude(still: boolean) {
  const amplitude = useMotionValue(still ? 0 : 1);

  useEffect(() => {
    const tablet = window.matchMedia("(max-width: 1023px)");
    const phone = window.matchMedia("(max-width: 767px)");
    const update = () =>
      amplitude.set(still ? 0 : phone.matches ? 0.65 : tablet.matches ? 0.85 : 1);
    update();
    tablet.addEventListener("change", update);
    phone.addEventListener("change", update);
    return () => {
      tablet.removeEventListener("change", update);
      phone.removeEventListener("change", update);
    };
  }, [amplitude, still]);

  return amplitude;
}
