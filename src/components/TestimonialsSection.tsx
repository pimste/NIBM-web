'use client'

import { useState, useCallback } from 'react'
import { FaQuoteLeft, FaUserCircle } from 'react-icons/fa'
import { AnimatedElement } from './AnimatedElement'
import { useLanguage } from '@/context/LanguageContext'

const testimonials = [
  {
    id: 1,
    quote: "NIBM Tower Cranes has been instrumental in our success across multiple construction projects. Their equipment reliability and technical support are unmatched in the industry.",
    name: "Sarah Johnson",
    title: "Project Manager",
    company: "Urban Construction Ltd"
  },
  {
    id: 2,
    quote: "Working with NIBM Tower Cranes has significantly improved our project timelines. Their maintenance team is responsive, and the equipment quality has exceeded our expectations.",
    name: "Michael Chen",
    title: "Construction Director",
    company: "Global Infrastructure Group"
  },
  {
    id: 3,
    quote: "From start to finish, the team at NIBM has shown exceptional professionalism. The cranes perform flawlessly, and their operators are highly skilled and safety-conscious.",
    name: "Anita Patel",
    title: "Chief Operations Officer",
    company: "Skyline Developers"
  }
]

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { t } = useLanguage()
  
  const nextTestimonial = useCallback(() => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }, [])
  
  const prevTestimonial = useCallback(() => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }, [])
  
  return (
    <section className="py-20 bg-neutral-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedElement>
            <h2 className="section-title text-white">{t('testimonials.title')}</h2>
            <p className="section-subtitle text-neutral-300">
              {t('testimonials.subtitle')}
            </p>
          </AnimatedElement>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <AnimatedElement className="bg-neutral-800 rounded-lg p-8 relative">
            <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
              <div className="flex-shrink-0 w-24 h-24 text-primary">
                <FaUserCircle className="w-full h-full" />
              </div>
              <div>
                <div className="text-2xl mb-4 leading-relaxed font-light italic">
                  <FaQuoteLeft className="inline-block mr-2 mb-1 text-primary" />
                  "{testimonials[activeIndex].quote}"
                </div>
                <div className="mt-4">
                  <p className="font-bold text-lg">{testimonials[activeIndex].name}</p>
                  <p className="text-primary">
                    {testimonials[activeIndex].title}, {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={prevTestimonial}
                className="p-2 bg-neutral-700 rounded-full hover:bg-primary transition-colors"
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 bg-neutral-700 rounded-full hover:bg-primary transition-colors"
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="flex justify-center mt-4 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-primary' : 'bg-neutral-600 hover:bg-neutral-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  )
}

// Default export for dynamic import
export default TestimonialsSection
// Named export for direct imports
export { TestimonialsSection } 