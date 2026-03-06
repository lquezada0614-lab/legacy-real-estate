import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alejandrahomes.org';

  const routes = ['', '/cash-offer', '/blog', '/blog/ab-2424-guide', '/foreclosures', '/home-valuation', '/affordability-calculator'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  return [...routes];
}
