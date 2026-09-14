import { Reveal } from "./Reveal";

export const darkPrimary = "btn bg-paper text-ink hover:bg-wall";
export const darkSecondary = "btn border border-paper/25 hover:border-paper";

// The navy card that closes a page and points to the next thing to do.
export function ClosingCta({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby="closing-heading" className="px-3 sm:px-5">
      <div className="mx-auto max-w-[1480px] rounded-[36px] bg-ink px-6 py-16 text-paper sm:px-12 sm:py-20 lg:px-16">
        <Reveal className="mx-auto flex max-w-[1160px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-paper/65">{eyebrow}</p>
            <h2
              id="closing-heading"
              className="mt-5 max-w-2xl font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05]"
            >
              {title}
            </h2>
            <p className="mt-5 max-w-lg text-[18px] leading-[1.6] text-paper/75">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
