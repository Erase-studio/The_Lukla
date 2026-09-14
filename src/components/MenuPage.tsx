"use client";

import { useEffect, useRef, useState } from "react";
import { MENU_GROUPS, type MenuTag } from "@/lib/menu-data";
import type { Plate } from "@/lib/local-photos";
import { PlateArt } from "./PlateArt";
import { ScrollSpin } from "./ScrollTurn";

const SECTIONS = MENU_GROUPS.map((group) => ({ id: group.id, label: group.title }));

// Saffron is the site's one warm accent, kept for the house picks.
export function MenuBadge({ tag }: { tag: MenuTag }) {
  return tag === "signature" ? (
    <span className="rounded-full bg-saffron/25 px-2.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-teak">
      Signature
    </span>
  ) : (
    <span className="rounded-full border border-[#2f6e47]/35 px-2.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#2f6e47]">
      Veg
    </span>
  );
}

export function MenuPage({ plates }: { plates: Record<string, Plate> }) {
  const [active, setActive] = useState(SECTIONS[0].id);
  const bar = useRef<HTMLDivElement>(null);

  // The chip for the section in the middle of the screen stays highlighted.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // On narrow screens the chip row scrolls sideways; keep the active chip in view.
  useEffect(() => {
    const chip = bar.current?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (bar.current && chip) {
      bar.current.scrollTo({ left: chip.offsetLeft - 24, behavior: "smooth" });
    }
  }, [active]);

  return (
    <>
      <nav
        aria-label="Menu sections"
        className="sticky top-[72px] z-30 mt-10 border-y border-line bg-paper/90 backdrop-blur-lg"
      >
        <div
          ref={bar}
          className="relative mx-auto flex max-w-[1240px] gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] lg:px-10"
        >
          {SECTIONS.map((section) => {
            const isActive = active === section.id;
            return (
              <a
                key={section.id}
                data-chip={section.id}
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`shrink-0 rounded-full px-4 py-2.5 text-[15px] font-medium transition-colors duration-300 ${
                  isActive ? "bg-ink text-paper" : "text-ink/75 hover:bg-wash hover:text-ink"
                }`}
              >
                {section.label}
              </a>
            );
          })}
        </div>
      </nav>

      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-6 gap-y-2 px-6 pt-8 text-[14px] text-stone lg:px-10">
        <span className="flex items-center gap-2">
          <MenuBadge tag="signature" /> House picks
        </span>
        <span className="flex items-center gap-2">
          <MenuBadge tag="veg" /> Vegetarian
        </span>
      </div>

      {MENU_GROUPS.map((group, i) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-heading`}
          className="scroll-mt-40"
        >
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <div
              className={`grid grid-cols-1 gap-10 py-[clamp(3.5rem,6vw,5.5rem)] lg:grid-cols-12 lg:gap-16 ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <div className="lg:col-span-4">
                <div className="flex items-center gap-6 lg:sticky lg:top-48 lg:block">
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-semibold uppercase tracking-[0.12em] text-cobalt">
                      {group.cuisine}
                    </p>
                    <h2
                      id={`${group.id}-heading`}
                      className="mt-3 font-display text-[clamp(2.4rem,4.4vw,3.75rem)] leading-[1.02] text-ink"
                    >
                      {group.title}
                    </h2>
                    <p className="mt-3 text-[17px] text-stone">{group.kicker}</p>
                  </div>
                  <ScrollSpin
                    degrees={i % 2 === 0 ? 40 : -40}
                    className="w-32 shrink-0 sm:w-40 lg:mt-10 lg:w-[86%] lg:max-w-[320px]"
                  >
                    <PlateArt
                      plate={plates[group.plate]}
                      alt={group.plateAlt}
                      fallback={group.tags.join(" · ")}
                      sizes="(min-width:1024px) 320px, 160px"
                    />
                  </ScrollSpin>
                </div>
              </div>

              <ul className="border-t border-ink/15 lg:col-span-8">
                {group.lines.map((line) => (
                  <li
                    key={line.name}
                    className="flex items-start justify-between gap-6 border-b border-ink/15 py-6"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <h3 className="font-display text-[clamp(1.4rem,2.2vw,1.8rem)] leading-tight text-ink">
                          {line.name}
                        </h3>
                        {line.tags?.map((tag) => <MenuBadge key={tag} tag={tag} />)}
                      </div>
                      {line.note && <p className="mt-1.5 text-[16px] text-stone">{line.note}</p>}
                    </div>
                    <p className="tnum shrink-0 font-display text-[clamp(1.4rem,2.2vw,1.8rem)] leading-tight text-ink">
                      ${line.price}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
