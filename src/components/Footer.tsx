import Image from "next/image";
import Link from "next/link";
import { EMAIL, FULL_MENU_URL } from "@/lib/menu-data";

const LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1240px] px-6 pb-10 pt-20 lg:px-10">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" aria-label="The Lukla, back to home" className="self-start">
          <Image
            src="/logo-mark.png"
            alt=""
            width={272}
            height={258}
            sizes="64px"
            className="h-16 w-auto"
          />
        </Link>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-stone">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={FULL_MENU_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            Full menu ↗
          </a>
        </nav>
      </div>

      <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[14px] text-stone sm:flex-row sm:justify-between">
        <p>© 2026 The Lukla Himalayan &amp; South Indian Kitchen</p>
        <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-ink">
          {EMAIL}
        </a>
      </div>
    </footer>
  );
}
