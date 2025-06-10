'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { setCookie, getCookie } from 'cookies-next'

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
export const translations: Record<Language, Record<string, string>> = {
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
    'about.story.p3': "Today, NIBM Tower Cranes proudly serves a diverse clientele, from small construction firms to large multinational companies, providing them with the equipment and expertise they need to complete their construction projects safely and efficiently.",
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
    'about.team.title': 'Meet the Founder',
    'about.team.ceo': 'CEO & Founder',
    'about.team.ceo.bio': 'With over 25 years of experience in the construction industry, Gid Gehlen founded NIBM Tower Cranes with a vision to provide reliable and innovative crane solutions.',
    'about.team.ceo.bio2': 'His deep technical knowledge and commitment to customer satisfaction have been the driving forces behind NIBM\'s growth and success. Under his leadership, the company has established itself as a trusted partner for construction firms seeking high-quality tower crane solutions.',
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
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    
    // Top Bar
    'topbar.news': 'News',
    'topbar.careers': 'Careers',
    'topbar.faq': 'FAQ',
    'topbar.contactUs': 'Contact Us',
    
    // Services Page
    'services.page.title': 'Our Services',
    'services.page.subtitle': 'From crane selection and delivery to installation and training, we offer a complete solution for all your tower crane needs.',
    'services.overview.title': 'Comprehensive Tower Crane Solutions',
    'services.overview.desc': 'NIBM Tower Cranes offers a full range of services to meet all your tower crane needs. Our integrated approach ensures that every aspect of your crane requirements is handled with expertise and attention to detail.',
    'services.step1.title': 'Consultation',
    'services.step1.desc': 'We begin with a thorough consultation to understand your specific project requirements and challenges.',
    'services.step2.title': 'Implementation',
    'services.step2.desc': 'Our team handles everything from crane selection and delivery to installation and testing.',
    'services.step3.title': 'Support',
    'services.step3.desc': 'We provide ongoing support, maintenance, and training throughout your project\'s duration.',
    'services.discuss': 'Discuss Your Project With Us',
    'services.features': 'Key Features:',
    'services.learnMore': 'Learn More About This Service',
    'services.cta.title': 'Ready to Discuss Your Tower Crane Needs?',
    'services.cta.desc': 'Our team of experts is ready to help you find the perfect solution for your construction project.',
    
    // Service items
    'services.sale.title': 'Tower Crane Sales',
    'services.sale.desc': 'We offer a wide range of new and used tower cranes for sale that cater to various construction needs and budgets. Each crane comes with comprehensive documentation, warranties, and full technical support.',
    'services.sale.feature1': 'Extensive selection of crane types and models',
    'services.sale.feature2': 'New and used cranes with warranties',
    'services.sale.feature3': 'Competitive pricing and financing options',
    'services.sale.feature4': 'Technical documentation and certification',
    'services.sale.feature5': 'Full after-sales support and spare parts',
    
    'services.rent.title': 'Tower Crane Rental',
    'services.rent.desc': 'Our rental service provides flexible access to high-quality tower cranes without the full investment of purchasing. We offer short-term and long-term rental options with comprehensive support throughout the rental period.',
    'services.rent.feature1': 'Flexible rental terms (short and long-term)',
    'services.rent.feature2': 'Well-maintained and regularly inspected cranes',
    'services.rent.feature3': 'Technical support and maintenance included',
    'services.rent.feature4': 'Option to switch or upgrade equipment as needed',
    'services.rent.feature5': 'Possibility of rent-to-own arrangements',
    
    'services.planning.title': 'Planning & Consulting',
    'services.planning.feature1': 'Site assessment and crane selection consulting',
    'services.planning.feature2': 'Load capacity and coverage analysis',
    'services.planning.feature3': 'Regulatory compliance guidance',
    'services.planning.feature4': 'Cost optimization strategies',
    'services.planning.feature5': 'Project timeline planning',
    
    'services.transport.title': 'Transport & Logistics',
    'services.transport.desc': 'We handle all aspects of crane transportation to your construction site, including route planning, permits, and specialized transport equipment to ensure safe and timely delivery.',
    'services.transport.feature1': 'Specialized transport vehicles and equipment',
    'services.transport.feature2': 'Route planning and analysis',
    'services.transport.feature3': 'Permit acquisition and compliance',
    'services.transport.feature4': 'Ervaren transportteam',
    'services.transport.feature5': 'Insurance coverage during transport',
    
    'services.mounting.title': 'Mounting & Installation',
    'services.mounting.desc': 'Our certified technicians perform professional assembly, installation, and dismantling services, ensuring that your tower crane is set up safely and according to all relevant regulations and specifications.',
    'services.mounting.feature1': 'Certified installation specialists',
    'services.mounting.feature2': 'Compliance with all safety regulations',
    'services.mounting.feature3': 'Thorough testing and commissioning',
    'services.mounting.feature4': 'Efficient dismantling services',
    'services.mounting.feature5': 'Uitgebreide documentatie',
    
    'services.training.title': 'Training & Certification',
    'services.training.feature1': 'Certified crane operator training',
    'services.training.feature2': 'Maintenance and inspection training',
    'services.training.feature3': 'Safety protocols and best practices',
    'services.training.feature4': 'Hands-on and theoretical instruction',
    'services.training.feature5': 'Certification and documentation',

    // Towercranes Page
    'towercranes.page.title': 'Available Tower Cranes',
    'towercranes.filter.title': 'Filter Tower Cranes',
    'towercranes.filter.search': 'Search',
    'towercranes.filter.searchPlaceholder': 'Search by name or type...',
    'towercranes.filter.status': 'Status',
    'towercranes.filter.type': 'Type',
    'towercranes.filter.category': 'Category',
    'towercranes.filter.all': 'All',
    'towercranes.status.available': 'Available',
    'towercranes.status.comingsoon': 'Coming Soon',
    'towercranes.status.sold': 'Sold',
    'towercranes.type.flattop': 'Flat Top',
    'towercranes.type.topslewing': 'Top Slewing',
    'towercranes.category.sale': 'For Sale',
    'towercranes.category.rental': 'For Rent',
    'towercranes.noCranesFound': 'No tower cranes found matching your criteria',
    'towercranes.noCranesFoundSuggestion': 'Try adjusting your filters or search term',
    'towercranes.crane.year': 'Year',
    'towercranes.crane.type': 'Type',
    'towercranes.crane.maxCapacity': 'Max Capacity',
    'towercranes.crane.maxJibLength': 'Max Jib Length',
    'towercranes.viewDetails': 'View Details',
    
    // Technical Information Page
    'technical.page.title': 'Technical Information',
    'technical.page.subtitle': 'Detailed technical specifications and documentation for our tower cranes.',
    'technical.specs': 'Technical Specifications',
    'technical.docs': 'Documentation',
    'technical.download': 'Download',
    'technical.industryStandards': 'Industry Standards',
    'technical.industryStandards.desc': 'Access relevant industry standards and regulations related to tower crane operations.',
    'technical.viewStandards': 'View Standards',
    'technical.educationalVideos': 'Educational Videos',
    'technical.educationalVideos.desc': 'Watch instructional videos on tower crane operation, maintenance, and safety.',
    'technical.watchVideos': 'Watch Videos',
    'technical.techSupport': 'Technical Support',
    'technical.techSupport.desc': 'Need specialized technical assistance? Our expert team is ready to help.',
    'technical.contactSupport': 'Contact Support',
    'technical.faq': 'Frequently Asked Questions',
    'technical.additionalResources': 'Additional Resources',
    'technical.manuals': 'Manuals',
    'technical.specifications': 'Specifications',
    'technical.brochures': 'Brochures',
    'technical.safetyGuidelines': 'Safety Guidelines',
    'technical.viewMore': 'View More',
    'technical.downloadResource': 'Download Resource',
    
    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Our team of tower crane experts is ready to help you find the perfect solution for your project.',
    'contact.form.title': 'Send Us a Message',
    'contact.form.name': 'Your Name *',
    'contact.form.email': 'Email Address *',
    'contact.form.phone': 'Phone Number *',
    'contact.form.company': 'Company Name',
    'contact.form.subject': 'Subject *',
    'contact.form.message': 'Your Message *',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success.title': 'Thank You!',
    'contact.form.success.message': 'Your message has been submitted successfully. One of our representatives will contact you shortly.',
    'contact.info.title': 'Our Contact Information',
    'contact.info.address': 'Office Address',
    'contact.info.address.title': 'Office Address',
    'contact.info.contact': 'Contact',
    'contact.info.phone.title': 'Phone Number',
    'contact.info.email': 'E-mail',
    'contact.info.email.title': 'Email Address',
    'contact.info.hours': 'Office Hours',
    'contact.info.hours.title': 'Office Hours',
    'contact.info.hours.monday': 'Monday',
    'contact.info.hours.tuesday': 'Tuesday',
    'contact.info.hours.wednesday': 'Wednesday',
    'contact.info.hours.thursday': 'Thursday',
    'contact.info.hours.friday': 'Friday',
    'contact.info.hours.saturday': 'Saturday',
    'contact.info.hours.sunday': 'Sunday',
    'contact.info.hours.closed': 'Closed',
    'contact.info.workdays': 'Monday - Friday: 8:00 - 17:00',
    'contact.info.weekend': 'Saturday - Sunday: Closed',
    'contact.map.title': 'Find Us on the Map',
    'contact.form.select': 'Select a subject',
    'contact.form.sales': 'Sales Inquiry',
    'contact.form.rental': 'Rental Inquiry',
    'contact.form.technical': 'Technical Support',
    'contact.form.parts': 'Parts and Service',
    'contact.form.training': 'Training',
    'contact.form.other': 'Other',
    
    // Add missing subject placeholder and fix subjects keys
    'contact.form.subjectPlaceholder': 'Select a subject',
    'contact.form.subjects.sales': 'Tower Crane Sales',
    'contact.form.subjects.rental': 'Tower Crane Rental', 
    'contact.form.subjects.service': 'Tower Crane Service',
    'contact.form.subjects.parts': 'Tower Crane Parts',
    'contact.form.subjects.training': 'Tower Crane Training',
    'contact.form.subjects.other': 'Other',
    'contact.form.submitting': 'Sending...',
    
    // Technical Information Page
    'technical.title': 'Technical Information',
    'technical.subtitle': 'Access our technical resources, manuals, and specifications for tower cranes.',
    'technical.resources': 'Technical Resources',
    'technical.search': 'Search Documents',
    'technical.searchPlaceholder': 'Search by keyword...',
    'technical.filterCategory': 'Filter by Category',
    'technical.noDocuments': 'No documents found',
    'technical.tryAdjusting': 'Try adjusting your filters or search term',
    'technical.download': 'Download Document',
    
    // Additional Resources Section - Renamed keys to avoid duplicates 
    'technical.standards': 'Industry Standards',
    'technical.standards.desc': 'Access relevant industry standards and regulations related to tower crane operations.',
    'technical.standards.view': 'View Standards',
    'technical.videos': 'Educational Videos',
    'technical.videos.desc': 'Watch instructional videos on tower crane operation, maintenance, and safety.',
    'technical.videos.watch': 'Watch Videos',
    'technical.support': 'Technical Support',
    'technical.support.desc': 'Need specialized technical assistance? Our expert team is ready to help.',
    'technical.support.contact': 'Contact Support',
    
    // FAQ Questions and Answers
    'faq.q1': 'What are the main types of tower cranes?',
    'faq.a1': 'The main types of tower cranes include flat-top cranes, hammerhead cranes, luffing jib cranes, and self-erecting cranes. Each type is designed for specific applications and site conditions. Flat-top cranes have no A-frame above the jib and counter-jib, making them ideal for sites with height restrictions or multiple cranes. Hammerhead cranes have a horizontal jib and counter-jib with a trolley that moves loads in and out. Luffing jib cranes have a jib that can be raised and lowered, making them suitable for congested sites. Self-erecting cranes can be quickly set up and dismantled, making them ideal for smaller projects.',
    'faq.q2': 'How do you determine the right tower crane for a construction project?',
    'faq.a2': 'Determining the right tower crane involves considering several factors including the maximum load capacity needed, the required height and reach, site constraints, project duration, and budget. You should also consider the type of materials to be lifted, the frequency of lifts, and any specific requirements of the project. Our team of experts can help you assess these factors and recommend the most suitable crane for your specific needs.',
    'faq.q3': 'What safety measures should be in place when operating a tower crane?',
    'faq.a3': 'Safety measures for tower crane operation include proper operator training and certification, regular inspections and maintenance, clear communication protocols, weather monitoring, load management systems, and anti-collision devices. Additionally, ensuring proper foundation and installation, establishing a clear zone around the crane, and implementing comprehensive safety plans are essential. All operators should also be familiar with emergency procedures and follow manufacturer guidelines.',
    'faq.q4': 'How often should tower cranes be inspected?',
    'faq.a4': 'Tower cranes should undergo daily visual inspections by the operator before use, weekly more detailed inspections by a competent person, monthly thorough inspections by a qualified technician, and annual comprehensive inspections by certified inspectors. Additionally, after severe weather events or any modifications, special inspections should be conducted. These regular inspections help ensure safe operation and identify potential issues before they become serious problems.',
    'faq.q5': 'What are the wind speed limits for tower crane operation?',
    'faq.a5': 'Tower cranes typically have operational wind speed limits of around 20-25 mph (32-40 km/h) for normal operation. When wind speeds reach approximately 45 mph (72 km/h), cranes should be put into weathervane mode to allow the jib to move freely with the wind. However, these limits can vary based on the specific crane model, load characteristics, and manufacturer guidelines. It\'s essential to follow the specifications provided by the crane manufacturer and consider site-specific conditions when determining safe operating parameters.',
    'faq.q6': 'What qualifications are required to operate a tower crane?',
    'faq.a6': 'Tower crane operators need specific certifications and qualifications, which vary by country and region. Generally, operators must complete a recognized training program, pass both written and practical exams, and obtain a certification from an accredited organization. They should also have good depth perception, coordination, and concentration abilities. Additionally, most jurisdictions require regular recertification to ensure operators maintain their skills and knowledge of current safety protocols and technological advancements.',
  },
  nl: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'Over Ons',
    'nav.services': 'Diensten',
    'nav.towercranes': 'Beschikbare Torenkranen',
    'nav.technical': 'Technische Informatie',
    'nav.contact': 'Contact',
    'nav.quote': 'Offerte Aanvragen',
    
    // Hero Section
    'hero.title1': 'Bouwprojecten naar',
    'hero.title2': 'Nieuwe Hoogten',
    'hero.subtitle': 'NIBM Torenkranen is gespecialiseerd in de verkoop en verhuur van torenkranen, met full-service oplossingen van planning tot doorlopende ondersteuning.',
    'hero.cta1': 'Bekijk Onze Torenkranen',
    'hero.cta2': 'Offerte Aanvragen',
    'hero.scroll': 'Scroll Omlaag',
    
    // Services Section
    'services.title': 'Onze Diensten',
    'services.subtitle': 'Uitgebreide oplossingen voor torenkranen voor uw bouwprojecten',
    'services.rental': 'Verhuur van Torenkranen',
    'services.rental.desc': 'Onze verhuurservice biedt flexibele toegang tot hoogwaardige torenkranen zonder de volledige investering van aankoop. We bieden kort- en langdurige huuroptie met uitgebreide ondersteuning gedurende de huurperiode.',
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
    'about.story.p2': 'Over de afgelopen 28 jaar hebben we een reputatie opgebouwd voor technische uitstekendheid, betrouwbaarheid en klantgerichte service. Unsere diepe kennis van bouwprojecten en hun unieke uitdagingen hebben ons in staat gesteld een volledige servicebenadering te ontwikkelen die alle aspecten van torenkranenbewerkingen aanpakt.',
    'about.story.p3': 'Vandaag is NIBM Tower Cranes trots om een divers klantenbestand te dienen, van kleine bouwfirma\'s tot grote multinationale bedrijven, die hen voorzien van de apparatuur en expertise die ze nodig hebben om hun bouwprojecten veilig en efficiënt te realiseren.',
    'about.mission.title': 'Onze Missie',
    'about.mission.intro': 'Onze missie is om betrouwbare, veilige en efficiënte torenkranenoplossingen te leveren die ons klanten in staat stellen hun bouwprojecten succesvol af te ronden. We zijn vastbesloten:',
    'about.mission.point1': 'Hoogwaardige torenkranen aanbieden die voldoen aan de specifieke behoeften van elk project',
    'about.mission.point2': 'Deskundig advies leveren om klanten te helpen bij het selecteren van de juiste apparatuur',
    'about.mission.point3': 'Veilige en efficiënte torenkranenbewerkingen te waarborgen via uitgebreide training en ondersteuning',
    'about.mission.point4': 'Uitzonderlijke service te leveren bij elke fase van de klantrelatie',
    'about.vision.title': 'Onze Visie',
    'about.vision.intro': 'We zien NIBM Tower Cranes als de gewenste partner voor torenkranenolossingen in Europa, erkend voor:',
    'about.vision.point1': 'Technische uitstekendheid en innovatie in torenkranenbewerkingen',
    'about.vision.point2': 'Compromisloze toewijding aan veiligheid en kwaliteit',
    'about.vision.point3': 'Uitgebreide service die de verwachtingen van klanten overtreft',
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
    'about.team.title': 'Ontmoet de Oprichter',
    'about.team.ceo': 'CEO & Oprichter',
    'about.team.ceo.bio': 'Met meer dan 25 jaar ervaring in de bouwindustrie, richt Gid Gehlen NIBM Tower Cranes op met een visie om betrouwbare en innovatieve kraanoplossingen te bieden.',
    'about.team.ceo.bio2': 'Zijn diepgaande technische kennis en toewijding aan klanttevredenheid zijn de drijvende krachten achter de groei en het succes van NIBM. Onder zijn leiding heeft het bedrijf zich gevestigd als een betrouwbare partner voor bouwbedrijven die op zoek zijn naar hoogwaardige torenkraanoplossingen.',
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
    'cta.quote': 'Offerte Aanvragen',
    'cta.explore': 'Ontdek Onze Kranen',
    
    // Footer
    'footer.description': 'Specialisten in de verkoop en verhuur van torenkranen, met een full-service concept inclusief planning, transport, montage, inspecties, training en after-sales ondersteuning.',
    'footer.quickLinks': 'Snelle Links',
    'footer.services': 'Diensten',
    'footer.contactUs': 'Neem contact met ons op',
    'footer.address': 'Ons Adres',
    'footer.rights': 'Alle rechten voorbehouden',
    'footer.privacy': 'Privacybeleid',
    'footer.terms': 'Gebruiksvoorwaarden',
    'footer.cookies': 'Cookiebeleid',
    
    // Top Bar
    'topbar.news': 'Nieuws',
    'topbar.careers': 'Carrières',
    'topbar.faq': 'FAQ',
    'topbar.contactUs': 'Neem Contact Op',
    
    // Services Page
    'services.page.title': 'Onze Diensten',
    'services.page.subtitle': 'Van kraanselectie en levering tot installatie en training, wij bieden een complete oplossing voor al uw torenkraanbehoeften.',
    'services.overview.title': 'Uitgebreide Torenkranenoplossingen',
    'services.overview.desc': 'NIBM Tower Cranes biedt een volledig gamma van diensten om al uw torenkraanbehoeften te voldoen. Onze geïntegreerde benadering zorgt ervoor dat elk aspect van uw kraanvereisten wordt behandeld met deskundigheid en aandacht voor detail.',
    'services.step1.title': 'Consultatie',
    'services.step1.desc': 'We beginnen met een gedetailleerd consultatiegesprek om uw specifieke projectvereisten en uitdagingen te begrijpen.',
    'services.step2.title': 'Implementatie',
    'services.step2.desc': 'Ons team houdt alles in hand van kraanselectie en levering tot installatie en testen.',
    'services.step3.title': 'Ondersteuning',
    'services.step3.desc': 'We bieden doorlopende ondersteuning, onderhoud en training tijdens de volledige duur van uw project.',
    'services.discuss': 'Bespreek Uw Project Met Ons',
    'services.features': 'Belangrijkste Kenmerken:',
    'services.learnMore': 'Meer Informatie Over Deze Dienst',
    'services.cta.title': 'Klaar om uw torenkraanbehoeften te bespreken?',
    'services.cta.desc': 'Ons team van experts staat klaar om u te helpen de perfecte oplossing te vinden voor uw bouwproject.',
    
    // Service items
    'services.sale.title': 'Verkoop van Torenkranen',
    'services.sale.desc': 'We bieden een breed scala aan nieuwe en gebruikte torenkranen aan voor verkoop, die voldoen aan verschillende bouwbehoeften en budgetten. Elke kraan wordt geleverd met uitgebreide documentatie, garanties en volledige technische ondersteuning.',
    'services.sale.feature1': 'Uitgebreide selectie van kraantypes en modellen',
    'services.sale.feature2': 'Nieuwe en gebruikte kranen met garanties',
    'services.sale.feature3': 'Concurrerende prijzen en financieringsopties',
    'services.sale.feature4': 'Technische documentatie en certificering',
    'services.sale.feature5': 'Volledige after-sales ondersteuning en reserveonderdelen',
    
    'services.rent.title': 'Huur van Torenkranen',
    'services.rent.desc': 'Onze verhuurservice biedt flexibele toegang tot hoogwaardige torenkranen zonder de volledige investering van aankoop. We bieden kort- en langdurige huuroptie met uitgebreide ondersteuning gedurende de huurperiode.',
    'services.rent.feature1': 'Flexibele huurtermijnen (kort- en langlopend)',
    'services.rent.feature2': 'Goed onderhouden en regelmatig geïnspecteerde kranen',
    'services.rent.feature3': 'Technische ondersteuning en onderhoud inbegrepen',
    'services.rent.feature4': 'Optie om apparatuur te wisselen of upgraden indien nodig',
    'services.rent.feature5': 'Mogelijkheid tot huur-koop overeenkomsten',
    
    'services.planning.title': 'Planning & Advies',
    'services.planning.feature1': 'Locatie-evaluatie en kraanselectie advisering',
    'services.planning.feature2': 'Draagcapaciteit en bereik-analyse',
    'services.planning.feature3': 'Regelgeving compliance begeleiding',
    'services.planning.feature4': 'Kostenoptimalisatie strategieën',
    'services.planning.feature5': 'Projectplanning',
    
    'services.transport.title': 'Transport & Logistiek',
    'services.transport.desc': 'We verzorgen alle aspecten van kraantransport naar uw bouwplaats, inclusief routeplanning, vergunningen en gespecialiseerde transportapparatuur om veilige en tijdige levering te waarborgen.',
    'services.transport.feature1': 'Speciale transportvoertuigen en uitrusting',
    'services.transport.feature2': 'Routeplanning en analyse',
    'services.transport.feature3': 'Vergunningverkrijging en naleving',
    'services.transport.feature4': 'Ervaren transportteam',
    'services.transport.feature5': 'Verzekeringsdekking tijdens transport',
    
    'services.mounting.title': 'Montage & Installatie',
    'services.mounting.desc': 'Onze gecertificeerde technici voeren professionele montage-, installatie- en demontagediensten uit, waarbij zorg wordt gedragen voor veilige en conforme installatie van uw torenkranen volgens alle relevante regelgevingen en specificaties.',
    'services.mounting.feature1': 'Gecertificeerde installatiespecialisten',
    'services.mounting.feature2': 'Naleving van alle veiligheidsvoorschriften',
    'services.mounting.feature3': 'Grondige tests en ingebruikname',
    'services.mounting.feature4': 'Efficiënte demontagediensten',
    'services.mounting.feature5': 'Uitgebreide documentatie',
    
    'services.training.title': 'Training & Certificering',
    'services.training.feature1': 'Gecertificeerde kraanmachinist training',
    'services.training.feature2': 'Onderhouds- en inspectietraining',
    'services.training.feature3': 'Veiligheidsprotocollen en beste praktijken',
    'services.training.feature4': 'Praktische en theoretische opleiding',
    'services.training.feature5': 'Certificering en documentatie',

    // Towercranes Page
    'towercranes.page.title': 'Beschikbare Torenkranen',
    'towercranes.filter.title': 'Filter Torenkranen',
    'towercranes.filter.search': 'Zoeken',
    'towercranes.filter.searchPlaceholder': 'Zoek op naam of type...',
    'towercranes.filter.status': 'Status',
    'towercranes.filter.type': 'Typ',
    'towercranes.filter.category': 'Categorie',
    'towercranes.filter.all': 'Alle',
    'towercranes.status.available': 'Beschikbaar',
    'towercranes.status.comingsoon': 'Binnenkort Beschikbaar',
    'towercranes.status.sold': 'Verkocht',
    'towercranes.type.flattop': 'Flat Top',
    'towercranes.type.topslewing': 'Top Slewing',
    'towercranes.category.sale': 'Te Koop',
    'towercranes.category.rental': 'Te Huur',
    'towercranes.noCranesFound': 'Geen torenkranen gevonden die aan uw criteria voldoen',
    'towercranes.noCranesFoundSuggestion': 'Pas uw filters of zoekterm aan',
    'towercranes.crane.year': 'Jaar',
    'towercranes.crane.type': 'Type',
    'towercranes.crane.maxCapacity': 'Max Capaciteit',
    'towercranes.crane.maxJibLength': 'Max Gieklengte',
    'towercranes.viewDetails': 'Bekijk Details',
    
    // Technical Information Page
    'technical.page.title': 'Technische Informatie',
    'technical.page.subtitle': 'Gedetailleerde technische specificaties en documentatie voor onze torenkranen.',
    'technical.specs': 'Technische Specificaties',
    'technical.docs': 'Documentatie',
    'technical.download': 'Downloaden',
    'technical.industryStandards': 'Industrienormen',
    'technical.industryStandards.desc': 'Access relevant industry standards and regulations related to tower crane operations.',
    'technical.viewStandards': 'Bekijk Normen',
    'technical.educationalVideos': 'Instructievideo\'s',
    'technical.educationalVideos.desc': 'Bekijk instructievideo\'s over torenkraanbediening, -onderhoud en -veiligheid.',
    'technical.watchVideos': 'Video\'s Bekijken',
    'technical.techSupport': 'Technische Ondersteuning',
    'technical.techSupport.desc': 'Behoefte aan gespecialiseerde technische hulp? Ons expertteam staat klaar om te helpen.',
    'technical.contactSupport': 'Contact Ondersteuning',
    'technical.faq': 'Veelgestelde Vragen',
    'technical.additionalResources': 'Aanvullende Hulpmiddelen',
    'technical.manuals': 'Handleidingen',
    'technical.specifications': 'Specificaties',
    'technical.brochures': 'Brochures',
    'technical.safetyGuidelines': 'Veiligheidsrichtlijnen',
    'technical.viewMore': 'Meer bekijken',
    'technical.downloadResource': 'Hulpmiddel downloaden',
    
    // Contact Page
    'contact.title': 'Contact',
    'contact.subtitle': 'Ons team van torenkraanexperts staat klaar om u te helpen de perfecte oplossing te vinden voor uw project.',
    'contact.form.title': 'Stuur Ons een Bericht',
    'contact.form.name': 'Uw Naam *',
    'contact.form.email': 'E-mailadres *',
    'contact.form.phone': 'Telefoonnummer *',
    'contact.form.company': 'Bedrijfsnaam',
    'contact.form.subject': 'Onderwerp *',
    'contact.form.subjectPlaceholder': 'Selecteer een onderwerp',
    'contact.form.message': 'Uw Bericht *',
    'contact.form.submit': 'Bericht Versturen',
    'contact.form.submitting': 'Verzenden...',
    'contact.form.subjects.sales': 'Torenkraan Verkoop',
    'contact.form.subjects.rental': 'Torenkraan Verhuur',
    'contact.form.subjects.service': 'Torenkraan Service',
    'contact.form.subjects.parts': 'Torenkraan Onderdelen',
    'contact.form.subjects.training': 'Torenkraan Training',
    'contact.form.subjects.other': 'Anders',
    'contact.form.sales': 'Verkoopvraag',
    'contact.form.rental': 'Verhuurvraag',
    'contact.form.technical': 'Technische Ondersteuning',
    'contact.form.parts': 'Onderdelen en Service',
    'contact.form.training': 'Training',
    'contact.form.other': 'Anders',
    'contact.info.title': 'Onze Contactgegevens',
    'contact.info.address': 'Kantooradres',
    'contact.info.address.title': 'Kantooradres',
    'contact.info.contact': 'Contact',
    'contact.info.phone': 'Telefoonnummer',
    'contact.info.phone.title': 'Telefoonnummer',
    'contact.info.email': 'E-mailadres',
    'contact.info.email.title': 'E-mailadres',
    'contact.info.hours': 'Kantooruren',
    'contact.info.hours.title': 'Kantooruren',
    'contact.info.hours.monday': 'Maandag',
    'contact.info.hours.tuesday': 'Dinsdag',
    'contact.info.hours.wednesday': 'Woensdag',
    'contact.info.hours.thursday': 'Donderdag',
    'contact.info.hours.friday': 'Vrijdag',
    'contact.info.hours.saturday': 'Zaterdag',
    'contact.info.hours.sunday': 'Zondag',
    'contact.info.hours.closed': 'Gesloten',
    'contact.info.hours.weekdays': 'Maandag - Vrijdag: 8:00 - 17:00',
    'contact.info.hours.weekend': 'Zaterdag - Zondag: Gesloten',
    'contact.info.workdays': 'Maandag - Vrijdag: 8:00 - 17:00',
    'contact.info.weekend': 'Zaterdag - Zondag: Gesloten',
    'contact.map.title': 'Find Us on the Map',
    'contact.form.select': 'Select a subject',
    'contact.form.sales': 'Sales Inquiry',
    'contact.form.rental': 'Rental Inquiry',
    'contact.form.technical': 'Technical Support',
    'contact.form.parts': 'Parts and Service',
    'contact.form.training': 'Training',
    'contact.form.other': 'Other',
    
    // FAQ
    'faq.title': 'Veelgestelde Vragen',
    'faq.subtitle': 'Antwoorden op de meest gestelde vragen over onze torenkranen en diensten',
    'faq.q1': 'Welke soorten torenkranen bieden jullie aan?',
    'faq.a1': 'Wij bieden een breed scala aan torenkranen aan, waaronder zelfoprichtende kranen, draaitafelkranen en loopkranen. Onze vloot omvat zowel nieuwe als gebruikte kranen van verschillende capaciteiten en hoogtes.',
    'faq.q2': 'Bieden jullie kortetermijn huurmogelijkheden aan?',
    'faq.a2': 'Ja, wij bieden flexibele huurmogelijkheden aan, van kortetermijnprojecten tot langetermijncontracten. Onze huurvoorwaarden kunnen worden aangepast aan uw specifieke projectvereisten.',
    'faq.q3': 'Is installatie inbegrepen in de huurprijs?',
    'faq.a3': 'Ja, al onze huurcontracten bevatten professionele installatie en demontage door ons gecertificeerde techniciensteam. Wij zorgen ook voor alle benodigde vergunningen en inspecties.',
    'faq.q4': 'Welke onderhoudsdiensten bieden jullie aan?',
    'faq.a4': 'Wij bieden uitgebreide onderhoudsdiensten aan, inclusief regelmatige inspecties, preventief onderhoud, noodreparaties en onderdelenvoorziening. Onze service garandeert maximale bedrijfstijd en veiligheid.',
    'faq.q5': 'Bieden jullie training aan voor kraanoperators?',
    'faq.a5': 'Ja, wij bieden uitgebreide trainingsprogramma\'s aan voor kraanoperators die zowel veiligheidsprotocollen als operationele efficiëntie behandelen. Onze cursussen worden geleid door ervaren instructeurs.',
    'faq.q6': 'In welke regio\'s zijn jullie diensten beschikbaar?',
    'faq.a6': 'Wij bedienen klanten door heel Europa. Ons hoofdkantoor bevindt zich in Nederland, maar wij kunnen kranen en diensten leveren in verschillende Europese landen.',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.about': 'Über Uns',
    'nav.services': 'Dienstleistungen',
    'nav.towercranes': 'Verfügbare Turmkrane',
    'nav.technical': 'Technische Information',
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
    'services.rental.desc': 'Unser Vermietungsservice bietet flexiblen Zugang zu hochwertigen Turmkranen ohne die volle Investition eines Kaufs. Wir bieten kurz- und langfristige Mietoptionen mit umfassender Unterstützung während der Mietdauer.',
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
    'about.story.title': 'Unsere Geschichte',
    'about.story.image': 'NIBM Turmkrane Hauptsitz',
    'about.story.p1': 'NIBM Turmkrane wurde 1995 gegründet mit einer einfachen Mission: zuverlässige, hochwertige Turmkrane und ausgezeichnete Service zu bieten an der Bauindustrie. Was als kleine Mietfirma begann, ist heute zu einem umfassenden Anbieter von Turmkranenlösungen in Europa herangewachsen.',
    'about.story.p2': 'In den letzten 28 Jahren haben wir eine Reputation für technische Auszeichnung, Zuverlässigkeit und kundenorientierte Service aufgebaut. Unsere tiefgreifende Kenntnisse von Bauvorhaben und ihren einzigartigen Herausforderungen ermöglichten es uns, eine vollendete Serviceansatz zu entwickeln, der alle Aspekte der Turmkranenbewegung angeht.',
    'about.story.p3': 'Heute ist NIBM Turmkrane stolz darauf, eine vielfältige Kundschaft zu bedienen, von kleinen Baufirmen bis hin zu großen multinationalen Unternehmen, und ihnen die Ausrüstung und das Fachwissen zur Verfügung zu stellen, die sie benötigen, um ihre Bauprojekte sicher und effizient zu verwirklichen.',
    'about.mission.title': 'Unsere Mission',
    'about.mission.intro': 'Unsere Mission ist es, zuverlässige, sichere und effiziente Turmkranenlösungen bereitzustellen, die es unseren Kunden ermöglichen, ihre Bauvorhaben erfolgreich abzuschließen. Wir sind verpflichtet:',
    'about.mission.point1': 'Hohe Qualität Turmkrane anzubieten, die den spezifischen Bedürfnissen jedes Projekts entsprechen',
    'about.mission.point2': 'Eine Expertenberatung bereitzustellen, um den richtigen Ausrüstungsauswahl zu helfen',
    'about.mission.point3': 'Sicherheit und Effizienz von Turmkranenbewegungen zu gewährleisten, indem wir umfassende Schulungen und Unterstützung bereitstellen',
    'about.mission.point4': 'Ausgezeichnetes Service bei jedem Stadium der Kundenbeziehung zu liefern',
    'about.vision.title': 'Unsere Vision',
    'about.vision.intro': 'Wir sehen NIBM Turmkrane als bevorzugten Partner für Turmkranenlösungen in Europa, erkennbar für:',
    'about.vision.point1': 'Technische Auszeichnung und Innovation in Turmkranenbewerkingen',
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
    'about.team.title': 'Treffen Sie den Gründer',
    'about.team.ceo': 'CEO & Gründer',
    'about.team.ceo.bio': 'Mit über 25 Jahren Erfahrung in der Bauindustrie gründete Gid Gehlen NIBM Turmkrane mit einem Vision, zuverlässige und innovative Kranlösungen zu bieten.',
    'about.team.ceo.bio2': 'Seine fundierte technische Expertise und sein Engagement für Kundenzufriedenheit waren die treibenden Kräfte hinter NIBMs Wachstum und Erfolg. Unter seiner Führung hat sich das Unternehmen als zuverlässiger Partner für Baufirmen etabliert, die hochwertige Turmkranlösungen suchen.',
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
    'footer.privacy': 'Datenschutzrichtlinien',
    'footer.terms': 'Nutzungsbedingungen',
    'footer.cookies': 'Cookies-Richtlinien',
    
    // Top Bar
    'topbar.news': 'Neuigkeiten',
    'topbar.careers': 'Karriere',
    'topbar.faq': 'FAQ',
    'topbar.contactUs': 'Kontaktieren Sie Uns',
    
    // Services Page
    'services.page.title': 'Unsere Dienstleistungen',
    'services.page.subtitle': 'Von der Kranauswahl und Lieferung bis hin zur Installation und Schulung bieten wir eine Komplettlösung für alle Ihre Turmkranbedürfnisse.',
    'services.overview.title': 'Umfassende Turmkranlösungen',
    'services.overview.desc': 'NIBM Tower Cranes bietet ein umfassendes Spektrum an Dienstleistungen, um alle Ihre Turmkranbedürfnisse zu erfüllen. Unser integrierter Ansatz stellt sicher, dass jeder Aspekt Ihrer Krananforderungen mit Fachwissen und Liebe zum Detail behandelt wird.',
    'services.step1.title': 'Beratung',
    'services.step1.desc': 'Wir beginnen mit einer gründlichen Beratung, um Ihre spezifischen Projektanforderungen und Herausforderungen zu verstehen.',
    'services.step2.title': 'Umsetzung',
    'services.step2.desc': 'Unser Team kümmert sich um alles, von der Kranauswahl und Lieferung bis hin zur Installation und Prüfung.',
    'services.step3.title': 'Unterstützung',
    'services.step3.desc': 'Wir bieten laufende Unterstützung, Wartung und Schulung während der gesamten Dauer Ihres Projekts.',
    'services.discuss': 'Besprechen Sie Ihr Projekt mit uns',
    'services.features': 'Hauptmerkmale:',
    'services.learnMore': 'Erfahren Sie mehr über diese Dienstleistung',
    'services.cta.title': 'Bereit, Ihre Turmkranbedürfnisse zu besprechen?',
    'services.cta.desc': 'Unser Team von Experten steht bereit, um Ihnen bei der Suche nach der perfekten Lösung für Ihr Bauprojekt zu helfen.',
    
    // Service items
    'services.sale.title': 'Verkauf von Turmkranen',
    'services.sale.desc': 'Wir bieten eine breite Palette neuer und gebruikter Turmkrane zum Verkauf an, die verschiedenen Bauanforderungen und Budgets gerecht werden. Jeder Kran wird mit umfassender Dokumentation, Garantien und vollständigem technischen Support geliefert.',
    'services.sale.feature1': 'Umfangreiche Auswahl an Krantypen und Modellen',
    'services.sale.feature2': 'Neue und gebruikte Krane mit Garantien',
    'services.sale.feature3': 'Wettbewerbsfähige Preise und Finanzierungsmöglichkeiten',
    'services.sale.feature4': 'Technische Dokumentation und Zertifizierung',
    'services.sale.feature5': 'Umfassender After-Sales-Support und Ersatzteile',
    
    'services.rent.title': 'Vermietung von Turmkranen',
    'services.rent.desc': 'Unser Vermietungsservice bietet flexiblen Zugang zu hochwertigen Turmkranen ohne die volle Investition eines Kaufs. Wir bieten kurz- und langfristige Mietoptionen mit umfassender Unterstützung während der Mietdauer.',
    'services.rent.feature1': 'Flexible Mietzeiten (kurz- und langfristig)',
    'services.rent.feature2': 'Gut gewartete und regelmäßig inspizierte Krane',
    'services.rent.feature3': 'Technische Unterstützung und Wartung inbegriffen',
    'services.rent.feature4': 'Option zum Austausch oder Upgrade der Geräte bei Bedarf',
    'services.rent.feature5': 'Möglichkeit von Miet-Kauf-Vereinbarungen',
    
    'services.planning.title': 'Planung & Beratung',
    'services.planning.feature1': 'Standortevaluierung und Kranauswahl-Beratung',
    'services.planning.feature2': 'Tragfähigkeits- und Reichweitenanalyse',
    'services.planning.feature3': 'Compliance-Begleitung bei Vorschriften',
    'services.planning.feature4': 'Kostenoptimierungsstrategien',
    'services.planning.feature5': 'Projektplanung',
    
    'services.transport.title': 'Transport & Logistik',
    'services.transport.desc': 'Wir übernehmen alle Aspekte des Krantransports zu Ihrer Baustelle, einschließlich Routenplanung, Genehmigungen und spezialisierter Transportausrüstung, um sichere und zeitnahe Lieferung zu gewährleisten.',
    'services.transport.feature1': 'Spezialtransportfahrzeuge und Ausrüstung',
    'services.transport.feature2': 'Routenplanung und Analyse',
    'services.transport.feature3': 'Genehmigungsverkauf und Einhaltung',
    'services.transport.feature4': 'Erfahrenes Transportteam',
    'services.transport.feature5': 'Versicherungsschutz während des Transports',
    
    'services.mounting.title': 'Montage & Installation',
    'services.mounting.desc': 'Unsere zertifizierten Techniker führen professionelle Montage-, Einbau- und Demontagedienste durch, wobei sorgfältige Beachtung der Sicherheit und Einhaltung aller relevanten Vorschriften und Spezifikationen gewährleistet wird.',
    'services.mounting.feature1': 'Zertifizierte Installationsspezialisten',
    'services.mounting.feature2': 'Einhaltung aller Sicherheitsvorschriften',
    'services.mounting.feature3': 'Gründliche Tests und Inbetriebnahme',
    'services.mounting.feature4': 'Effiziente Demontagedienste',
    'services.mounting.feature5': 'Umfassende Dokumentation',
    
    'services.training.title': 'Schulung & Zertifizierung',
    'services.training.feature1': 'Zertifizierte Kranführerausbildung',
    'services.training.feature2': 'Wartungs- und Inspektionsschulung',
    'services.training.feature3': 'Sicherheitsprotokolle und bewährte Praktiken',
    'services.training.feature4': 'Praktische und theoretische Ausbildung',
    'services.training.feature5': 'Zertifizierung und Dokumentation',

    // Towercranes Page
    'towercranes.page.title': 'Verfügbare Turmkrane',
    'towercranes.filter.title': 'Turmkrane Filtern',
    'towercranes.filter.search': 'Suchen',
    'towercranes.filter.searchPlaceholder': 'Nach Name oder Typ suchen...',
    'towercranes.filter.status': 'Status',
    'towercranes.filter.type': 'Typ',
    'towercranes.filter.category': 'Kategorie',
    'towercranes.filter.all': 'Alle',
    'towercranes.status.available': 'Verfügbar',
    'towercranes.status.comingsoon': 'Demnächst Verfügbar',
    'towercranes.status.sold': 'Verkauft',
    'towercranes.type.flattop': 'Flat Top',
    'towercranes.type.topslewing': 'Top Slewing',
    'towercranes.category.sale': 'Zum Verkauf',
    'towercranes.category.rental': 'Zur Miete',
    'towercranes.noCranesFound': 'Keine Turmkrane gefunden, die Ihren Kriterien entsprechen',
    'towercranes.noCranesFoundSuggestion': 'Passen Sie Ihre Filter oder Suchbegriffe an',
    'towercranes.crane.year': 'Jahr',
    'towercranes.crane.type': 'Typ',
    'towercranes.crane.maxCapacity': 'Max. Kapazität',
    'towercranes.crane.maxJibLength': 'Max. Auslegerlänge',
    'towercranes.viewDetails': 'Details Anzeigen',
    
    // Technical Information Page
    'technical.page.title': 'Technische Informationen',
    'technical.page.subtitle': 'Detaillierte technische Spezifikationen und Dokumentation für unsere Turmkrane.',
    'technical.specs': 'Technische Spezifikationen',
    'technical.docs': 'Dokumentation',
    'technical.download': 'Herunterladen',
    'technical.industryStandards': 'Industriestandards',
    'technical.industryStandards.desc': 'Zugriff auf relevante Industriestandards und Vorschriften im Zusammenhang mit Turmkranbetrieb.',
    'technical.viewStandards': 'Standards Anzeigen',
    'technical.educationalVideos': 'Lehrvideos',
    'technical.educationalVideos.desc': 'Sehen Sie sich Anleitungsvideos zum Betrieb, zur Wartung und zur Sicherheit von Turmkranen an.',
    'technical.watchVideos': 'Videos Ansehen',
    'technical.techSupport': 'Technischer Support',
    'technical.techSupport.desc': 'Benötigen Sie spezialisierte technische Unterstützung? Unser Expertenteam steht bereit, um zu helfen.',
    'technical.contactSupport': 'Support Kontaktieren',
    'technical.faq': 'Häufig Gestellte Fragen',
    'technical.additionalResources': 'Zusätzliche Ressourcen',
    'technical.manuals': 'Handbücher',
    'technical.specifications': 'Specificaties',
    'technical.brochures': 'Broschüren',
    'technical.safetyGuidelines': 'Sicherheitsrichtlinien',
    'technical.viewMore': 'Mehr anzeigen',
    'technical.downloadResource': 'Ressource herunterladen',
    
    // Contact Page
    'contact.title': 'Kontaktieren Sie uns',
    'contact.subtitle': 'Nehmen Sie Kontakt mit unserem Team auf für eine Beratung zu Ihren Turmkran-Anforderungen',
    'contact.form.title': 'Senden Sie uns eine Nachricht',
    'contact.form.name': 'Ihr Name',
    'contact.form.company': 'Firma',
    'contact.form.email': 'E-Mail-Adresse',
    'contact.form.phone': 'Telefonnummer',
    'contact.form.subject': 'Betreff',
    'contact.form.subjectPlaceholder': 'Wählen Sie einen Betreff',
    'contact.form.message': 'Nachricht',
    'contact.form.submit': 'Nachricht senden',
    'contact.form.submitting': 'Senden...',
    'contact.form.subjects.sales': 'Turmkran Verkauf',
    'contact.form.subjects.rental': 'Turmkran Vermietung',
    'contact.form.subjects.service': 'Turmkran Service',
    'contact.form.subjects.parts': 'Turmkran Ersatzteile',
    'contact.form.subjects.training': 'Turmkran Schulung',
    'contact.form.subjects.other': 'Sonstiges',
    'contact.form.sales': 'Verkaufsanfrage',
    'contact.form.rental': 'Mietanfrage',
    'contact.form.technical': 'Technische Unterstützung',
    'contact.form.parts': 'Ersatzteile und Service',
    'contact.form.training': 'Schulung',
    'contact.form.other': 'Sonstiges',
    'contact.info.title': 'Kontaktinformationen',
    'contact.info.address': 'Adresse',
    'contact.info.address.title': 'Adresse',
    'contact.info.contact': 'Kontakt',
    'contact.info.phone': 'Telefon',
    'contact.info.phone.title': 'Telefonnummer',
    'contact.info.email': 'E-Mail',
    'contact.info.email.title': 'E-Mail-Adresse',
    'contact.info.hours': 'Öffnungszeiten',
    'contact.info.hours.title': 'Öffnungszeiten',
    'contact.info.hours.monday': 'Montag',
    'contact.info.hours.tuesday': 'Dienstag',
    'contact.info.hours.wednesday': 'Mittwoch',
    'contact.info.hours.thursday': 'Donnerstag',
    'contact.info.hours.friday': 'Freitag',
    'contact.info.hours.saturday': 'Samstag',
    'contact.info.hours.sunday': 'Sonntag',
    'contact.info.hours.closed': 'Geschlossen',
    'contact.info.hours.weekdays': 'Montag - Freitag: 8:00 - 17:00',
    'contact.info.hours.weekend': 'Samstag - Sonntag: Geschlossen',
    'contact.info.workdays': 'Montag - Freitag: 8:00 - 17:00',
    'contact.info.weekend': 'Samstag - Sonntag: Geschlossen',
    'contact.map.title': 'Find Us on the Map',
    'contact.form.select': 'Select a subject',
    'contact.form.sales': 'Sales Inquiry',
    'contact.form.rental': 'Rental Inquiry',
    'contact.form.technical': 'Technical Support',
    'contact.form.parts': 'Parts and Service',
    'contact.form.training': 'Training',
    'contact.form.other': 'Other',
    
    // FAQ
    'faq.title': 'Häufig gestellte Fragen',
    'faq.subtitle': 'Antworten auf die häufigsten Fragen zu unseren Turmkranen und Dienstleistungen',
    'faq.q1': 'Welche Arten von Turmkranen bieten Sie an?',
    'faq.a1': 'Wir bieten eine breite Palette von Turmkranen an, darunter selbstaufrichtende Krane, Turmdrehkrane und Laufkrane. Unsere Flotte umfasst sowohl neue als auch gebruikte Krane verschiedener Kapazitäten und Höhen.',
    'faq.q2': 'Bieten Sie Kurzzeit-Mietoptionen an?',
    'faq.a2': 'Ja, wir bieten flexible Mietoptionen an, von kurzfristigen Projekten bis hin zu langfristigen Verträgen. Unsere Mietbedingungen können an Ihre spezifischen Projektanforderungen angepasst werden.',
    'faq.q3': 'Ist die Installation im Mietpreis inbegriffen?',
    'faq.a3': 'Ja, alle unsere Mietverträge beinhalten professionelle Installation und Demontage durch unser zertifiziertes Technikerteam. Wir stellen auch alle erforderlichen Genehmigungen und Inspektionen sicher.',
    'faq.q4': 'Welche Wartungsleistungen bieten Sie an?',
    'faq.a4': 'Wir bieten umfassende Wartungsleistungen an, einschließlich regelmäßiger Inspektionen, vorbeugende Wartung, Notfallreparaturen und Ersatzteilversorgung. Unser Service gewährleistet maximale Betriebszeit und Sicherheit.',
    'faq.q5': 'Bieten Sie Schulungen für Kranführer an?',
    'faq.a5': 'Ja, wir bieten umfassende Schulungsprogramme für Kranführer an, die sowohl Sicherheitsprotokolle als auch operative Effizienz abdecken. Unsere Kurse werden von erfahrenen Instruktoren geleitet.',
    'faq.q6': 'In welchen Regionen sind Ihre Dienstleistungen verfügbar?',
    'faq.a6': 'Wir bedienen Kunden in ganz Europa. Unser Hauptstandort befindet sich in den Niederlanden, aber wir können Krane und Dienstleistungen in verschiedenen europäischen Ländern bereitstellen.',
  },
}

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Start with 'en' as default for SSR
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  
  // This effect detects language from URL path and sets it as the active language
  useEffect(() => {
    if (!pathname || !mounted) return
    
    console.log(`LanguageContext: Checking URL path: ${pathname}`);
    
    // Check if the URL has a language prefix
    const pathParts = pathname.split('/').filter(Boolean)
    const firstPart = pathParts[0]
    
    if (['en', 'nl', 'de'].includes(firstPart)) {
      const urlLang = firstPart as Language
      console.log(`LanguageContext: Detected language from URL: ${urlLang}, current: ${language}`);
      
      // Always update state to match URL language - URL is the source of truth
      if (urlLang !== language) {
        console.log(`LanguageContext: Setting language from URL: ${urlLang}`);
        // Update all language indicators
        localStorage.setItem('language', urlLang)
        setCookie('NEXT_LOCALE', urlLang, { maxAge: 30 * 24 * 60 * 60 }) // 30 days
        setLanguageState(urlLang)
      }
    }
  }, [pathname, mounted, language])
  
  // This effect runs only once on client-side after first render
  useEffect(() => {
    setMounted(true)
    
    // Only run once on initial client-side render
    // Check URL first as it's the most authoritative source
    const pathParts = pathname?.split('/').filter(Boolean) || [];
    const firstPart = pathParts[0];
    
    if (['en', 'nl', 'de'].includes(firstPart)) {
      // URL has a language prefix, use it
      const urlLang = firstPart as Language;
      setLanguageState(urlLang);
      localStorage.setItem('language', urlLang);
      setCookie('NEXT_LOCALE', urlLang, { maxAge: 30 * 24 * 60 * 60 });
    } else {
      // URL has no language prefix, check cookie/localStorage/browser
      const cookieLang = getCookie('NEXT_LOCALE') as Language;
      const storedLang = localStorage.getItem('language') as Language;
      
      if (cookieLang && ['en', 'nl', 'de'].includes(cookieLang)) {
        setLanguageState(cookieLang);
        localStorage.setItem('language', cookieLang);
      } else if (storedLang && ['en', 'nl', 'de'].includes(storedLang)) {
        setLanguageState(storedLang);
        setCookie('NEXT_LOCALE', storedLang, { maxAge: 30 * 24 * 60 * 60 });
      } else {
        // Default to browser language if supported
        const browserLang = navigator.language.split('-')[0] as Language;
        if (['en', 'nl', 'de'].includes(browserLang)) {
          setLanguageState(browserLang);
          localStorage.setItem('language', browserLang);
          setCookie('NEXT_LOCALE', browserLang, { maxAge: 30 * 24 * 60 * 60 });
        }
      }
    }
  }, [pathname]);

  // Update language and save to localStorage and cookie
  const setLanguage = useCallback((lang: Language) => {
    if (!mounted) return // Only run on client
    
    console.log(`LanguageContext: Setting language to ${lang}`);
    localStorage.setItem('language', lang)
    setCookie('NEXT_LOCALE', lang, { maxAge: 30 * 24 * 60 * 60 }) // 30 days
    setLanguageState(lang)
    
    // Force reload the page with the correct language URL
    if (pathname) {
      // Extract the current path without the language prefix
      const pathParts = pathname.split('/').filter(Boolean)
      const currentLang = pathParts[0]
      let newPathname = pathname
      
      // Check if current path starts with a language code
      if (['en', 'nl', 'de'].includes(currentLang)) {
        // It does have a language prefix, replace it
        const pathWithoutLang = pathParts.slice(1).join('/')
        newPathname = `/${lang}${pathWithoutLang ? `/${pathWithoutLang}` : ''}`
        console.log(`LanguageContext: Path has language prefix. New path: ${newPathname}`);
      } else {
        // It doesn't have a language prefix, add the new one
        newPathname = `/${lang}${pathname}`
        console.log(`LanguageContext: Path doesn't have language prefix. New path: ${newPathname}`);
      }
      
      // Normalize the path to avoid double slashes
      newPathname = newPathname.replace(/\/+/g, '/')
      if (newPathname.endsWith('/') && newPathname !== '/') {
        newPathname = newPathname.slice(0, -1)
      }
      
      console.log(`LanguageContext: Redirecting to: ${newPathname}`);
      
      // Force hard navigation to the new URL to ensure complete page reload
      window.location.href = newPathname
    }
  }, [mounted, pathname])
  
  // Translation function
  const t = useCallback((key: string): string => {
    // Get the translation from the current language or fallback to English
    const translationSet = translations[language] || translations.en
    return translationSet[key] || key
  }, [language])

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
  }), [language, setLanguage, t])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  
  if (!context) {
    // Provide a fallback context if used outside provider
    return {
      language: 'en' as Language,
      setLanguage: () => console.warn('LanguageContext: setLanguage called outside provider'),
      t: (key: string) => key // Return the key itself as fallback
    }
  }
  
  return context
}