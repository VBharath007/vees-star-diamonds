import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Vees Star Diamonds | GIA Grading & 7 C's Standards Chennai",
  description:
    "Learn about Vees Star Diamonds heritage — GIA-certified grading, the exclusive 7 C's quality criteria, conflict-free sourcing, and our South Indian temple-geometry craftsmanship.",
  keywords:
    "GIA diamond grading Chennai, 7 C diamonds Karaikudi, diamond clarity color cut certified, South Indian diamond craftsmanship, Vees Star about",
  openGraph: {
    title: "About Vees Star Diamonds | GIA Standards & Heritage",
    description:
      "Discover the gemmological standards and Karaikudi craftsmanship heritage behind every Vees Star Diamond.",
    url: "https://www.veesstardiamonds.com/about",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "About Vees Star Diamonds" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Vees Star Diamonds | GIA Standards & Heritage",
    description: "Discover our gemmological standards and Karaikudi craftsmanship heritage.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://www.veesstardiamonds.com/about" },
};

const faqs = [
  {
    q: "What makes Vees Star South Indian diamond cutting unique?",
    a: "Rooted in Madras and Madurai temple artisan geometric proportions, our workshop prioritizes master symmetries over quick weight retention. Each facet is aligned by hand to ensure maximum return of light.",
  },
  {
    q: "Are all Vees Star diamonds certified by GIA?",
    a: "Yes. Every single solitaire diamond above 0.3 carats is registered and certified by the Gemological Institute of America (GIA), laser-engraved with a unique tracking code on the girdle.",
  },
  {
    q: "How does the custom 3D configurator work?",
    a: "Our virtual custom builder renders live WebGL diamond cuts and settings. Once configured, you can submit the layout to our VIP desk on WhatsApp to begin hand-crafting your custom piece.",
  },
  {
    q: "Can I choose alternative gold karats or platinum settings?",
    a: "Absolutely. We specialize in PT950 Platinum, 18K Champagne Gold, and 18K Rose Gold, each cast and finished by hand to match the optical qualities of the gemstone.",
  },
];

export default function AboutPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AboutClient faqs={faqs} />
    </>
  );
}
