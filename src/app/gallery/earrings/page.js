import EarringsClient from "./EarringsClient";

export const metadata = {
  title: "Ear Rings Gallery | Vees Star Diamonds",
  description: "Explore our masterfully crafted diamond ear rings. Browse the Vees Star Diamonds Masterpiece Gallery.",
  openGraph: {
    title: "Ear Rings Gallery | Vees Star Diamonds",
    description: "Browse custom diamond ear rings created in our South Indian workshop.",
    url: "https://www.veesstardiamonds.com/gallery/earrings",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
  },
};

export default function EarringsPage() {
  return <EarringsClient />;
}
