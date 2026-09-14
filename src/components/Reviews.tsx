"use client";

import { useState, type KeyboardEvent } from "react";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, MAPS_URL, REVIEWS } from "@/lib/menu-data";
import {
  IconArrowUpRight,
  IconChevronLeft,
  IconChevronRight,
  IconGoogle,
  IconStar,
} from "./icons";
import { Reveal } from "./Reveal";

// Five grey stars with a saffron copy clipped to the rating, so 4.3 shows as four and a bit.
function Stars({ rating }: { rating: number }) {
  const row = (tone: string) => (
    <span className={`flex gap-1 ${tone}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar key={i} className="h-4 w-4 shrink-0" />
      ))}
    </span>
  );
  return (
    <span className="relative inline-flex" role="img" aria-label={`${rating} out of 5 stars`}>
      {row("text-ink/15")}
      <span
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${(rating / 5) * 100}%` }}
      >
        {row("text-saffron")}
      </span>
    </span>
  );
}

export function Reviews() {
  const [index, setIndex] = useState(0);
  const count = REVIEWS.length;
  const go = (step: number) => setIndex((i) => (i + step + count) % count);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="section-y">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Reviews</p>
          <h2
            id="reviews-heading"
            className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] text-ink"
          >
            What guests say
          </h2>

          <div className="mt-8 flex items-center gap-4 border-t border-line pt-8">
            <IconGoogle className="h-10 w-10 shrink-0" />
            <div>
              <p className="flex items-center gap-3">
                <span className="tnum font-display text-[2.5rem] leading-none text-ink">
                  {GOOGLE_RATING.toFixed(1)}
                </span>
                <Stars rating={GOOGLE_RATING} />
              </p>
              <p className="tnum mt-1.5 text-[15px] text-stone">
                {GOOGLE_REVIEW_COUNT} reviews on Google
              </p>
            </div>
          </div>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-line mt-8"
          >
            Read reviews on Google
            <IconArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Guest reviews"
          onKeyDown={onKeyDown}
          className="lg:col-span-8"
        >
          {/* Every quote shares one grid cell, so the card keeps the height of the longest. */}
          <div className="grid rounded-[32px] bg-wash p-8 sm:p-12">
            {REVIEWS.map((review, i) => {
              const active = i === index;
              return (
                <figure
                  key={review.name}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}`}
                  inert={!active}
                  className={`[grid-area:1/1] transition-[opacity,translate] duration-700 ease-soft ${
                    active ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                  }`}
                >
                  <p className="flex items-center gap-2 text-[14px] font-medium text-stone">
                    <IconGoogle className="h-4 w-4" />
                    Review on Google
                  </p>
                  <blockquote className="mt-6 font-display text-[clamp(1.45rem,2.6vw,2.2rem)] leading-[1.32] text-ink">
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

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-ink"
            >
              <IconChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next review"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-ink"
            >
              <IconChevronRight className="h-5 w-5" />
            </button>
            <div className="ml-2 flex flex-1 items-center gap-2">
              {REVIEWS.map((review, i) => (
                <button
                  key={review.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show review ${i + 1} of ${count}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group grid h-11 max-w-16 flex-1 place-items-center"
                >
                  <span
                    className={`h-[3px] w-full rounded-full transition-colors duration-500 ${
                      i === index ? "bg-ink" : "bg-ink/15 group-hover:bg-ink/35"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="tnum text-[14px] text-stone" aria-live="polite">
              {index + 1} / {count}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
