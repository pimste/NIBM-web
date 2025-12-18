'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaDownload, FaPlus, FaMinus, FaFileAlt, FaExternalLinkAlt } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'

// Dutch technical documents
const technicalDocuments: Array<{
  id: number
  title: string
  description: string
  fileSize: string
  fileType: string
  category: string
  url: string
}> = [
  {
    id: 1,
    title: 'K Masten - Technische Documentatie',
    description: 'Uitgebreide technische documentatie voor K masten, inclusief specificaties, installatiehandleidingen en onderhoudsprocedures.',
    fileSize: '10.0 MB',
    fileType: 'PDF',
    category: 'Specificaties',
    url: '/technical docs/02GP_534_2022_07-1_EN_K masts.pdf',
  },
  {
    id: 2,
    title: 'Telescoop Toren Secties T 41, T 61, T 851',
    description: 'Gedetailleerde technische specificaties en installatiehandleidingen voor telescoop toren secties T 41, T 61 en T 851.',
    fileSize: '11 MB',
    fileType: 'PDF',
    category: 'Specificaties',
    url: '/technical docs/02GP_631_2019_04_EN_Telescoping T 41-T 61-T 851 (2).pdf',
  },
  {
    id: 3,
    title: 'K Masten Nieuwe Generatie',
    description: 'Technische documentatie voor de nieuwe generatie K masten, inclusief ontwerpkenmerken, specificaties en installatieprocedures.',
    fileSize: '1.2 MB',
    fileType: 'PDF',
    category: 'Specificaties',
    url: '/technical docs/02FP_173_2017_03_EN_K Masts New Generation.pdf',
  },
  {
    id: 4,
    title: 'K Masten Montagehandleiding',
    description: 'Montage- en installatiehandleiding voor K masten, met procedures voor correcte montage en veiligheidsvereisten.',
    fileSize: '1.2 MB',
    fileType: 'PDF',
    category: 'Operaties',
    url: '/technical docs/H19-032-E - K Masts ages_EN.pdf',
  },
  {
    id: 5,
    title: 'Verankeringsframes',
    description: 'Uitgebreide handleiding voor verankeringsframes voor torenkranen, inclusief installatieprocedures, veiligheidsvereisten en technische specificaties.',
    fileSize: '3.6 MB',
    fileType: 'PDF',
    category: 'Veiligheid',
    url: '/technical docs/Anchorage frames.pdf',
  },
  {
    id: 6,
    title: 'Verankeringsframe Types',
    description: 'Documentatie over verschillende soorten verankeringsframes, hun toepassingen en installatiehandleidingen.',
    fileSize: '771 KB',
    fileType: 'PDF',
    category: 'Veiligheid',
    url: '/technical docs/Anchoring frane Types .pdf .pdf',
  },
  {
    id: 7,
    title: 'CCS Driver Documentatie',
    description: 'Technische documentatie voor de CCS (Kraanbesturingssysteem) driver, inclusief bedieningsprocedures en troubleshooting handleiding.',
    fileSize: '3.2 MB',
    fileType: 'PDF',
    category: 'Operaties',
    url: '/technical docs/CCS driver.pdf',
  },
  {
    id: 8,
    title: 'Bevestigingshoeken voor K Masten',
    description: 'Installatiehandleiding voor bevestigingshoeken gebruikt met K masten, inclusief correcte positionering en montage-instructies.',
    fileSize: '218 KB',
    fileType: 'PDF',
    category: 'Operaties',
    url: '/technical docs/Pdka_02_19_EN Fixing angels K.pdf',
  },
  {
    id: 9,
    title: 'Elektronische Catalogus - Torenkraan Specificaties',
    description: 'Uitgebreide elektronische catalogus met gedetailleerde specificaties, technische gegevens en productinformatie voor torenkraan componenten en systemen.',
    fileSize: '506 MB',
    fileType: 'PDF',
    category: 'Specificaties',
    url: 'https://a5db2zzmd8pkwmho.public.blob.vercel-storage.com/e_catalog_en14439_c25_d25_937-2-gecomprimeerd.pdf',
  },
  {
    id: 10,
    title: 'Staalkabel Berekeningstool - Kraan Configuratie',
    description: 'Interactieve Excel tool voor het berekenen en selecteren van geschikte staalkabels op basis van kraantype, giek lengte en haakhoogte. <strong>Vul uw specifieke kraanparameters in om de juiste staalkabel specificaties voor uw toepassing te bepalen.</strong>',
    fileSize: '1.5 MB',
    fileType: 'XLSX',
    category: 'Operaties',
    url: '/technical docs/Cables metalliques _ Wire ropes (24).xlsx',
  },
  {
    id: 11,
    title: 'Technische Documentatie Collectie V60A',
    description: 'Uitgebreide samengevoegde technische documentatie met essentiële torenkraan specificaties, installatiehandleidingen en operationele procedures in een geconsolideerd formaat voor eenvoudige referentie.',
    fileSize: '845 KB',
    fileType: 'PDF',
    category: 'Specificaties',
    url: '/technical docs/ilovepdf_merged.pdf',
  },
  {
    id: 12,
    title: 'Bevestigingshoeken P 63A / P 800B en R 63A / R 800C - Verbeterde Haakhoogtes voor 2m Masten',
    description: 'Nieuw aanbod van bevestigingshoeken voor masten met een doorsnede van 2m (K600) en 2.45m (K800). Bevat P 63A / P 800B (niet-herbruikbaar) en R 63A / R 800C (herbruikbaar) versies. Deze versterkte bevestigingshoeken verbeteren aanzienlijk de haakhoogtes van kranen op 2m masten, vooral wanneer gecombineerd met de nieuwe KRM 6410B versterkte mast.',
    fileSize: '306 KB',
    fileType: 'PDF',
    category: 'Specificaties',
    url: '/technical docs/ Fixing angles P 63A:P 800 and R 63A:R 800C.pdf',
  },
  {
    id: 13,
    title: 'KRM 6410B Mast Sectie - Versterkte 10m Sectie voor 2m Masten',
    description: 'Nieuwe 10m versterkte, monoblock, niet-telescoop mast sectie voor 2m (K600) type masten. Lengte: 10m, Gewicht: 7.100 kg. Ontwikkeld samen met de nieuwe ZX 640 kruisvormige basis en nieuwe bevestigingshoeken. In combinatie met nieuwe bases verbetert het de haakhoogtes van kranen op 2m masten. Kan twee 5m mast secties of één 10m mast sectie van lagere sterkte vervangen.',
    fileSize: '467 KB',
    fileType: 'PDF',
    category: 'Specificaties',
    url: '/technical docs/Special towersection KRM 6410B.pdf',
  },
]

