import Image from 'next/image'
import { FaCheckCircle } from 'react-icons/fa'
import { generateMetadata } from './metadata'
import dynamic from 'next/dynamic'

// Import our client component for handling language
import AboutClient from './AboutClient'

export { generateMetadata }

export default function About() {
  return <AboutClient />
} 