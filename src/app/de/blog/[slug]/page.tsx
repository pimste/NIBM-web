import { Metadata } from 'next'
import { generatePageMetadata } from '../../../page-metadata'
import { notFound } from 'next/navigation'

// Blog posts data - German translations
const blogPosts: { [key: string]: { 
  title: string
  description: string
  date: string
  content: React.ReactNode
} } = {
  'potain-mdt-178-vs-mc-85-b-comparison': {
    title: 'Potain MDT 178 vs MC 85 B: Welcher Turmkran Passt zu Ihrem Bauprojekt?',
    description: 'Vergleichen Sie Potain MDT 178 und MC 85 B Turmkrane. Verstehen Sie die Unterschiede zwischen Flachdach- und Oberschwenk-Konstruktionen, Kapazität, Auslegerlänge und welches Modell zu Ihren Bauprojektanforderungen passt.',
    date: '2025-12-01',
    content: (
      <>
        <p className="text-lg text-neutral-700 mb-6">
          Die Auswahl des richtigen Turmkrans für Ihr Bauprojekt erfordert das Verständnis der wichtigsten Unterschiede zwischen Modellen. Die Potain MDT 178 und MC 85 B repräsentieren zwei verschiedene Designphilosophien: Flachdach- versus Oberschwenk-Konfigurationen. Dieser Vergleich untersucht ihre Spezifikationen, Fähigkeiten und typische Anwendungen.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Designphilosophie: Flachdach vs Oberschwenk</h2>
        <p className="text-neutral-700 mb-4">
          Die Potain MDT 178 verfügt über ein Flachdach-Design, das die Notwendigkeit eines Gegengewichtsauslegers eliminiert und das Gesamtgewicht reduziert. Dieses Design bietet typischerweise einfacheren Transport und schnellere Montage im Vergleich zu Oberschwenk-Modellen. Die Flachdach-Konfiguration kann vorteilhaft sein für Projekte, die mehrere Krane in enger Nähe erfordern.
        </p>
        <p className="text-neutral-700 mb-6">
          Die Potain MC 85 B nutzt ein Oberschwenk-Design mit einem traditionellen Gegengewichtsausleger. Diese Konfiguration bietet ausgezeichnete Stabilität und ist gut geeignet für Projekte, die konsistente Hebevorgänge erfordern. Oberschwenk-Krane bieten im Allgemeinen präzise Kontrolle und werden oft für Projekte mit längerer Dauer bevorzugt.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Kapazität und Leistungsspezifikationen</h2>
        <div className="bg-neutral-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Potain MDT 178 Spezifikationen</h3>
          <ul className="space-y-2 text-neutral-700">
            <li><strong>Maximale Kapazität:</strong> 8 Tonnen</li>
            <li><strong>Maximale Auslegerlänge:</strong> 60 Meter</li>
            <li><strong>Design-Typ:</strong> Flachdach-Turmkran</li>
            <li><strong>Typische Anwendungen:</strong> Mittelgroße bis große Bauprojekte, Gewerbegebäude, Infrastrukturprojekte</li>
          </ul>
        </div>
        <div className="bg-neutral-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Potain MC 85 B Spezifikationen</h3>
          <ul className="space-y-2 text-neutral-700">
            <li><strong>Maximale Kapazität:</strong> 5 Tonnen</li>
            <li><strong>Maximale Auslegerlänge:</strong> 52 Meter</li>
            <li><strong>Design-Typ:</strong> Oberschwenk-Turmkran</li>
            <li><strong>Typische Anwendungen:</strong> Mittelgroße Bauprojekte, Wohngebäude, städtische Baustellen</li>
          </ul>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Wichtige Unterschiede</h2>
        <p className="text-neutral-700 mb-4">
          Die MDT 178 bietet eine höhere maximale Kapazität von 8 Tonnen im Vergleich zu den 5 Tonnen der MC 85 B. Mit einer maximalen Auslegerlänge von 60 Metern bietet die MDT 178 8 Meter mehr Reichweite als der 52 Meter Ausleger der MC 85 B. Flachdach-Designs wie die MDT 178 bieten typischerweise Vorteile in der Transportlogistik aufgrund reduzierten Komponentengewichts.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Projekteignungsüberlegungen</h2>
        <p className="text-neutral-700 mb-4">
          Wählen Sie MDT 178, wenn Ihr Projekt Hebekapazitäten über 5 Tonnen erfordert, Sie maximale Auslegerreichweite bis 60 Meter benötigen oder mehrere Krane in enger Nähe arbeiten werden. Wählen Sie MC 85 B, wenn die maximalen Hebeanforderungen Ihres Projekts 5 Tonnen oder weniger betragen, 52 Meter Auslegerreichweite für Ihre Baustelle ausreichend ist oder Sie die Stabilität und Kontrolle des Oberschwenk-Designs bevorzugen.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Fazit</h2>
        <p className="text-neutral-700 mb-6">
          Die Wahl zwischen Potain MDT 178 und MC 85 B hängt von Ihren spezifischen Projektanforderungen ab. Die MDT 178 bietet größere Kapazität und Reichweite, wodurch sie für größere Projekte geeignet ist, während die MC 85 B zuverlässige Leistung für mittelgroße Bauanforderungen bietet.
        </p>
      </>
    ),
  },
  'potain-mdt-series-specifications-guide': {
    title: 'Potain MDT Serie Spezifikationen: Vollständiger Leitfaden für Flachdach-Turmkrane',
    description: 'Umfassender Leitfaden für Potain MDT Serie Flachdach-Turmkrane. Erfahren Sie mehr über MDT 178, MDT 189, MDT 219 J10 und MDT 268 J12 Spezifikationen, Kapazitäten, Auslegerlängen und technische Merkmale.',
    date: '2025-12-05',
    content: (
      <>
        <p className="text-lg text-neutral-700 mb-6">
          Die Potain MDT Serie repräsentiert eine Reihe von Flachdach-Turmkranen, die für moderne Bauprojekte entwickelt wurden. Dieser Leitfaden bietet detaillierte Spezifikationen und technische Informationen über die MDT Serie Modelle.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">MDT Serie Modelle Übersicht</h2>
        <div className="space-y-6 mb-8">
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Potain MDT 178</h3>
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Maximale Kapazität:</strong> 8 Tonnen</li>
              <li><strong>Maximale Auslegerlänge:</strong> 60 Meter</li>
              <li><strong>Typischer Einsatz:</strong> Vielseitiger Kran geeignet für eine breite Palette von Bauprojekten</li>
            </ul>
          </div>
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Potain MDT 189</h3>
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Maximale Kapazität:</strong> 8 Tonnen</li>
              <li><strong>Maximale Auslegerlänge:</strong> 60 Meter</li>
              <li><strong>Typischer Einsatz:</strong> Liefert außergewöhnliche Leistung mit innovativem Flachdach-Design</li>
            </ul>
          </div>
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Potain MDT 219 J10</h3>
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Maximale Kapazität:</strong> 10 Tonnen</li>
              <li><strong>Maximale Auslegerlänge:</strong> 65 Meter</li>
              <li><strong>Typischer Einsatz:</strong> Leistungsstarker Turmkran für schwere Projekte</li>
            </ul>
          </div>
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Potain MDT 268 J12</h3>
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Maximale Kapazität:</strong> 12 Tonnen</li>
              <li><strong>Maximale Auslegerlänge:</strong> 75 Meter</li>
              <li><strong>Typischer Einsatz:</strong> Premium Flachdach-Turmkran mit außergewöhnlicher Kapazität</li>
            </ul>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Fazit</h2>
        <p className="text-neutral-700 mb-6">
          Die Potain MDT Serie bietet eine umfassende Reihe von Flachdach-Turmkranen, die für verschiedene Bauanwendungen geeignet sind. Von der vielseitigen MDT 178 bis zur hochkapazitiven MDT 268 J12 bieten diese Modelle Bauprofis Optionen, die ihren spezifischen Projektanforderungen entsprechen.
        </p>
      </>
    ),
  },
  'how-to-choose-right-potain-tower-crane': {
    title: 'Wie Wählt Man den Richtigen Potain Turmkran: Kapazität, Auslegerlänge und Projektanforderungen',
    description: 'Erfahren Sie, wie Sie den richtigen Potain Turmkran für Ihr Bauprojekt auswählen. Verstehen Sie Kapazitätsanforderungen, Auslegerlängenberechnungen, Projektspezifikationen und wichtige Auswahlfaktoren.',
    date: '2025-12-10',
    content: (
      <>
        <p className="text-lg text-neutral-700 mb-6">
          Die Auswahl des geeigneten Turmkrans für ein Bauprojekt erfordert eine sorgfältige Bewertung mehrerer Faktoren. Dieser Leitfaden beschreibt die wichtigsten Überlegungen bei der Auswahl eines Potain Turmkrans.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Kapazitätsanforderungen Verstehen</h2>
        <p className="text-neutral-700 mb-4">
          Turmkran-Kapazität bezieht sich auf das maximale Gewicht, das der Kran heben kann. Diese Kapazität variiert jedoch je nach Auslegerausdehnung und Lastposition. Ein Kran mit einer maximalen Kapazität von 8 Tonnen kann möglicherweise nur 2 Tonnen bei maximaler Auslegerausdehnung heben.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-neutral-700">
            <strong>Wichtig:</strong> Konsultieren Sie immer das Lastdiagramm des Krans, um die tatsächliche Hebekapazität bei Ihrer erforderlichen Auslegerausdehnung zu bestimmen.
          </p>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Auslegerlängen-Anforderungen Bestimmen</h2>
        <p className="text-neutral-700 mb-4">
          Die Auslegerlänge bestimmt die Reichweite und Abdeckung des Krans. Die Auswahl der geeigneten Auslegerlänge stellt sicher, dass der Kran alle erforderlichen Hebestellen erreichen kann, ohne umpositioniert zu werden.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Projektspezifische Überlegungen</h2>
        <p className="text-neutral-700 mb-6">
          Berücksichtigen Sie Projekttyp, Dauer und Baustellenbeschränkungen bei der Auswahl eines Turmkrans. Verschiedene Projekttypen haben unterschiedliche Kapazitäts- und Reichweitenanforderungen. Längere Projekte können von einem Kauf profitieren, während kürzere Projekte möglicherweise besser für Mietvereinbarungen geeignet sind.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Fazit</h2>
        <p className="text-neutral-700 mb-6">
          Die Auswahl des richtigen Potain Turmkrans erfordert eine sorgfältige Analyse von Kapazitätsanforderungen, Auslegerlängenbedürfnissen und projektspezifischen Faktoren. Konsultieren Sie immer qualifizierte Fachleute, um eine ordnungsgemäße Kranauswahl und Installationsplanung sicherzustellen.
        </p>
      </>
    ),
  },
  'potain-mc-vs-mdt-vs-mct-series-differences': {
    title: 'Potain MC vs MDT vs MCT Serie: Unterschiede Verstehen und Beste Anwendungsfälle',
    description: 'Vergleichen Sie Potain MC, MDT und MCT Turmkran-Serien. Lernen Sie die Unterschiede zwischen Oberschwenk- und Flachdach-Konstruktionen, Kapazitätsbereiche und welche Serie für verschiedene Bauprojekttypen geeignet ist.',
    date: '2025-12-15',
    content: (
      <>
        <p className="text-lg text-neutral-700 mb-6">
          Potain produziert drei Haupt-Turmkran-Serien: MC (Oberschwenk), MDT (Flachdach) und MCT (kompaktes Flachdach). Das Verständnis der Unterschiede zwischen diesen Serien hilft Bauprofis, den am besten geeigneten Kran für ihre spezifischen Projektanforderungen auszuwählen.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">MC Serie: Oberschwenk-Design</h2>
        <p className="text-neutral-700 mb-4">
          Die Potain MC Serie repräsentiert traditionelle Oberschwenk-Turmkrane mit Gegengewichtsauslegern. Diese Krane verfügen über das klassische Turmkran-Design mit dem Schwenkmechanismus an der Spitze des Masts.
        </p>
        <div className="bg-neutral-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">MC Serie Eigenschaften</h3>
          <ul className="space-y-2 text-neutral-700">
            <li><strong>Design-Typ:</strong> Oberschwenk mit Gegengewichtsausleger</li>
            <li><strong>Kapazitätsbereich:</strong> 5-8 Tonnen</li>
            <li><strong>Auslegerlängen-Bereich:</strong> 52-60 Meter</li>
            <li><strong>Wichtige Merkmale:</strong> Bewährte Zuverlässigkeit, ausgezeichnete Stabilität, präzise Kontrolle</li>
          </ul>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">MDT Serie: Flachdach Hochkapazitäts-Design</h2>
        <p className="text-neutral-700 mb-4">
          Die Potain MDT Serie verfügt über Flachdach-Turmkrane, die für höhere Kapazitätsanwendungen entwickelt wurden. Diese Krane eliminieren den Gegengewichtsausleger, was zu reduziertem Gewicht und vereinfachtem Transport führt.
        </p>
        <div className="bg-neutral-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">MDT Serie Eigenschaften</h3>
          <ul className="space-y-2 text-neutral-700">
            <li><strong>Design-Typ:</strong> Flachdach ohne Gegengewichtsausleger</li>
            <li><strong>Kapazitätsbereich:</strong> 8-12 Tonnen</li>
            <li><strong>Auslegerlängen-Bereich:</strong> 60-75 Meter</li>
            <li><strong>Wichtige Merkmale:</strong> Hohe Kapazität, erweiterte Reichweite, einfacherer Transport</li>
          </ul>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">MCT Serie: Kompaktes Flachdach-Design</h2>
        <p className="text-neutral-700 mb-4">
          Die Potain MCT Serie kombiniert Flachdach-Design mit kompakten Abmessungen, wodurch diese Krane ideal für platzbeschränkte Baustellen sind.
        </p>
        <div className="bg-neutral-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">MCT Serie Eigenschaften</h3>
          <ul className="space-y-2 text-neutral-700">
            <li><strong>Design-Typ:</strong> Kompaktes Flachdach</li>
            <li><strong>Kapazitätsbereich:</strong> 5-6 Tonnen</li>
            <li><strong>Auslegerlängen-Bereich:</strong> 50-52 Meter</li>
            <li><strong>Wichtige Merkmale:</strong> Kompakte Grundfläche, schnelle Aufstellung, städtischer Bau-Fokus</li>
          </ul>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Fazit</h2>
        <p className="text-neutral-700 mb-6">
          Die Potain MC, MDT und MCT Serien dienen jeweils unterschiedlichen Bauanforderungen. Die MC Serie bietet zuverlässige Oberschwenk-Leistung für mittelgroße Projekte, die MDT Serie bietet hochkapazitive Flachdach-Lösungen für große Projekte und die MCT Serie liefert kompakte Flachdach-Optionen für platzbeschränkte Baustellen.
        </p>
      </>
    ),
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug]
  
  if (!post) {
    return {
      title: 'Blog-Artikel Nicht Gefunden | NIBM Tower Cranes',
      description: 'Der angeforderte Blog-Artikel konnte nicht gefunden werden.',
    }
  }

  const baseMetadata: Metadata = {
    title: `${post.title} | NIBM Tower Cranes Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.nibmvb.eu/de/blog/${params.slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [
        {
          url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
    },
  }

  return generatePageMetadata(
    baseMetadata,
    `/de/blog/${params.slug}`,
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]
  
  if (!post) {
    notFound()
  }

  return (
    <article className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              {post.title}
            </h1>
            <time className="text-neutral-500 text-sm">
              {new Date(post.date).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </header>
          
          <div className="prose prose-lg max-w-none text-neutral-700">
            {post.content}
          </div>
        </div>
      </div>
    </article>
  )
}
