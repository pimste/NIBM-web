'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// Define available languages
export type Language = 'en' | 'nl' | 'de'

// Define the context shape
type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
})

// Translations object
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.towercranes': 'Available Towercranes',
    'nav.technical': 'Technical Information',
    'nav.contact': 'Contact',
    'nav.quote': 'Get a Quote',
    
    // Hero Section
    'hero.title1': 'Elevating Construction',
    'hero.title2': 'To New Heights',
    'hero.subtitle': 'NIBM Tower Cranes specializes in the sale and rental of tower cranes, with full-service solutions from planning to ongoing support.',
    'hero.cta1': 'Explore Our Tower Cranes',
    'hero.cta2': 'Request a Quote',
    'hero.scroll': 'Scroll Down',
    
    // Services Section
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive tower crane solutions for your construction projects',
    'services.rental': 'Tower Crane Rental',
    'services.rental.desc': 'Short and long-term rental options for a wide range of tower cranes to meet your project needs.',
    'services.installation': 'Installation & Dismantling',
    'services.installation.desc': 'Professional installation and dismantling services by our expert team, ensuring safety and efficiency.',
    'services.maintenance': 'Maintenance & Repairs',
    'services.maintenance.desc': 'Regular maintenance services and emergency repairs to minimize downtime and extend equipment lifespan.',
    'services.consulting': 'Consulting Services',
    'services.consulting.desc': 'Expert advice on crane selection, site planning, and logistics to optimize your construction project.',
    'services.training': 'Operator Training',
    'services.training.desc': 'Comprehensive training programs for crane operators, focusing on safety protocols and operational efficiency.',
    'services.planning': 'Project Planning',
    'services.planning.desc': 'Strategic project planning services to determine the optimal crane solutions for your construction timeline.',
    
    // About Page
    'about.title': 'About NIBM Tower Cranes',
    'about.subtitle': 'Your trusted partner for tower crane sales, rentals, and services since 1995.',
    'about.story.title': 'Our Story',
    'about.story.image': 'NIBM Tower Cranes company headquarters',
    'about.story.p1': 'NIBM Tower Cranes was founded in 1995 with a simple mission: to provide reliable, high-quality tower cranes and exceptional service to the construction industry. What began as a small rental company has grown into a comprehensive provider of tower crane solutions across Europe.',
    'about.story.p2': 'Over the past 28 years, we have built a reputation for technical excellence, reliability, and customer-focused service. Our deep understanding of construction projects and their unique challenges has allowed us to develop a full-service approach that addresses all aspects of tower crane operations.',
    'about.story.p3': 'Today, NIBM Tower Cranes is proud to serve a diverse clientele, from small construction firms to large multinational corporations, providing them with the equipment and expertise they need to realize their construction projects safely and efficiently.',
    'about.mission.title': 'Our Mission',
    'about.mission.intro': 'Our mission is to provide reliable, safe, and efficient tower crane solutions that enable our clients to complete their construction projects successfully. We are committed to:',
    'about.mission.point1': 'Offering high-quality tower cranes that meet the specific needs of each project',
    'about.mission.point2': 'Providing expert consultation to help clients select the right equipment',
    'about.mission.point3': 'Ensuring safe and efficient crane operations through comprehensive training and support',
    'about.mission.point4': 'Delivering exceptional service at every stage of the client relationship',
    'about.vision.title': 'Our Vision',
    'about.vision.intro': 'We envision NIBM Tower Cranes as the preferred partner for tower crane solutions in Europe, recognized for:',
    'about.vision.point1': 'Technical excellence and innovation in tower crane operations',
    'about.vision.point2': 'Uncompromising commitment to safety and quality',
    'about.vision.point3': 'Comprehensive service that exceeds client expectations',
    'about.vision.point4': 'Contributing to the advancement of the construction industry through responsible and sustainable practices',
    'about.values.title': 'Our Core Values',
    'about.values.safety.title': 'Safety First',
    'about.values.safety.desc': 'We prioritize safety in all aspects of our operations, from crane selection to installation and training.',
    'about.values.quality.title': 'Quality & Reliability',
    'about.values.quality.desc': 'We provide only the highest quality tower cranes that perform reliably in demanding construction environments.',
    'about.values.customer.title': 'Customer Focus',
    'about.values.customer.desc': 'We work closely with our clients to understand their specific needs and provide customized solutions.',
    'about.values.excellence.title': 'Technical Excellence',
    'about.values.excellence.desc': 'Our team of experts brings deep technical knowledge and experience to every project.',
    'about.values.innovation.title': 'Innovation',
    'about.values.innovation.desc': 'We continuously seek innovative approaches to improve our services and offerings.',
    'about.values.sustainability.title': 'Sustainability',
    'about.values.sustainability.desc': 'We are committed to environmentally responsible practices in our operations and recommendations.',
    'about.team.title': 'Meet Our Team',
    'about.team.ceo': 'CEO & Founder',
    'about.team.ceo.bio': 'With over 25 years of experience in the construction industry, Johan founded NIBM Tower Cranes with a vision to provide reliable and innovative crane solutions.',
    'about.team.technical': 'Technical Director',
    'about.team.technical.bio': 'Emma brings 15 years of engineering expertise to NIBM, ensuring all tower cranes meet the highest technical and safety standards.',
    'about.team.operations': 'Operations Manager',
    'about.team.operations.bio': 'Thomas oversees all operational aspects of NIBM, from logistics and installation to maintenance and training.',
    'about.team.customer': 'Customer Relations',
    'about.team.customer.bio': 'Lisa ensures that every client receives personalized service and support throughout their engagement with NIBM.',
    
    // Featured Cranes Section
    'cranes.title': 'Featured Tower Cranes',
    'cranes.subtitle': 'Explore our selection of premium tower cranes available for purchase or rental',
    'cranes.available': 'Available',
    'cranes.comingSoon': 'Coming Soon',
    'cranes.year': 'Year',
    'cranes.type': 'Type',
    'cranes.maxCapacity': 'Max Capacity',
    'cranes.maxHeight': 'Max Height',
    'cranes.viewDetails': 'View Details',
    'cranes.viewAll': 'View All Tower Cranes',
    
    // Testimonials Section
    'testimonials.title': 'What Our Clients Say',
    'testimonials.subtitle': 'Read testimonials from our satisfied clients worldwide',
    
    // CTA Section
    'cta.title': 'Ready to elevate your construction projects?',
    'cta.subtitle': 'Contact our team today for a consultation and personalized quote for your tower crane needs.',
    'cta.quote': 'Request a Quote',
    'cta.explore': 'Explore Our Cranes',
    
    // Footer
    'footer.description': 'Specialists in the sale and rental of tower cranes, offering a full-service concept including planning, transport, mounting, inspections, training, and after-sales support.',
    'footer.quickLinks': 'Quick Links',
    'footer.services': 'Services',
    'footer.contactUs': 'Contact Us',
    'footer.address': 'Our Address',
    'footer.rights': 'All rights reserved',
    
    // Top Bar
    'topbar.news': 'News',
    'topbar.careers': 'Careers',
    'topbar.faq': 'FAQ',
    'topbar.contactUs': 'Contact Us',
  },
  nl: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'Over Ons',
    'nav.services': 'Diensten',
    'nav.towercranes': 'Beschikbare Torenkranen',
    'nav.technical': 'Technische Informatie',
    'nav.contact': 'Contact',
    'nav.quote': 'Vraag een Offerte',
    
    // Hero Section
    'hero.title1': 'Bouwprojecten naar',
    'hero.title2': 'Nieuwe Hoogten',
    'hero.subtitle': 'NIBM Torenkranen is gespecialiseerd in de verkoop en verhuur van torenkranen, met full-service oplossingen van planning tot doorlopende ondersteuning.',
    'hero.cta1': 'Bekijk Onze Torenkranen',
    'hero.cta2': 'Vraag een Offerte Aan',
    'hero.scroll': 'Scroll Omlaag',
    
    // Services Section
    'services.title': 'Onze Diensten',
    'services.subtitle': 'Uitgebreide oplossingen voor torenkranen voor uw bouwprojecten',
    'services.rental': 'Verhuur van Torenkranen',
    'services.rental.desc': 'Kort- en langdurige verhuuropties voor een breed scala aan torenkranen om aan uw projectbehoeften te voldoen.',
    'services.installation': 'Montage & Demontage',
    'services.installation.desc': 'Professionele montage- en demontagediensten door ons deskundige team, met garantie voor veiligheid en efficiëntie.',
    'services.maintenance': 'Onderhoud & Reparaties',
    'services.maintenance.desc': 'Regelmatige onderhoudsdiensten en noodreparaties om downtime te minimaliseren en de levensduur van apparatuur te verlengen.',
    'services.consulting': 'Adviesdiensten',
    'services.consulting.desc': 'Deskundig advies over kraanselectie, locatieplanning en logistiek om uw bouwproject te optimaliseren.',
    'services.training': 'Opleiding voor Bedieners',
    'services.training.desc': 'Uitgebreide trainingsprogramma\'s voor kraanmachinisten, gericht op veiligheidsprotocollen en operationele efficiëntie.',
    'services.planning': 'Projectplanning',
    'services.planning.desc': 'Strategische projectplanningsdiensten om de optimale kraanoplossingen voor uw bouwtijdlijn te bepalen.',
    
    // About Page
    'about.title': 'Over NIBM Tower Cranes',
    'about.subtitle': 'Uw betrouwbare partner voor torenkranen, verhuur en diensten sinds 1995.',
    'about.story.title': 'Ons Verhaal',
    'about.story.image': 'NIBM Tower Cranes bedrijfszaken',
    'about.story.p1': 'NIBM Tower Cranes werd in 1995 opgericht met een eenvoudige missie: betrouwbare, hoogwaardige torenkranen en uitzonderlijke service te bieden aan de bouwindustrie. Wat begon als een kleine verhuurmaatschappij is uitgegroeid tot een uitgebreide leverancier van torenkranenolossingen over Europa.',
    'about.story.p2': 'Over de afgelopen 28 jaar hebben we een reputatie opgebouwd voor technische uitstekendheid, betrouwbaarheid en klantgericht service. Onze diepe kennis van bouwprojecten en hun unieke uitdagingen hebben ons in staat gesteld een volledige servicebenadering te ontwikkelen die alle aspecten van torenkranenbewerkingen aanpakt.',
    'about.story.p3': 'Vandaag is NIBM Tower Cranes trots om een divers klantenbestand te dienen, van kleine bouwfirma's tot grote multinationale bedrijven, die hen voorzien van de apparatuur en expertise die ze nodig hebben om hun bouwprojecten veilig en efficiënt te realiseren.',
    'about.mission.title': 'Onze Missie',
    'about.mission.intro': 'Onze missie is om betrouwbare, veilige en efficiënte torenkranenolossingen te leveren die ons klanten in staat stellen hun bouwprojecten succesvol af te ronden. We zijn vastbesloten:',
    'about.mission.point1': 'Hoogwaardige torenkranen aan te bieden die voldoen aan de specifieke behoeften van elk project',
    'about.mission.point2': 'Expertconsultatie om klanten te helpen de juiste apparatuur te selecteren',
    'about.mission.point3': 'Veilige en efficiënte torenkranenbewerkingen te waarborgen via uitgebreide training en ondersteuning',
    'about.mission.point4': 'Uitzonderlijke service te leveren bij elke fase van de klantrelatie',
    'about.vision.title': 'Onze Visie',
    'about.vision.intro': 'We zien NIBM Tower Cranes als de gewenste partner voor torenkranenolossingen in Europa, erkend voor:',
    'about.vision.point1': 'Technische uitstekendheid en innovatie in torenkranenbewerkingen',
    'about.vision.point2': 'Onovertrokken vastbeslotenheid aan veiligheid en kwaliteit',
    'about.vision.point3': 'Uitgebreide service die klantverwachtingen overtreffend',
    'about.vision.point4': 'Bijdragen aan de vooruitgang van de bouwindustrie door verantwoordelijk en duurzaam te handelen',
    'about.values.title': 'Onze Kernwaarden',
    'about.values.safety.title': 'Veiligheid Eerst',
    'about.values.safety.desc': 'Veiligheid is onze prioriteit in alle aspecten van onze bedrijfsvoering, van kraanselectie tot installatie en training.',
    'about.values.quality.title': 'Kwaliteit & Betrouwbaarheid',
    'about.values.quality.desc': 'We bieden alleen de hoogste kwaliteit torenkranen aan die betrouwbaar functioneren in belastende bouwomgevingen.',
    'about.values.customer.title': 'Klantgerichtheid',
    'about.values.customer.desc': 'We werken nauw samen met onze klanten om hun specifieke behoeften te begrijpen en aangepaste oplossingen te bieden.',
    'about.values.excellence.title': 'Technische Uitstekendheid',
    'about.values.excellence.desc': 'Ons team van experts brengt diepe technische kennis en ervaring in elk project.',
    'about.values.innovation.title': 'Innovatie',
    'about.values.innovation.desc': 'We zoeken voortdurend nieuwe benaderingen om onze diensten en aanbod te verbeteren.',
    'about.values.sustainability.title': 'Duurzaamheid',
    'about.values.sustainability.desc': 'We zijn vastbesloten om duurzaam te handelen in onze bedrijfsvoering en aanbevelingen.',
    'about.team.title': 'Ontmoet Ons Team',
    'about.team.ceo': 'CEO & Oprichter',
    'about.team.ceo.bio': 'Met meer dan 25 jaar ervaring in de bouwindustrie, richt Johan NIBM Tower Cranes op met een visie om betrouwbare en innovatieve kraanoplossingen te bieden.',
    'about.team.technical': 'Technische Directeur',
    'about.team.technical.bio': 'Emma brengt 15 jaar ingenieurservaring aan NIBM, waarborgend dat alle torenkranen voldoen aan de hoogste technische en veiligheidsstandaarden.',
    'about.team.operations': 'Operations Manager',
    'about.team.operations.bio': 'Thomas zorgt voor alle operationele aspecten van NIBM, van logistiek en installatie tot onderhoud en training.',
    'about.team.customer': 'Klantrelaties',
    'about.team.customer.bio': 'Lisa zorgt ervoor dat elke klant een persoonlijke service en ondersteuning ontvangt tijdens hun betrokkenheid bij NIBM.',
    
    // Featured Cranes Section
    'cranes.title': 'Uitgelichte Torenkranen',
    'cranes.subtitle': 'Ontdek onze selectie premium torenkranen die beschikbaar zijn voor aankoop of huur',
    'cranes.available': 'Beschikbaar',
    'cranes.comingSoon': 'Binnenkort',
    'cranes.year': 'Jaar',
    'cranes.type': 'Type',
    'cranes.maxCapacity': 'Max Capaciteit',
    'cranes.maxHeight': 'Max Hoogte',
    'cranes.viewDetails': 'Bekijk Details',
    'cranes.viewAll': 'Bekijk Alle Torenkranen',
    
    // Testimonials Section
    'testimonials.title': 'Wat Onze Klanten Zeggen',
    'testimonials.subtitle': 'Lees getuigenissen van onze tevreden klanten wereldwijd',
    
    // CTA Section
    'cta.title': 'Klaar om uw bouwprojecten naar een hoger niveau te tillen?',
    'cta.subtitle': 'Neem vandaag nog contact op met ons team voor een adviesgesprek en een gepersonaliseerde offerte voor uw torenkraanbehoeften.',
    'cta.quote': 'Vraag een Offerte Aan',
    'cta.explore': 'Ontdek Onze Kranen',
    
    // Footer
    'footer.description': 'Specialisten in de verkoop en verhuur van torenkranen, met een full-service concept inclusief planning, transport, montage, inspecties, training en after-sales ondersteuning.',
    'footer.quickLinks': 'Snelle Links',
    'footer.services': 'Diensten',
    'footer.contactUs': 'Neem Contact Op',
    'footer.address': 'Ons Adres',
    'footer.rights': 'Alle rechten voorbehouden',
    
    // Top Bar
    'topbar.news': 'Nieuws',
    'topbar.careers': 'Carrières',
    'topbar.faq': 'FAQ',
    'topbar.contactUs': 'Neem Contact Op',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.about': 'Über Uns',
    'nav.services': 'Dienstleistungen',
    'nav.towercranes': 'Verfügbare Turmkrane',
    'nav.technical': 'Technische Informationen',
    'nav.contact': 'Kontakt',
    'nav.quote': 'Angebot Anfordern',
    
    // Hero Section
    'hero.title1': 'Bauprojekte auf',
    'hero.title2': 'Neue Höhen',
    'hero.subtitle': 'NIBM Turmkrane ist spezialisiert auf den Verkauf und die Vermietung von Turmkranen, mit Full-Service-Lösungen von der Planung bis zur laufenden Unterstützung.',
    'hero.cta1': 'Unsere Turmkrane Entdecken',
    'hero.cta2': 'Angebot Anfordern',
    'hero.scroll': 'Nach Unten Scrollen',
    
    // Services Section
    'services.title': 'Unsere Dienstleistungen',
    'services.subtitle': 'Umfassende Turmkranlösungen für Ihre Bauprojekte',
    'services.rental': 'Turmkranvermietung',
    'services.rental.desc': 'Kurz- und langfristige Mietoptionen für eine breite Palette von Turmkranen, um Ihren Projektanforderungen gerecht zu werden.',
    'services.installation': 'Montage & Demontage',
    'services.installation.desc': 'Professionelle Montage- und Demontagedienstleistungen durch unser Expertenteam, das Sicherheit und Effizienz gewährleistet.',
    'services.maintenance': 'Wartung & Reparaturen',
    'services.maintenance.desc': 'Regelmäßige Wartungsdienste und Notfallreparaturen, um Ausfallzeiten zu minimieren und die Lebensdauer der Geräte zu verlängern.',
    'services.consulting': 'Beratungsdienstleistungen',
    'services.consulting.desc': 'Expertenberatung zur Kranauswahl, Baustellenplanung und Logistik zur Optimierung Ihres Bauprojekts.',
    'services.training': 'Kranführerausbildung',
    'services.training.desc': 'Umfassende Schulungsprogramme für Kranführer mit Schwerpunkt auf Sicherheitsprotokollen und Betriebseffizienz.',
    'services.planning': 'Projektplanung',
    'services.planning.desc': 'Strategische Projektplanungsdienste zur Bestimmung der optimalen Kranlösungen für Ihren Bauzeitplan.',
    
    // About Page
    'about.title': 'Über NIBM Turmkrane',
    'about.subtitle': 'Ihr vertrauenswürdiger Partner für Turmkranen, Vermietung und Dienstleistungen seit 1995.',
    'about.story.title': 'Unser Verhaal',
    'about.story.image': 'NIBM Turmkrane Hauptsitz',
    'about.story.p1': 'NIBM Turmkrane wurde 1995 gegründet mit einer einfachen Mission: zuverlässige, hochwertige Turmkrane und ausgezeichnete Service zu bieten an der Bauindustrie. Was als kleine Mietfirma begann, ist heute zu einem umfassenden Anbieter von Turmkranenlösungen in Europa herangewachsen.',
    'about.story.p2': 'In den letzten 28 Jahren haben wir eine Reputation für technische Auszeichnung, Zuverlässigkeit und kundenorientierte Service aufgebaut. Unsere tiefgreifende Kenntnisse von Bauvorhaben und ihren einzigartigen Herausforderungen ermöglichten es uns, eine vollendete Serviceansatz zu entwickeln, der alle Aspekte der Turmkranenbewegung angeht.',
    'about.story.p3': 'Heute ist NIBM Turmkrane stolz, ein diverses Klientel zu dienen, von kleinen Baufirmen bis hin zu großen Multinationals, die sie mit der Ausrüstung und dem Expertentum für die Realisierung ihrer Bauvorhaben zuverlässig und effizient zu bieten.',
    'about.mission.title': 'Unsere Mission',
    'about.mission.intro': 'Unsere Mission ist es, zuverlässige, sichere und effiziente Turmkranenlösungen bereitzustellen, die es unseren Kunden ermöglichen, ihre Bauvorhaben erfolgreich abzuschließen. Wir sind verpflichtet:',
    'about.mission.point1': 'Hohe Qualität Turmkrane anzubieten, die den spezifischen Bedürfnissen jedes Projekts entsprechen',
    'about.mission.point2': 'Eine Expertenberatung bereitzustellen, um den richtigen Ausrüstungsauswahl zu helfen',
    'about.mission.point3': 'Sicherheit und Effizienz von Turmkranenbewegungen zu gewährleisten, indem wir umfassende Schulungen und Unterstützung bereitstellen',
    'about.mission.point4': 'Ausgezeichnetes Service bei jedem Stadium der Kundenbeziehung zu liefern',
    'about.vision.title': 'Unsere Vision',
    'about.vision.intro': 'Wir sehen NIBM Turmkrane als bevorzugten Partner für Turmkranenlösungen in Europa, erkennbar für:',
    'about.vision.point1': 'Technische Auszeichnung und Innovation in Turmkranenbewegungen',
    'about.vision.point2': 'Unbeugsamer Eid für Sicherheit und Qualität',
    'about.vision.point3': 'Umfassende Service, das Kundenanforderungen überschreitet',
    'about.vision.point4': 'Beiträge zur Fortschritt der Bauindustrie durch verantwortungsvolle und nachhaltige Praktiken',
    'about.values.title': 'Unsere Kernwerte',
    'about.values.safety.title': 'Sicherheit Zuerst',
    'about.values.safety.desc': 'Sicherheit ist unsere Priorität in allen Aspekten unserer Geschäftsführung, von der Kranauswahl bis zur Installation und Schulung.',
    'about.values.quality.title': 'Qualität & Zuverlässigkeit',
    'about.values.quality.desc': 'Wir bieten nur die hochwertigsten Turmkrane an, die in belastenden Bauumgebungen zuverlässig funktionieren.',
    'about.values.customer.title': 'Kundenorientierung',
    'about.values.customer.desc': 'Wir arbeiten eng mit unseren Kunden zusammen, um ihre spezifischen Bedürfnisse zu verstehen und angepasste Lösungen zu bieten.',
    'about.values.excellence.title': 'Technische Auszeichnung',
    'about.values.excellence.desc': 'Unser Experten-Team bringt tiefgreifende technische Kenntnisse und Erfahrung in jeden Projekt.',
    'about.values.innovation.title': 'Innovation',
    'about.values.innovation.desc': 'Wir suchen fortwährend neue Ansätze, um unsere Dienstleistungen und Angebot zu verbessern.',
    'about.values.sustainability.title': 'Nachhaltigkeit',
    'about.values.sustainability.desc': 'Wir sind verpflichtet, umweltverantwortliche Praktiken in unserer Geschäftsführung und Empfehlungen zu betreiben.',
    'about.team.title': 'Treffen Sie Unser Team',
    'about.team.ceo': 'CEO & Gründer',
    'about.team.ceo.bio': 'Mit über 25 Jahren Erfahrung in der Bauindustrie gründete Johan NIBM Turmkrane mit einem Vision, zuverlässige und innovative Kranlösungen zu bieten.',
    'about.team.technical': 'Technischer Direktor',
    'about.team.technical.bio': 'Emma bringt 15 Jahre Ingenieurserfahrung nach NIBM, die sicherstellen, dass alle Turmkrane die höchsten technischen und Sicherheitsstandards erfüllen.',
    'about.team.operations': 'Operations Manager',
    'about.team.operations.bio': 'Thomas übernimmt alle operativen Aspekte von NIBM, von Logistik und Installation bis zum Wartungs- und Schulungsauftrag.',
    'about.team.customer': 'Kundenbeziehungen',
    'about.team.customer.bio': 'Lisa sorgt dafür, dass jeder Kunde persönliche Service und Unterstützung während ihrer Beteiligung bei NIBM erhält.',
    
    // Featured Cranes Section
    'cranes.title': 'Ausgewählte Turmkrane',
    'cranes.subtitle': 'Entdecken Sie unsere Auswahl an Premium-Turmkranen, die zum Kauf oder zur Miete verfügbar sind',
    'cranes.available': 'Verfügbar',
    'cranes.comingSoon': 'Demnächst',
    'cranes.year': 'Jahr',
    'cranes.type': 'Typ',
    'cranes.maxCapacity': 'Max. Kapazität',
    'cranes.maxHeight': 'Max. Höhe',
    'cranes.viewDetails': 'Details Anzeigen',
    'cranes.viewAll': 'Alle Turmkrane Anzeigen',
    
    // Testimonials Section
    'testimonials.title': 'Was Unsere Kunden Sagen',
    'testimonials.subtitle': 'Lesen Sie Erfahrungsberichte von unseren zufriedenen Kunden weltweit',
    
    // CTA Section
    'cta.title': 'Bereit, Ihre Bauprojekte auf die nächste Stufe zu heben?',
    'cta.subtitle': 'Kontaktieren Sie noch heute unser Team für eine Beratung und ein personalisiertes Angebot für Ihren Turmkranbedarf.',
    'cta.quote': 'Angebot Anfordern',
    'cta.explore': 'Unsere Krane Entdecken',
    
    // Footer
    'footer.description': 'Spezialisten für den Verkauf und die Vermietung von Turmkranen, mit einem Full-Service-Konzept einschließlich Planung, Transport, Montage, Inspektionen, Schulung und After-Sales-Support.',
    'footer.quickLinks': 'Schnellzugriff',
    'footer.services': 'Dienstleistungen',
    'footer.contactUs': 'Kontaktieren Sie Uns',
    'footer.address': 'Unsere Adresse',
    'footer.rights': 'Alle Rechte vorbehalten',
    
    // Top Bar
    'topbar.news': 'Neuigkeiten',
    'topbar.careers': 'Karriere',
    'topbar.faq': 'FAQ',
    'topbar.contactUs': 'Kontaktieren Sie Uns',
  }
}

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Start with default language to avoid hydration mismatch
  const [language, setLanguageState] = useState<Language>('en')
  // Flag to track if client-side initialization has happened
  const [clientInitialized, setClientInitialized] = useState(false)
  
  // Get the router and pathname for handling navigation
  const router = useRouter()
  const pathname = usePathname()

  // This effect runs only on the client after the first render
  useEffect(() => {
    // Skip if already initialized
    if (clientInitialized) return;
    
    let detectedLang: Language = 'en';
    
    try {
      // Try to get language from localStorage
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && ['en', 'nl', 'de'].includes(savedLanguage)) {
        detectedLang = savedLanguage;
      } else {
        // Fall back to browser language
        const browserLang = navigator.language.split('-')[0] as Language;
        if (['en', 'nl', 'de'].includes(browserLang)) {
          detectedLang = browserLang;
        }
      }
      
      // Only update state if different from default to minimize renders
      if (detectedLang !== 'en') {
        setLanguageState(detectedLang);
      }
    } catch (error) {
      // Fail silently - this might happen in environments without localStorage
      console.error('Error detecting language:', error);
    }
    
    // Mark as initialized to prevent running again
    setClientInitialized(true);
  }, [clientInitialized]);

  // Effect to ensure language persists across page navigations
  useEffect(() => {
    if (!clientInitialized) return;
    
    try {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && ['en', 'nl', 'de'].includes(savedLanguage)) {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.error('Error restoring language on navigation:', error);
    }
  }, [pathname, clientInitialized]);
  
  // Update language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    
    // Only attempt to use localStorage on the client
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('language', lang);
        // Only attempt to refresh if router is available
        if (router && typeof router.refresh === 'function') {
          router.refresh();
        }
      } catch (error) {
        console.error('Error saving language preference:', error);
      }
    }
  };
  
  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 