'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaDownload, FaPlus, FaMinus, FaFileAlt, FaExternalLinkAlt } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'

// German technical documents
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
    title: 'K Masten - Technische Dokumentation',
    description: 'Umfassende technische Dokumentation für K Masten, einschließlich Spezifikationen, Installationsrichtlinien und Wartungsverfahren.',
    fileSize: '10.0 MB',
    fileType: 'PDF',
    category: 'Spezifikationen',
    url: '/technical docs/02GP_534_2022_07-1_EN_K masts.pdf',
  },
  {
    id: 2,
    title: 'Teleskop Turm Sektionen T 41, T 61, T 851',
    description: 'Detaillierte technische Spezifikationen und Installationsrichtlinien für Teleskop Turm Sektionen T 41, T 61 und T 851.',
    fileSize: '11 MB',
    fileType: 'PDF',
    category: 'Spezifikationen',
    url: '/technical docs/02GP_631_2019_04_EN_Telescoping T 41-T 61-T 851 (2).pdf',
  },
  {
    id: 3,
    title: 'K Masten Neue Generation',
    description: 'Technische Dokumentation für die neue Generation von K Masten, einschließlich Designmerkmale, Spezifikationen und Installationsverfahren.',
    fileSize: '1.2 MB',
    fileType: 'PDF',
    category: 'Spezifikationen',
    url: '/technical docs/02FP_173_2017_03_EN_K Masts New Generation.pdf',
  },
  {
    id: 4,
    title: 'K Masten Montageanleitung',
    description: 'Montage- und Installationsanleitung für K Masten, mit Verfahren für ordnungsgemäße Montage und Sicherheitsanforderungen.',
    fileSize: '1.2 MB',
    fileType: 'PDF',
    category: 'Betrieb',
    url: '/technical docs/H19-032-E - K Masts ages_EN.pdf',
  },
  {
    id: 5,
    title: 'Verankerungsrahmen',
    description: 'Umfassende Anleitung zu Verankerungsrahmen für Turmkrane, einschließlich Installationsverfahren, Sicherheitsanforderungen und technische Spezifikationen.',
    fileSize: '3.6 MB',
    fileType: 'PDF',
    category: 'Sicherheit',
    url: '/technical docs/Anchorage frames.pdf',
  },
  {
    id: 6,
    title: 'Verankerungsrahmen Typen',
    description: 'Dokumentation über verschiedene Arten von Verankerungsrahmen, ihre Anwendungen und Installationsrichtlinien.',
    fileSize: '771 KB',
    fileType: 'PDF',
    category: 'Sicherheit',
    url: '/technical docs/Anchoring frane Types .pdf .pdf',
  },
  {
    id: 7,
    title: 'CCS Driver Dokumentation',
    description: 'Technische Dokumentation für den CCS (Kransteuerungssystem) Driver, einschließlich Betriebsverfahren und Fehlerbehebungsanleitung.',
    fileSize: '3.2 MB',
    fileType: 'PDF',
    category: 'Betrieb',
    url: '/technical docs/CCS driver.pdf',
  },
  {
    id: 8,
    title: 'Befestigungswinkel für K Masten',
    description: 'Installationsanleitung für Befestigungswinkel, die mit K Masten verwendet werden, einschließlich ordnungsgemäßer Positionierung und Montageanweisungen.',
    fileSize: '218 KB',
    fileType: 'PDF',
    category: 'Betrieb',
    url: '/technical docs/Pdka_02_19_EN Fixing angels K.pdf',
  },
  {
    id: 9,
    title: 'Elektronischer Katalog - Turmkran Spezifikationen',
    description: 'Umfassender elektronischer Katalog mit detaillierten Spezifikationen, technischen Daten und Produktinformationen für Turmkran Komponenten und Systeme.',
    fileSize: '506 MB',
    fileType: 'PDF',
    category: 'Spezifikationen',
    url: 'https://a5db2zzmd8pkwmho.public.blob.vercel-storage.com/e_catalog_en14439_c25_d25_937-2-gecomprimeerd.pdf',
  },
  {
    id: 10,
    title: 'Stahldrahtseil Berechnungstool - Kran Konfiguration',
    description: 'Interaktives Excel-Tool zur Berechnung und Auswahl geeigneter Stahldrahtseile basierend auf Krantyp, Auslegerlänge und Hakenhöhe. <strong>Geben Sie Ihre spezifischen Kranparameter ein, um die richtigen Stahldrahtseil-Spezifikationen für Ihre Anwendung zu bestimmen.</strong>',
    fileSize: '1.5 MB',
    fileType: 'XLSX',
    category: 'Betrieb',
    url: '/technical docs/Cables metalliques _ Wire ropes (24).xlsx',
  },
  {
    id: 11,
    title: 'Technische Dokumentationssammlung V60A',
    description: 'Umfassende zusammengefügte technische Dokumentation mit wesentlichen Turmkran-Spezifikationen, Installationsrichtlinien und Betriebsverfahren in einem konsolidierten Format für einfache Referenz.',
    fileSize: '845 KB',
    fileType: 'PDF',
    category: 'Spezifikationen',
    url: '/technical docs/ilovepdf_merged.pdf',
  },
]

