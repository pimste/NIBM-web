'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ClientOnly } from '@/components/ClientOnly'

export default function PrivacyPolicy() {
  const { t } = useLanguage()

  return (
    <>
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/80 text-center mt-4 max-w-3xl mx-auto">
            How we collect, use, and protect your personal information
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-neutral-700 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Introduction</h2>
            <p className="text-neutral-700 mb-6">
              NIBM Tower Cranes ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            <p className="text-neutral-700 mb-6">
              Please read this Privacy Policy carefully. By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">2.1 Personal Information</h3>
            <p className="text-neutral-700 mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 mb-6 text-neutral-700">
              <li>Fill out a contact form</li>
              <li>Request a quote</li>
              <li>Subscribe to our newsletter</li>
              <li>Apply for a job</li>
              <li>Register for an account</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p className="text-neutral-700 mb-6">
              The personal information we collect may include:
            </p>
            <ul className="list-disc pl-6 mb-6 text-neutral-700">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name</li>
              <li>Job title</li>
              <li>Address</li>
              <li>Payment information</li>
            </ul>

            <h3 className="text-xl font-bold text-neutral-900 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-neutral-700 mb-6">
              When you visit our website, we automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 mb-6 text-neutral-700">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Access times</li>
              <li>Pages visited</li>
              <li>Time spent on pages</li>
              <li>Links clicked</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-neutral-700 mb-4">
              We may use the information we collect for various purposes, including to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-neutral-700">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Communicate with you about products, services, offers, and events</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Personalize your experience on our website</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Sharing Your Information</h2>
            <p className="text-neutral-700 mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6 text-neutral-700">
              <li>With service providers, contractors, and other third parties who perform services on our behalf</li>
              <li>In connection with a business transfer, such as a merger, acquisition, or sale of assets</li>
              <li>To comply with legal obligations, such as responding to subpoenas or court orders</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>With your consent</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Data Security</h2>
            <p className="text-neutral-700 mb-6">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Your Rights</h2>
            <p className="text-neutral-700 mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-6 text-neutral-700">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate personal information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to restrict or object to processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Children's Privacy</h2>
            <p className="text-neutral-700 mb-6">
              Our website is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Changes to This Privacy Policy</h2>
            <p className="text-neutral-700 mb-6">
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last updated" date, and the updated version will be effective as soon as it is accessible.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Contact Us</h2>
            <p className="text-neutral-700 mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
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