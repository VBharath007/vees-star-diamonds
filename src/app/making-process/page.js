import MakingProcessClient from "./MakingProcessClient";

export const metadata = {
  title: "Making Process | Vees Star Diamonds & Jewellery",
  description: "Every diamond in the Vees Star Diamond collection is hand-selected and cut to the most exacting standards. We process rough diamonds and deliver quality products.",
  openGraph: {
    title: "Making Process | Vees Star Diamonds",
    description: "Discover our exacting standards for cutting and processing rough diamonds to guarantee brilliant results for all orders.",
    url: "https://www.veesstardiamonds.com/making-process",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
  },
};

export default function MakingProcessPage() {
  return <MakingProcessClient />;
}
