import DiamondGuideClient from "./DiamondGuideClient";

export const metadata = {
  title: "Diamond Colour & Clarity Guide | Vees Star Diamonds",
  description: "Learn about the GIA diamond color scale and clarity grades. From D color white diamonds to rare fancy colors, explore what makes Vees Star solitaires perfect.",
  openGraph: {
    title: "Diamond Colour & Clarity Guide | Vees Star Diamonds",
    description: "Understand the key factors of diamond quality, including GIA color scaling and clarity measurements.",
    url: "https://www.veesstardiamonds.com/diamond-colour-and-clarity-guide",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
  },
};

export default function DiamondGuidePage() {
  return <DiamondGuideClient />;
}
