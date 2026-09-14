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
import { HOURS } from "@/lib/hours";
import { NAV_LINKS } from "@/lib/nav";
import { IconArrowUpRight, IconPhone } from "./icons";

const linkClass = "inline-block py-1.5 text-[16px] text-ink/80 transition-colors hover:text-ink";

export function Footer() {
  return (
    <footer id="site-footer" className="mx-auto max-w-[1240px] px-6 pb-10 pt-20 sm:pt-24 lg:px-10">
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link href="/" aria-label="The Lukla, home" className="inline-flex items-center gap-4">
            <Image src="/logo-mark.png" alt="" width={272} height={258} sizes="64px" className="h-14 w-auto" />
            <span aria-hidden className="h-11 w-px bg-line" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[24px] font-bold tracking-[-0.015em] text-ink">
                The Lukla
              </span>
              <span className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cobalt">
                Himalayan &amp; South Indian
              </span>
            </span>
          </Link>
          <p className="mt-8 max-w-xs font-display text-[1.9rem] leading-[1.15] text-ink">
            {BRAND_LINE}
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-6">
          <h2 className="eyebrow">Explore</h2>
          <ul className="mt-4">
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
          <h2 className="eyebrow">Visit</h2>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block py-1.5 text-[16px] leading-[1.6] text-ink/80 transition-colors hover:text-ink"
          >
            {ADDRESS[0]}
            <br />
            {ADDRESS[1]}
          </a>
          <dl className="mt-3 max-w-[18rem] space-y-1.5 text-[15px]">
            {HOURS.map((row) => (
              <div key={row.label} className="flex justify-between gap-4">
                <dt className="text-stone">
                  <span className="sr-only">{row.label}</span>
                  <span aria-hidden>{row.short}</span>
                </dt>
                <dd className="tnum text-ink/80">{row.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-2">
          <h2 className="eyebrow">Contact</h2>
          <ul className="mt-4">
            <li>
              <a href={PHONE_HREF} className={`${linkClass} tnum`}>
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className={`${linkClass} break-all`}>
                {EMAIL}
              </a>
            </li>
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                WhatsApp
              </a>
            </li>
          </ul>
          <a href={PHONE_HREF} className="btn btn-solid mt-5 gap-2.5">
            <IconPhone className="h-4 w-4" />
            Call to order
          </a>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-[14px] text-stone sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 The Lukla Himalayan &amp; South Indian Kitchen</p>
        <a href="#main" className="inline-flex items-center gap-2 py-1.5 transition-colors hover:text-ink">
          Back to top
          <span aria-hidden>↑</span>
        </a>
      </div>
    </footer>
  );
}
