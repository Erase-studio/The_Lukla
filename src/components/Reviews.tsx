import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, MAPS_URL, REVIEWS } from "@/lib/menu-data";
import { IconArrowUpRight, IconGoogle, IconStar } from "./icons";
import { Reveal } from "./Reveal";

// Five grey stars with a saffron copy clipped to the rating, so 4.4 shows as four and a bit.
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

// All three reviews are visible at once: one large, two smaller. No carousel to click through.
export function Reviews() {
  const [featured, ...others] = REVIEWS;

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="section-y">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="reviews-heading"
            className="font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] text-ink"
          >
            What guests say
          </h2>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <div className="flex items-center gap-4">
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
              className="btn btn-line"
            >
              Read reviews on Google
              <IconArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <figure className="flex flex-col rounded-[32px] bg-wash p-8 sm:p-12 lg:col-span-7">
            <p className="flex items-center gap-2 text-[14px] font-medium text-stone">
              <IconGoogle className="h-4 w-4" />
              Review on Google
            </p>
            <blockquote className="mt-6 flex-1 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.3] text-ink">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 text-[15px] text-stone">
              <span className="font-medium text-ink">{featured.name}</span>
              {" · "}
              {featured.date}
            </figcaption>
          </figure>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {others.map((review) => (
              <figure
                key={review.name}
                className="flex flex-col rounded-[28px] border border-line p-7 sm:p-8"
              >
                <blockquote className="flex-1 font-display text-[1.25rem] leading-[1.45] text-ink">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-2 text-[15px] text-stone">
                  <IconGoogle className="h-4 w-4" />
                  <span className="font-medium text-ink">{review.name}</span>
                  {" · "}
                  {review.date}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <p className="mt-5 text-[14px] text-stone">Excerpts from reviews on Google.</p>
      </div>
    </section>
  );
}
