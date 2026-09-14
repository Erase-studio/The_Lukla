"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";
import {
  BOOK_PAGES,
  BOOK_SECTIONS,
  pageFromHash,
  pageIndex,
  type BookBlock,
  type BookPage,
  type PageFlipApi,
  type PlateName,
} from "@/lib/menu-book";
import { ADDRESS, PHONE_DISPLAY } from "@/lib/menu-data";

// Every size inside a page is in container units (cqw), so a page reads the same on a phone
// as it does in a desktop spread: only the scale changes.

const TONES = {
  paper: "bg-[#fcfdff] text-ink",
  wash: "bg-wash text-ink",
  ink: "bg-ink text-paper",
} as const;

// react-pageflip hands each page a ref and moves it into its own layout, so the ref must reach the DOM.
function Sheet({
  ref,
  hard = false,
  tone = "paper",
  children,
}: {
  ref?: React.Ref<HTMLDivElement>;
  hard?: boolean;
  tone?: keyof typeof TONES;
  children: React.ReactNode;
}) {
  return (
    <div ref={ref} data-density={hard ? "hard" : "soft"} className={`overflow-hidden ${TONES[tone]}`}>
      <div className="@container relative isolate h-full w-full">{children}</div>
    </div>
  );
}

// In a spread, odd pages sit on the left; the shading marks the spine between them.
// A single page on a phone is always bound on its left edge.
function Spine({ index }: { index: number }) {
  const left = index % 2 === 1;
  const shade = "pointer-events-none absolute inset-y-0 -z-10 w-[9cqw] from-ink/[0.07] to-transparent";
  return left ? (
    <>
      <span aria-hidden className={`${shade} right-0 bg-gradient-to-l group-data-[portrait=true]/book:hidden`} />
      <span aria-hidden className={`${shade} left-0 hidden bg-gradient-to-r group-data-[portrait=true]/book:block`} />
    </>
  ) : (
    <span aria-hidden className={`${shade} left-0 bg-gradient-to-r`} />
  );
}

function Folio({ index }: { index: number }) {
  const left = index % 2 === 1;
  return (
    <footer
      className={`mt-auto flex items-center gap-[2.5cqw] pt-[3cqw] ${
        left ? "" : "flex-row-reverse"
      } group-data-[portrait=true]/book:flex-row-reverse`}
    >
      <span className="tnum text-[3.4cqw] font-medium text-ink">{index}</span>
      <span className="h-px flex-1 bg-line" />
      <span className="font-brand text-[3.6cqw] text-ink/60">The Lukla</span>
    </footer>
  );
}

function PageHead({ kitchen, title, note, narrow }: { kitchen: string; title: string; note?: string; narrow?: boolean }) {
  return (
    <header className={narrow ? "pr-[30cqw]" : ""}>
      <p className="text-[3.3cqw] font-semibold uppercase tracking-[0.16em] text-cobalt">{kitchen}</p>
      <h3 className="mt-[1.8cqw] font-display text-[9.4cqw] leading-[0.98] tracking-[-0.01em] text-ink">
        {title}
      </h3>
      {note && <p className="mt-[2.2cqw] text-[3.6cqw] leading-[1.4] text-stone">{note}</p>}
    </header>
  );
}

function Price({ value }: { value: string }) {
  return <span className="tnum shrink-0 text-[4.2cqw] font-medium text-ink">${value}</span>;
}

