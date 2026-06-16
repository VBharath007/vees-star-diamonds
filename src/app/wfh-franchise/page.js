import FranchiseClient from "./FranchiseClient";

export const metadata = {
  title: "Work From Home Franchise | Vees Star Diamonds",
  description: "Join the Vees Star family. Showcase over 4000+ unique diamond jewellery designs with a flexible schedule and earn from a premium product portfolio.",
  openGraph: {
    title: "Work From Home Franchise | Vees Star Diamonds",
    description: "Start your franchise with a flexible schedule. Showcase premium diamond jewellery and earn.",
    url: "https://www.veesstardiamonds.com/wfh-franchise",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
  },
};

export default function FranchisePage() {
  return <FranchiseClient />;
}
