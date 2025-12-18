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

// Blog posts list
const blogPosts = [
  { slug: 'potain-mdt-178-vs-mc-85-b-comparison', lastModified: new Date('2025-12-01') },
  { slug: 'potain-mdt-series-specifications-guide', lastModified: new Date('2025-12-05') },
  { slug: 'how-to-choose-right-potain-tower-crane', lastModified: new Date('2025-12-10') },
  { slug: 'potain-mc-vs-mdt-vs-mct-series-differences', lastModified: new Date('2025-12-15') },
];

export default function sitemap(): MetadataRoute.Sitemap {
  try {
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
      { path: '/blog', priority: 0.8, changeFreq: 'weekly' as const },        // Blog (hidden from menu, SEO only)
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

    // Add blog post pages with language prefixes
    languages.forEach(lang => {
      blogPosts.forEach(post => {
        entries.push({
          url: `${baseUrl}/${lang}/blog/${post.slug}`,
          lastModified: post.lastModified,
          changeFrequency: 'monthly',
          priority: lang === 'en' ? 0.7 : 0.6,
        });
      });
    });
    
    return entries;
  } catch (error) {
    // Fallback: return at least the homepage if there's an error
    console.error('Sitemap generation error:', error);
    return [{
      url: 'https://www.nibmvb.eu/en',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    }];
  }
} 