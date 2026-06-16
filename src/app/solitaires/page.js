import SolitairesClient from "./SolitairesClient";

export const metadata = {
  title: "GIA Certified Solitaire Diamond Rings | Vees Star Diamonds Chennai",
  description:
    "Shop GIA-certified solitaire diamond rings in Round Brilliant, Princess, Emerald, and Pear cuts. Platinum and gold settings handcrafted in Chennai, Tamil Nadu. Custom carat weights up to 15ct.",
  keywords:
    "GIA solitaire diamond rings Chennai, platinum diamond ring Tamil Nadu, round brilliant solitaire Karaikudi, princess cut diamond ring Madras, bespoke diamond jewellery South India",
  openGraph: {
    title: "GIA Certified Solitaire Diamond Rings | Vees Star Diamonds",
    description:
      "Premium GIA-certified solitaire diamond rings in platinum and gold, handcrafted in Chennai, Tamil Nadu.",
    url: "https://www.veesstardiamonds.com/solitaires",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Vees Star Solitaire Diamonds" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GIA Certified Solitaire Diamond Rings | Vees Star Diamonds",
    description: "Premium GIA-certified diamond rings handcrafted in Chennai, Tamil Nadu.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://www.veesstardiamonds.com/solitaires" },
};

export default function SolitairesPage() {
  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Vees Star Signature Solitaire Collection",
    description: "GIA-certified solitaire diamond rings in Round, Princess, Emerald, and Pear cuts",
    url: "https://www.veesstardiamonds.com/solitaires",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "The Adora Solitaire — Round Cut PT950 Platinum", url: "https://www.veesstardiamonds.com/solitaires" },
      { "@type": "ListItem", position: 2, name: "Celestial Princess — Princess Cut 18K Gold", url: "https://www.veesstardiamonds.com/solitaires" },
      { "@type": "ListItem", position: 3, name: "The Aurelia Step — Emerald Cut 18K Gold", url: "https://www.veesstardiamonds.com/solitaires" },
      { "@type": "ListItem", position: 4, name: "The Sovereign Drop — Pear Cut 18K Rose Gold", url: "https://www.veesstardiamonds.com/solitaires" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }} />
      <SolitairesClient />
    </>
  );
}
