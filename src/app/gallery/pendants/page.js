import PendantsClient from "./PendantsClient";

export const metadata = {
  title: "Pendants Gallery | Vees Star Diamonds",
  description: "Explore our masterfully crafted diamond pendants. Browse the Vees Star Diamonds Masterpiece Gallery.",
  openGraph: {
    title: "Pendants Gallery | Vees Star Diamonds",
    description: "Browse custom diamond pendants created in our South Indian workshop.",
    url: "https://www.veesstardiamonds.com/gallery/pendants",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
  },
};

export default function PendantsPage() {
  return <PendantsClient />;
}
