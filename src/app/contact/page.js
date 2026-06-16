import ContactClient from "./ContactClient";

export const metadata = {
  title: "Book a Private Diamond Consultation | Vees Star Diamonds Chennai",
  description:
    "Book a private VIP consultation at Vees Star Diamonds in Anna Nagar, Chennai. Meet our GIA-certified gemmologists, view raw diamond selections, and configure your bespoke jewellery piece.",
  keywords:
    "book diamond consultation Chennai, private jewellery viewing Anna Nagar, VIP diamond appointment Tamil Nadu, GIA certified consultation Karaikudi, bespoke ring appointment Madras",
  openGraph: {
    title: "Book a Private Consultation | Vees Star Diamonds Chennai",
    description:
      "Schedule a private viewing at our Anna Nagar showroom. GIA-certified gemmologists, bespoke diamond consultations.",
    url: "https://www.veesstardiamonds.com/contact",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Vees Star Diamonds Contact" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Private Diamond Consultation | Vees Star Diamonds",
    description: "Schedule your private VIP consultation at our Anna Nagar, Chennai showroom.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://www.veesstardiamonds.com/contact" },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Vees Star Diamonds — Book a Private Consultation",
    url: "https://www.veesstardiamonds.com/contact",
    description: "Schedule a private diamond consultation at our Anna Nagar, Chennai showroom.",
    mainEntity: {
      "@type": "JewelleryStore",
      name: "Vees Star Diamonds",
      telephone: "+914445536003",
      address: {
        "@type": "PostalAddress",
        streetAddress: "W-182, North Main Rd, Anna Nagar West Extension",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600101",
        addressCountry: "IN",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:30",
        closes: "19:30",
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <ContactClient />
    </>
  );
}
