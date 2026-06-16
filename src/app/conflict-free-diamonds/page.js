import ConflictFreeDiamondsClient from "./ConflictFreeDiamondsClient";

export const metadata = {
  title: "Conflict Free Diamonds | Vees Star Diamonds & Jewellery",
  description: "Learn about Vees Star's commitment to truly conflict-free diamonds, ethically sourced from Australia, Canada, and Botswana under the Kimberley Process.",
  openGraph: {
    title: "Conflict Free Diamonds | Ethical Sourcing",
    description: "Discover our robust chain of custody protocol and commitment to internationally recognized labor, trade, and environmental standards.",
    url: "https://www.veesstardiamonds.com/conflict-free-diamonds",
    siteName: "Vees Star Diamonds",
    locale: "en_IN",
    type: "website",
  },
};

export default function ConflictFreeDiamondsPage() {
  return <ConflictFreeDiamondsClient />;
}
