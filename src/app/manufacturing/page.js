import ManufacturingClient from "./ManufacturingClient";

export const metadata = {
  title: "Diamond Manufacturing Process | From Rough Stone to Solitaire | Vees Star",
  description:
    "Discover the Vees Star Diamonds manufacturing process — conflict-free rough diamond sourcing, laser structural mapping, ancestral faceting, and platinum prong setting in Chennai.",
  keywords:
    "diamond manufacturing process Chennai, how diamonds are cut South India, GIA diamond polishing Tamil Nadu, conflict-free rough diamond Karaikudi, platinum prong setting jewellery",
  openGraph: {
    title: "From Rough Stone to Masterpiece | Vees Star Diamond Manufacturing",
    description:
      "Discover our 4-phase diamond manufacturing process — from rough stone sorting to hand-burnished platinum settings.",
    url: "https://www.veesstardiamonds.com/manufacturing",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Vees Star Diamond Manufacturing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diamond Manufacturing | Vees Star Diamonds",
    description: "From rough stone to masterpiece — our 4-phase GIA diamond manufacturing process.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://www.veesstardiamonds.com/manufacturing" },
};

export default function ManufacturingPage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Vees Star Diamonds Crafts a Diamond Solitaire",
    description: "The 4-phase process from conflict-free rough diamond selection to finished platinum solitaire ring.",
    step: [
      { "@type": "HowToStep", name: "Raw Geometry Selection", text: "Master gemmologists select conflict-free octahedral diamonds meeting our inclusion clarity threshold." },
      { "@type": "HowToStep", name: "Laser Structural Mapping", text: "High-precision lasers map the crystal lattice and simulate facet layouts to maximize light return." },
      { "@type": "HowToStep", name: "Faceting & Polishing", text: "Traditional iron wheels with diamond dust align facets at precise angles to create a prism." },
      { "@type": "HowToStep", name: "Setting the Prongs", text: "Platinum claws are micro-burnished over the girdle, balancing physical security with ambient light access." },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <ManufacturingClient />
    </>
  );
}
