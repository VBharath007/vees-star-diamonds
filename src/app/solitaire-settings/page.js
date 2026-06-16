import SolitaireSettingsClient from "./SolitaireSettingsClient";

export const metadata = {
  title: "Solitaire Settings | Vees Star Diamonds",
  description: "Learn about diamond solitaires. From rings to necklaces, earrings, and men's jewellery, discover the variety of shapes and settings.",
  openGraph: {
    title: "Solitaire Settings | Vees Star Diamonds",
    description: "Explore the elegant world of diamond solitaires and their timeless settings.",
    url: "https://www.veesstardiamonds.com/solitaire-settings",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
  },
};

export default function SolitaireSettingsPage() {
  return <SolitaireSettingsClient />;
}
