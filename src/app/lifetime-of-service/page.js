import LifetimeServiceClient from "./LifetimeServiceClient";

export const metadata = {
  title: "Lifetime of Service | Vees Star Diamonds",
  description: "Discover our commitment to you. From GIA certification to complimentary cleaning, repairs, and a full lifetime warranty, become a valued member of the Vees Star family.",
  openGraph: {
    title: "Lifetime of Service | Vees Star Diamonds",
    description: "Our promise of continuous premium service, engagement ring customization, and repairs.",
    url: "https://www.veesstardiamonds.com/lifetime-of-service",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
  },
};

export default function LifetimeServicePage() {
  return <LifetimeServiceClient />;
}
