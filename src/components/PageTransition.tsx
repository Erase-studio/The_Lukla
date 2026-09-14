"use client";

import { usePathname } from "next/navigation";

/**
 * Replays a short fade and lift on each route change (keyed on the pathname).
 * It's a CSS animation rather than a JS one, so the page is visible in the server HTML:
 * phones on slow connections see content right away instead of waiting for JavaScript.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
