export const dynamic = "force-static";

const BASE = "https://www.veesstardiamonds.com";

export default function sitemap() {
  const now = new Date();

  const routes = [
    { url: BASE,                                      priority: 1.0, changeFrequency: "daily" },
    { url: `${BASE}/solitaires`,                      priority: 0.95, changeFrequency: "weekly" },
    { url: `${BASE}/custom-build`,                    priority: 0.95, changeFrequency: "weekly" },
    { url: `${BASE}/gallery`,                         priority: 0.9,  changeFrequency: "weekly" },
    { url: `${BASE}/contact`,                         priority: 0.9,  changeFrequency: "monthly" },
    { url: `${BASE}/about`,                           priority: 0.85, changeFrequency: "monthly" },
    { url: `${BASE}/karaikudi`,                       priority: 0.85, changeFrequency: "monthly" },
    { url: `${BASE}/manufacturing`,                   priority: 0.8,  changeFrequency: "monthly" },
    { url: `${BASE}/rough-diamonds`,                  priority: 0.8,  changeFrequency: "monthly" },
    { url: `${BASE}/blog`,                            priority: 0.75, changeFrequency: "weekly" },
    { url: `${BASE}/gallery/pendants`,                priority: 0.75, changeFrequency: "weekly" },
    { url: `${BASE}/gallery/bracelets`,               priority: 0.75, changeFrequency: "weekly" },
    { url: `${BASE}/wfh-franchise`,                   priority: 0.7,  changeFrequency: "monthly" },
    { url: `${BASE}/solitaire-settings`,              priority: 0.7,  changeFrequency: "monthly" },
    { url: `${BASE}/conflict-free-diamonds`,          priority: 0.7,  changeFrequency: "monthly" },
    { url: `${BASE}/making-process`,                  priority: 0.7,  changeFrequency: "monthly" },
    { url: `${BASE}/diamond-colour-and-clarity-guide`, priority: 0.65, changeFrequency: "monthly" },
    { url: `${BASE}/diamond-integrity-certification`, priority: 0.65, changeFrequency: "monthly" },
    { url: `${BASE}/vees-star-sizing-guide`,          priority: 0.65, changeFrequency: "monthly" },
    { url: `${BASE}/cleaning-your-jewellery`,           priority: 0.6,  changeFrequency: "monthly" },
    { url: `${BASE}/lifetime-of-service`,             priority: 0.6,  changeFrequency: "monthly" },
    { url: `${BASE}/jewellery-primary-use-of-gold`,     priority: 0.6,  changeFrequency: "monthly" },
    { url: `${BASE}/terms-off-use`,                   priority: 0.3,  changeFrequency: "yearly" },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
