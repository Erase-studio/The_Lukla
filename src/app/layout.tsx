import type { Metadata } from "next";
import { Anek_Latin, Eczar } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
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
  title: "The Lukla · Himalayan & South Indian Kitchen in Niagara Falls, NY",
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
        {/*
          MotionProvider sits at the root so every page and component inherits
          the reducedMotion="user" config without each needing to import it.
          SiteHeader and Footer are rendered once here and persist across all
          client navigations — they never unmount, so no flash or re-mount cost.
        */}
        <MotionProvider>
          <SiteHeader />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
