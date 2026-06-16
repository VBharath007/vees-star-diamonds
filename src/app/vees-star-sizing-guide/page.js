import SizingGuideClient from "./SizingGuideClient";

export const metadata = {
  title: "Sizing Guide | Vees Star Diamonds",
  description: "Learn how to find the perfect finger ring size and accurately measure for bangles with our official Vees Star Sizing Guide.",
  openGraph: {
    title: "Vees Star Sizing Guide",
    description: "Discover subtle ways to find your partner's ring size and accurate measurement methods for bangles.",
    url: "https://www.veesstardiamonds.com/vees-star-sizing-guide",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
  },
};

export default function SizingGuidePage() {
  return <SizingGuideClient />;
}
