import CleaningGuideClient from "./CleaningGuideClient";

export const metadata = {
  title: "Jewellery Cleaning Guide | Vees Star Diamonds",
  description: "Learn how to properly maintain, clean, and protect your fine jewellery and delicate gemstones with our expert DIY guide.",
  openGraph: {
    title: "Jewellery Cleaning Guide | Vees Star Diamonds",
    description: "Discover the best practices for maintaining the brilliant sparkle of your everyday and special occasion fine jewellery.",
    url: "https://www.veesstardiamonds.com/cleaning-your-jewellery",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
  },
};

export default function CleaningGuidePage() {
  return <CleaningGuideClient />;
}
