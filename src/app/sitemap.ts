import { MetadataRoute } from 'next';

// Complete list of tower cranes with realistic last modified dates
const towercranes = [
  { slug: 'potain-mdt-178', lastModified: new Date('2024-01-15') },
  { slug: 'potain-mc-85-b', lastModified: new Date('2024-01-12') },
  { slug: 'potain-mdt-219-j10', lastModified: new Date('2024-01-10') },
  { slug: 'potain-mct-88', lastModified: new Date('2024-01-08') },
  { slug: 'potain-mc-125', lastModified: new Date('2024-01-05') },
  { slug: 'potain-mdt-189', lastModified: new Date('2024-01-03') },
  { slug: 'potain-mc-175-b', lastModified: new Date('2023-12-28') },
  { slug: 'potain-mdt-268-j12', lastModified: new Date('2023-12-25') },
  { slug: 'potain-mct-135', lastModified: new Date('2023-12-20') },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.nibmvb.eu';
  
  // Define supported languages
  const languages = ['en', 'nl', 'de'];
  
  // Main static pages with priorities and change frequencies
  const routes = [
    { path: '', priority: 1.0, changeFreq: 'weekly' as const },           // Home
    { path: '/about', priority: 0.8, changeFreq: 'monthly' as const },    // About
    { path: '/services', priority: 0.9, changeFreq: 'monthly' as const }, // Services
    { path: '/towercranes', priority: 0.9, changeFreq: 'weekly' as const }, // Towercranes
    { path: '/technical-info', priority: 0.7, changeFreq: 'monthly' as const }, // Technical info
    { path: '/contact', priority: 0.8, changeFreq: 'monthly' as const },   // Contact
    { path: '/privacy-policy', priority: 0.5, changeFreq: 'yearly' as const }, // Privacy policy
    { path: '/terms-of-service', priority: 0.5, changeFreq: 'yearly' as const }, // Terms of service
    { path: '/cookies', priority: 0.5, changeFreq: 'yearly' as const },    // Cookies policy
  ];
  
  // Create sitemap entries with proper language subfolders
  const entries: MetadataRoute.Sitemap = [];
  
  // Add entries for each route in each language
  languages.forEach(lang => {
    routes.forEach(route => {
      // For home page
      if (route.path === '') {
        entries.push({
          url: `${baseUrl}/${lang}`,
          lastModified: new Date(),
          changeFrequency: route.changeFreq,
          priority: lang === 'en' ? route.priority : route.priority * 0.9,
        });
      } else {
        // For other pages
        entries.push({
          url: `${baseUrl}/${lang}${route.path}`,
          lastModified: new Date(),
          changeFrequency: route.changeFreq,
          priority: lang === 'en' ? route.priority : route.priority * 0.9,
        });
      }
    });
  });
  
  // Add tower crane detail pages with language prefixes
  languages.forEach(lang => {
    towercranes.forEach(crane => {
      entries.push({
        url: `${baseUrl}/${lang}/towercranes/${crane.slug}`,
        lastModified: crane.lastModified,
        changeFrequency: 'monthly',
        priority: lang === 'en' ? 0.7 : 0.6,
      });
    });
  });
  
  return entries;
} 