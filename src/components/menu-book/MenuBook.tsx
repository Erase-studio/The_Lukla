"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import dynamic from "next/dynamic";
import {
  BOOK_PAGE_COUNT,
  BOOK_SECTIONS,
  pageFromHash,
  pageIndex,
  type PageFlipApi,
  type PlateName,
} from "@/lib/menu-book";
import { PHONE_HREF } from "@/lib/menu-data";
import { useMediaQuery } from "@/lib/use-media-query";
import { IconChevronLeft, IconChevronRight, IconPhone } from "../icons";

// page-flip measures and moves real DOM nodes, so the book only renders in the browser.
const BookPages = dynamic(() => import("./BookPages").then((m) => m.BookPages), {
  ssr: false,
  loading: () => (
    <div className="mx-auto aspect-[5/8] w-full max-w-[420px] animate-pulse rounded-[6px] bg-wash md:aspect-[5/4] md:max-w-none" />
  ),
});

const LAST_PAGE = BOOK_PAGE_COUNT - 1;
const MENU_PAGES = BOOK_PAGE_COUNT - 2;

// The /menu page opens straight on the book. Phones get a row of section chips above it;
// laptops get a slim column beside the spread with the title and the sections listed.
export function MenuBook({ plates }: { plates: Partial<Record<PlateName, string>> }) {
  const flip = useRef<PageFlipApi | null>(null);
  const chipRow = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [portrait, setPortrait] = useState(true);
  const [ready, setReady] = useState(false);
  const touch = useMediaQuery("(pointer: coarse)");

  const onReady = useCallback((api: PageFlipApi) => {
    flip.current = api;
    setPage(api.getCurrentPageIndex());
    setPortrait(api.getOrientation() === "portrait");
    setReady(true);
  }, []);
  const onFlip = useCallback((p: number) => setPage(p), []);
  const onOrientation = useCallback((mode: "portrait" | "landscape") => setPortrait(mode === "portrait"), []);
  const jump = useCallback((target: number) => flip.current?.flip(target), []);

  // Pages on screen right now: one on a phone, two in an open spread.
  const spread = !portrait && page > 0 && page < LAST_PAGE;
  const first = spread && page % 2 === 0 ? page - 1 : page;
  const last = spread ? Math.min(first + 1, LAST_PAGE - 1) : first;

  let active = -1;
  BOOK_SECTIONS.forEach((section, i) => {
    if (pageIndex(section.id) <= last) active = i;
  });
  if (last <= 1) active = -1;

  const label =
    first === 0
      ? "Cover"
      : first === LAST_PAGE
        ? "Back cover"
        : last > first
          ? `Pages ${first}–${last} of ${MENU_PAGES}`
          : `Page ${first} of ${MENU_PAGES}`;

  // A plain #section link on this page (no reload) turns to that page too.
  useEffect(() => {
    const onHash = () => {
      const target = pageFromHash(window.location.hash);
      if (target > 0) flip.current?.flip(target);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Keep the chip for the open section visible in the sideways-scrolling row.
  useEffect(() => {
    const row = chipRow.current;
    const chip = row?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (row && chip) row.scrollTo({ left: chip.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") flip.current?.flipNext();
    if (e.key === "ArrowLeft") flip.current?.flipPrev();
  };

  const turn =
    "grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-ink disabled:pointer-events-none disabled:opacity-30";

  return (
    <section
      id="menu-book"
      aria-labelledby="menu-heading"
      onKeyDown={onKeyDown}
      className="pb-[clamp(3rem,7vw,5rem)] pt-[112px] lg:pt-[144px]"
    >
      <div className="mx-auto max-w-[1320px] lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10 lg:px-10 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-14">
        <aside>
          {/* Phones skip the heading visually: the book is the first thing they see. */}
          <div className="sr-only lg:not-sr-only">
            <p className="eyebrow text-cobalt">Menu</p>
            <h1
              id="menu-heading"
              className="mt-3 font-display text-[clamp(2.3rem,3.2vw,3rem)] leading-[1.02] text-ink"
            >
              What we cook
            </h1>
          </div>

          <nav aria-label="Menu sections" className="mt-6 hidden lg:block">
            <ol className="border-t border-line">
              {BOOK_SECTIONS.map((section, i) => {
                const isActive = active === i;
                return (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() => jump(pageIndex(section.id))}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex min-h-9 w-full items-center justify-between gap-3 border-b border-line text-left text-[15px] transition-colors duration-300 ${
                        isActive ? "font-medium text-ink" : "text-stone hover:text-ink"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          aria-hidden
                          className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                            isActive ? "bg-cobalt" : "bg-ink/15"
                          }`}
                        />
                        {section.label}
                      </span>
                      <span className="tnum text-[13px] text-stone">{pageIndex(section.id)}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="mt-6 hidden lg:block">
            <a href={PHONE_HREF} className="btn btn-solid gap-2.5">
              <IconPhone className="h-4 w-4" />
              Call to order
            </a>
            <p className="mt-4 text-[13px] leading-[1.5] text-stone">
              Jain and vegan menus inside · Halal options available
            </p>
          </div>
        </aside>

        <div className="min-w-0">
          <nav aria-label="Menu sections" className="lg:hidden">
            <div ref={chipRow} className="flex gap-2 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:px-6">
              {BOOK_SECTIONS.map((section, i) => (
                <button
                  key={section.id}
                  type="button"
                  data-chip={i}
                  onClick={() => jump(pageIndex(section.id))}
                  aria-current={active === i ? "true" : undefined}
                  className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-4 text-[15px] font-medium transition-colors duration-300 ${
                    active === i ? "bg-ink text-paper" : "bg-wash/70 text-ink/80 hover:bg-wash hover:text-ink"
                  }`}
                >
                  {section.short}
                </button>
              ))}
            </div>
          </nav>

          {/* The spread is 5:4; its width is capped so the whole book fits the screen height. */}
          <div
            data-portrait={portrait}
            className="group/book mx-auto mt-3 w-full max-w-[min(1080px,calc((100svh-14rem)*1.25))] px-3 sm:mt-6 sm:px-6 lg:mt-0 lg:px-0"
          >
            <div aria-hidden className="drop-shadow-[0_24px_40px_rgba(21,34,61,0.18)]">
              <BookPages
                plates={plates}
                onReady={onReady}
                onFlip={onFlip}
                onOrientation={onOrientation}
                onJump={jump}
              />
            </div>
          </div>

          <div className="mx-auto mt-4 flex max-w-md items-center justify-between gap-4 px-4 lg:mt-6">
            <button
              type="button"
              onClick={() => flip.current?.flipPrev()}
              disabled={!ready || page === 0}
              aria-label="Previous page"
              className={turn}
            >
              <IconChevronLeft className="h-5 w-5" />
            </button>
            <p className="text-center">
              <span className="tnum block text-[15px] font-medium text-ink" aria-live="polite">
                {label}
              </span>
              <span className="mt-0.5 block text-[13px] text-stone">
                {touch ? "Swipe to turn the page" : "Click or drag a corner to turn the page"}
              </span>
            </p>
            <button
              type="button"
              onClick={() => flip.current?.flipNext()}
              disabled={!ready || last >= LAST_PAGE}
              aria-label="Next page"
              className={turn}
            >
              <IconChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