// German FAQs about tower cranes
const faqs = [
  {
    question: 'Was sind die Haupttypen von Turmkranen?',
    answer: 'Die Haupttypen von Turmkranen umfassen Flachkopfkrane, Hammerkopfkrane, Wippkrane und selbstaufrichtende Krane. Jeder Typ ist für spezifische Anwendungen und Standortbedingungen konzipiert. Flachkopfkrane haben keinen A-Rahmen über dem Ausleger und Gegenausleger, was sie ideal für Standorte mit Höhenbeschränkungen oder mehreren Kranen macht. Hammerkopfkrane haben einen horizontalen Ausleger und Gegenausleger mit einer Laufkatze, die Lasten ein- und ausfährt. Wippkrane haben einen Ausleger, der angehoben und abgesenkt werden kann, was sie für beengte Baustellen geeignet macht. Selbstaufrichtende Krane können schnell auf- und abgebaut werden, was sie ideal für kleinere Projekte macht.',
  },
  {
    question: 'Wie bestimmt man den richtigen Turmkran für ein Bauprojekt?',
    answer: 'Die Bestimmung des richtigen Turmkrans erfordert die Berücksichtigung mehrerer Faktoren, einschließlich der benötigten maximalen Tragfähigkeit, der erforderlichen Höhe und Reichweite, der Standortbeschränkungen, der Projektdauer und des Budgets. Sie sollten auch die Art der zu hebenden Materialien, die Häufigkeit der Hebearbeiten und spezifische Anforderungen des Projekts berücksichtigen. Unser Expertenteam kann Ihnen helfen, diese Faktoren zu bewerten und den am besten geeigneten Kran für Ihre spezifischen Bedürfnisse zu empfehlen.',
  },
  {
    question: 'Welche Sicherheitsmaßnahmen sollten beim Betrieb eines Turmkrans vorhanden sein?',
    answer: 'Sicherheitsmaßnahmen für den Turmkranbetrieb umfassen angemessene Ausbildung und Zertifizierung der Bediener, regelmäßige Inspektionen und Wartung, klare Kommunikationsprotokolle, Wetterüberwachung, Lastmanagementsysteme und Antikollisionsvorrichtungen. Darüber hinaus sind die Sicherstellung eines ordnungsgemäßen Fundaments und einer korrekten Installation, die Einrichtung einer Sicherheitszone um den Kran und die Implementierung umfassender Sicherheitspläne unerlässlich. Alle Bediener sollten auch mit Notfallverfahren vertraut sein und die Herstellerrichtlinien befolgen.',
  },
  {
    question: 'Wie oft sollten Turmkrane inspiziert werden?',
    answer: 'Turmkrane sollten täglich vor der Verwendung vom Bediener visuell inspiziert werden, wöchentlich detailliertere Inspektionen durch eine sachkundige Person, monatliche gründliche Inspektionen durch einen qualifizierten Techniker und jährliche umfassende Inspektionen durch zertifizierte Prüfer. Zusätzlich sollten nach schweren Wetterereignissen oder Modifikationen spezielle Inspektionen durchgeführt werden. Diese regelmäßigen Inspektionen tragen dazu bei, einen sicheren Betrieb zu gewährleisten und potenzielle Probleme zu identifizieren, bevor sie zu ernsthaften Problemen werden.',
  },
  {
    question: 'Was sind die Windgeschwindigkeitsgrenzen für den Turmkranbetrieb?',
    answer: 'Turmkrane haben typischerweise betriebliche Windgeschwindigkeitsgrenzen von etwa 20-25 mph (32-40 km/h) für den normalen Betrieb. Wenn die Windgeschwindigkeiten etwa 45 mph (72 km/h) erreichen, sollten Krane in den Windfahnenmodus versetzt werden, damit sich der Ausleger frei mit dem Wind bewegen kann. Diese Grenzen können jedoch je nach spezifischem Kranmodell, Lasteigenschaften und Herstellerrichtlinien variieren. Es ist wichtig, die vom Kranhersteller bereitgestellten Spezifikationen zu befolgen und standortspezifische Bedingungen bei der Bestimmung sicherer Betriebsparameter zu berücksichtigen.',
  },
  {
    question: 'Welche Qualifikationen sind erforderlich, um einen Turmkran zu bedienen?',
    answer: 'Turmkranbediener benötigen spezifische Zertifizierungen und Qualifikationen, die je nach Land und Region variieren. Im Allgemeinen müssen Bediener ein anerkanntes Schulungsprogramm absolvieren, schriftliche und praktische Prüfungen bestehen und eine Zertifizierung von einer akkreditierten Organisation erhalten. Sie sollten auch über gute Tiefenwahrnehmung, Koordination und Konzentrationsfähigkeiten verfügen. Darüber hinaus erfordern die meisten Rechtsordnungen regelmäßige Rezertifizierung, um sicherzustellen, dass Bediener ihre Fähigkeiten und Kenntnisse aktueller Sicherheitsprotokolle und technologischer Fortschritte beibehalten.',
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
            Technische Informationen
          </h1>
          <p className="text-xl text-white/80 text-center mt-4 max-w-3xl mx-auto">
            Detaillierte technische Spezifikationen und Dokumentation für unsere Turmkrane.
          </p>
        </div>
      </div>

      {/* Technical Documents */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">
            Technische Ressourcen
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  Suche
                </h3>
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Dokumente durchsuchen..."
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  Nach Kategorie filtern
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
                  <h3 className="text-xl font-medium text-neutral-700">Keine Dokumente gefunden</h3>
                  <p className="text-neutral-500 mt-2">Versuchen Sie Ihre Suchkriterien anzupassen</p>
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
                          <span>Herunterladen</span>
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
              Häufig gestellte Fragen
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