"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FULL_MENU_URL, MENU_GROUPS, type MenuGroup } from "@/lib/menu-data";
import type { Plate } from "@/lib/local-photos";
import { IconArrowRight, IconArrowUpRight, IconPlus } from "./icons";
import { Reveal } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;
const DESKTOP = "(min-width: 1024px)";

function PlateArt({
  group,
  plate,
  sizes,
  className = "",
}: {
  group: MenuGroup;
  plate?: Plate;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-square ${className}`}>
      {plate ? (
        <Image
          src={plate.src}
          alt={group.plateAlt}
          fill
          sizes={sizes}
          className="object-contain drop-shadow-[0_24px_30px_rgba(21,34,61,0.26)]"
        />
      ) : (
        // No photo yet: a quiet plate with what's on it.
        <div className="grid h-full w-full place-items-center rounded-full bg-wash p-[16%] text-center shadow-[inset_0_0_0_1px_rgba(21,34,61,0.06)]">
          <p className="font-display text-[clamp(1.1rem,1.8vw,1.5rem)] leading-snug text-ink/70">
            {group.tags.join(" · ")}
          </p>
        </div>
      )}
    </div>
  );
}

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

export function Menu({ plates }: { plates: Record<string, Plate> }) {
  const [active, setActive] = useState(0);
  const shown = MENU_GROUPS[Math.max(active, 0)];

  // Dish cards link to #menu-<group>; open that group when the hash changes.
  useEffect(() => {
    const openFromHash = () => {
      const i = MENU_GROUPS.findIndex((g) => window.location.hash === `#menu-${g.id}`);
      if (i >= 0) setActive(i);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const isDesktop = () => window.matchMedia(DESKTOP).matches;

  return (
    <section id="menu" aria-labelledby="menu-heading" className="section-y bg-wash">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Menu</p>
            <h2
              id="menu-heading"
              className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] text-ink"
            >
              What we cook
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-[1.6] text-stone">
              A short selection with prices. Pick a section to see what&apos;s on it.
            </p>
          </div>
          <a
            href={FULL_MENU_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-line self-start bg-paper/60 sm:self-auto"
          >
            Full menu
            <IconArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <ul className="border-t border-ink/15 lg:col-span-7">
            {MENU_GROUPS.map((group, i) => {
              const isActive = active === i;
              const plate = plates[group.plate];

              return (
                <li key={group.id} id={`menu-${group.id}`} className="border-b border-ink/15">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={`menu-panel-${group.id} menu-preview`}
                      onClick={() => setActive(isActive && !isDesktop() ? -1 : i)}
                      onFocus={() => isDesktop() && setActive(i)}
                      onPointerEnter={(e) => e.pointerType === "mouse" && isDesktop() && setActive(i)}
                      className="group flex w-full items-center gap-5 py-6 text-left sm:py-7"
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
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors duration-500 lg:hidden ${
                          isActive ? "border-ink bg-ink text-paper" : "border-ink/20 text-ink"
                        }`}
                      >
                        <IconPlus
                          className={`h-5 w-5 transition-transform duration-500 ease-soft ${
                            isActive ? "rotate-45" : ""
                          }`}
                        />
                      </span>
                      <span
                        aria-hidden
                        className={`hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-paper transition duration-500 ease-soft lg:grid ${
                          isActive ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                        }`}
                      >
                        <IconArrowRight className="h-5 w-5" />
                      </span>
                    </button>
                  </h3>

                  {/* Phones and tablets: the section opens in place. */}
                  <div
                    id={`menu-panel-${group.id}`}
                    role="region"
                    aria-label={group.title}
                    inert={!isActive}
                    className={`grid transition-[grid-template-rows] duration-700 ease-soft lg:hidden ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-6 pb-8 sm:flex-row sm:items-start">
                        <PlateArt
                          group={group}
                          plate={plate}
                          sizes="176px"
                          className="w-40 shrink-0 self-center sm:w-44 sm:self-start"
                        />
                        <div className="flex-1">
                          <p className="text-[15px] text-stone">{group.kicker}</p>
                          <Lines group={group} />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Desktop: hovering or focusing a section brings its plate and prices into the preview. */}
          <div className="hidden lg:col-span-5 lg:block">
            <div id="menu-preview" className="sticky top-28 rounded-[32px] bg-paper p-8 xl:p-10">
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
                    <PlateArt group={shown} plate={plates[shown.plate]} sizes="300px" />
                  </motion.div>
                  <p className="eyebrow mt-8">{shown.cuisine}</p>
                  <p className="mt-2 font-display text-[2.1rem] leading-tight text-ink">
                    {shown.title}
                  </p>
                  <p className="mt-1 text-[15px] text-stone">{shown.kicker}</p>
                  <Lines group={shown} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <p className="mt-10 max-w-lg text-[15px] leading-[1.7] text-stone">
          The full menu also has kebabs, chaat, breads, lassi and desserts.
        </p>
      </div>
    </section>
  );
}
