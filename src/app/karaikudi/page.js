import KaraikudiClient from "./KaraikudiClient";

export const metadata = {
  title: "Heritage Diamond Jewellery Karaikudi | Vees Star Diamonds",
  description:
    "Discover Vees Star Diamonds — the premier heritage diamond jewellery showroom rooted in Karaikudi and Madras. GIA-certified solitaires designed with traditional Chettinad temple architectural ratios.",
  keywords:
    "diamond showroom Karaikudi, heritage jewellery Chettinad, GIA solitaires Madras, temple ratio diamond rings Tamil Nadu, ancestral gold casting South India",
  openGraph: {
    title: "Karaikudi Heritage Diamonds | Vees Star",
    description:
      "GIA certified diamonds crafted with Chettinad temple architectural proportions in Karaikudi and Chennai.",
    url: "https://www.veesstardiamonds.com/karaikudi",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Karaikudi Heritage Diamonds" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karaikudi Heritage Diamonds | Vees Star Diamonds",
    description: "GIA certified diamonds crafted with Chettinad temple architectural proportions.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://www.veesstardiamonds.com/karaikudi" },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Karaikudi, Tamil Nadu, India",
    "geo.position": "10.0734;78.7738",
    "ICBM": "10.0734, 78.7738",
  },
};

export default function KaraikudiPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Vees Star Diamonds — Karaikudi Heritage",
    description:
      "Heritage diamond jewellery showroom in Karaikudi, Tamil Nadu. GIA-certified solitaires handcrafted using traditional Chettinad temple geometry and South Indian ancestral metallurgy.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karaikudi",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    telephone: "+919383007477",
    url: "https://www.veesstardiamonds.com/karaikudi",
    areaServed: [
      { "@type": "City", name: "Karaikudi" },
      { "@type": "City", name: "Chennai" },
      { "@type": "State", name: "Tamil Nadu" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <KaraikudiClient />
    </>
  );
}
