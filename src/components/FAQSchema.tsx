'use client'

import Script from 'next/script'
import { useLanguage } from '@/context/LanguageContext'

interface FAQ {
  question: string
  answer: string
}

const faqData: Record<string, FAQ[]> = {
  en: [
    {
      question: "What types of tower cranes do you have available?",
      answer: "We offer a comprehensive range of tower cranes including flat-top cranes, luffing jib cranes, and self-erecting cranes. Our inventory includes models from leading manufacturers like Potain, Liebherr, and Jaso, with capacities ranging from 4 to 32 tons."
    },
    {
      question: "Do you provide crane assembly and disassembly services?",
      answer: "Yes, we provide complete assembly and disassembly services for all tower cranes. Our certified technicians handle everything from foundation inspection to final commissioning, ensuring safe and efficient crane operations."
    },
    {
      question: "What maintenance services do you offer for tower cranes?",
      answer: "We offer comprehensive maintenance services including preventive maintenance, emergency repairs, parts replacement, safety inspections, and technical support. Our service team is available 24/7 for urgent repairs."
    },
    {
      question: "Can you transport tower cranes to construction sites?",
      answer: "Yes, we provide specialized transport services for tower cranes throughout Europe. Our experienced logistics team handles all aspects of crane transportation including permits, route planning, and specialized equipment."
    },
    {
      question: "Do you sell tower crane parts and accessories?",
      answer: "We maintain an extensive inventory of genuine tower crane parts and accessories from major manufacturers. We can source both common and specialized components to keep your cranes operational."
    },
    {
      question: "What safety certifications do your cranes meet?",
      answer: "All our tower cranes meet or exceed European safety standards including CE marking and comply with relevant machinery directives. We provide complete documentation and safety certificates with every crane."
    },
    {
      question: "How long can I rent a tower crane?",
      answer: "We offer flexible rental periods from short-term daily rentals to long-term contracts spanning several years. Rental terms are customized based on your project requirements and duration."
    },
    {
      question: "Do you provide equipment assessment services for tower cranes?",
      answer: "Yes, we provide comprehensive equipment condition assessments and site evaluations to ensure optimal crane selection and safe operations. Our expert team evaluates equipment condition, site suitability, load capacity requirements, and safety compliance to provide detailed recommendations for your project needs."
    }
  ],
  nl: [
    {
      question: "Welke soorten torenkranen hebben jullie beschikbaar?",
      answer: "Wij bieden een uitgebreid assortiment torenkranen waaronder flat-top kranen, luffing giek kranen en zelfoprichtende kranen. Ons aanbod bevat modellen van toonaangevende fabrikanten zoals Potain, Liebherr en Jaso, met capaciteiten van 4 tot 32 ton."
    },
    {
      question: "Bieden jullie montage en demontage diensten voor kranen?",
      answer: "Ja, wij verzorgen complete montage en demontage diensten voor alle torenkranen. Onze gecertificeerde technici verzorgen alles van funderingsinspectie tot eindcontrole, voor veilige en efficiënte kraanoperaties."
    },
    {
      question: "Welke onderhoudsdiensten bieden jullie voor torenkranen?",
      answer: "Wij bieden uitgebreide onderhoudsdiensten inclusief preventief onderhoud, noodreparaties, vervanging van onderdelen, veiligheidsinspecties en technische ondersteuning. Ons serviceteam is 24/7 beschikbaar voor urgente reparaties."
    },
    {
      question: "Kunnen jullie torenkranen transporteren naar bouwplaatsen?",
      answer: "Ja, wij verzorgen gespecialiseerde transportdiensten voor torenkranen door heel Europa. Ons ervaren logistieke team regelt alle aspecten van kraantransport inclusief vergunningen, routeplanning en gespecialiseerde uitrusting."
    },
    {
      question: "Verkopen jullie torenkraan onderdelen en accessoires?",
      answer: "Wij onderhouden een uitgebreide voorraad van originele torenkraan onderdelen en accessoires van grote fabrikanten. Wij kunnen zowel gangbare als gespecialiseerde componenten leveren om uw kranen operationeel te houden."
    },
    {
      question: "Aan welke veiligheidscertificeringen voldoen jullie kranen?",
      answer: "Alle onze torenkranen voldoen aan of overtreffen Europese veiligheidsnormen inclusief CE-markering en voldoen aan relevante machinerichtlijnen. Wij leveren complete documentatie en veiligheidscertificaten bij elke kraan."
    },
    {
      question: "Hoe lang kan ik een torenkraan huren?",
      answer: "Wij bieden flexibele huurperiodes van korte termijn dagverhuur tot langetermijncontracten van meerdere jaren. Huurvoorwaarden worden aangepast op basis van uw projectvereisten en duur."
    },
    {
      question: "Bieden jullie operatortraining voor torenkranen?",
      answer: "Hoewel wij ons richten op kraanlevering en technische diensten, kunnen wij gecertificeerde trainingsaanbieders aanbevelen voor torenkraan operators. Wij verzorgen ook technische oriëntatie voor onderhoud en veiligheidsprocedures."
    },
    {
      question: "Do you offer equipment assessment services?",
      answer: "Yes, we provide comprehensive equipment assessment and site evaluation services. Our expert team conducts thorough equipment condition assessments, site suitability evaluations, load capacity analysis, and safety compliance assessments to ensure optimal crane selection and safe operations for your construction projects."
    }
  ],
  de: [
    {
      question: "Welche Arten von Turmkränen haben Sie verfügbar?",
      answer: "Wir bieten eine umfassende Palette von Turmkränen einschließlich Flachkopfkränen, Wippauslegerkränen und selbstaufrichtenden Kränen. Unser Bestand umfasst Modelle von führenden Herstellern wie Potain, Liebherr und Jaso mit Kapazitäten von 4 bis 32 Tonnen."
    },
    {
      question: "Bieten Sie Montage- und Demontageservices für Kräne an?",
      answer: "Ja, wir bieten komplette Montage- und Demontageservices für alle Turmkräne. Unsere zertifizierten Techniker kümmern sich um alles von der Fundamentinspektion bis zur Endabnahme für sicheren und effizienten Kranenbetrieb."
    },
    {
      question: "Welche Wartungsservices bieten Sie für Turmkräne?",
      answer: "Wir bieten umfassende Wartungsservices einschließlich präventiver Wartung, Notreparaturen, Teilersatz, Sicherheitsinspektionen und technischer Unterstützung. Unser Serviceteam ist 24/7 für dringende Reparaturen verfügbar."
    },
    {
      question: "Können Sie Turmkräne zu Baustellen transportieren?",
      answer: "Ja, wir bieten spezialisierte Transportservices für Turmkräne in ganz Europa. Unser erfahrenes Logistikteam kümmert sich um alle Aspekte des Krantransports einschließlich Genehmigungen, Routenplanung und spezialisierter Ausrüstung."
    },
    {
      question: "Verkaufen Sie Turmkran-Teile und Zubehör?",
      answer: "Wir unterhalten ein umfangreiches Lager von Original-Turmkran-Teilen und Zubehör von großen Herstellern. Wir können sowohl gängige als auch spezialisierte Komponenten beschaffen, um Ihre Kräne betriebsbereit zu halten."
    },
    {
      question: "Welche Sicherheitszertifizierungen erfüllen Ihre Kräne?",
      answer: "Alle unsere Turmkräne erfüllen oder übertreffen europäische Sicherheitsstandards einschließlich CE-Kennzeichnung und entsprechen relevanten Maschinenrichtlinien. Wir liefern komplette Dokumentation und Sicherheitszertifikate mit jedem Kran."
    },
    {
      question: "Wie lange kann ich einen Turmkran mieten?",
      answer: "Wir bieten flexible Mietzeiten von kurzfristigen Tagesmieten bis zu langfristigen Verträgen über mehrere Jahre. Mietbedingungen werden basierend auf Ihren Projektanforderungen und der Dauer angepasst."
    },
    {
      question: "Bieten Sie Bedienerschulung für Turmkräne an?",
      answer: "Obwohl wir uns auf Kranlieferung und technische Services konzentrieren, können wir zertifizierte Schulungsanbieter für Turmkran-Bediener empfehlen. Wir bieten auch technische Einweisung für Wartung und Sicherheitsverfahren."
    },
    {
      question: "Do you offer equipment assessment services?",
      answer: "Yes, we provide comprehensive equipment assessment and site evaluation services. Our expert team conducts thorough equipment condition assessments, site suitability evaluations, load capacity analysis, and safety compliance assessments to ensure optimal crane selection and safe operations for your construction projects."
    }
  ]
}

