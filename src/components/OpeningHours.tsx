"use client";

import { HOURS } from "@/lib/hours";
import { useOpeningStatus } from "@/lib/use-opening-status";

type Tone = "dark" | "light";

export function OpenStatus({ tone, className = "" }: { tone: Tone; className?: string }) {
  const status = useOpeningStatus();
  const dark = tone === "dark";
  const dot =
    status === null
      ? "bg-wall"
      : status.open
        ? dark
          ? "bg-[#7ad7a0]"
          : "bg-[#2f9e6b]"
        : "bg-saffron";

  return (
    <p
      aria-live="polite"
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[15px] ${
        dark ? "border-paper/15 text-paper/85" : "border-ink/15 bg-paper/60 text-ink"
      } ${className}`}
    >
      <span aria-hidden className={`h-2 w-2 rounded-full ${dot}`} />
      <span className="tnum">{status?.text ?? "Open every day"}</span>
    </p>
  );
}

// One tile per run of days with the same hours; today's tile is lifted out.
export function HoursTiles({ tone, className = "" }: { tone: Tone; className?: string }) {
  const status = useOpeningStatus();
  const dark = tone === "dark";

  return (
    <dl className={`grid gap-3 ${className}`}>
      {HOURS.map((row) => {
        const today = status !== null && row.days.includes(status.today);
        const tile = today
          ? dark
            ? "bg-paper text-ink"
            : "bg-ink text-paper"
          : dark
            ? "bg-paper/[0.06] text-paper"
            : "bg-wash text-ink";
        const label = today
          ? dark
            ? "text-ink/70"
            : "text-paper/75"
          : dark
            ? "text-paper/70"
            : "text-stone";

        return (
          <div
            key={row.label}
            className={`rounded-2xl px-5 py-4 transition-colors duration-500 ${tile}`}
          >
            <dt className={`flex items-center justify-between gap-2 text-[14px] ${label}`}>
              <span>
                <span className="sr-only">{row.label}</span>
                <span aria-hidden>{row.short}</span>
              </span>
              {today && (
                <span className="rounded-full bg-cobalt px-2 py-0.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-paper">
                  Today
                </span>
              )}
            </dt>
            <dd className="tnum mt-1.5 text-[16px] font-medium">{row.time}</dd>
          </div>
        );
      })}
    </dl>
  );
}
