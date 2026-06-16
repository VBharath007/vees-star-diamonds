import RoughDiamondsClient from "./RoughDiamondsClient";

export const metadata = {
  title: "Rough Diamonds | Vees Star Diamonds & Jewellery",
  description: "We are the first diamond jewellery manufacturer in South India to import rough diamonds via the Kimberly Process. Explore our 100% traceable sourcing and polishing.",
  openGraph: {
    title: "Rough Diamonds | Vees Star Diamonds & Jewellery",
    description: "Discover our 100% traceable rough diamond sourcing, Kimberly Process standards, and Surat polishing center.",
    url: "https://www.veesstardiamonds.com/rough-diamonds",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Vees Star Rough Diamonds" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rough Diamonds | Vees Star Diamonds",
    description: "100% traceable conflict-free rough diamonds via Kimberly Process standards.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://www.veesstardiamonds.com/rough-diamonds" },
};

export default function RoughDiamondsPage() {
  return <RoughDiamondsClient />;
}
