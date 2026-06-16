import GalleryClient from "./GalleryClient";

export const metadata = {
  title: "Diamond Jewellery Gallery | Vees Star Diamonds Chennai",
  description:
    "Browse the Vees Star Diamonds gallery — handcrafted GIA-certified solitaire rings, diamond pendants, earrings, and custom bridal commissions from our Chennai and Karaikudi workshops.",
  keywords:
    "diamond jewellery gallery Chennai, GIA solitaire rings gallery, custom diamond commissions Karaikudi, diamond pendant necklace Tamil Nadu, handcrafted jewellery South India",
  openGraph: {
    title: "Diamond Jewellery Gallery | Vees Star Diamonds",
    description:
      "View our curated portfolio of handcrafted GIA-certified solitaire rings, pendants, and bespoke diamond commissions.",
    url: "https://www.veesstardiamonds.com/gallery",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Vees Star Diamonds Gallery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diamond Jewellery Gallery | Vees Star Diamonds",
    description: "Handcrafted GIA-certified solitaire rings and bespoke diamond commissions.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://www.veesstardiamonds.com/gallery" },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
