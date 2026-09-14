import Image from "next/image";
import Link from "next/link";
import {
  ADDRESS,
  BRAND_LINE,
  EMAIL,
  FULL_MENU_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_URL,
} from "@/lib/menu-data";
import { NAV_LINKS } from "@/lib/nav";
import { IconArrowUpRight } from "./icons";

const linkClass = "inline-block py-1.5 text-[15px] text-stone transition-colors hover:text-ink";

export function Footer() {
  return (
    <footer id="site-footer" className="mx-auto max-w-[1240px] px-6 pb-12 pt-16 sm:pt-20 lg:px-10">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-5">
          <Link href="/" aria-label="The Lukla, home" className="inline-flex items-center gap-4">
            <Image src="/logo-mark.png" alt="" width={272} height={258} sizes="64px" className="h-12 w-auto" />
            <span aria-hidden className="h-10 w-px bg-line" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[22px] font-bold tracking-[-0.015em] text-ink">
                The Lukla
              </span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cobalt">
                Himalayan &amp; South Indian
              </span>
            </span>
          </Link>
          <p className="mt-6 max-w-sm font-display text-[1.65rem] leading-[1.2] text-ink">
            {BRAND_LINE}
          </p>
        </div>

        <nav aria-label="Footer Navigation" className="lg:col-span-3 lg:col-start-7">
          <h2 className="eyebrow">Explore</h2>
          <ul className="mt-4 space-y-0.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={FULL_MENU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} inline-flex items-center gap-1.5`}
              >
                Full menu (PDF)
                <IconArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="eyebrow">Location &amp; Contact</h2>
          <div className="mt-4 space-y-3 text-[15px] text-stone">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block leading-[1.6] transition-colors hover:text-ink"
            >
              {ADDRESS[0]}, {ADDRESS[1]}
            </a>
            <p>
              <a href={PHONE_HREF} className="tnum font-medium text-ink transition-colors hover:text-cobalt">
                {PHONE_DISPLAY}
              </a>
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-ink">
                {EMAIL}
              </a>
              <span>·</span>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[14px] text-stone sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 The Lukla Himalayan &amp; South Indian Kitchen. All rights reserved.</p>
        <a href="#main" className="inline-flex items-center gap-1.5 py-1 transition-colors hover:text-ink">
          Back to top
          <span aria-hidden>↑</span>
        </a>
      </div>
    </footer>
  );
}
