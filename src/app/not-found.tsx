import type { Metadata } from "next";
import Link from "next/link";
import { SkylightGlow } from "@/components/SkylightGlow";
import { IconArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="px-3 pt-[120px] sm:px-5 lg:pt-[140px]">
      <div className="relative isolate mx-auto flex min-h-[62svh] max-w-[1480px] flex-col items-center justify-center overflow-hidden rounded-[36px] bg-wash px-6 py-20 text-center">
        <SkylightGlow />
        <p className="tnum font-display text-[clamp(5rem,14vw,10rem)] leading-none text-cobalt/30">
          404
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] text-ink">
          This page wandered off the trail
        </h1>
        <p className="mt-5 max-w-md text-[18px] leading-[1.6] text-stone">
          The link may be old, or the page has moved. The menu is right where we left it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-solid">
            Back to home
          </Link>
          <Link href="/menu" className="group btn btn-line">
            Explore the menu
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
