import DiamondIntegrityClient from "./DiamondIntegrityClient";

export const metadata = {
  title: "Diamond Integrity & Certification | Vees Star Diamonds",
  description: "Learn about diamond certification, GIA grading reports, and Vees Star's commitment to natural, untreated, and conflict-free diamonds.",
  openGraph: {
    title: "Diamond Integrity & Certification | Vees Star Diamonds",
    description: "Every Vees Star solitaire comes with a recognized international GIA certificate and guaranteed integrity.",
    url: "https://www.veesstardiamonds.com/diamond-integrity-certification",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
  },
};

export default function DiamondIntegrityPage() {
  return <DiamondIntegrityClient />;
}
