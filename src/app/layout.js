import React from "react";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThreeBackgroundWrapper from "../components/ThreeBackgroundWrapper";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata = {
  metadataBase: new URL("https://www.veesstardiamonds.com"),
  icons: {
    icon: "/VEES STAR LOGO.png",
    shortcut: "/VEES STAR LOGO.png",
    apple: "/VEES STAR LOGO.png",
  },
  title: {
    default: "Vees Star Diamonds | GIA Certified Solitaires Chennai",
    template: "%s | Vees Star Diamonds",
  },
  description:
    "Ultra-premium GIA-certified solitaire diamonds and bespoke temple-architectural jewellery handcrafted in Chennai and Karaikudi, Tamil Nadu.",
  keywords: [
    "Vees Star Diamonds",
    "diamond showroom Chennai",
    "GIA certified solitaires Karaikudi",
    "bespoke diamond rings Tamil Nadu",
    "custom diamond jewellery Madras",
    "diamond showroom Anna Nagar",
  ],
  authors: [{ name: "Vees Star Diamonds", url: "https://www.veesstardiamonds.com" }],
  creator: "Vees Star Diamonds",
  publisher: "Vees Star Diamonds",
  category: "jewellery",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.veesstardiamonds.com",
    siteName: "Vees Star Diamonds",
    title: "Vees Star Diamonds | GIA Certified Solitaires Chennai",
    description:
      "Ultra-premium GIA-certified solitaire diamonds and bespoke temple-architectural jewellery handcrafted in Chennai and Karaikudi, Tamil Nadu.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Vees Star Diamonds" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@veesstardiamonds",
    creator: "@veesstardiamonds",
    title: "Vees Star Diamonds | GIA Certified Solitaires Chennai",
    description:
      "Ultra-premium GIA-certified solitaire diamonds handcrafted in Chennai and Karaikudi, Tamil Nadu.",
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0E0C0A",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`light ${cormorant.variable} ${jost.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.whatsapp.com" />
      </head>
      <body className="bg-[#0E0C0A] text-[#FAF7F2] antialiased">
        <ThreeBackgroundWrapper />
        <ScrollToTop />
        <SmoothScroll>
          <div className="flex flex-col min-h-screen relative" style={{ zIndex: 1 }}>
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </SmoothScroll>
        <Navbar />
      </body>
    </html>
  );
}
