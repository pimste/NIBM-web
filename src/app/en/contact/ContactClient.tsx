'use client'

import { useState } from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'
import { ClientOnly } from '@/components/ClientOnly'
import { MotionDiv } from '@/components/MotionWrapper'
import { ProtectedContact } from '@/components/ProtectedContact'

export default function ContactClient() {
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
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white"
                        value={formData.subject}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      >
                        <option value="">{t('contact.form.subjectPlaceholder')}</option>
                        <option value="Tower Crane Sales">{t('contact.form.subjects.sales')}</option>
                        <option value="Tower Crane Rental">{t('contact.form.subjects.rental')}</option>
                        <option value="Tower Crane Service">{t('contact.form.subjects.service')}</option>
                        <option value="Tower Crane Parts">{t('contact.form.subjects.parts')}</option>
                        <option value="Tower Crane Training">{t('contact.form.subjects.training')}</option>
                        <option value="Other">{t('contact.form.subjects.other')}</option>
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
                      rows={4}
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
                      className={`w-full py-3 px-4 text-center text-white font-medium bg-primary rounded-md hover:bg-primary-dark transition-colors ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
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
              <div className="bg-neutral-50 p-8 rounded-lg">
                <div className="space-y-8">
                  <ClientOnly>
                    <ProtectedContact>
                      {/* Company Details */}
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="text-primary text-xl mt-1 mr-4" />
                        <div>
                          <h3 className="text-lg font-medium text-neutral-900 mb-1">
                            {t('contact.info.address.title')}
                          </h3>
                          <p className="text-neutral-700 mb-1">NIBM Kranen BV</p>
                          <p className="text-neutral-700">
                            Oosterhulst 5<br />
                            3861 MA Nijkerk<br />
                            Nederland
                          </p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start">
                        <FaPhone className="text-primary text-xl mt-1 mr-4" />
                        <div>
                          <h3 className="text-lg font-medium text-neutral-900 mb-1">
                            {t('contact.info.phone.title')}
                          </h3>
                          <p className="text-neutral-700">(+31) 6 12 34 56 78</p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-start">
                        <FaEnvelope className="text-primary text-xl mt-1 mr-4" />
                        <div>
                          <h3 className="text-lg font-medium text-neutral-900 mb-1">
                            {t('contact.info.email.title')}
                          </h3>
                          <p className="text-neutral-700">info@nibmvb.eu</p>
                        </div>
                      </div>
                    </ProtectedContact>
                  </ClientOnly>

                  {/* Office Hours */}
                  <div className="flex items-start">
                    <FaClock className="text-primary text-xl mt-1 mr-4" />
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900 mb-2">
                        {t('contact.info.hours.title')}
                      </h3>
                      <ul className="text-neutral-700 space-y-1">
                        <li className="flex justify-between">
                          <span>{t('contact.info.hours.monday')}</span>
                          <span>8:00 - 17:00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>{t('contact.info.hours.tuesday')}</span>
                          <span>8:00 - 17:00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>{t('contact.info.hours.wednesday')}</span>
                          <span>8:00 - 17:00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>{t('contact.info.hours.thursday')}</span>
                          <span>8:00 - 17:00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>{t('contact.info.hours.friday')}</span>
                          <span>8:00 - 16:00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>{t('contact.info.hours.saturday')}</span>
                          <span>{t('contact.info.hours.closed')}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>{t('contact.info.hours.sunday')}</span>
                          <span>{t('contact.info.hours.closed')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            {t('contact.map.title')}
          </h2>
          <div className="relative h-96 w-full rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2453.6834831787557!2d5.488248016193752!3d51.84582967969309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c70a5c15b9a4b3%3A0x8b9e8f9a0c81eb0c!2sOosterhulst%205%2C%203861%20MA%20Nijkerk!5e0!3m2!1sen!2snl!4v1677581082049!5m2!1sen!2snl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NIBM Kranen BV Location"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  )
} 