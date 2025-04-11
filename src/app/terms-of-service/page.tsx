'use client'

import { useLanguage } from '@/context/LanguageContext'
import ClientOnly from '@/components/ClientOnly'

export default function TermsOfService() {
  const { t } = useLanguage()

  return (
    <>
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
            Terms of Service
          </h1>
          <p className="text-xl text-white/80 text-center mt-4 max-w-3xl mx-auto">
            The rules and guidelines for using our website and services
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-neutral-700 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-neutral-700 mb-6">
              By accessing or using the NIBM Tower Cranes website or services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our website or use our services.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Intellectual Property</h2>
            <p className="text-neutral-700 mb-6">
              The content, features, and functionality of our website, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are owned by NIBM Tower Cranes and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="text-neutral-700 mb-6">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website, except as permitted by these Terms of Service.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. User Accounts</h2>
            <p className="text-neutral-700 mb-6">
              If you create an account on our website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account. You must immediately notify us of any unauthorized use of your account or any other breach of security.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Prohibited Uses</h2>
            <p className="text-neutral-700 mb-4">
              You may use our website only for lawful purposes and in accordance with these Terms of Service. You agree not to use our website:
            </p>
            <ul className="list-disc pl-6 mb-6 text-neutral-700">
              <li>In any way that violates any applicable national or international law or regulation</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation</li>
              <li>To impersonate or attempt to impersonate NIBM Tower Cranes, a NIBM Tower Cranes employee, another user, or any other person or entity</li>
              <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. User Content</h2>
            <p className="text-neutral-700 mb-6">
              Our website may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("User Content"). You are responsible for the User Content that you post on or through the website, including its legality, reliability, and appropriateness.
            </p>
            <p className="text-neutral-700 mb-6">
              By posting User Content on or through the website, you represent and warrant that the User Content is yours and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms of Service.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Disclaimer of Warranties</h2>
            <p className="text-neutral-700 mb-6">
              THE WEBSITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-neutral-700 mb-6">
              IN NO EVENT SHALL NIBM TOWER CRANES, NOR ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE WEBSITE.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Indemnification</h2>
            <p className="text-neutral-700 mb-6">
              You agree to defend, indemnify, and hold harmless NIBM Tower Cranes and its licensees and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from your use of and access to the website, or your violation of any term of these Terms of Service.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Governing Law</h2>
            <p className="text-neutral-700 mb-6">
              These Terms of Service shall be governed by and construed in accordance with the laws of the Netherlands, without regard to its conflict of law provisions.
            </p>
            <p className="text-neutral-700 mb-6">
              Our failure to enforce any right or provision of these Terms of Service will not be considered a waiver of those rights. If any provision of these Terms of Service is held to be invalid or unenforceable by a court, the remaining provisions of these Terms of Service will remain in effect.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">10. Changes to Terms</h2>
            <p className="text-neutral-700 mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms of Service at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p className="text-neutral-700 mb-6">
              By continuing to access or use our website after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the website.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">11. Contact Us</h2>
            <p className="text-neutral-700 mb-6">
              If you have any questions about these Terms of Service, please contact us at:
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