"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAPS_URL, PHONE_HREF } from "@/lib/menu-data";
import { IconArrowUpRight, IconPhone } from "./icons";

// Phones only: once the page's opening is behind you, the two things people come for stay one tap away.
// It steps aside when the footer arrives, so it never covers the contact details there.
export function MobileActionBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let pastTop = false;
    let footerInView = false;
    const sync = () => setVisible(pastTop && !footerInView);

    const onScroll = () => {
      pastTop = window.scrollY > window.innerHeight * 0.8;
      sync();
    };
    const footer = document.getElementById("site-footer");
    const observer = new IntersectionObserver(([entry]) => {
      footerInView = entry.isIntersecting;
      sync();
    });
    if (footer) observer.observe(footer);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname]);

  const secondary = "btn btn-line flex-1 justify-center bg-paper";

  return (
    <div
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[translate,opacity] duration-500 ease-soft md:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <nav
        aria-label="Quick actions"
        className="mx-auto flex max-w-md gap-2 rounded-full border border-line bg-paper/90 p-1.5 shadow-[0_18px_40px_-20px_rgba(21,34,61,0.55)] backdrop-blur-lg"
      >
        {/* On the menu page itself, the useful second action is getting there. */}
        {pathname === "/menu" ? (
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={secondary}>
            Directions
            <IconArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <Link href="/menu" className={secondary}>
            Menu
          </Link>
        )}
        <a href={PHONE_HREF} className="btn btn-solid flex-1 justify-center gap-2">
          <IconPhone className="h-4 w-4" />
          Call to order
        </a>
      </nav>
    </div>
  );
}
