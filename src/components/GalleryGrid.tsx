"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMediaQuery } from "@/lib/use-media-query";
import { IconChevronLeft, IconChevronRight, IconX } from "./icons";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  // Plates are transparent cut-outs shown on the blue tile; photos fill their tile.
  kind: "plate" | "photo";
  span: string;
};

function GalleryTile({
  item,
  index,
  onShow,
  progress,
  still,
}: {
  item: GalleryItem;
  index: number;
  onShow: (i: number) => void;
  progress: ReturnType<typeof useSpring>;
  still: boolean;
}) {
  // Alternating differential parallax across masonry grid columns
  const driftY = (index % 3 - 1) * 18;
  const tileY = useTransform(progress, [0, 1], still ? [0, 0] : [driftY, -driftY]);

  return (
    <motion.li style={{ y: tileY }} className={item.span}>
      <button
        type="button"
        onClick={() => onShow(index)}
        aria-label={`Open photo: ${item.caption}`}
        className="group relative block h-full w-full overflow-hidden rounded-[24px] bg-wash shadow-[0_16px_36px_-20px_rgba(21,34,61,0.18)]"
      >
        {item.kind === "plate" && (
          <span
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(255,255,255,0.85),transparent_72%)]"
          />
        )}
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(min-width:768px) 40vw, 90vw"
          className={`transition-transform duration-[900ms] ease-soft ${
            item.kind === "plate"
              ? "object-contain p-[12%] drop-shadow-[0_22px_26px_rgba(21,34,61,0.26)] group-hover:rotate-6 group-hover:scale-[1.05]"
              : "object-cover group-hover:scale-[1.05]"
          }`}
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-paper/90 px-3 py-1.5 text-[13px] font-medium text-ink backdrop-blur">
          {item.caption}
        </span>
      </button>
    </motion.li>
  );
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const section = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  // Tiles only drift from tablet width up: on a two-column phone grid the offsets made tiles overlap.
  const wide = useMediaQuery("(min-width: 768px)");
  const still = reduceMotion || !wide;
  const [index, setIndex] = useState(0);
  const count = items.length;
  const current = items[index];

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  const show = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const step = (delta: number) => setIndex((i) => (i + delta + count) % count);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };

  return (
    <section ref={section} aria-label="Photos" className="section-y overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <ul className="grid auto-rows-[clamp(150px,19vw,250px)] grid-flow-dense grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
          {items.map((item, i) => (
            <GalleryTile
              key={item.src}
              item={item}
              index={i}
              onShow={show}
              progress={progress}
              still={still}
            />
          ))}
        </ul>
      </div>

      {/* Native modal dialog: focus is trapped and Escape closes it without extra code. */}
      <dialog
        ref={dialog}
        aria-label="Photo viewer"
        onKeyDown={onKeyDown}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="backdrop:bg-ink/80 backdrop:backdrop-blur-sm fixed inset-0 m-auto max-h-[92svh] max-w-[92vw] overflow-hidden rounded-[32px] bg-paper p-0 text-ink shadow-[0_40px_80px_rgba(21,34,61,0.6)]"
      >
        {current && (
          <div className="flex flex-col">
            <div className="relative aspect-[4/3] w-full max-w-[960px] bg-wash sm:aspect-[16/10]">
              {current.kind === "plate" && (
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(255,255,255,0.85),transparent_72%)]"
                />
              )}
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(min-width:1024px) 960px, 90vw"
                className={
                  current.kind === "plate"
                    ? "object-contain p-[10%] drop-shadow-[0_30px_36px_rgba(21,34,61,0.32)]"
                    : "object-cover"
                }
              />
              <button
                type="button"
                onClick={close}
                aria-label="Close photo"
                className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-paper/90 text-ink backdrop-blur transition hover:bg-paper"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-line px-6 py-4">
              <div>
                <p className="font-display text-[1.4rem] leading-tight text-ink">{current.caption}</p>
                <p className="tnum mt-0.5 text-[14px] text-stone">
                  {index + 1} of {count}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink"
                >
                  <IconChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink"
                >
                  <IconChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
