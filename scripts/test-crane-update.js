const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

async function testCraneUpdate() {
  try {
    console.log('Testing crane update...')
    
    // First, let's see what cranes exist
    const cranes = await prisma.crane.findMany({
      take: 5
    })
    
    console.log('Found cranes:', cranes.length)
    cranes.forEach(crane => {
      console.log(`- ${crane.id}: ${crane.name} (${crane.status})`)
    })
    
    if (cranes.length === 0) {
      console.log('No cranes found in database')
      return
    }
    
    // Test updating the first crane
    const testCrane = cranes[0]
    console.log(`\nTesting update for crane: ${testCrane.name}`)
    
    const updateData = {
      name: testCrane.name + ' (TEST)',
      slug: (testCrane.name + ' (TEST)').toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim(),
      model: testCrane.model + ' (TEST)',
      year: testCrane.year,
      type: testCrane.type,
      condition: testCrane.condition,
      serialNumber: testCrane.serialNumber + '-TEST',
      maxCapacity: testCrane.maxCapacity + ' (TEST)',
      maxJibLength: testCrane.maxJibLength,
      maxHeight: testCrane.maxHeight,
      counterJibLength: testCrane.counterJibLength,
      towerType: testCrane.towerType,
      cabinType: testCrane.cabinType,
      hoistSpeed: testCrane.hoistSpeed,
      trolleySpeed: testCrane.trolleySpeed,
      slewing: testCrane.slewing,
      powerRequirements: testCrane.powerRequirements,
      description: testCrane.description + ' (TEST UPDATE)',
      features: Array.isArray(testCrane.features) ? [...testCrane.features, 'TEST FEATURE'] : ['TEST FEATURE'],
      images: Array.isArray(testCrane.images) ? testCrane.images : [],
      brochureUrl: testCrane.brochureUrl,
      isAvailable: testCrane.isAvailable,
      status: testCrane.status,
      category: testCrane.category
    }
    
    console.log('Updating crane with data:', JSON.stringify(updateData, null, 2))
    
    const updatedCrane = await prisma.crane.update({
      where: { id: testCrane.id },
      data: updateData
    })
    
    console.log('✅ Update successful!')
    console.log('Updated crane:', {
      id: updatedCrane.id,
      name: updatedCrane.name,
      description: updatedCrane.description,
      features: updatedCrane.features
    })
    
    // Now revert the changes
    console.log('\nReverting changes...')
    const revertedCrane = await prisma.crane.update({
      where: { id: testCrane.id },
      data: {
        name: testCrane.name,
        slug: testCrane.slug,
        model: testCrane.model,
        serialNumber: testCrane.serialNumber,
        maxCapacity: testCrane.maxCapacity,
        description: testCrane.description,
        features: testCrane.features
      }
    })
    
    console.log('✅ Revert successful!')
    
  } catch (error) {
    console.error('❌ Error testing crane update:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testCraneUpdate()
