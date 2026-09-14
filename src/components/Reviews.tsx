"use client";

import { useState } from "react";
import { REVIEWS } from "@/lib/menu-data";
import { IconChevronLeft, IconChevronRight, IconStar } from "./icons";
import { Reveal } from "./Reveal";

export function Reviews() {
  const [index, setIndex] = useState(0);
  const go = (step: number) =>
    setIndex((i) => (i + step + REVIEWS.length) % REVIEWS.length);

  return (
    <section id="reviews" className="py-28 sm:py-40">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <Reveal className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="eyebrow">Reviews</p>
            <span aria-hidden className="h-px w-8 bg-line" />
            <p className="tnum flex items-center gap-2 text-[15px] text-stone">
              <span className="flex gap-0.5 text-saffron" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar
                    key={i}
                    className={`h-3.5 w-3.5 ${i === 4 ? "opacity-30" : ""}`}
                  />
                ))}
              </span>
              4.3 from 566 reviews on Google
            </p>
          </div>

          {/* Every quote shares one grid cell, so the block keeps the height of the longest. */}
          <div className="mt-12 grid">
            {REVIEWS.map((review, i) => {
              const active = i === index;
              return (
                <figure
                  key={review.name}
                  aria-hidden={!active}
                  className={`[grid-area:1/1] transition-[opacity,translate] duration-700 ease-soft ${
                    active
                      ? "opacity-100"
                      : "pointer-events-none translate-y-3 opacity-0"
                  }`}
                >
                  <blockquote className="font-display text-[clamp(1.55rem,3.2vw,2.5rem)] leading-[1.3] text-ink">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 text-[15px] text-stone">
                    <span className="font-medium text-ink">{review.name}</span>
                    {" · "}
                    {review.date}
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div className="mt-12 flex items-center gap-3 border-t border-line pt-8">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-ink"
            >
              <IconChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next review"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-ink"
            >
              <IconChevronRight className="h-5 w-5" />
            </button>
            <p className="tnum ml-3 text-[14px] text-stone" aria-live="polite">
              {index + 1} of {REVIEWS.length}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
