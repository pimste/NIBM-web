import { Metadata } from 'next'

// Static crane data for metadata generation
const staticCraneData: { [key: string]: any } = {
  'potain-mdt-178': {
    name: 'Potain MDT 178',
    model: 'MDT 178',
    year: 2018,
    description: 'High-performance tower crane with excellent lifting capacity'
  },
  'potain-mc-85-b': {
    name: 'Potain MC 85 B',
    model: 'MC 85 B',
    year: 2019,
    description: 'Reliable tower crane for medium-scale construction projects'
  },
  'potain-mdt-219-j10': {
    name: 'Potain MDT 219 J10',
    model: 'MDT 219 J10',
    year: 2020,
    description: 'Advanced tower crane with superior reach and capacity'
  },
  'potain-mct-88': {
    name: 'Potain MCT 88',
    model: 'MCT 88',
    year: 2017,
    description: 'Compact tower crane ideal for urban construction'
  },
  'potain-mc-125': {
    name: 'Potain MC 125',
    model: 'MC 125',
    year: 2021,
    description: 'Versatile tower crane for various construction applications'
  },
  'potain-mdt-189': {
    name: 'Potain MDT 189',
    model: 'MDT 189',
    year: 2019,
    description: 'Robust tower crane with excellent performance characteristics'
  },
  'potain-mc-175-b': {
    name: 'Potain MC 175 B',
    model: 'MC 175 B',
    year: 2020,
    description: 'Heavy-duty tower crane for large construction projects'
  },
  'potain-mdt-268-j12': {
    name: 'Potain MDT 268 J12',
    model: 'MDT 268 J12',
    year: 2022,
    description: 'State-of-the-art tower crane with maximum efficiency'
  },
  'potain-mct-135': {
    name: 'Potain MCT 135',
    model: 'MCT 135',
    year: 2021,
    description: 'High-capacity tower crane for demanding construction tasks'
  }
}

export async function generateTowerCraneMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const crane = staticCraneData[params.slug]
  
  if (!crane) {
    return {
      title: 'Tower Crane - NIBM',
      description: 'Professional tower crane services and equipment',
    }
  }

  return {
    title: `${crane.name} - Tower Crane Details | NIBM`,
    description: `${crane.description}. Model: ${crane.model}, Year: ${crane.year}. Professional tower crane services by NIBM.`,
    keywords: `tower crane, ${crane.name}, ${crane.model}, construction equipment, NIBM`,
    openGraph: {
      title: `${crane.name} - NIBM`,
      description: crane.description,
      type: 'website',
      siteName: 'NIBM - Tower Crane Services',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${crane.name} - NIBM`,
      description: crane.description,
    },
  }
} 