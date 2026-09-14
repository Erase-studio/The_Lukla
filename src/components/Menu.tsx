"use client";

import { useState } from "react";
import Image from "next/image";
import { FULL_MENU_URL, MENU_GROUPS } from "@/lib/menu-data";
import { IconArrowUpRight, IconPlus } from "./icons";
import { Reveal } from "./Reveal";

export function Menu() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="menu" className="bg-wash py-28 sm:py-40">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <Reveal className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Menu</p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] text-ink">
              What we cook
            </h2>
          </div>
          <a
            href={FULL_MENU_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-line self-start sm:self-auto"
          >
            Full menu
            <IconArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-16 border-t border-ink/15">
            {MENU_GROUPS.map((group, i) => {
              const isOpen = openIndex === i;
              const panelId = `menu-panel-${i}`;

              return (
                <li key={group.title} className="border-b border-ink/15">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      className="group flex w-full items-center py-7 text-left sm:py-9"
                    >
                      {/* Pill photo widens in on hover and stays while the row is open. */}
                      <span
                        className={`relative hidden h-20 shrink-0 overflow-hidden rounded-full transition-[width,margin] duration-700 ease-soft sm:block ${
                          isOpen
                            ? "mr-6 w-40"
                            : "mr-0 w-0 group-hover:mr-6 group-hover:w-40"
                        }`}
                      >
                        <Image
                          src={group.image}
                          alt=""
                          fill
                          sizes="160px"
                          className="object-cover"
                        />
                      </span>
                      <span className="flex-1 font-display text-[clamp(2rem,5.5vw,4.25rem)] leading-none text-ink">
                        {group.title}
                      </span>
                      <span className="mr-8 hidden text-[15px] text-stone lg:block">
                        {group.kicker}
                      </span>
                      <span
                        aria-hidden
                        className={`ml-4 grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors duration-500 sm:h-14 sm:w-14 ${
                          isOpen
                            ? "border-ink bg-ink text-paper"
                            : "border-ink/20 text-ink group-hover:border-ink"
                        }`}
                      >
                        <IconPlus
                          className={`h-5 w-5 transition-transform duration-500 ease-soft ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-label={group.title}
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows] duration-700 ease-soft ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div
                      className={`overflow-hidden transition-opacity duration-500 ${
                        isOpen ? "opacity-100 delay-150" : "opacity-0"
                      }`}
                    >
                      <p className="text-[15px] text-stone sm:pl-[11.5rem] lg:hidden">
                        {group.kicker}
                      </p>
                      <ul className="grid grid-cols-1 gap-x-14 pb-10 pt-4 sm:pl-[11.5rem] md:grid-cols-2">
                        {group.lines.map((line) => (
                          <li
                            key={line.name}
                            className="flex items-baseline justify-between gap-6 border-t border-ink/10 py-4"
                          >
                            <span>
                              <span className="block text-[16px] font-medium text-ink">
                                {line.name}
                              </span>
                              {line.note && (
                                <span className="mt-0.5 block text-[14px] text-stone">
                                  {line.note}
                                </span>
                              )}
                            </span>
                            <span className="tnum text-[16px] text-ink">
                              ${line.price}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <p className="mt-10 max-w-lg text-[15px] leading-[1.7] text-stone">
          This is a short selection. The full menu also has kebabs, chaat,
          breads, lassi and desserts.
        </p>
      </div>
    </section>
  );
}
