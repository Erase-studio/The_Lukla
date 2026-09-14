import { Reveal } from "./Reveal";

const ITEMS = [
  {
    title: "Two kitchens, one table",
    text: "Himalayan momos, thukpa and chowmein on the same menu as South Indian dosa, idli and biryani.",
  },
  {
    title: "For every diet",
    text: "Vegan and Jain plates on request, and halal options.",
  },
  {
    title: "However you like to eat",
    text: "Dine in, take out, pick up curbside, or sit outside.",
  },
  {
    title: "Easy to reach",
    text: "Inside Comfort Inn The Pointe, three minutes from Niagara Falls State Park, with free parking.",
  },
];

export function WhatToExpect() {
  return (
    <section aria-labelledby="expect-heading" className="section-y bg-wash">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow">Good to know</p>
          <h2
            id="expect-heading"
            className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] text-ink"
          >
            What to expect
          </h2>
        </Reveal>

        {/* A 1px gap over a darker ground draws hairline dividers between the tiles. */}
        <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[28px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <div key={item.title} className="bg-wash p-7 lg:p-8">
              <dt className="font-display text-[1.55rem] leading-tight text-ink">{item.title}</dt>
              <dd className="mt-3 text-[16px] leading-[1.6] text-stone">{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
