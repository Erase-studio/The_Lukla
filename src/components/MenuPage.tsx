"use client";

import { useEffect, useRef, useState } from "react";
import { MENU_GROUPS, SIGNATURES } from "@/lib/menu-data";
import type { Plate } from "@/lib/local-photos";
import { PlateArt } from "./PlateArt";

const SECTIONS = [
  { id: "start-here", label: "Start here" },
  ...MENU_GROUPS.map((group) => ({ id: group.id, label: group.title })),
];

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

      <section id="start-here" aria-labelledby="start-here-heading" className="section-y scroll-mt-40">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">First visit?</p>
              <h2
                id="start-here-heading"
                className="mt-4 font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] text-ink"
              >
                Start here
              </h2>
            </div>
            <p className="max-w-sm text-[16px] leading-[1.6] text-stone">
              Three dishes that show both sides of the kitchen.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {SIGNATURES.map((dish) => (
              <li key={dish.name} className="flex gap-5 rounded-[28px] bg-wash p-5 sm:p-6">
                <PlateArt
                  plate={plates[dish.plate]}
                  alt={dish.plateAlt}
                  fallback={dish.name}
                  sizes="112px"
                  className="w-24 shrink-0 self-start sm:w-28"
                />
                <div className="min-w-0">
                  <p className="eyebrow">{dish.kitchen}</p>
                  <h3 className="mt-1.5 font-display text-[1.5rem] leading-tight text-ink">
                    {dish.name}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.55] text-stone">{dish.blurb}</p>
                  <p className="tnum mt-3 text-[17px] font-medium text-ink">${dish.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {MENU_GROUPS.map((group, i) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-heading`}
          className={`section-y scroll-mt-40 ${i % 2 === 0 ? "bg-wash" : ""}`}
        >
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-6 lg:sticky lg:top-48 lg:block">
                <div className="min-w-0 flex-1">
                  <p className="eyebrow text-cobalt">{group.cuisine}</p>
                  <h2
                    id={`${group.id}-heading`}
                    className="mt-4 font-display text-[clamp(2.4rem,4.4vw,3.75rem)] leading-[1.02] text-ink"
                  >
                    {group.title}
                  </h2>
                  <p className="mt-3 text-[17px] text-stone">{group.kicker}</p>
                </div>
                <PlateArt
                  plate={plates[group.plate]}
                  alt={group.plateAlt}
                  fallback={group.tags.join(" · ")}
                  sizes="(min-width:1024px) 280px, 128px"
                  className="w-28 shrink-0 sm:w-36 lg:mt-10 lg:w-[80%] lg:max-w-[280px]"
                />
              </div>
            </div>

            <ul className="border-t border-ink/15 lg:col-span-8">
              {group.lines.map((line) => (
                <li
                  key={line.name}
                  className="flex items-baseline justify-between gap-6 border-b border-ink/15 py-6"
                >
                  <div>
                    <h3 className="font-display text-[clamp(1.4rem,2.2vw,1.8rem)] leading-tight text-ink">
                      {line.name}
                    </h3>
                    {line.note && (
                      <p className="mt-1.5 text-[16px] text-stone">{line.note}</p>
                    )}
                  </div>
                  <p className="tnum shrink-0 font-display text-[clamp(1.3rem,2vw,1.6rem)] text-ink">
                    ${line.price}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}
