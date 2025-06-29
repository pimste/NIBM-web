'use client'

import { useEffect, useState } from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'
import { ClientOnly } from '@/components/ClientOnly'
import { MotionDiv } from '@/components/MotionWrapper'
import { ProtectedContact } from '@/components/ProtectedContact'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      console.log('Submitting form data:', formData)
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      console.log('Form submission response:', result)

      if (!response.ok) {
        console.error('Form submission error:', result)
        throw new Error(result.error || 'Failed to submit the form. Please try again.')
      }

      setFormSubmitted(true)
      // Reset form data
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-white/80 text-center mt-4 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                {t('contact.form.title')}
              </h2>

              {formSubmitted ? (
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 text-green-800 p-6 rounded-lg"
                >
                  <h3 className="text-xl font-bold mb-2">{t('contact.form.success.title')}</h3>
                  <p>{t('contact.form.success.message')}</p>
                </MotionDiv>
              ) : (
                <form onSubmit={handleSubmit} className="bg-neutral-50 p-8 rounded-lg">
                  {submitError && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                      <p>{submitError}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t('contact.form.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t('contact.form.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t('contact.form.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t('contact.form.company')}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        value={formData.company}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">
                      {t('contact.form.subject')}
                    </label>
                    <div className="select-wrapper">
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        value={formData.subject}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      >
                        <option value="">{t('contact.form.select')}</option>
                        <option value="Sales Inquiry">{t('contact.form.sales')}</option>
                        <option value="Rental Inquiry">{t('contact.form.rental')}</option>
                        <option value="Technical Support">{t('contact.form.technical')}</option>
                        <option value="Parts and Service">{t('contact.form.parts')}</option>
                        <option value="Training">{t('contact.form.training')}</option>
                        <option value="Other">{t('contact.form.other')}</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-md transition-colors flex items-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        t('contact.form.submit')
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                {t('contact.info.title')}
              </h2>
              <div className="bg-neutral-50 p-6 rounded-lg space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="bg-primary rounded-full p-3 text-white flex-shrink-0">
                    <FaMapMarkerAlt className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-900 mb-2">{t('contact.info.address')}</h3>
                    <address className="not-italic text-neutral-700 leading-relaxed">
                      NIBM Kranen BV<br />
                      Kruisweg 8<br />
                      6361 TG Nuth<br />
                      Nederland
                    </address>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-primary rounded-full p-3 text-white flex-shrink-0">
                    <FaPhone className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-900 mb-2">{t('contact.info.contact')}</h3>
                    <ProtectedContact 
                      type="phone" 
                      value="+31653206004" 
                      className="text-neutral-700 hover:text-primary transition-colors"
                      iconClassName="hidden"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="bg-primary rounded-full p-3 text-white flex-shrink-0">
                    <FaEnvelope className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-900 mb-2">{t('contact.info.email')}</h3>
                    <ProtectedContact 
                      type="email" 
                      value="gid.gehlen@nibmtowercranes.com" 
                      className="text-neutral-700 hover:text-primary transition-colors"
                      iconClassName="hidden"
                    />
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start space-x-4">
                  <div className="bg-primary rounded-full p-3 text-white flex-shrink-0">
                    <FaClock className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-900 mb-2">{t('contact.info.hours')}</h3>
                    <div className="text-neutral-700 leading-relaxed">
                      {t('contact.info.workdays')}<br />
                      {t('contact.info.weekend')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 rounded-lg overflow-hidden h-80 bg-neutral-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.123456789!2d5.8723456!3d50.9123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zS3J1aXN3ZWcgOCwgNjM2MSBURyBOdXRoLCBOZXRoZXJsYW5kcw!5e0!3m2!1sen!2snl!4v1677581082049!5m2!1sen!2snl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NIBM Kranen BV Location - Kruisweg 8, Nuth"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 