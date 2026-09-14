import { Reveal } from "./Reveal";
import { SkylightGlow } from "./SkylightGlow";

// The opening card for every page after Home: the same blue wall as the hero, shorter,
// with the page's food art cropped by the card edge.
export function PageHeader({
  eyebrow,
  title,
  intro,
  art,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  art?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="px-3 pt-[120px] sm:px-5 lg:pt-[140px]">
      <div className="relative isolate mx-auto max-w-[1480px] overflow-hidden rounded-[36px] bg-wash">
        <SkylightGlow />

        {art && (
          <div className="pointer-events-none absolute -right-[3%] top-1/2 hidden w-[38%] max-w-[540px] -translate-y-1/2 lg:block">
            {art}
          </div>
        )}

        <div className="relative mx-auto max-w-[1240px] px-6 pt-14 pb-14 sm:pt-20 sm:pb-20 lg:px-10 lg:py-24">
          <Reveal className="max-w-2xl lg:max-w-[56%]">
            <p className="eyebrow text-cobalt">{eyebrow}</p>
            <h1 className="mt-5 font-display text-[clamp(2.75rem,6.4vw,5.5rem)] leading-[0.98] tracking-[-0.02em] text-ink">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-[18px] leading-[1.6] text-stone">{intro}</p>
            {children}
          </Reveal>

          {/* Phones and tablets: the art rises from the bottom edge of the card instead. */}
          {art && (
            <div className="pointer-events-none relative mx-auto -mb-28 mt-10 w-[72%] max-w-[340px] sm:-mb-36 lg:hidden">
              {art}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
