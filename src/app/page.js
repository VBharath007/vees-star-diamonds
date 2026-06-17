import HomeClient from "./HomeClient";

export const metadata = {
  title: "Vees Star Diamonds | Best GIA Diamond Showroom Chennai & Karaikudi",
  description:
    "Vees Star Diamonds — ultra-premium GIA-certified solitaire diamonds and bespoke custom bridal jewellery handcrafted in Chennai (Anna Nagar) and Karaikudi, Tamil Nadu. Book a private consultation today.",
  keywords:
    "best diamond showroom Chennai, GIA certified solitaire Karaikudi, custom diamond rings Tamil Nadu, bespoke bridal jewellery Anna Nagar, Vees Star Diamonds",
  alternates: { canonical: "https://www.veesstardiamonds.com" },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Chennai, Tamil Nadu, India",
    "geo.position": "13.0850;80.2101",
    "ICBM": "13.0850, 80.2101",
  },
  openGraph: {
    title: "Vees Star Diamonds | GIA Certified Solitaires Chennai",
    description:
      "Ultra-premium, handcrafted GIA-certified diamond jewellery rooted in South Indian temple artisan traditions. Private consultations available in Chennai.",
    url: "https://www.veesstardiamonds.com",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Vees Star Diamonds — GIA Certified Solitaires" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vees Star Diamonds | GIA Certified Solitaires Chennai",
    description: "Ultra-premium GIA-certified diamond jewellery from Chennai and Karaikudi, Tamil Nadu.",
    images: ["/og-image.jpg"],
  },
};

export default function HomePage() {
  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "JewelleryStore",
    name: "Vees Star Diamonds",
    image: "https://www.veesstardiamonds.com/og-image.jpg",
    "@id": "https://www.veesstardiamonds.com/#store",
    description:
      "GIA-certified solitaire diamonds and bespoke temple-architectural jewellery in Chennai (Anna Nagar) and Karaikudi, Tamil Nadu.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "W-182, North Main Rd, Anna Nagar West Extension",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600101",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "13.0850",
      longitude: "80.2101",
    },
    telephone: "+919383007477",
    url: "https://www.veesstardiamonds.com",
    priceRange: "₹₹₹₹",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:30",
      closes: "19:30",
    },
    sameAs: [
      "https://www.facebook.com/veesstardiamonds",
      "https://www.instagram.com/veesstardiamonds",
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vees Star Diamonds",
    url: "https://www.veesstardiamonds.com",
    logo: "https://www.veesstardiamonds.com/VEES%20STAR%20LOGO%201.png",
    "@id": "https://www.veesstardiamonds.com/#organization",
    description:
      "South India's premier GIA-certified diamond jeweller, combining ancestral Chettinad temple geometry with modern gemmological standards.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+919383007477",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Tamil"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "W-182, North Main Rd, Anna Nagar West Extension",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600101",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "City", name: "Chennai" },
      { "@type": "City", name: "Karaikudi" },
      { "@type": "State", name: "Tamil Nadu" },
    ],
    sameAs: [
      "https://www.facebook.com/veesstardiamonds",
      "https://www.instagram.com/veesstardiamonds",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vees Star Diamonds",
    url: "https://www.veesstardiamonds.com",
    "@id": "https://www.veesstardiamonds.com/#website",
    description: "GIA-certified solitaire diamonds and bespoke jewellery from Chennai and Karaikudi, Tamil Nadu.",
    publisher: { "@id": "https://www.veesstardiamonds.com/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://www.veesstardiamonds.com/gallery?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veesstardiamonds.com" },
      { "@type": "ListItem", position: 2, name: "Solitaires", item: "https://www.veesstardiamonds.com/solitaires" },
      { "@type": "ListItem", position: 3, name: "Custom Build", item: "https://www.veesstardiamonds.com/custom-build" },
      { "@type": "ListItem", position: 4, name: "Gallery", item: "https://www.veesstardiamonds.com/gallery" },
      { "@type": "ListItem", position: 5, name: "Contact", item: "https://www.veesstardiamonds.com/contact" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HomeClient />
    </>
  );
}
