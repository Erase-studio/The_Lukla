import type { Metadata } from "next";
import { Anek_Latin, Eczar } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";
import { PageTransition } from "@/components/PageTransition";

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

export const metadata: Metadata = {
  title: {
    default:
      "The Lukla · Himalayan & South Indian Kitchen in Niagara Falls, NY",
    template: "%s · The Lukla, Niagara Falls",
  },
  description:
    "Momos, thukpa, dosa and biryani, cooked to order three minutes from Niagara Falls State Park. Open every day.",
  openGraph: {
    title: "The Lukla · Himalayan & South Indian Kitchen",
    description:
      "Momos, thukpa, dosa and biryani, cooked to order three minutes from Niagara Falls State Park. Open every day.",
    url: "https://thelukla.com",
    siteName: "The Lukla",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lukla · Himalayan & South Indian Kitchen",
    description:
      "Momos, thukpa, dosa and biryani, cooked to order three minutes from Niagara Falls State Park.",
  },
  metadataBase: new URL("https://thelukla.com"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${eczar.variable} ${anek.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <MotionProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <MobileActionBar />
        </MotionProvider>
      </body>
    </html>
  );
}
