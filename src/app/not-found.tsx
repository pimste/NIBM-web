import Link from 'next/link'
import Image from 'next/image'
import { FaHome, FaArrowLeft, FaWrench } from 'react-icons/fa'

export const metadata = {
  title: '404 - Page Not Found | NIBM Tower Cranes',
  description: 'The page you are looking for could not be found.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="max-w-md mx-auto text-center px-4">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/images/optimized/logo-blue.webp"
              alt="NIBM Tower Cranes Logo"
              width={200}
              height={80}
              className="h-16 w-auto mx-auto"
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJpgZXCLgAAAABJRU5ErkJggg=="
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={80}
            />
          </Link>
        </div>

        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <FaWrench className="text-primary text-3xl" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-neutral-700 mb-4">Page Not Found</h2>
        <p className="text-neutral-600 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. 
          Don't worry, our tower cranes are always exactly where they should be!
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
          >
            <FaHome className="mr-2" />
            Back to Homepage
          </Link>
          
          <Link
            href="/en/towercranes"
            className="inline-flex items-center justify-center w-full px-6 py-3 border-2 border-primary text-primary font-medium rounded-md hover:bg-primary hover:text-white transition-colors"
          >
            View Available Cranes
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 mb-4">
            Need help finding what you're looking for?
          </p>
          <Link
            href="/en/contact"
            className="text-primary hover:text-primary-700 font-medium text-sm"
          >
            Contact our team →
          </Link>
        </div>
      </div>
    </div>
  )
} 