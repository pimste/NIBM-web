const { PrismaClient } = require('../src/generated/prisma')

async function deployDatabase() {
  const prisma = new PrismaClient()

  try {
    console.log('🔄 Deploying database schema...')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    // Create sample data if needed
    const craneCount = await prisma.crane.count()
    
    if (craneCount === 0) {
      console.log('📦 Creating sample crane data...')
      
      await prisma.crane.createMany({
        data: [
          {
            name: "Potain MDT 178",
            slug: "potain-mdt-178",
            model: "MDT 178",
            year: 2019,
            type: "flattop",
            condition: "excellent",
            serialNumber: "MDT178-2019-001",
            maxCapacity: "8 tons",
            maxJibLength: "60 meters",
            maxHeight: "64.9 meters",
            counterJibLength: "20 meters",
            towerType: "Standard",
            cabinType: "Comfort",
            hoistSpeed: "120 m/min",
            trolleySpeed: "40 m/min",
            slewing: "0.6 rpm",
            powerRequirements: "400V 50Hz",
            description: "The Potain MDT 178 is a reliable flat-top tower crane designed for medium to large construction projects.",
            features: ["Flat-top design for easy assembly", "High lifting capacity", "Excellent reach and height"],
            images: ["/images/optimized/Potain-MDT-178_3W.webp"],
            brochureUrl: "",
            isAvailable: true,
            status: "available",
            category: "sale"
          },
          {
            name: "Potain MC 85 B",
            slug: "potain-mc-85-b",
            model: "MC 85 B",
            year: 2020,
            type: "topslewing",
            condition: "excellent",
            serialNumber: "MC85B-2020-001",
            maxCapacity: "5 tons",
            maxJibLength: "52 meters",
            maxHeight: "42.5 meters",
            counterJibLength: "18 meters",
            towerType: "Standard",
            cabinType: "Comfort",
            hoistSpeed: "100 m/min",
            trolleySpeed: "35 m/min",
            slewing: "0.7 rpm",
            powerRequirements: "400V 50Hz",
            description: "The Potain MC 85 B is a top-slewing tower crane perfect for medium-sized construction projects.",
            features: ["Top-slewing design", "Compact footprint", "Easy operation"],
            images: ["/images/optimized/cropped-Top-page2-potain6.webp"],
            brochureUrl: "",
            isAvailable: true,
            status: "available",
            category: "rental"
          }
        ]
      })
      
      console.log('✅ Sample data created successfully')
    }
    
    console.log('🎉 Database deployment completed!')
    
  } catch (error) {
    console.error('❌ Database deployment failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

deployDatabase() 