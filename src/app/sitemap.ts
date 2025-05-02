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
  
  // Define supported languages
  const languages = ['en', 'nl', 'de'];
  
  // Main static pages - these will now use language prefixes
  const routes = [
    '',                  // Home
    '/about',            // About
    '/services',         // Services
    '/towercranes',      // Towercranes
    '/technical-info',   // Technical info
    '/contact',          // Contact
    '/privacy-policy',   // Privacy policy
    '/terms-of-service', // Terms of service
    '/cookies',          // Cookies policy
  ];
  
  // Create sitemap entries with proper language subfolders
  const entries: MetadataRoute.Sitemap = [];
  
  // Add entries for each route in each language
  languages.forEach(lang => {
    routes.forEach(route => {
      // For home page
      if (route === '') {
        entries.push({
          url: `${baseUrl}/${lang}`,
          lastModified: new Date(),
          changeFrequency: lang === 'en' ? 'weekly' : 'monthly',
          priority: lang === 'en' ? 1.0 : 0.9,
          alternateRefs: languages.map(altLang => ({
            hreflang: altLang,
            href: `${baseUrl}/${altLang}`
          }))
        });
      } else {
        // For other pages
        entries.push({
          url: `${baseUrl}/${lang}${route}`,
          lastModified: new Date(),
          changeFrequency: lang === 'en' ? 'monthly' : 'monthly',
          priority: lang === 'en' ? 0.8 : 0.7,
          alternateRefs: languages.map(altLang => ({
            hreflang: altLang,
            href: `${baseUrl}/${altLang}${route}`
          }))
        });
      }
    });
  });
  
  // Tower crane detail pages with language prefixes
  languages.forEach(lang => {
    towercranes.forEach(crane => {
      entries.push({
        url: `${baseUrl}/${lang}/towercranes/${crane.slug}`,
        lastModified: crane.lastModified,
        changeFrequency: 'monthly',
        priority: lang === 'en' ? 0.7 : 0.6,
        alternateRefs: languages.map(altLang => ({
          hreflang: altLang,
          href: `${baseUrl}/${altLang}/towercranes/${crane.slug}`
        }))
      });
    });
  });
  
  return entries;
} 