import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'
import Link from 'next/link'

// Blog posts data for listing
const blogPosts = [
  {
    slug: 'potain-mdt-178-vs-mc-85-b-comparison',
    title: 'Potain MDT 178 vs MC 85 B: Welcher Turmkran Passt zu Ihrem Bauprojekt?',
    description: 'Vergleichen Sie Potain MDT 178 und MC 85 B Turmkrane. Verstehen Sie die Unterschiede zwischen Flachdach- und Oberschwenk-Konstruktionen, Kapazität, Auslegerlänge und welches Modell zu Ihren Bauprojektanforderungen passt.',
    date: '2025-12-01',
  },
  {
    slug: 'potain-mdt-series-specifications-guide',
    title: 'Potain MDT Serie Spezifikationen: Vollständiger Leitfaden für Flachdach-Turmkrane',
    description: 'Umfassender Leitfaden für Potain MDT Serie Flachdach-Turmkrane. Erfahren Sie mehr über MDT 178, MDT 189, MDT 219 J10 und MDT 268 J12 Spezifikationen, Kapazitäten, Auslegerlängen und technische Merkmale.',
    date: '2025-12-05',
  },
  {
    slug: 'how-to-choose-right-potain-tower-crane',
    title: 'Wie Wählt Man den Richtigen Potain Turmkran: Kapazität, Auslegerlänge und Projektanforderungen',
    description: 'Erfahren Sie, wie Sie den richtigen Potain Turmkran für Ihr Bauprojekt auswählen. Verstehen Sie Kapazitätsanforderungen, Auslegerlängenberechnungen, Projektspezifikationen und wichtige Auswahlfaktoren.',
    date: '2025-12-10',
  },
  {
    slug: 'potain-mc-vs-mdt-vs-mct-series-differences',
    title: 'Potain MC vs MDT vs MCT Serie: Unterschiede Verstehen und Beste Anwendungsfälle',
    description: 'Vergleichen Sie Potain MC, MDT und MCT Turmkran-Serien. Lernen Sie die Unterschiede zwischen Oberschwenk- und Flachdach-Konstruktionen, Kapazitätsbereiche und welche Serie für verschiedene Bauprojekttypen geeignet ist.',
    date: '2025-12-15',
  },
]

// Generate metadata for blog listing page
export const generateMetadata = async (): Promise<Metadata> => {
  const baseMetadata: Metadata = {
    title: 'Blog | Turmkran Brancheneinblicke & Leitfäden | NIBM',
    description: 'Fachkundige Einblicke, Leitfäden und Branchennachrichten über Turmkrane. Erfahren Sie mehr über Turmkran-Spezifikationen, Sicherheitsrichtlinien, Wartungstipps und Best Practices der Bauindustrie von NIBM Tower Cranes.',
    openGraph: {
      title: 'Turmkran Blog | Brancheneinblicke & Leitfäden | NIBM',
      description: 'Fachkundige Einblicke, Leitfäden und Branchennachrichten über Turmkrane. Erfahren Sie mehr über Spezifikationen, Sicherheit, Wartung und Best Practices.',
      url: 'https://www.nibmvb.eu/de/blog',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
          width: 1200,
          height: 630,
          alt: 'NIBM Tower Cranes Blog - Brancheneinblicke',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Turmkran Blog | Brancheneinblicke & Leitfäden | NIBM',
      description: 'Fachkundige Einblicke, Leitfäden und Branchennachrichten über Turmkrane.',
      images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
    },
  }

  return generatePageMetadata(
    baseMetadata,
    '/de/blog',
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
            Turmkran Blog
          </h1>
          <p className="text-xl text-neutral-600 mb-12">
            Fachkundige Einblicke, Leitfäden und Branchennachrichten
          </p>
          
          {/* Blog posts listing */}
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="border-b border-neutral-200 pb-8 last:border-b-0">
                <Link href={`/de/blog/${post.slug}`} className="block group">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <time className="text-sm text-neutral-500 block mb-3">
                    {new Date(post.date).toLocaleDateString('de-DE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <p className="text-neutral-600 mb-4">
                    {post.description}
                  </p>
                  <span className="text-primary font-medium group-hover:underline">
                    Weiterlesen →
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
