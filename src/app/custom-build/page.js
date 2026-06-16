import CustomBuildClient from "./CustomBuildClient";

export const metadata = {
  title: "Custom Diamond Ring Builder | Vees Star Diamonds Chennai",
  description:
    "Design your bespoke GIA-certified diamond ring online using Vees Star's real-time 3D WebGL configurator. Choose cut, metal, and carat weight. Based in Chennai and Karaikudi.",
  keywords:
    "custom diamond ring builder Chennai, bespoke solitaire configurator, 3D diamond ring design Tamil Nadu, GIA certified custom bridal ring, platinum diamond ring Karaikudi",
  openGraph: {
    title: "Custom 3D Diamond Ring Builder | Vees Star",
    description:
      "Configure your bespoke diamond solitaire in real-time WebGL. GIA certified, handcrafted in Chennai.",
    url: "https://www.veesstardiamonds.com/custom-build",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Vees Star Custom Diamond Builder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom 3D Diamond Ring Builder | Vees Star Diamonds",
    description: "Design your bespoke GIA-certified diamond solitaire in real-time WebGL.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://www.veesstardiamonds.com/custom-build" },
};

export default function CustomBuildPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Bespoke Custom Diamond Solitaire Ring",
    description:
      "Design your own GIA-certified diamond solitaire ring with Vees Star Diamonds. Choose from Round Brilliant, Princess, Emerald Step, or Pear Drop cuts in Platinum, Champagne Gold, or Rose Gold settings.",
    brand: {
      "@type": "Brand",
      name: "Vees Star Diamonds",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "250000",
      highPrice: "7500000",
      offerCount: "1",
      availability: "https://schema.org/InStock",
    },
    material: ["Platinum PT950", "18K Champagne Gold", "18K Rose Gold"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <CustomBuildClient />
    </>
  );
}
