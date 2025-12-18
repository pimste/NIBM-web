import { Metadata } from 'next'
import { generatePageMetadata } from '../../../page-metadata'
import { notFound } from 'next/navigation'

// Blog posts data - Dutch translations
const blogPosts: { [key: string]: { 
  title: string
  description: string
  date: string
  content: React.ReactNode
} } = {
  'potain-mdt-178-vs-mc-85-b-comparison': {
    title: 'Potain MDT 178 vs MC 85 B: Welke Torenkraan Past bij Uw Bouwproject?',
    description: 'Vergelijk Potain MDT 178 en MC 85 B torenkranen. Begrijp de verschillen tussen platte bovenkant en bovenkant draaiende ontwerpen, capaciteit, gieklengte en welk model geschikt is voor uw bouwproject.',
    date: '2024-01-15',
    content: (
      <>
        <p className="text-lg text-neutral-700 mb-6">
          Het selecteren van de juiste torenkraan voor uw bouwproject vereist begrip van de belangrijkste verschillen tussen modellen. De Potain MDT 178 en MC 85 B vertegenwoordigen twee verschillende ontwerpfilosofieën: platte bovenkant versus bovenkant draaiende configuraties. Deze vergelijking onderzoekt hun specificaties, capaciteiten en typische toepassingen.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Ontwerpfilosofie: Platte Bovenkant vs Bovenkant Draaiend</h2>
        <p className="text-neutral-700 mb-4">
          De Potain MDT 178 heeft een platte bovenkant ontwerp, waardoor geen tegengewicht-giek nodig is en het totale gewicht wordt verminderd. Dit ontwerp biedt meestal eenvoudiger transport en snellere montage vergeleken met bovenkant draaiende modellen. De platte bovenkant configuratie kan voordelig zijn voor projecten waarbij meerdere kranen dicht bij elkaar werken.
        </p>
        <p className="text-neutral-700 mb-6">
          De Potain MC 85 B gebruikt een bovenkant draaiend ontwerp met een traditionele tegengewicht-giek. Deze configuratie biedt uitstekende stabiliteit en is geschikt voor projecten die consistente hijsoperaties vereisen. Bovenkant draaiende kranen bieden over het algemeen nauwkeurige controle en worden vaak verkozen voor projecten met langere duur.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Capaciteit en Prestatie Specificaties</h2>
        <div className="bg-neutral-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Potain MDT 178 Specificaties</h3>
          <ul className="space-y-2 text-neutral-700">
            <li><strong>Maximale Capaciteit:</strong> 8 ton</li>
            <li><strong>Maximale Gieklengte:</strong> 60 meter</li>
            <li><strong>Ontwerptype:</strong> Platte bovenkant torenkraan</li>
            <li><strong>Typische Toepassingen:</strong> Middelgrote tot grote bouwprojecten, commerciële gebouwen, infrastructuurprojecten</li>
          </ul>
        </div>
        <div className="bg-neutral-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Potain MC 85 B Specificaties</h3>
          <ul className="space-y-2 text-neutral-700">
            <li><strong>Maximale Capaciteit:</strong> 5 ton</li>
            <li><strong>Maximale Gieklengte:</strong> 52 meter</li>
            <li><strong>Ontwerptype:</strong> Bovenkant draaiende torenkraan</li>
            <li><strong>Typische Toepassingen:</strong> Middelgrote bouwprojecten, residentiële gebouwen, stedelijke bouwplaatsen</li>
          </ul>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Belangrijkste Verschillen</h2>
        <p className="text-neutral-700 mb-4">
          De MDT 178 biedt een hogere maximale capaciteit van 8 ton vergeleken met de 5 ton van de MC 85 B. Met een maximale gieklengte van 60 meter biedt de MDT 178 8 meter meer reikwijdte dan de 52 meter giek van de MC 85 B. Platte bovenkant ontwerpen zoals de MDT 178 bieden meestal voordelen in transportlogistiek vanwege verminderd componentgewicht.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Project Geschiktheid Overwegingen</h2>
        <p className="text-neutral-700 mb-4">
          Kies MDT 178 wanneer uw project hijscapaciteiten boven 5 ton vereist, u maximale giek reikwijdte tot 60 meter nodig heeft, of meerdere kranen dicht bij elkaar zullen werken. Kies MC 85 B wanneer de maximale hijsvereisten van uw project 5 ton of minder zijn, 52 meter giek reikwijdte voldoende is voor uw site, of u de stabiliteit en controle van bovenkant draaiend ontwerp verkiest.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Conclusie</h2>
        <p className="text-neutral-700 mb-6">
          De keuze tussen Potain MDT 178 en MC 85 B hangt af van uw specifieke projectvereisten. De MDT 178 biedt grotere capaciteit en reikwijdte, waardoor het geschikt is voor grotere projecten, terwijl de MC 85 B betrouwbare prestaties biedt voor middelgrote bouwbehoeften.
        </p>
      </>
    ),
  },
  'potain-mdt-series-specifications-guide': {
    title: 'Potain MDT Serie Specificaties: Complete Gids voor Platte Bovenkant Torenkranen',
    description: 'Uitgebreide gids voor Potain MDT serie platte bovenkant torenkranen. Leer over MDT 178, MDT 189, MDT 219 J10 en MDT 268 J12 specificaties, capaciteiten, gieklengtes en technische kenmerken.',
    date: '2024-01-20',
    content: (
      <>
        <p className="text-lg text-neutral-700 mb-6">
          De Potain MDT serie vertegenwoordigt een reeks platte bovenkant torenkranen ontworpen voor moderne bouwprojecten. Deze gids biedt gedetailleerde specificaties en technische informatie over de MDT serie modellen.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">MDT Serie Modellen Overzicht</h2>
        <div className="space-y-6 mb-8">
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Potain MDT 178</h3>
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Maximale Capaciteit:</strong> 8 ton</li>
              <li><strong>Maximale Gieklengte:</strong> 60 meter</li>
              <li><strong>Typisch Gebruik:</strong> Veelzijdige kraan geschikt voor een breed scala aan bouwprojecten</li>
            </ul>
          </div>
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Potain MDT 189</h3>
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Maximale Capaciteit:</strong> 8 ton</li>
              <li><strong>Maximale Gieklengte:</strong> 60 meter</li>
              <li><strong>Typisch Gebruik:</strong> Levert uitzonderlijke prestaties met innovatief platte bovenkant ontwerp</li>
            </ul>
          </div>
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Potain MDT 219 J10</h3>
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Maximale Capaciteit:</strong> 10 ton</li>
              <li><strong>Maximale Gieklengte:</strong> 65 meter</li>
              <li><strong>Typisch Gebruik:</strong> Krachtige torenkraan voor zware projecten</li>
            </ul>
          </div>
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Potain MDT 268 J12</h3>
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Maximale Capaciteit:</strong> 12 ton</li>
              <li><strong>Maximale Gieklengte:</strong> 75 meter</li>
              <li><strong>Typisch Gebruik:</strong> Premium platte bovenkant torenkraan met uitzonderlijke capaciteit</li>
            </ul>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Conclusie</h2>
        <p className="text-neutral-700 mb-6">
          De Potain MDT serie biedt een uitgebreide reeks platte bovenkant torenkranen geschikt voor verschillende bouwtoepassingen. Van de veelzijdige MDT 178 tot de hoge capaciteit MDT 268 J12, deze modellen bieden bouwprofessionals opties die overeenkomen met hun specifieke projectvereisten.
        </p>
      </>
    ),
  },
  'how-to-choose-right-potain-tower-crane': {
    title: 'Hoe Kiest U de Juiste Potain Torenkraan: Capaciteit, Gieklengte en Projectvereisten',
    description: 'Leer hoe u de juiste Potain torenkraan selecteert voor uw bouwproject. Begrijp capaciteitsvereisten, gieklengte berekeningen, project specificaties en belangrijke selectiefactoren.',
    date: '2024-01-25',
    content: (
      <>
        <p className="text-lg text-neutral-700 mb-6">
          Het selecteren van de juiste torenkraan voor een bouwproject vereist zorgvuldige evaluatie van meerdere factoren. Deze gids beschrijft de belangrijkste overwegingen bij het kiezen van een Potain torenkraan.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Capaciteitsvereisten Begrijpen</h2>
        <p className="text-neutral-700 mb-4">
          Torenkraan capaciteit verwijst naar het maximale gewicht dat de kraan kan hijsen. Deze capaciteit varieert echter afhankelijk van de giek extensie en lastpositie. Een kraan met een maximale capaciteit van 8 ton kan mogelijk slechts 2 ton hijsen bij maximale giek extensie.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-neutral-700">
            <strong>Belangrijk:</strong> Raadpleeg altijd het lastdiagram van de kraan om de werkelijke hijscapaciteit bij uw vereiste giek extensie te bepalen.
          </p>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Gieklengte Vereisten Bepalen</h2>
        <p className="text-neutral-700 mb-4">
          Gieklengte bepaalt het bereik en de dekking van de kraan. Het selecteren van de juiste gieklengte zorgt ervoor dat de kraan alle vereiste hijspunten kan bereiken zonder verplaatsing.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Project Specifieke Overwegingen</h2>
        <p className="text-neutral-700 mb-6">
          Overweeg projecttype, duur en site beperkingen bij het selecteren van een torenkraan. Verschillende projecttypen hebben verschillende capaciteits- en reikwijdtevereisten. Langere projecten kunnen baat hebben bij aankoop, terwijl kortere projecten beter geschikt kunnen zijn voor verhuurovereenkomsten.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Conclusie</h2>
        <p className="text-neutral-700 mb-6">
          Het kiezen van de juiste Potain torenkraan vereist zorgvuldige analyse van capaciteitsvereisten, gieklengte behoeften en project specifieke factoren. Raadpleeg altijd gekwalificeerde professionals om een juiste kraan selectie en installatieplanning te waarborgen.
        </p>
      </>
    ),
  },
  'potain-mc-vs-mdt-vs-mct-series-differences': {
    title: 'Potain MC vs MDT vs MCT Serie: Verschillen Begrijpen en Beste Toepassingen',
    description: 'Vergelijk Potain MC, MDT en MCT torenkraan series. Leer de verschillen tussen bovenkant draaiende en platte bovenkant ontwerpen, capaciteitsbereiken en welke serie geschikt is voor verschillende bouwprojecttypen.',
    date: '2024-01-30',
    content: (
      <>
        <p className="text-lg text-neutral-700 mb-6">
          Potain produceert drie hoofd torenkraan series: MC (bovenkant draaiend), MDT (platte bovenkant), en MCT (compacte platte bovenkant). Het begrijpen van de verschillen tussen deze series helpt bouwprofessionals de meest geschikte kraan voor hun specifieke projectvereisten te selecteren.
        </p>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">MC Serie: Bovenkant Draaiend Ontwerp</h2>
        <p className="text-neutral-700 mb-4">
          De Potain MC serie vertegenwoordigt traditionele bovenkant draaiende torenkranen met tegengewicht-gieken. Deze kranen hebben het klassieke torenkraan ontwerp met het draaimechanisme aan de bovenkant van de mast.
        </p>
        <div className="bg-neutral-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">MC Serie Kenmerken</h3>
          <ul className="space-y-2 text-neutral-700">
            <li><strong>Ontwerptype:</strong> Bovenkant draaiend met tegengewicht-giek</li>
            <li><strong>Capaciteitsbereik:</strong> 5-8 ton</li>
            <li><strong>Gieklengte Bereik:</strong> 52-60 meter</li>
            <li><strong>Belangrijkste Kenmerken:</strong> Bewezen betrouwbaarheid, uitstekende stabiliteit, nauwkeurige controle</li>
          </ul>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">MDT Serie: Platte Bovenkant Hoge Capaciteit Ontwerp</h2>
        <p className="text-neutral-700 mb-4">
          De Potain MDT serie heeft platte bovenkant torenkranen ontworpen voor hogere capaciteitstoepassingen. Deze kranen elimineren de tegengewicht-giek, wat resulteert in verminderd gewicht en vereenvoudigd transport.
        </p>
        <div className="bg-neutral-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">MDT Serie Kenmerken</h3>
          <ul className="space-y-2 text-neutral-700">
            <li><strong>Ontwerptype:</strong> Platte bovenkant zonder tegengewicht-giek</li>
            <li><strong>Capaciteitsbereik:</strong> 8-12 ton</li>
            <li><strong>Gieklengte Bereik:</strong> 60-75 meter</li>
            <li><strong>Belangrijkste Kenmerken:</strong> Hoge capaciteit, uitgebreide reikwijdte, eenvoudiger transport</li>
          </ul>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">MCT Serie: Compact Platte Bovenkant Ontwerp</h2>
        <p className="text-neutral-700 mb-4">
          De Potain MCT serie combineert platte bovenkant ontwerp met compacte afmetingen, waardoor deze kranen ideaal zijn voor ruimtebeperkte bouwplaatsen.
        </p>
        <div className="bg-neutral-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">MCT Serie Kenmerken</h3>
          <ul className="space-y-2 text-neutral-700">
            <li><strong>Ontwerptype:</strong> Compacte platte bovenkant</li>
            <li><strong>Capaciteitsbereik:</strong> 5-6 ton</li>
            <li><strong>Gieklengte Bereik:</strong> 50-52 meter</li>
            <li><strong>Belangrijkste Kenmerken:</strong> Compacte voetafdruk, snelle opstelling, stedelijke bouw focus</li>
          </ul>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Conclusie</h2>
        <p className="text-neutral-700 mb-6">
          De Potain MC, MDT en MCT series dienen elk verschillende bouwbehoeften. MC serie biedt betrouwbare bovenkant draaiende prestaties voor middelgrote projecten, MDT serie biedt hoge capaciteit platte bovenkant oplossingen voor grote projecten, en MCT serie levert compacte platte bovenkant opties voor ruimtebeperkte sites.
        </p>
      </>
    ),
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug]
  
  if (!post) {
    return {
      title: 'Blog Artikel Niet Gevonden | NIBM Tower Cranes',
      description: 'Het gevraagde blog artikel kon niet worden gevonden.',
    }
  }

  const baseMetadata: Metadata = {
    title: `${post.title} | NIBM Tower Cranes Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.nibmvb.eu/nl/blog/${params.slug}`,
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
    `/nl/blog/${params.slug}`,
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
              {new Date(post.date).toLocaleDateString('nl-NL', {
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
