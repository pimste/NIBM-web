'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  id: string;
}

const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Only run in production and if gtag is available
    if (process.env.NODE_ENV !== 'production' || !window.gtag) {
      return;
    }

    const sendToAnalytics = (metric: PerformanceMetric) => {
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: metric.name,
          value: Math.round(metric.value),
          custom_map: {
            metric_rating: metric.rating,
            metric_id: metric.id,
          },
        });
      }
    };

    // Function to get rating based on thresholds
    const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
      switch (name) {
        case 'CLS':
          return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
        case 'FID':
          return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
        case 'LCP':
          return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
        case 'FCP':
          return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
        case 'TTFB':
          return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
        case 'INP':
          return value <= 200 ? 'good' : value <= 500 ? 'needs-improvement' : 'poor';
        default:
          return 'good';
      }
    };

    // Web Vitals measurement
    const measureWebVitals = () => {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
        if (lastEntry) {
          const metric: PerformanceMetric = {
            name: 'LCP',
            value: lastEntry.startTime,
            rating: getRating('LCP', lastEntry.startTime),
            id: 'lcp-' + Date.now(),
          };
          sendToAnalytics(metric);
        }
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const metric: PerformanceMetric = {
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            rating: getRating('FID', entry.processingStart - entry.startTime),
            id: 'fid-' + Date.now(),
          };
          sendToAnalytics(metric);
        });
      });
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      let clsEntries: any[] = [];
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            clsEntries.push(entry);
          }
        });
      });
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observer not supported');
      }

      // Send CLS when page becomes hidden
      const sendCLS = () => {
        if (clsValue > 0) {
          const metric: PerformanceMetric = {
            name: 'CLS',
            value: clsValue,
            rating: getRating('CLS', clsValue),
            id: 'cls-' + Date.now(),
          };
          sendToAnalytics(metric);
        }
      };

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          sendCLS();
        }
      });

      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const metric: PerformanceMetric = {
            name: 'FCP',
            value: entry.startTime,
            rating: getRating('FCP', entry.startTime),
            id: 'fcp-' + Date.now(),
          };
          sendToAnalytics(metric);
        });
      });
      
      try {
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('FCP observer not supported');
      }

      // Time to First Byte (TTFB)
      const measureTTFB = () => {
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (navigationEntries.length > 0) {
          const ttfb = navigationEntries[0].responseStart - navigationEntries[0].requestStart;
          const metric: PerformanceMetric = {
            name: 'TTFB',
            value: ttfb,
            rating: getRating('TTFB', ttfb),
            id: 'ttfb-' + Date.now(),
          };
          sendToAnalytics(metric);
        }
      };

      // Measure TTFB on load
      if (document.readyState === 'complete') {
        measureTTFB();
      } else {
        window.addEventListener('load', measureTTFB);
      }

      // Custom metrics
      const measureCustomMetrics = () => {
        // Page Load Time
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        if (loadTime > 0) {
          window.gtag?.('event', 'page_load_time', {
            event_category: 'Performance',
            value: loadTime,
          });
        }

        // DOM Content Loaded Time
        const domContentLoadedTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        if (domContentLoadedTime > 0) {
          window.gtag?.('event', 'dom_content_loaded_time', {
            event_category: 'Performance',
            value: domContentLoadedTime,
          });
        }
      };

      // Measure custom metrics on load
      if (document.readyState === 'complete') {
        measureCustomMetrics();
      } else {
        window.addEventListener('load', measureCustomMetrics);
      }
    };

    // Start measuring when the page is loaded
    if (document.readyState === 'complete') {
      measureWebVitals();
    } else {
      window.addEventListener('load', measureWebVitals);
    }

    // Cleanup function
    return () => {
      // Clean up observers if needed
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor; 