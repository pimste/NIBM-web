import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'
import Link from 'next/link'

// Blog posts data for listing
const blogPosts = [
  {
    slug: 'potain-mdt-178-vs-mc-85-b-comparison',
    title: 'Potain MDT 178 vs MC 85 B: Welke Torenkraan Past bij Uw Bouwproject?',
    description: 'Vergelijk Potain MDT 178 en MC 85 B torenkranen. Begrijp de verschillen tussen platte bovenkant en bovenkant draaiende ontwerpen, capaciteit, gieklengte en welk model geschikt is voor uw bouwproject.',
    date: '2025-12-01',
  },
  {
    slug: 'potain-mdt-series-specifications-guide',
    title: 'Potain MDT Serie Specificaties: Complete Gids voor Platte Bovenkant Torenkranen',
    description: 'Uitgebreide gids voor Potain MDT serie platte bovenkant torenkranen. Leer over MDT 178, MDT 189, MDT 219 J10 en MDT 268 J12 specificaties, capaciteiten, gieklengtes en technische kenmerken.',
    date: '2025-12-05',
  },
  {
    slug: 'how-to-choose-right-potain-tower-crane',
    title: 'Hoe Kiest U de Juiste Potain Torenkraan: Capaciteit, Gieklengte en Projectvereisten',
    description: 'Leer hoe u de juiste Potain torenkraan selecteert voor uw bouwproject. Begrijp capaciteitsvereisten, gieklengte berekeningen, project specificaties en belangrijke selectiefactoren.',
    date: '2025-12-10',
  },
  {
    slug: 'potain-mc-vs-mdt-vs-mct-series-differences',
    title: 'Potain MC vs MDT vs MCT Serie: Verschillen Begrijpen en Beste Toepassingen',
    description: 'Vergelijk Potain MC, MDT en MCT torenkraan series. Leer de verschillen tussen bovenkant draaiende en platte bovenkant ontwerpen, capaciteitsbereiken en welke serie geschikt is voor verschillende bouwprojecttypen.',
    date: '2025-12-15',
  },
]

// Generate metadata for blog listing page
export const generateMetadata = async (): Promise<Metadata> => {
  const baseMetadata: Metadata = {
    title: 'Blog | Torenkraan Branche Inzichten & Gidsen | NIBM',
    description: 'Deskundige inzichten, gidsen en branchenieuws over torenkranen. Leer over torenkraan specificaties, veiligheidsrichtlijnen, onderhoudstips en bouwbest practices van NIBM Tower Cranes.',
    openGraph: {
      title: 'Torenkraan Blog | Branche Inzichten & Gidsen | NIBM',
      description: 'Deskundige inzichten, gidsen en branchenieuws over torenkranen. Leer over specificaties, veiligheid, onderhoud en best practices.',
      url: 'https://www.nibmvb.eu/nl/blog',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
          width: 1200,
          height: 630,
          alt: 'NIBM Tower Cranes Blog - Branche Inzichten',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Torenkraan Blog | Branche Inzichten & Gidsen | NIBM',
      description: 'Deskundige inzichten, gidsen en branchenieuws over torenkranen.',
      images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
    },
  }

  return generatePageMetadata(
    baseMetadata,
    '/nl/blog',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export default function BlogPage() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Torenkraan Blog
          </h1>
          <p className="text-xl text-neutral-600 mb-12">
            Deskundige inzichten, gidsen en branchenieuws
          </p>
          
          {/* Blog posts listing */}
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="border-b border-neutral-200 pb-8 last:border-b-0">
                <Link href={`/nl/blog/${post.slug}`} className="block group">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <time className="text-sm text-neutral-500 block mb-3">
                    {new Date(post.date).toLocaleDateString('nl-NL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <p className="text-neutral-600 mb-4">
                    {post.description}
                  </p>
                  <span className="text-primary font-medium group-hover:underline">
                    Lees meer →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
