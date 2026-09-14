"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useReducedMotion } from "framer-motion";
import type { PlaceData } from "@/lib/google-reviews";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, MAPS_URL, REVIEWS } from "@/lib/menu-data";
import {
  IconArrowUpRight,
  IconChevronLeft,
  IconChevronRight,
  IconGoogle,
  IconPause,
  IconPlay,
  IconStar,
} from "./icons";
import { Reveal } from "./Reveal";

// How long each review stays before the next one slides in.
const SLIDE_MS = 6500;

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

export function Reviews({ place }: { place?: PlaceData }) {
  const region = useRef<HTMLDivElement>(null);
  const swipeFrom = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduce = Boolean(useReducedMotion());

  const displayRating = place?.rating ?? GOOGLE_RATING;
  const displayReviewCount = place?.userRatingCount ?? GOOGLE_REVIEW_COUNT;

  const reviewItems =
    place?.reviews && place.reviews.length > 0
      ? place.reviews.map((r, i) => ({
          id: r.name || `place-review-${i}`,
          author: r.authorAttribution?.displayName || "Guest",
          date: r.relativePublishTimeDescription || "",
          quote: r.text || "",
        }))
      : REVIEWS.map((r, i) => ({
          id: `static-review-${i}`,
          author: r.name,
          date: r.date,
          quote: r.quote,
        }));

  const count = reviewItems.length;
  const go = (step: number) => setIndex((i) => (i + step + count) % count);

  // Reviews move on by themselves, but only while they're on screen and nobody is reading
  // closely: hovering, keyboard focus or the pause button holds the current one.
  const autoplay = !reduce && count > 1;
  const running = autoplay && inView && !hovered && !focused && !paused;

  useEffect(() => {
    const node = region.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="section-y overflow-hidden">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
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
                  {displayRating.toFixed(1)}
                </span>
                <Stars rating={displayRating} />
              </p>
              <p className="tnum mt-1.5 text-[15px] text-stone">
                {displayReviewCount.toLocaleString()} reviews on Google
              </p>
            </div>
          </div>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-line mt-8 hidden lg:inline-flex"
          >
            Read reviews on Google
            <IconArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>

        <div
          ref={region}
          role="region"
          aria-roledescription="carousel"
          aria-label="Guest reviews"
          onKeyDown={onKeyDown}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onFocus={(e) => e.target.matches(":focus-visible") && setFocused(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
          className="lg:col-span-8"
        >
          {/* A sliding track: every slide stretches to the tallest, so the card never jumps. */}
          <div
            className="touch-pan-y overflow-hidden rounded-[28px] bg-wash sm:rounded-[32px]"
            onPointerDown={(e) => {
              swipeFrom.current = e.clientX;
            }}
            onPointerUp={(e) => {
              if (swipeFrom.current === null) return;
              const dx = e.clientX - swipeFrom.current;
              swipeFrom.current = null;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            }}
            onPointerCancel={() => {
              swipeFrom.current = null;
            }}
          >
            <div
              aria-live={running ? "off" : "polite"}
              className="flex transition-transform duration-700 ease-soft"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {reviewItems.map((review, i) => (
                <figure
                  key={review.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}`}
                  inert={i !== index}
                  className="w-full shrink-0 select-none p-7 sm:p-12"
                >
                  <p className="flex items-center gap-2 text-[14px] font-medium text-stone">
                    <IconGoogle className="h-4 w-4" />
                    Review on Google
                  </p>
                  <blockquote className="mt-5 font-display text-[clamp(1.35rem,2.6vw,2.2rem)] leading-[1.32] text-ink sm:mt-6">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 text-[15px] text-stone sm:mt-8">
                    <span className="font-medium text-ink">{review.author}</span>
                    {review.date ? ` · ${review.date}` : ""}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 sm:mt-5 sm:gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-ink sm:h-12 sm:w-12"
            >
              <IconChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next review"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-ink sm:h-12 sm:w-12"
            >
              <IconChevronRight className="h-5 w-5" />
            </button>

            {/* The active bar fills while a review is showing; when it's full, the next one slides in. */}
            <div className="ml-1 flex flex-1 items-center gap-2 sm:ml-2">
              {reviewItems.map((review, i) => (
                <button
                  key={review.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show review ${i + 1} of ${count}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group grid h-11 max-w-16 flex-1 place-items-center"
                >
                  <span className="relative h-[3px] w-full overflow-hidden rounded-full bg-ink/15 group-hover:bg-ink/30">
                    {i === index && (
                      <span
                        key={index}
                        onAnimationEnd={() => go(1)}
                        className="absolute inset-0 origin-left rounded-full bg-ink"
                        style={
                          autoplay
                            ? {
                                animation: `review-progress ${SLIDE_MS}ms linear forwards`,
                                animationPlayState: running ? "running" : "paused",
                              }
                            : undefined
                        }
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>

            {autoplay && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play reviews" : "Pause reviews"}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-stone transition-colors hover:text-ink"
              >
                {paused ? <IconPlay className="h-4 w-4" /> : <IconPause className="h-4 w-4" />}
              </button>
            )}
          </div>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-line mt-6 lg:hidden"
          >
            Read reviews on Google
            <IconArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