function Block({ block }: { block: BookBlock }) {
  const heading = block.title && (
    <div className="mb-[1.2cqw] border-b border-ink/15 pb-[1.6cqw]">
      <h4 className="font-display text-[5.6cqw] leading-none text-ink">{block.title}</h4>
      {block.note && <p className="mt-[1.2cqw] text-[3.5cqw] text-stone">{block.note}</p>}
    </div>
  );

  if (block.kind === "grid") {
    return (
      <div className="mt-[5cqw] first:mt-0">
        {heading}
        <div className="rounded-[3.5cqw] bg-wash px-[4cqw] pb-[1.5cqw] pt-[3cqw]">
          <div className="grid grid-cols-[1fr_repeat(3,15cqw)] items-baseline">
            <span />
            {block.columns.map((column) => (
              <span
                key={column}
                className="text-center text-[3.2cqw] font-semibold uppercase tracking-[0.12em] text-cobalt"
              >
                {column}
              </span>
            ))}
          </div>
          {block.rows.map((row) => (
            <div
              key={row.name}
              className="grid grid-cols-[1fr_repeat(3,15cqw)] items-baseline border-t border-ink/10 py-[2.4cqw] first-of-type:mt-[2cqw]"
            >
              <span className="text-[4.4cqw] font-medium leading-tight text-ink">
                {row.name}
                {row.count && <span className="ml-[1.4cqw] text-[3.4cqw] font-normal text-stone">{row.count}</span>}
              </span>
              {row.prices.map((price, i) => (
                <span key={i} className="tnum text-center text-[4.2cqw] font-medium text-ink">
                  {price}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[5cqw] first:mt-0">
      {heading}
      <ul>
        {block.items.map((item) => (
          <li key={item.name} className="py-[1.3cqw]">
            <div className="flex items-baseline gap-[1.8cqw]">
              <span className="text-[4.2cqw] font-medium leading-[1.25] text-ink">
                {item.name}
                {item.count && (
                  <span className="ml-[1.4cqw] whitespace-nowrap text-[3.4cqw] font-normal text-stone">
                    {item.count}
                  </span>
                )}
              </span>
              <span aria-hidden className="min-w-[4cqw] flex-1 -translate-y-[0.9cqw] border-b border-dotted border-ink/30" />
              <Price value={item.price} />
            </div>
            {item.note && (
              <p className="mt-[0.5cqw] pr-[12cqw] text-[3.5cqw] leading-[1.35] text-stone">{item.note}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MenuPageContent({ page, index, plate }: { page: BookPage; index: number; plate?: string }) {
  return (
    <>
      <Spine index={index} />
      {page.range && (
        <Image
          src="/himalaya-range.webp"
          alt=""
          width={2400}
          height={588}
          sizes="(min-width: 768px) 520px, 360px"
          className="pointer-events-none absolute inset-x-0 bottom-[13cqw] -z-10 h-auto w-full opacity-40 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
        />
      )}
      {plate && (
        <div aria-hidden className="pointer-events-none absolute -right-[10cqw] -top-[11cqw] aspect-square w-[44cqw]">
          <span className="absolute inset-[14%] translate-y-[5%] rounded-full bg-ink/15 blur-[3cqw]" />
          <Image src={plate} alt="" fill sizes="240px" className="object-contain" />
        </div>
      )}
      <div className="flex h-full flex-col px-[8cqw] pb-[5.5cqw] pt-[8.5cqw]">
        <PageHead kitchen={page.kitchen} title={page.title} note={page.note} narrow={Boolean(plate)} />
        <div className="mt-[4.5cqw]">
          {page.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
        <Folio index={index} />
      </div>
    </>
  );
}

function CoverContent() {
  return (
    <>
      {/* Light falling on the blue wall, as in the dining room. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_45%_at_50%_30%,rgba(255,255,255,0.9),transparent_75%)]" />
      <div className="flex h-full flex-col items-center px-[9cqw] pt-[12cqw] text-center">
        <Image
          src="/logo-text.png"
          alt="The Lukla, Himalayan & South Indian"
          width={1030}
          height={242}
          sizes="(min-width: 768px) 380px, 260px"
          className="h-auto w-[76cqw]"
        />
        <p className="mt-[13cqw] text-[3.4cqw] font-semibold uppercase tracking-[0.34em] text-cobalt">
          Niagara Falls · New York
        </p>
        <h2 className="mt-[2cqw] font-display text-[25cqw] leading-[0.9] tracking-[-0.02em] text-ink">Menu</h2>
        <p className="mt-[3cqw] text-[3.9cqw] text-stone">Cooked to order, every day</p>
      </div>
      <Image
        src="/himalaya-range.webp"
        alt=""
        width={2400}
        height={588}
        sizes="(min-width: 768px) 520px, 360px"
        className="absolute inset-x-0 bottom-[26cqw] -z-10 h-auto w-full opacity-70"
      />
      <div aria-hidden className="absolute -bottom-[42cqw] left-1/2 aspect-square w-[98cqw] -translate-x-1/2">
        <span className="absolute inset-[10%] translate-y-[4%] rounded-full bg-ink/25 blur-[5cqw]" />
        <Image src="/thali-plate.png" alt="" fill sizes="(min-width: 768px) 520px, 360px" className="object-contain" />
      </div>
    </>
  );
}

function ContentsContent({ onJump }: { onJump: (page: number) => void }) {
  return (
    <>
      <Spine index={1} />
      <div className="flex h-full flex-col px-[8cqw] pb-[5.5cqw] pt-[8.5cqw]">
        <PageHead kitchen="Inside" title="Contents" />
        <ol className="mt-[4.5cqw] border-t border-ink/15">
          {BOOK_SECTIONS.map((section) => {
            const page = pageIndex(section.id);
            return (
              <li key={section.id}>
                {/* Buttons stay out of the tab order: the book is hidden from assistive tech,
                    which gets the same menu as plain text instead. */}
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => onJump(page)}
                  className="flex w-full items-baseline gap-[1.8cqw] py-[1.55cqw] text-left transition-colors hover:text-cobalt"
                >
                  <span className="pointer-events-none text-[4.2cqw] font-medium leading-tight">{section.label}</span>
                  <span className="pointer-events-none min-w-[4cqw] flex-1 -translate-y-[0.9cqw] border-b border-dotted border-ink/30" />
                  <span className="tnum pointer-events-none text-[4.2cqw] text-stone">{page}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="mt-[4cqw] text-[3.5cqw] leading-[1.4] text-stone">Halal options available.</p>
        <Folio index={1} />
      </div>
    </>
  );
}

function BackContent() {
  return (
    <>
      <Image
        src="/himalaya-range.webp"
        alt=""
        width={2400}
        height={588}
        sizes="(min-width: 768px) 520px, 360px"
        className="absolute inset-x-0 bottom-0 -z-10 h-auto w-full opacity-[0.08] invert"
      />
      <div className="flex h-full flex-col items-center justify-center px-[10cqw] text-center">
        <Image src="/logo-mark.png" alt="" width={272} height={258} sizes="140px" className="h-auto w-[26cqw]" />
        <p className="mt-[8cqw] font-display text-[9cqw] leading-[1.05]">Thank you for eating with us</p>
        <p className="mt-[6cqw] text-[4cqw] leading-[1.5] text-paper/75">
          {ADDRESS[0]}
          <br />
          {ADDRESS[1]}
        </p>
        <p className="tnum mt-[3cqw] text-[5.2cqw] font-medium">{PHONE_DISPLAY}</p>
        <p className="mt-[9cqw] text-[3.3cqw] font-semibold uppercase tracking-[0.16em] text-paper/55">
          Vegan &amp; Jain menus · Halal options
        </p>
      </div>
    </>
  );
}

type Props = {
  plates: Partial<Record<PlateName, string>>;
  onReady: (flip: PageFlipApi) => void;
  onFlip: (page: number) => void;
  onOrientation: (mode: "portrait" | "landscape") => void;
  onJump: (page: number) => void;
};

function BookPagesInner({ plates, onReady, onFlip, onOrientation, onJump }: Props) {
  const book = useRef<{ pageFlip: () => PageFlipApi | undefined } | null>(null);
  // A link like /menu#dosa-idli opens the book at that page.
  const [startPage] = useState(() => pageFromHash(window.location.hash));

  // react-pageflip builds the book a render after mounting and fires "init" before its
  // listeners are attached, so wait for the instance to exist instead.
  useEffect(() => {
    let frame = requestAnimationFrame(function check() {
      const flip = book.current?.pageFlip();
      if (flip?.getFlipController()) {
        onReady(flip);
        return;
      }
      frame = requestAnimationFrame(check);
    });
    return () => cancelAnimationFrame(frame);
  }, [onReady]);

  // The pages are built once: new children would make the library rebuild the whole book.
  const sheets = useMemo(
    () => [
      <Sheet key="cover" hard tone="wash">
        <CoverContent />
      </Sheet>,
      <Sheet key="contents">
        <ContentsContent onJump={onJump} />
      </Sheet>,
      ...BOOK_PAGES.map((page) => {
        const index = pageIndex(page.id);
        return (
          <Sheet key={page.id}>
            <MenuPageContent page={page} index={index} plate={page.plate && plates[page.plate]} />
          </Sheet>
        );
      }),
      <Sheet key="back" hard tone="ink">
        <BackContent />
      </Sheet>,
    ],
    [plates, onJump],
  );

  return (
    <HTMLFlipBook
      ref={book}
      className="mx-auto"
      style={{}}
      width={400}
      height={640}
      size="stretch"
      minWidth={260}
      maxWidth={560}
      minHeight={416}
      maxHeight={896}
      startPage={startPage}
      drawShadow
      flippingTime={750}
      usePortrait
      startZIndex={0}
      autoSize
      maxShadowOpacity={0.35}
      showCover
      mobileScrollSupport
      clickEventForward
      useMouseEvents
      swipeDistance={30}
      showPageCorners
      disableFlipByClick={false}
      onFlip={(e) => onFlip(e.data)}
      onChangeOrientation={(e) => onOrientation(e.data)}
    >
      {sheets}
    </HTMLFlipBook>
  );
}

export const BookPages = memo(BookPagesInner);