export function FAQSchema() {
  const { language } = useLanguage()
  const faqs = faqData[language] || faqData.en

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      strategy="afterInteractive"
    />
  )
}

// FAQ Component for displaying FAQs on the page
export function FAQSection() {
  const { language } = useLanguage()
  const faqs = faqData[language] || faqData.en

  const titles = {
    en: "Frequently Asked Questions",
    nl: "Veelgestelde Vragen", 
    de: "Häufig gestellte Fragen"
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            {titles[language] || titles.en}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {language === 'en' && "Find answers to common questions about our tower crane services."}
            {language === 'nl' && "Vind antwoorden op veelgestelde vragen over onze torenkraan diensten."}
            {language === 'de' && "Finden Sie Antworten auf häufige Fragen zu unseren Turmkran-Dienstleistungen."}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-neutral-50 rounded-lg">
                <summary className="p-6 cursor-pointer text-lg font-semibold text-neutral-900 hover:text-primary transition-colors">
                  {faq.question}
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-neutral-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      <FAQSchema />
    </section>
  )
}

// Common FAQ data for tower crane services
export const towerCraneFAQs: FAQ[] = [
  {
    question: "What types of tower cranes do you offer for rental?",
    answer: "We offer flexible rental terms from short-term projects (a few weeks) to long-term contracts (several years). Our team will work with you to determine the optimal rental period based on your project timeline and requirements."
  },
  {
    question: "Do you provide installation and dismantling services?",
    answer: "Yes, we provide professional installation and dismantling services performed by our certified technicians. This includes site preparation, assembly, testing, commissioning, and complete dismantling when your project is complete."
  },
  {
    question: "What areas do you serve?",
    answer: "We serve customers across Europe, with primary focus on the Netherlands, Germany, Belgium, and Luxembourg. Our experienced team can handle transport and logistics across these regions."
  },
  {
    question: "Do you offer equipment assessment services?",
    answer: "Yes, we provide comprehensive equipment assessment and site evaluation services. Our expert team conducts thorough equipment condition assessments, site suitability evaluations, load capacity analysis, and safety compliance assessments to ensure optimal crane selection and safe operations for your construction projects."
  },
  {
    question: "What maintenance services do you provide?",
    answer: "We offer regular maintenance services, emergency repairs, and technical support to minimize downtime and extend equipment lifespan. Our maintenance programs are designed to keep your crane operating safely and efficiently."
  },
  {
    question: "Can you help with project planning and crane selection?",
    answer: "Absolutely. Our expert team provides consulting services including site assessment, crane selection based on your specific requirements, load capacity analysis, and project timeline planning to ensure optimal crane solutions."
  },
  {
    question: "What is included in your transport services?",
    answer: "Our transport services include route planning, permit acquisition, specialized transport vehicles and equipment, and coordination with local authorities. We handle all logistics to ensure safe and timely delivery to your construction site."
  }
] 