// Dutch FAQs about tower cranes
const faqs = [
  {
    question: 'Wat zijn de belangrijkste types torenkranen?',
    answer: 'De belangrijkste types torenkranen zijn vlakke top kranen, hamerkop kranen, knikgiek kranen en zelfoprichtende kranen. Elk type is ontworpen voor specifieke toepassingen en terreinomstandigheden. Vlakke top kranen hebben geen A-frame boven de giek en contra-giek, waardoor ze ideaal zijn voor locaties met hoogtebeperkingen of meerdere kranen. Hamerkop kranen hebben een horizontale giek en contra-giek met een loopkat die lasten in en uit beweegt. Knikgiek kranen hebben een giek die omhoog en omlaag kan bewegen, waardoor ze geschikt zijn voor drukke bouwplaatsen. Zelfoprichtende kranen kunnen snel worden op- en afgebouwd, waardoor ze ideaal zijn voor kleinere projecten.',
  },
  {
    question: 'Hoe bepaal je de juiste torenkraan voor een bouwproject?',
    answer: 'Het bepalen van de juiste torenkraan vereist het overwegen van verschillende factoren, waaronder de benodigde maximale laadcapaciteit, de vereiste hoogte en reikwijdte, terreinbeperkingen, projectduur en budget. Je moet ook rekening houden met het type materialen dat moet worden gehesen, de frequentie van de hijs, en specifieke vereisten van het project. Ons team van experts kan je helpen deze factoren te beoordelen en de meest geschikte kraan voor jouw specifieke behoeften aan te bevelen.',
  },
  {
    question: 'Welke veiligheidsmaatregelen moeten worden genomen bij het bedienen van een torenkraan?',
    answer: 'Veiligheidsmaatregelen voor torenkraanbediening omvatten goede opleiding en certificering van operators, regelmatige inspecties en onderhoud, duidelijke communicatieprotocollen, weermonitoring, lastbeheersystemen en anti-botsingsapparatuur. Daarnaast zijn het waarborgen van een goede fundering en installatie, het instellen van een veiligheidszone rond de kraan, en het implementeren van uitgebreide veiligheidsplannen essentieel. Alle operators moeten ook bekend zijn met noodprocedures en de richtlijnen van de fabrikant volgen.',
  },
  {
    question: 'Hoe vaak moeten torenkranen worden geïnspecteerd?',
    answer: 'Torenkranen moeten dagelijks visueel worden geïnspecteerd door de operator voor gebruik, wekelijks meer gedetailleerde inspecties door een bekwaam persoon, maandelijkse grondige inspecties door een gekwalificeerde technicus, en jaarlijkse uitgebreide inspecties door gecertificeerde inspecteurs. Bovendien moeten na zware weersomstandigheden of wijzigingen speciale inspecties worden uitgevoerd. Deze regelmatige inspecties helpen een veilige werking te waarborgen en mogelijke problemen te identificeren voordat ze ernstige problemen worden.',
  },
  {
    question: 'Wat zijn de windsnelheidslimieten voor het gebruik van torenkranen?',
    answer: 'Torenkranen hebben typisch operationele windsnelheidslimieten van ongeveer 20-25 mph (32-40 km/u) voor normaal gebruik. Wanneer windsnelheden ongeveer 45 mph (72 km/u) bereiken, moeten kranen in windvaanmodus worden gezet zodat de giek vrij met de wind kan bewegen. Deze limieten kunnen echter variëren op basis van het specifieke kraanmodel, lasteigenschappen, en richtlijnen van de fabrikant. Het is essentieel om de specificaties te volgen die door de kraanfabrikant worden verstrekt en rekening te houden met locatiespecifieke omstandigheden bij het bepalen van veilige bedrijfsparameters.',
  },
  {
    question: 'Welke kwalificaties zijn vereist om een torenkraan te bedienen?',
    answer: 'Torenkraanoperators hebben specifieke certificeringen en kwalificaties nodig, die variëren per land en regio. Over het algemeen moeten operators een erkend trainingsprogramma voltooien, slagen voor zowel schriftelijke als praktische examens, en een certificering verkrijgen van een geaccrediteerde organisatie. Ze moeten ook een goed dieptezicht, coördinatie en concentratievermogen hebben. Daarnaast vereisen de meeste jurisdicties regelmatige hercertificering om ervoor te zorgen dat operators hun vaardigheden en kennis van actuele veiligheidsprotocollen en technologische ontwikkelingen behouden.',
  },
]

