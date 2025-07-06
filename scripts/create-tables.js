const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

async function createTables() {
  try {
    console.log('🏗️  Creating database tables...')
    
    // Create tables using raw SQL
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "cranes" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "slug" TEXT UNIQUE NOT NULL,
        "model" TEXT NOT NULL,
        "year" INTEGER NOT NULL,
        "type" TEXT NOT NULL,
        "condition" TEXT NOT NULL,
        "serialNumber" TEXT UNIQUE NOT NULL,
        "maxCapacity" TEXT NOT NULL,
        "maxJibLength" TEXT NOT NULL,
        "maxHeight" TEXT NOT NULL,
        "counterJibLength" TEXT NOT NULL,
        "towerType" TEXT NOT NULL,
        "cabinType" TEXT NOT NULL,
        "hoistSpeed" TEXT NOT NULL,
        "trolleySpeed" TEXT NOT NULL,
        "slewing" TEXT NOT NULL,
        "powerRequirements" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "features" JSONB NOT NULL,
        "images" JSONB NOT NULL,
        "brochureUrl" TEXT,
        "isAvailable" BOOLEAN NOT NULL DEFAULT true,
        "status" TEXT NOT NULL DEFAULT 'available',
        "category" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "admins" (
        "id" SERIAL PRIMARY KEY,
        "username" TEXT UNIQUE NOT NULL,
        "password" TEXT NOT NULL,
        "email" TEXT UNIQUE NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    console.log('✅ Tables created successfully!')
    
    // Check if we have any cranes
    const craneCount = await prisma.crane.count()
    console.log(`📊 Current crane count: ${craneCount}`)
    
    if (craneCount === 0) {
      console.log('🌱 Seeding initial crane data...')
      
      const cranes = [
        {
          name: 'Potain MDT 178',
          slug: 'potain-mdt-178',
          model: 'MDT 178',
          year: 2018,
          type: 'flattop',
          condition: 'Excellent',
          serialNumber: 'MDT178-001',
          maxCapacity: '8 tons',
          maxJibLength: '60 meters',
          maxHeight: '80 meters',
          counterJibLength: '15 meters',
          towerType: 'Standard',
          cabinType: 'Comfort',
          hoistSpeed: '120 m/min',
          trolleySpeed: '40 m/min',
          slewing: '0.7 rpm',
          powerRequirements: '400V 50Hz',
          description: 'High-performance tower crane with excellent lifting capacity and reach.',
          features: ['High lifting capacity', 'Excellent reach', 'Modern controls'],
          images: ['/images/optimized/Potain-MDT-178_3W.webp'],
          brochureUrl: null,
          isAvailable: true,
          status: 'available',
          category: 'sale'
        },
        {
          name: 'Potain MC 85 B',
          slug: 'potain-mc-85-b',
          model: 'MC 85 B',
          year: 2019,
          type: 'topslewing',
          condition: 'Good',
          serialNumber: 'MC85B-002',
          maxCapacity: '5 tons',
          maxJibLength: '52 meters',
          maxHeight: '65 meters',
          counterJibLength: '12 meters',
          towerType: 'Standard',
          cabinType: 'Standard',
          hoistSpeed: '100 m/min',
          trolleySpeed: '35 m/min',
          slewing: '0.8 rpm',
          powerRequirements: '400V 50Hz',
          description: 'Reliable tower crane for medium-scale construction projects.',
          features: ['Reliable performance', 'Easy operation', 'Cost-effective'],
          images: ['/images/optimized/cropped-Top-page2-potain6.webp'],
          brochureUrl: null,
          isAvailable: true,
          status: 'available',
          category: 'rental'
        }
      ]
      
      for (const crane of cranes) {
        await prisma.crane.create({ data: crane })
      }
      
      console.log(`✅ Seeded ${cranes.length} cranes!`)
    }
    
    // Create admin user if it doesn't exist
    const adminCount = await prisma.admin.count()
    if (adminCount === 0) {
      console.log('👤 Creating admin user...')
      await prisma.admin.create({
        data: {
          username: 'admin',
          password: 'admin123', // In production, this should be hashed
          email: 'admin@nibmvb.eu'
        }
      })
      console.log('✅ Admin user created!')
    }
    
    console.log('🎉 Database setup complete!')
    
  } catch (error) {
    console.error('❌ Error creating tables:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  createTables()
    .then(() => {
      console.log('✅ Setup completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Setup failed:', error)
      process.exit(1)
    })
}

module.exports = { createTables } 