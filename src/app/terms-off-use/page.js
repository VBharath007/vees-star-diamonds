import TermsClient from "./TermsClient";

export const metadata = {
  title: "Terms off use | Vees Star Diamonds",
  description: "Read the Terms of Use for Vees Star Diamonds & Jewellery.",
  openGraph: {
    title: "Terms off use | Vees Star Diamonds",
    description: "Read the Terms of Use for Vees Star Diamonds & Jewellery.",
    url: "https://www.veesstardiamonds.com/terms-off-use",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
  },
};

export default function TermsOfUsePage() {
  return <TermsClient />;
}
