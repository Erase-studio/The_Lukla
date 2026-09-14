"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MENU_GROUPS, type MenuGroup } from "@/lib/menu-data";
import type { Plate } from "@/lib/local-photos";
import { IconArrowRight } from "./icons";
import { PlateArt } from "./PlateArt";
import { Reveal } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

function Lines({ group }: { group: MenuGroup }) {
  return (
    <ul className="mt-5 border-t border-ink/10">
      {group.lines.map((line) => (
        <li
          key={line.name}
          className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-3.5"
        >
          <span>
            <span className="block text-[16px] font-medium text-ink">{line.name}</span>
            {line.note && (
              <span className="mt-0.5 block text-[14px] text-stone">{line.note}</span>
            )}
          </span>
          <span className="tnum text-[16px] text-ink">${line.price}</span>
        </li>
      ))}
    </ul>
  );
}

// The home page's taste of the menu, on laptops and desktops only: hovering or focusing a
// section brings its plate and prices into the preview. Smaller screens skip it and use the
// "See the full menu" link under the dishes.
export function MenuDiscovery({ plates }: { plates: Record<string, Plate> }) {
  const [active, setActive] = useState(0);
  const shown = MENU_GROUPS[active];

  return (
    <section aria-labelledby="whats-cooking-heading" className="section-y hidden bg-wash lg:block">
      <div className="mx-auto max-w-[1240px] px-10">
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Menu</p>
            <h2
              id="whats-cooking-heading"
              className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] text-ink"
            >
              What we cook
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-[1.6] text-stone">
              A few favourites with prices. Pick a section to see what&apos;s on it.
            </p>
          </div>
          <Link href="/menu" className="btn btn-solid">
            See the full menu
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-16 grid grid-cols-12 gap-16">
          <ul className="col-span-7 border-t border-ink/15">
            {MENU_GROUPS.map((group, i) => {
              const isActive = active === i;

              return (
                <li key={group.id} className="border-b border-ink/15">
                  <h3>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      aria-controls="menu-preview"
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                      className="group flex w-full items-center gap-5 py-7 text-left"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="eyebrow block">{group.cuisine}</span>
                        <span
                          className={`mt-2.5 block font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-none transition-colors duration-500 ${
                            isActive ? "text-ink" : "text-ink/55 group-hover:text-ink"
                          }`}
                        >
                          {group.title}
                        </span>
                        <span className="mt-2.5 block text-[15px] text-stone">
                          {group.tags.join(" · ")}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-paper transition duration-500 ease-soft ${
                          isActive ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                        }`}
                      >
                        <IconArrowRight className="h-5 w-5" />
                      </span>
                    </button>
                  </h3>
                </li>
              );
            })}
          </ul>

          <div className="col-span-5">
            <div
              id="menu-preview"
              aria-live="polite"
              className="sticky top-28 rounded-[32px] bg-paper p-8 xl:p-10"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={shown.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <motion.div
                    initial={{ rotate: -24, scale: 0.92, x: 24 }}
                    animate={{ rotate: 0, scale: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="mx-auto w-[62%]"
                  >
                    <PlateArt
                      plate={plates[shown.plate]}
                      alt={shown.plateAlt}
                      fallback={shown.tags.join(" · ")}
                      sizes="300px"
                    />
                  </motion.div>
                  <p className="eyebrow mt-8">{shown.cuisine}</p>
                  <p className="mt-2 font-display text-[2.1rem] leading-tight text-ink">
                    {shown.title}
                  </p>
                  <p className="mt-1 text-[15px] text-stone">{shown.kicker}</p>
                  <Lines group={shown} />
                  <Link
                    href={`/menu#${shown.id}`}
                    className="mt-6 inline-flex items-center gap-2 py-1.5 text-[15px] font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                  >
                    All {shown.title.toLowerCase()}
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
