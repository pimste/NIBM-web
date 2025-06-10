'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ClientOnly } from '@/components/ClientOnly'

export default function CookiesPolicy() {
  const { t } = useLanguage()

  return (
    <>
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
            Cookies Policy
          </h1>
          <p className="text-xl text-white/80 text-center mt-4 max-w-3xl mx-auto">
            How we use cookies and similar technologies on our website
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-neutral-700 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. What Are Cookies</h2>
            <p className="text-neutral-700 mb-6">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="text-neutral-700 mb-6">
              Cookies are not harmful to your computer or mobile device, and they cannot access other information on your device. They are simply a way for websites to remember your preferences and provide a better experience when you return.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Hoe Wij Cookies Gebruiken</h2>
            <p className="text-neutral-700 mb-4">
              Wij gebruiken cookies voor de volgende doeleinden:
            </p>
            <ul className="list-disc pl-6 mb-6 text-neutral-700">
              <li><strong>Strikt Noodzakelijke Cookies:</strong> Deze cookies zijn essentieel voor het goed functioneren van de website en kunnen niet worden uitgeschakeld. Ze omvatten taalvoorkeurscookes (NEXT_LOCALE) die uw gekozen taal (Engels, Nederlands of Duits) onthouden om ervoor te zorgen dat de website in uw voorkeursaal wordt weergegeven op alle pagina's.</li>
              <li><strong>Prestatie Cookies:</strong> Deze cookies helpen ons begrijpen hoe bezoekers omgaan met onze website door anoniem informatie te verzamelen en te rapporteren.</li>
              <li><strong>Functionaliteit Cookies:</strong> Deze cookies stellen de website in staat om andere keuzes die u maakt te onthouden en verbeterde, meer persoonlijke functies te bieden.</li>
              <li><strong>Targeting Cookies:</strong> Deze cookies worden gebruikt om advertenties te leveren die relevanter zijn voor u en uw interesses. Ze worden ook gebruikt om het aantal keren dat u een advertentie ziet te beperken en de effectiviteit van reclamecampagnes te meten.</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">2.1 Strikt Noodzakelijke Taalcookies</h2>
            <p className="text-neutral-700 mb-6">
              Onze website werkt in drie talen (Engels, Nederlands en Duits). Om u inhoud in uw voorkeurstal aan te bieden, gebruiken wij strikt noodzakelijke cookies die uw taalvoorkeur opslaan. Deze cookies zijn essentieel voor de basisfunctionaliteit van onze meertalige website en vereisen geen toestemming omdat ze noodzakelijk zijn voor de dienst die u heeft aangevraagd.
            </p>
            <p className="text-neutral-700 mb-6">
              <strong>Cookie Details:</strong>
            </p>
            <ul className="list-disc pl-6 mb-6 text-neutral-700">
              <li><strong>Naam:</strong> NEXT_LOCALE</li>
              <li><strong>Doel:</strong> Slaat uw taalvoorkeur op (en/nl/de)</li>
              <li><strong>Duur:</strong> 30 dagen</li>
              <li><strong>Type:</strong> Strikt noodzakelijk - geen toestemming vereist</li>
              <li><strong>Opgeslagen gegevens:</strong> Alleen taalcode (en, nl of de)</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. Soorten Cookies Die Wij Gebruiken</h2>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">3.1 First-Party Cookies</h3>
            <p className="text-neutral-700 mb-6">
              First-party cookies are set by the website you are visiting. We use first-party cookies to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-neutral-700">
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our website</li>
              <li>Improve your browsing experience</li>
              <li>Personalize content and advertisements</li>
            </ul>

            <h3 className="text-xl font-bold text-neutral-900 mb-3">3.2 Third-Party Cookies</h3>
            <p className="text-neutral-700 mb-6">
              Third-party cookies are set by a website other than the one you are visiting. We use third-party cookies from:
            </p>
            <ul className="list-disc pl-6 mb-6 text-neutral-700">
              <li>Google Analytics to analyze website traffic and usage</li>
              <li>Social media platforms to enable sharing and engagement</li>
              <li>Advertising networks to deliver relevant advertisements</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. How to Control Cookies</h2>
            <p className="text-neutral-700 mb-6">
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you.
            </p>
            <p className="text-neutral-700 mb-6">
              You can manage your cookie preferences by:
            </p>
            <ul className="list-disc pl-6 mb-6 text-neutral-700">
              <li>Adjusting your browser settings to block or delete cookies</li>
              <li>Using browser extensions that block cookies</li>
              <li>Using private browsing mode, which typically doesn't store cookies after you close the browser</li>
            </ul>
            <p className="text-neutral-700 mb-6">
              For more information on how to manage cookies in your browser, please visit:
            </p>
            <ul className="list-disc pl-6 mb-6 text-neutral-700">
              <li><a href="https://support.google.com/chrome/answer/95647" className="text-primary hover:text-primary-700">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/nl/cookies" className="text-primary hover:text-primary-700">Mozilla Firefox</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-primary hover:text-primary-700">Microsoft Edge</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-primary hover:text-primary-700">Safari</a></li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Do Not Track</h2>
            <p className="text-neutral-700 mb-6">
              Some browsers have a "Do Not Track" feature that lets you tell websites that you do not want to have your online activities tracked. These features are not yet uniform, so we are currently set up to respond to such signals.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Changes to This Cookies Policy</h2>
            <p className="text-neutral-700 mb-6">
              We may update this Cookies Policy from time to time. The updated version will be indicated by an updated "Last updated" date, and the updated version will be effective as soon as it is accessible.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Contact Us</h2>
            <p className="text-neutral-700 mb-6">
              If you have any questions about this Cookies Policy, please contact us at:
            </p>
            <p className="text-neutral-700 mb-2">
              NIBM Tower Cranes
            </p>
            <p className="text-neutral-700 mb-2">
              Kruisweg 8, 6361 TG Nuth, Netherlands
            </p>
            <p className="text-neutral-700 mb-2">
              Email: gid.gehlen@nibmtowercranes.com
            </p>
            <p className="text-neutral-700 mb-2">
              Phone: +31 6 53206004
            </p>
          </div>
        </div>
      </section>
    </>
  )
} 