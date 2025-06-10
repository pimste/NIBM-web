'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

export function Analytics() {
  const [hasConsent, setHasConsent] = useState(false)
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  const gtagId = process.env.NEXT_PUBLIC_GTAG_ID

  useEffect(() => {
    // Check for stored consent
    const cookieConsent = localStorage.getItem('cookie-consent')
    setHasConsent(cookieConsent === 'accepted')

    // Listen for consent changes
    const handleConsentChange = () => {
      const newConsent = localStorage.getItem('cookie-consent')
      setHasConsent(newConsent === 'accepted')
    }

    // Listen for storage changes (when user interacts with cookie banner)
    window.addEventListener('storage', handleConsentChange)
    
    return () => {
      window.removeEventListener('storage', handleConsentChange)
    }
  }, [])

  return (
    <>
      {/* Google Consent Mode Initialization - Load this always */}
      <Script
        id="google-consent-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Set default consent mode
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              wait_for_update: 500
            });
            
            gtag('js', new Date());
          `,
        }}
      />

      {/* Only load Google Analytics if consent is given */}
      {hasConsent && gtagId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                gtag('config', '${gtagId}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  anonymize_ip: true,
                  cookie_flags: 'max-age=7200;secure;samesite=strict'
                });
              `,
            }}
          />
        </>
      )}

      {/* Only load GTM if consent is given */}
      {hasConsent && gtmId && (
        <>
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
          {/* GTM NoScript Fallback */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        </>
      )}

      {/* Enhanced eCommerce Tracking for Crane Inquiries - Only if consent given */}
      {hasConsent && (
        <Script
          id="enhanced-ecommerce"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Track crane inquiries as conversions
              window.trackCraneInquiry = function(craneName, craneType, action) {
                if (typeof gtag !== 'undefined') {
                  gtag('event', action || 'inquiry', {
                    event_category: 'Crane Interest',
                    event_label: craneName,
                    custom_parameters: {
                      crane_type: craneType,
                      crane_name: craneName
                    }
                  });
                }
              };
              
              // Track contact form submissions
              window.trackContactForm = function(formType, source) {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'form_submit', {
                    event_category: 'Contact',
                    event_label: formType,
                    custom_parameters: {
                      form_type: formType,
                      source_page: source || window.location.pathname
                    }
                  });
                }
              };
              
              // Track phone calls
              window.trackPhoneCall = function(location) {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'phone_call', {
                    event_category: 'Contact',
                    event_label: 'Phone Call',
                    custom_parameters: {
                      call_location: location || 'header'
                    }
                  });
                }
              };
              
              // Track email clicks
              window.trackEmailClick = function(location) {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'email_click', {
                    event_category: 'Contact',
                    event_label: 'Email Click',
                    custom_parameters: {
                      click_location: location || 'header'
                    }
                  });
                }
              };
            `,
          }}
        />
      )}
    </>
  )
} 