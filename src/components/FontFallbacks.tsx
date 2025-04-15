'use client'

import React from 'react'

export function FontFallbacks() {
  return (
    <style jsx global>{`
      @font-face {
        font-family: 'Inter fallback';
        font-style: normal;
        font-weight: 400;
        src: local('Arial');
        ascent-override: 90%;
        descent-override: 22%;
        line-gap-override: 0%;
        size-adjust: 100%;
      }
      
      @font-face {
        font-family: 'Montserrat fallback';
        font-style: normal;
        font-weight: 700;
        src: local('Arial Bold');
        ascent-override: 92%;
        descent-override: 25%;
        line-gap-override: 0%;
        size-adjust: 105%;
      }
    `}</style>
  )
} 