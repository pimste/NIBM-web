import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

// Existing crane data from your current implementation
const existingCranes = [
  {
    name: 'Potain MDT 178',
    model: 'MDT 178',
    year: 2019,
    type: 'flattop',
    condition: 'excellent',
    serialNumber: 'MDT178-2019-001',
    maxCapacity: '8 tons',
    maxJibLength: '60 meters',
    maxHeight: '64.9 meters',
    counterJibLength: '20 meters',
    towerType: 'Standard',
    cabinType: 'Comfort',
    hoistSpeed: '120 m/min',
    trolleySpeed: '40 m/min',
    slewing: '0.6 rpm',
    powerRequirements: '400V 50Hz',
    description: 'The Potain MDT 178 is a reliable flat-top tower crane designed for medium to large construction projects. With its 8-ton maximum capacity and 60-meter jib length, it offers excellent performance and versatility.',
    features: [
      'Flat-top design for easy assembly',
      'High lifting capacity',
      'Excellent reach and height',
      'Reliable hydraulic system',
      'Operator comfort cabin'
    ],
    images: ['/images/optimized/Potain-MDT-178_3W.webp'],
    brochureUrl: '',
    isAvailable: true,
    status: 'available',
    category: 'sale'
  },
  {
    name: 'Potain MC 85 B',
    model: 'MC 85 B',
    year: 2020,
    type: 'topslewing',
    condition: 'excellent',
    serialNumber: 'MC85B-2020-001',
    maxCapacity: '5 tons',
    maxJibLength: '52 meters',
    maxHeight: '42.5 meters',
    counterJibLength: '18 meters',
    towerType: 'Standard',
    cabinType: 'Comfort',
    hoistSpeed: '100 m/min',
    trolleySpeed: '35 m/min',
    slewing: '0.7 rpm',
    powerRequirements: '400V 50Hz',
    description: 'The Potain MC 85 B is a top-slewing tower crane perfect for medium-sized construction projects. Known for its reliability and efficiency.',
    features: [
      'Top-slewing design',
      'Compact footprint',
      'Easy operation',
      'Excellent visibility',
      'Low maintenance'
    ],
    images: ['/images/optimized/cropped-Top-page2-potain6.webp'],
    brochureUrl: '',
    isAvailable: true,
    status: 'available',
    category: 'rental'
  },
  {
    name: 'Potain MDT 219 J10',
    model: 'MDT 219 J10',
    year: 2021,
    type: 'flattop',
    condition: 'excellent',
    serialNumber: 'MDT219J10-2021-001',
    maxCapacity: '10 tons',
    maxJibLength: '65 meters',
    maxHeight: '70.2 meters',
    counterJibLength: '22 meters',
    towerType: 'Standard',
    cabinType: 'Comfort',
    hoistSpeed: '140 m/min',
    trolleySpeed: '45 m/min',
    slewing: '0.6 rpm',
    powerRequirements: '400V 50Hz',
    description: 'The Potain MDT 219 J10 is a high-capacity flat-top tower crane designed for large construction projects. Coming soon to our inventory.',
    features: [
      'High lifting capacity',
      'Extended reach',
      'Advanced control system',
      'Excellent stability',
      'Modern design'
    ],
    images: ['/images/optimized/cropped-Top-page2-potain6.webp'],
    brochureUrl: '',
    isAvailable: true,
    status: 'coming-soon',
    category: 'sale'
  },
  {
    name: 'Potain MCT 88',
    model: 'MCT 88',
    year: 2018,
    type: 'flattop',
    condition: 'very-good',
    serialNumber: 'MCT88-2018-001',
    maxCapacity: '5 tons',
    maxJibLength: '52 meters',
    maxHeight: '47 meters',
    counterJibLength: '18 meters',
    towerType: 'Standard',
    cabinType: 'Standard',
    hoistSpeed: '110 m/min',
    trolleySpeed: '38 m/min',
    slewing: '0.65 rpm',
    powerRequirements: '400V 50Hz',
    description: 'The Potain MCT 88 is a versatile flat-top tower crane suitable for various construction applications.',
    features: [
      'Flat-top design',
      'Good lifting capacity',
      'Reliable performance',
      'Easy maintenance',
      'Cost-effective'
    ],
    images: ['/images/optimized/Potain-MDT-178_3W.webp'],
    brochureUrl: '',
    isAvailable: true,
    status: 'available',
    category: 'rental'
  },
  {
    name: 'Potain MC 125',
    model: 'MC 125',
    year: 2017,
    type: 'topslewing',
    condition: 'good',
    serialNumber: 'MC125-2017-001',
    maxCapacity: '6 tons',
    maxJibLength: '60 meters',
    maxHeight: '55 meters',
    counterJibLength: '20 meters',
    towerType: 'Standard',
    cabinType: 'Comfort',
    hoistSpeed: '115 m/min',
    trolleySpeed: '40 m/min',
    slewing: '0.6 rpm',
    powerRequirements: '400V 50Hz',
    description: 'The Potain MC 125 is a reliable top-slewing tower crane with good lifting capacity and reach.',
    features: [
      'Top-slewing design',
      'Good reach',
      'Stable operation',
      'Comfortable cabin',
      'Proven reliability'
    ],
    images: ['/images/optimized/cropped-Top-page2-potain6.webp'],
    brochureUrl: '',
    isAvailable: true,
    status: 'available',
    category: 'sale'
  },
  {
    name: 'Potain MDT 189',
    model: 'MDT 189',
    year: 2020,
    type: 'flattop',
    condition: 'excellent',
    serialNumber: 'MDT189-2020-001',
    maxCapacity: '8 tons',
    maxJibLength: '60 meters',
    maxHeight: '60 meters',
    counterJibLength: '20 meters',
    towerType: 'Standard',
    cabinType: 'Comfort',
    hoistSpeed: '125 m/min',
    trolleySpeed: '42 m/min',
    slewing: '0.6 rpm',
    powerRequirements: '400V 50Hz',
    description: 'The Potain MDT 189 is a modern flat-top tower crane offering excellent performance and reliability.',
    features: [
      'Modern flat-top design',
      'High performance',
      'Excellent reliability',
      'Advanced features',
      'Operator comfort'
    ],
    images: ['/images/optimized/Potain-MDT-178_3W.webp'],
    brochureUrl: '',
    isAvailable: true,
    status: 'available',
    category: 'rental'
  },
  {
    name: 'Potain MC 175 B',
    model: 'MC 175 B',
    year: 2019,
    type: 'topslewing',
    condition: 'excellent',
    serialNumber: 'MC175B-2019-001',
    maxCapacity: '8 tons',
    maxJibLength: '60 meters',
    maxHeight: '58 meters',
    counterJibLength: '20 meters',
    towerType: 'Standard',
    cabinType: 'Comfort',
    hoistSpeed: '130 m/min',
    trolleySpeed: '45 m/min',
    slewing: '0.6 rpm',
    powerRequirements: '400V 50Hz',
    description: 'The Potain MC 175 B was a high-performance top-slewing tower crane. This unit has been sold.',
    features: [
      'High lifting capacity',
      'Top-slewing design',
      'Excellent performance',
      'Comfortable operation',
      'Proven track record'
    ],
    images: ['/images/optimized/cropped-Top-page2-potain6.webp'],
    brochureUrl: '',
    isAvailable: false,
    status: 'sold',
    category: 'sale'
  },
  {
    name: 'Potain MDT 268 J12',
    model: 'MDT 268 J12',
    year: 2018,
    type: 'flattop',
    condition: 'very-good',
    serialNumber: 'MDT268J12-2018-001',
    maxCapacity: '12 tons',
    maxJibLength: '75 meters',
    maxHeight: '72.8 meters',
    counterJibLength: '25 meters',
    towerType: 'Standard',
    cabinType: 'Comfort',
    hoistSpeed: '150 m/min',
    trolleySpeed: '50 m/min',
    slewing: '0.5 rpm',
    powerRequirements: '400V 50Hz',
    description: 'The Potain MDT 268 J12 was a high-capacity flat-top tower crane. This unit has been sold.',
    features: [
      'High lifting capacity',
      'Extended reach',
      'Flat-top design',
      'Heavy-duty construction',
      'Professional grade'
    ],
    images: ['/images/optimized/Potain-MDT-178_3W.webp'],
    brochureUrl: '',
    isAvailable: false,
    status: 'sold',
    category: 'sale'
  },
  {
    name: 'Potain MCT 135',
    model: 'MCT 135',
    year: 2020,
    type: 'flattop',
    condition: 'excellent',
    serialNumber: 'MCT135-2020-001',
    maxCapacity: '6 tons',
    maxJibLength: '50 meters',
    maxHeight: '53 meters',
    counterJibLength: '18 meters',
    towerType: 'Standard',
    cabinType: 'Comfort',
    hoistSpeed: '115 m/min',
    trolleySpeed: '38 m/min',
    slewing: '0.65 rpm',
    powerRequirements: '400V 50Hz',
    description: 'The Potain MCT 135 was a versatile flat-top tower crane. This unit has been sold.',
    features: [
      'Flat-top design',
      'Good capacity',
      'Reliable operation',
      'Compact design',
      'Efficient performance'
    ],
    images: ['/images/optimized/cropped-Top-page2-potain6.webp'],
    brochureUrl: '',
    isAvailable: false,
    status: 'sold',
    category: 'sale'
  }
]

async function main() {
  console.log('Starting database migration...')
  
  try {
    // Clear existing data (optional - remove if you want to keep existing data)
    await prisma.crane.deleteMany()
    console.log('Cleared existing crane data')
    
    // Insert crane data
    for (const craneData of existingCranes) {
      // Generate slug from name
      const slug = craneData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      
      const crane = await prisma.crane.create({
        data: {
          ...craneData,
          slug
        }
      })
      
      console.log(`Created crane: ${crane.name}`)
    }
    
    console.log('Migration completed successfully!')
    
    // Show summary
    const totalCranes = await prisma.crane.count()
    const availableCranes = await prisma.crane.count({
      where: { status: 'available' }
    })
    const soldCranes = await prisma.crane.count({
      where: { status: 'sold' }
    })
    
    console.log(`\nSummary:`)
    console.log(`Total cranes: ${totalCranes}`)
    console.log(`Available: ${availableCranes}`)
    console.log(`Sold: ${soldCranes}`)
    
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 