import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const baseUrl = 'https://www.nibmvb.eu';
    
    // Define supported languages
    const languages = ['en', 'nl', 'de'];
    
    // Main static pages with priorities and change frequencies
    const routes = [
      { path: '', priority: 1.0, changeFreq: 'daily' as const },           // Home - changed to daily for freshness signal
      { path: '/about', priority: 0.8, changeFreq: 'monthly' as const },    // About
      { path: '/services', priority: 0.9, changeFreq: 'weekly' as const }, // Services - increased to weekly
      { path: '/towercranes', priority: 0.95, changeFreq: 'daily' as const }, // Towercranes - changed to daily (inventory changes)
      { path: '/technical-info', priority: 0.7, changeFreq: 'monthly' as const }, // Technical info
      { path: '/contact', priority: 0.85, changeFreq: 'monthly' as const },   // Contact - increased priority (conversion page)
      { path: '/blog', priority: 0.8, changeFreq: 'weekly' as const },        // Blog
      { path: '/privacy-policy', priority: 0.3, changeFreq: 'yearly' as const }, // Privacy policy - reduced priority
      { path: '/terms-of-service', priority: 0.3, changeFreq: 'yearly' as const }, // Terms of service - reduced priority
      { path: '/cookies', priority: 0.3, changeFreq: 'yearly' as const },    // Cookies policy - reduced priority
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
    
    // Fetch tower cranes from database
    try {
      const cranes = await prisma.crane.findMany({
        where: { isAvailable: true },
        select: {
          slug: true,
          updatedAt: true,
          category: true
        },
        orderBy: {
          updatedAt: 'desc'
        }
      });

      // Add tower crane detail pages with language prefixes
      // Increased priority for crane pages to improve discoverability
      languages.forEach(lang => {
        cranes.forEach(crane => {
          // Determine priority based on category and freshness
          const daysSinceUpdate = (Date.now() - crane.updatedAt.getTime()) / (1000 * 60 * 60 * 24);
          const isRecent = daysSinceUpdate < 30;
          const isVeryRecent = daysSinceUpdate < 7;
          
          // SEO optimization: Higher priority for recent inventory and sale category
          const basePriority = crane.category === 'sale' ? 0.90 : 0.85; // Sale pages get higher priority
          const recencyBoost = isVeryRecent ? 0.05 : (isRecent ? 0.03 : 0);
          const langMultiplier = lang === 'en' ? 1.0 : 0.9;
          
          const priority = Math.min(0.95, (basePriority + recencyBoost) * langMultiplier);
          
          // SEO optimization: More frequent updates for recent inventory
          const changeFreq = isVeryRecent ? 'daily' : (isRecent ? 'weekly' : 'monthly');

          entries.push({
            url: `${baseUrl}/${lang}/towercranes/${crane.slug}`,
            lastModified: crane.updatedAt,
            changeFrequency: changeFreq as 'daily' | 'weekly' | 'monthly',
            priority,
          });
        });
      });
    } catch (dbError) {
      console.error('Error fetching cranes from database:', dbError);
      // Continue without crane entries if DB fails
    }

    // Note: Blog posts would be added here if you have a blog model in the database
    // For now, we'll skip blog posts as they're not in the database schema
    
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