import { Metadata } from 'next'
import { generatePageMetadata } from '../../page-metadata'
import Link from 'next/link'

// Blog posts data for listing
const blogPosts = [
  {
    slug: 'potain-mdt-178-vs-mc-85-b-comparison',
    title: 'Potain MDT 178 vs MC 85 B: Which Tower Crane is Right for Your Construction Project?',
    description: 'Compare Potain MDT 178 and MC 85 B tower cranes. Understand the differences between flat-top and top-slewing designs, capacity, jib length, and which model suits your construction project requirements.',
    date: '2024-01-15',
  },
  {
    slug: 'potain-mdt-series-specifications-guide',
    title: 'Potain MDT Series Specifications: Complete Guide to Flat-Top Tower Cranes',
    description: 'Comprehensive guide to Potain MDT series flat-top tower cranes. Learn about MDT 178, MDT 189, MDT 219 J10, and MDT 268 J12 specifications, capacities, jib lengths, and technical features.',
    date: '2024-01-20',
  },
  {
    slug: 'how-to-choose-right-potain-tower-crane',
    title: 'How to Choose the Right Potain Tower Crane: Capacity, Jib Length, and Project Requirements',
    description: 'Learn how to select the right Potain tower crane for your construction project. Understand capacity requirements, jib length calculations, project specifications, and key selection factors.',
    date: '2024-01-25',
  },
  {
    slug: 'potain-mc-vs-mdt-vs-mct-series-differences',
    title: 'Potain MC vs MDT vs MCT Series: Understanding the Differences and Best Use Cases',
    description: 'Compare Potain MC, MDT, and MCT tower crane series. Learn the differences between top-slewing and flat-top designs, capacity ranges, and which series suits different construction project types.',
    date: '2024-01-30',
  },
]

// Generate metadata for blog listing page
export const generateMetadata = async (): Promise<Metadata> => {
  const baseMetadata: Metadata = {
    title: 'Blog | Tower Crane Industry Insights & Guides | NIBM',
    description: 'Expert insights, guides, and industry news about tower cranes. Learn about tower crane specifications, safety guidelines, maintenance tips, and construction industry best practices from NIBM Tower Cranes.',
    openGraph: {
      title: 'Tower Crane Blog | Industry Insights & Guides | NIBM',
      description: 'Expert insights, guides, and industry news about tower cranes. Learn about specifications, safety, maintenance, and best practices.',
      url: 'https://www.nibmvb.eu/en/blog',
      images: [
        {
          url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
          width: 1200,
          height: 630,
          alt: 'NIBM Tower Cranes Blog - Industry Insights',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Tower Crane Blog | Industry Insights & Guides | NIBM',
      description: 'Expert insights, guides, and industry news about tower cranes.',
      images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
    },
  }

  return generatePageMetadata(
    baseMetadata,
    '/en/blog',
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
            Tower Crane Blog
          </h1>
          <p className="text-xl text-neutral-600 mb-12">
            Expert insights, guides, and industry news
          </p>
          
          {/* Blog posts listing */}
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="border-b border-neutral-200 pb-8 last:border-b-0">
                <Link href={`/en/blog/${post.slug}`} className="block group">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <time className="text-sm text-neutral-500 block mb-3">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <p className="text-neutral-600 mb-4">
                    {post.description}
                  </p>
                  <span className="text-primary font-medium group-hover:underline">
                    Read more →
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

