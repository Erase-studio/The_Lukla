"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { IconChevronLeft, IconChevronRight, IconX } from "./icons";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  // Plates are transparent cut-outs shown on the blue tile; photos fill their tile.
  kind: "plate" | "photo";
  span: string;
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const count = items.length;
  const current = items[index];

  const show = (i: number) => {
    setIndex(i);
    setOpen(true);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const step = (delta: number) => setIndex((i) => (i + delta + count) % count);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };

  return (
    <section aria-label="Photos" className="section-y">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <ul className="grid auto-rows-[clamp(150px,19vw,250px)] grid-flow-dense grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
          {items.map((item, i) => (
            <li key={item.src} className={item.span}>
              <button
                type="button"
                onClick={() => show(i)}
                aria-label={`Open photo: ${item.caption}`}
                className="group relative block h-full w-full overflow-hidden rounded-[24px] bg-wash"
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
                      ? "object-contain p-[12%] drop-shadow-[0_22px_26px_rgba(21,34,61,0.26)] group-hover:rotate-6 group-hover:scale-[1.04]"
                      : "object-cover group-hover:scale-[1.04]"
                  }`}
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-paper/90 px-3 py-1.5 text-[13px] font-medium text-ink backdrop-blur">
                  {item.caption}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Native modal dialog: focus is trapped and Escape closes it without extra code. */}
      <dialog
        ref={dialog}
        aria-label="Photo viewer"
        onClose={() => setOpen(false)}
        onKeyDown={onKeyDown}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-paper backdrop:bg-ink/90 backdrop:backdrop-blur-sm open:flex open:flex-col"
      >
        {open && (
          <>
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <p className="tnum text-[14px] text-paper/70">
                {index + 1} / {count}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close photo viewer"
                className="grid h-12 w-12 place-items-center rounded-full border border-paper/25 transition-colors hover:border-paper"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>

            <div
              className="relative min-h-0 flex-1"
              onClick={(e) => e.target === e.currentTarget && close()}
            >
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className={current.kind === "plate" ? "object-contain p-[8%]" : "object-contain p-4 sm:p-8"}
              />
            </div>

            <div className="flex items-center justify-between gap-4 px-5 pb-6 pt-4 sm:px-8">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-paper/25 transition-colors hover:border-paper"
              >
                <IconChevronLeft className="h-5 w-5" />
              </button>
              <p className="text-center text-[16px]" aria-live="polite">
                {current.caption}
              </p>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-paper/25 transition-colors hover:border-paper"
              >
                <IconChevronRight className="h-5 w-5" />
              </button>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
