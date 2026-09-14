import type { Metadata } from "next";
import { Anek_Latin, Eczar } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { MotionProvider } from "@/components/MotionProvider";
import { OPENING_MINUTES } from "@/lib/hours";
import { ADDRESS, EMAIL } from "@/lib/menu-data";
import "./globals.css";

// Eczar (Rosetta) was drawn for Devanagari and Latin together, so "लुक्ला" and "Lukla" share one voice.
const eczar = Eczar({
  variable: "--font-eczar",
  subsets: ["latin", "devanagari"],
});

// Anek Latin (Ek Type, Mumbai): a variable width sans for body copy.
const anek = Anek_Latin({
  variable: "--font-anek",
  subsets: ["latin"],
  axes: ["wdth"],
});

const DESCRIPTION =
  "Himalayan momos and thukpa, South Indian dosa and biryani, cooked to order three minutes from Niagara Falls State Park. Open every day.";

export const metadata: Metadata = {
  title: {
    default: "The Lukla · Himalayan & South Indian Kitchen in Niagara Falls, NY",
    template: "%s · The Lukla, Niagara Falls",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The Lukla",
    title: "The Lukla · Himalayan & South Indian Kitchen in Niagara Falls, NY",
    description: DESCRIPTION,
  },
};

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hhmm = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

// Restaurant structured data, so search engines can show address, phone and hours directly.
const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "The Lukla Himalayan & South Indian Kitchen",
  servesCuisine: ["Nepalese", "Himalayan", "South Indian", "Indian"],
  telephone: "+1-716-461-3694",
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS[0],
    addressLocality: "Niagara Falls",
    addressRegion: "NY",
    postalCode: "14303",
    addressCountry: "US",
  },
  openingHoursSpecification: OPENING_MINUTES.map(([opens, closes], day) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: DAYS[day],
    opens: hhmm(opens),
    closes: hhmm(closes),
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${eczar.variable} ${anek.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantSchema).replace(/</g, "\u003c"),
          }}
        />
        <MotionProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <MobileActionBar />
        </MotionProvider>
      </body>
    </html>
  );
}
