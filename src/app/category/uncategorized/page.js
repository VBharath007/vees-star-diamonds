import UncategorizedClient from "./UncategorizedClient";

export const metadata = {
  title: "Uncategorized Archives | Vees Star Diamonds",
  description: "Browse articles from our uncategorized archives, including the Diamond Shape and Cut guide.",
  openGraph: {
    title: "Uncategorized Archives | Vees Star Diamonds",
    description: "Browse articles from our uncategorized archives.",
    url: "https://www.veesstardiamonds.com/category/uncategorized",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
  },
};

export default function UncategorizedPage() {
  return <UncategorizedClient />;
}
