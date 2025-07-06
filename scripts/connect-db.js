const { PrismaClient } = require('../src/generated/prisma')

async function connectToDatabase() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🔌 Connecting to database...')
    await prisma.$connect()
    console.log('✅ Database connected successfully!')
    
    // Test query
    const craneCount = await prisma.crane.count()
    console.log(`📊 Total cranes in database: ${craneCount}`)
    
    // Show recent cranes
    const recentCranes = await prisma.crane.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        model: true,
        status: true,
        isAvailable: true,
        createdAt: true
      }
    })
    
    console.log('\n🕐 Recent cranes:')
    recentCranes.forEach(crane => {
      console.log(`- ${crane.name} (${crane.model}) - ${crane.status} - Available: ${crane.isAvailable}`)
    })
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    
    if (error.code === 'P1001') {
      console.log('\n💡 Troubleshooting tips:')
      console.log('1. Check if DATABASE_URL is set correctly')
      console.log('2. Verify database server is running')
      console.log('3. Check network connectivity')
      console.log('4. Ensure database credentials are correct')
    }
  } finally {
    await prisma.$disconnect()
  }
}

// Show environment info
console.log('🌍 Environment Information:')
console.log(`Node.js version: ${process.version}`)
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
console.log(`Database URL: ${process.env.DATABASE_URL ? '✅ Set' : '❌ Not set'}`)
console.log('=' .repeat(50))

connectToDatabase() 