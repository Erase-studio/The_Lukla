import { Reveal } from "./Reveal";

const ITEMS = [
  {
    title: "Something for every diet.",
    text: "Vegan and Jain plates on request, and halal options.",
  },
  {
    title: "Dine your way.",
    text: "Eat in, take out, pick up curbside, or sit outside.",
  },
  {
    title: "Three minutes from the Falls.",
    text: "Inside Comfort Inn The Pointe, with free parking.",
  },
  {
    title: "Open every day.",
    text: "From breakfast to late dinner.",
  },
];

// Big statements, small print: the headline carries each point and the line under it just confirms it.
export function WhatToExpect() {
  return (
    <section aria-labelledby="expect-heading" className="section-y bg-wash">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <Reveal className="lg:col-span-4">
          <h2
            id="expect-heading"
            className="font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] text-ink"
          >
            What to expect
          </h2>
        </Reveal>

        <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:col-span-8">
          {ITEMS.map((item) => (
            <div key={item.title} className="border-t border-ink/15 py-8">
              <dt className="font-display text-[clamp(1.75rem,3vw,2.4rem)] leading-[1.08] text-ink">
                {item.title}
              </dt>
              <dd className="mt-3 max-w-xs text-[16px] leading-[1.6] text-stone">{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
