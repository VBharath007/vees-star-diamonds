import BraceletsClient from "./BraceletsClient";

export const metadata = {
  title: "Bracelets Gallery | Vees Star Diamonds",
  description: "Explore our masterfully crafted diamond bracelets. Browse the Vees Star Diamonds Masterpiece Gallery.",
  openGraph: {
    title: "Bracelets Gallery | Vees Star Diamonds",
    description: "Browse custom diamond bracelets created in our South Indian workshop.",
    url: "https://www.veesstardiamonds.com/gallery/bracelets",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
  },
};

export default function BraceletsPage() {
  return <BraceletsClient />;
}
