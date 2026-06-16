import BlogClient from "./BlogClient";

export const metadata = {
  title: "Learn and Explore | Vees Star Diamonds",
  description: "Explore the Vees Star Diamonds blog for guides on diamond shapes, cuts, clarity, ethical sourcing, jewellery maintenance, and more.",
  openGraph: {
    title: "Learn and Explore | Vees Star Diamonds",
    description: "Read our expert guides on diamond selection, certification, and jewellery care.",
    url: "https://www.veesstardiamonds.com/blog",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Vees Star Diamonds Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn and Explore | Vees Star Diamonds",
    description: "Expert guides on diamond selection, GIA certification, and jewellery care.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://www.veesstardiamonds.com/blog" },
};

export default function BlogPage() {
  return <BlogClient />;
}
