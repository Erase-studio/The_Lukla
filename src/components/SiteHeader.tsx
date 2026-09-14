"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MAPS_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/menu-data";
import { useOpeningStatus } from "@/lib/use-opening-status";
import { IconPhone, IconPin } from "./icons";

// Page order, so the underline moves the same way the page scrolls.
const NAV_LINKS = [
  { id: "story", label: "Our story" },
  { id: "menu", label: "Menu" },
  { id: "reviews", label: "Reviews" },
  { id: "visit", label: "Visit" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const status = useOpeningStatus();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY < 200) setActive(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const compact = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-soft ${
        scrolled && !open ? "-translate-y-9" : ""
      }`}
    >
      {/* Utility strip: slides away once the page scrolls. */}
      <div className="h-9 bg-ink text-[13px] text-paper/85">
        <div className="mx-auto flex h-full max-w-[1320px] items-center justify-between gap-6 px-5 lg:px-10">
          <p className="flex items-center gap-2.5" aria-live="polite">
            <span
              aria-hidden
              className={`h-2 w-2 rounded-full ${
                status === null ? "bg-wall" : status.open ? "bg-[#7ad7a0]" : "bg-saffron"
              }`}
            />
            <span className="tnum">{status?.text ?? "Open every day"}</span>
          </p>
          <div className="hidden items-center gap-7 sm:flex">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-paper"
            >
              <IconPin className="h-3.5 w-3.5 text-wall" />
              1 Prospect Pointe, Niagara Falls
            </a>
            <a
              href={PHONE_HREF}
              className="tnum flex items-center gap-2 transition-colors hover:text-paper"
            >
              <IconPhone className="h-3.5 w-3.5 text-wall" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`border-b bg-paper/95 backdrop-blur-lg transition-[border-color,box-shadow] duration-500 ease-soft ${
          compact
            ? "border-line shadow-[0_14px_30px_-26px_rgba(21,34,61,0.6)]"
            : "border-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-5 transition-[height] duration-500 ease-soft lg:px-10 ${
            compact ? "h-[72px]" : "h-[72px] lg:h-[96px]"
          }`}
        >
          <a
            href="#top"
            aria-label="The Lukla, Himalayan and South Indian kitchen. Back to top"
            className="flex shrink-0 items-center gap-3 sm:gap-4"
          >
            <Image
              src="/logo-mark.png"
              alt=""
              width={272}
              height={258}
              sizes="72px"
              preload
              className={`w-auto transition-[height] duration-500 ease-soft ${
                compact ? "h-12" : "h-12 lg:h-[68px]"
              }`}
            />
            <span aria-hidden className="hidden h-11 w-px bg-line sm:block" />
            <span className="flex flex-col leading-none">
              <span
                className={`font-display font-bold tracking-[-0.015em] text-ink transition-[font-size] duration-500 ease-soft ${
                  compact ? "text-[22px] lg:text-[24px]" : "text-[22px] lg:text-[30px]"
                }`}
              >
                The Lukla
              </span>
              <span className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cobalt">
                <span className="font-display text-[13px] font-medium normal-case tracking-normal">
                  लुक्ला
                </span>
                <span
                  aria-hidden
                  className="hidden h-2.5 w-px bg-cobalt/40 min-[380px]:inline-block"
                />
                <span className="hidden min-[380px]:inline">
                  Himalayan &amp; South Indian
                </span>
              </span>
            </span>
          </a>

          <nav aria-label="Main" className="hidden items-center lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`group/link relative px-4 py-3 text-[14px] font-semibold uppercase tracking-[0.12em] [font-stretch:112%] transition-colors duration-300 xl:px-5 ${
                    isActive ? "text-ink" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-4 bottom-1.5 h-[2px] origin-left scale-x-0 rounded-full bg-ink/20 transition-transform duration-500 ease-soft group-hover/link:scale-x-100 xl:inset-x-5"
                  />
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      aria-hidden
                      className="absolute inset-x-4 bottom-1.5 h-[2px] rounded-full bg-cobalt xl:inset-x-5"
                      transition={{ type: "spring", stiffness: 420, damping: 38 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* The menu is what most visitors came for, so it gets the solid button; calling is secondary. */}
          <div className="flex items-center gap-2.5">
            <a
              href={PHONE_HREF}
              aria-label={`Call to order, ${PHONE_DISPLAY}`}
              className="btn btn-line hidden h-12 gap-2.5 px-4 md:inline-flex xl:px-5"
            >
              <IconPhone className="h-4 w-4" />
              <span className="tnum hidden xl:inline">{PHONE_DISPLAY}</span>
            </a>
            <a href="#menu" className="btn btn-solid hidden h-12 px-6 md:inline-flex">
              View menu
            </a>
            <button
              type="button"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((o) => !o)}
              className="relative grid h-12 w-12 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink lg:hidden"
            >
              <span
                className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-500 ease-soft ${
                  open ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-500 ease-soft ${
                  open ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          inert={!open}
          className={`grid transition-[grid-template-rows] duration-500 ease-soft lg:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <nav aria-label="Main" className="mx-auto flex max-w-[1320px] flex-col px-5 pb-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-t border-line py-4 font-display text-3xl text-ink"
                >
                  {link.label}
                  {active === link.id && (
                    <span aria-hidden className="h-2 w-2 rounded-full bg-cobalt" />
                  )}
                </a>
              ))}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href="#menu"
                  onClick={() => setOpen(false)}
                  className="btn btn-solid justify-center"
                >
                  View menu
                </a>
                <a href={PHONE_HREF} className="btn btn-line justify-center gap-2">
                  <IconPhone className="h-4 w-4" />
                  Call
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
