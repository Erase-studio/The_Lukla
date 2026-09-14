"use client";

import { motion } from "framer-motion";

// Two real elevations on one scale: 180 units of height for 3,000 m.
const VIEW = { w: 600, h: 240, base: 216 };
const toY = (metres: number) => VIEW.base - metres * (180 / 3000);
const LUKLA = { x: 64, y: toY(2860) };
const NIAGARA = { x: 536, y: toY(175) };
const pct = (value: number, of: number) => `${(value / of) * 100}%`;
const EASE = [0.22, 1, 0.36, 1] as const;
const IN_VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;

export function ElevationProfile() {
  const line = `M ${LUKLA.x} ${LUKLA.y} C 250 ${LUKLA.y} 330 ${NIAGARA.y} ${NIAGARA.x} ${NIAGARA.y}`;
  const area = `${line} L ${NIAGARA.x} ${VIEW.base} L ${LUKLA.x} ${VIEW.base} Z`;

  return (
    <figure className="mt-12 pb-14">
      <div className="relative aspect-[5/2] w-full">
        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden
        >
          <defs>
            <linearGradient id="elevation-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--wall)" stopOpacity="0.5" />
              <stop offset="1" stopColor="var(--wall)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" x2={VIEW.w} y1={VIEW.base} y2={VIEW.base} stroke="var(--line)" />
          <motion.path
            d={area}
            fill="url(#elevation-fill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={IN_VIEW}
            transition={{ duration: 1.2, delay: 0.9 }}
          />
          <motion.path
            d={line}
            fill="none"
            stroke="var(--cobalt)"
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={IN_VIEW}
            transition={{ duration: 1.8, ease: EASE }}
          />
          {[LUKLA, NIAGARA].map((point) => (
            <circle
              key={point.x}
              cx={point.x}
              cy={point.y}
              r={6}
              fill="var(--cobalt)"
              stroke="var(--paper)"
              strokeWidth={3}
            />
          ))}
        </svg>

        {/* Above its dot, so the label never sits on the line leaving it. */}
        <div
          className="absolute -translate-x-2 -translate-y-full pb-4"
          style={{ left: pct(LUKLA.x, VIEW.w), top: pct(LUKLA.y, VIEW.h) }}
        >
          <p className="text-[15px] font-medium text-ink">
            Lukla, Nepal{" "}
            <span className="font-display font-normal text-cobalt" lang="ne">
              लुक्ला
            </span>
          </p>
          <p className="tnum mt-1 font-display text-[clamp(1.6rem,2.4vw,2rem)] leading-none text-ink">
            2,860 m
          </p>
        </div>

        <div
          className="absolute text-right"
          style={{ right: pct(VIEW.w - NIAGARA.x, VIEW.w), top: `calc(${pct(VIEW.base, VIEW.h)} + 12px)` }}
        >
          <p className="text-[15px] font-medium text-ink">Niagara Falls, New York</p>
          <p className="tnum mt-1 font-display text-[clamp(1.6rem,2.4vw,2rem)] leading-none text-ink">
            175 m
          </p>
        </div>

        <p
          className="absolute left-0 text-[13px] text-stone"
          style={{ top: `calc(${pct(VIEW.base, VIEW.h)} + 12px)` }}
        >
          Sea level
        </p>
      </div>
      <figcaption className="sr-only">
        Lukla, Nepal sits at 2,860 metres above sea level. Niagara Falls, New York sits at 175 metres.
      </figcaption>
    </figure>
  );
}