export default function TechnicalInfoClient() {
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const { t } = useLanguage()

  const categories = Array.from(new Set(technicalDocuments.map(doc => doc.category)))

  const toggleCategory = (category: string) => {
    if (activeCategories.includes(category)) {
      setActiveCategories(activeCategories.filter(cat => cat !== category))
    } else {
      setActiveCategories([...activeCategories, category])
    }
  }

  const filteredDocuments = technicalDocuments.filter(doc => {
    const matchesCategory = activeCategories.length === 0 || activeCategories.includes(doc.category)
    const matchesSearch = searchTerm === '' || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
            Technische Informatie
          </h1>
          <p className="text-xl text-white/80 text-center mt-4 max-w-3xl mx-auto">
            Gedetailleerde technische specificaties en documentatie voor onze torenkranen.
          </p>
        </div>
      </div>

      {/* Technical Documents */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">
            Technische Documenten
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  Zoeken
                </h3>
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Zoek in documenten..."
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  Filter op categorie
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                        checked={activeCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-neutral-700"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Documents List */}
            <div className="lg:col-span-3">
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-12 bg-neutral-50 rounded-lg">
                  <FaFileAlt className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-neutral-700">Geen documenten gevonden</h3>
                  <p className="text-neutral-500 mt-2">Probeer je zoekfilters aan te passen</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDocuments.map((doc) => (
                    <div key={doc.id} className="bg-neutral-50 p-6 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary rounded-md mb-2">
                            {doc.category}
                          </span>
                          <h3 className="text-lg font-bold text-neutral-900 mb-2">
                            {doc.title}
                          </h3>
                          <p className="text-neutral-700 text-sm mb-3" dangerouslySetInnerHTML={{ __html: doc.description }} />
                          <p className="text-neutral-500 text-xs">
                            {doc.fileType} • {doc.fileSize}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Link href={doc.url} className="flex items-center text-primary hover:text-primary-700 transition-colors">
                          <FaDownload className="mr-2" />
                          <span>Downloaden</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* FAQs */}
          <div id="faq" className="mt-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">
              Veelgestelde vragen
            </h2>

            <div className="space-y-4 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-neutral-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full p-4 text-left bg-neutral-50 hover:bg-neutral-100 flex items-center justify-between focus:outline-none transition-colors"
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  >
                    <span className="font-medium text-lg">{faq.question}</span>
                    {activeFaq === index ? 
                      <FaMinus className="text-primary" /> : 
                      <FaPlus className="text-primary" />
                    }
                  </button>
                  {activeFaq === index && (
                    <div className="p-4 bg-white">
                      <p className="text-neutral-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 