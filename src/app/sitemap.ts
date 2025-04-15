import { MetadataRoute } from 'next';

// This would normally come from a CMS or database
const towercranes = [
  { slug: 'potain-mdt-178', lastModified: new Date() },
  { slug: 'potain-mc-85-b', lastModified: new Date() },
  { slug: 'potain-mdt-219-j10', lastModified: new Date() },
  { slug: 'potain-mct-88', lastModified: new Date() },
  { slug: 'potain-mc-125', lastModified: new Date() },
  { slug: 'potain-mdt-189', lastModified: new Date() },
  { slug: 'potain-mc-175-b', lastModified: new Date() },
  { slug: 'potain-mdt-268-j12', lastModified: new Date() },
  { slug: 'potain-mct-135', lastModified: new Date() },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.nibmvb.eu';
  
  // Main static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/towercranes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/technical-info`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
  
  // Tower crane detail pages
  const towercranesPages = towercranes.map(crane => {
    return {
      url: `${baseUrl}/towercranes/${crane.slug}`,
      lastModified: crane.lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });
  
  // Localized pages for each supported language
  const languages = ['en', 'nl', 'de'];
  const localizedPages = staticPages.flatMap(page => {
    return languages.map(lang => {
      // Skip the default language as it doesn't have a prefix
      if (lang === 'en' && page.url === baseUrl) {
        return null;
      }
      
      const langPath = lang === 'en' ? '' : `/${lang}`;
      const pagePath = page.url.replace(baseUrl, '');
      
      return {
        url: `${baseUrl}${langPath}${pagePath}`,
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority - 0.1, // Slightly lower priority for localized versions
      };
    }).filter(Boolean);
  });
  
  return [...staticPages, ...towercranesPages, ...localizedPages];
} 