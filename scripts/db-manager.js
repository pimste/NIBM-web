const { PrismaClient } = require('../src/generated/prisma')
const readline = require('readline')

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve)
  })
}

async function listCranes() {
  console.log('\n📋 All Cranes:')
  console.log('=' .repeat(80))
  
  const cranes = await prisma.crane.findMany({
    orderBy: { createdAt: 'desc' }
  })
  
  if (cranes.length === 0) {
    console.log('No cranes found.')
    return
  }
  
  cranes.forEach((crane, index) => {
    console.log(`${index + 1}. ${crane.name} (${crane.model})`)
    console.log(`   ID: ${crane.id} | Status: ${crane.status} | Available: ${crane.isAvailable}`)
    console.log(`   Category: ${crane.category} | Year: ${crane.year}`)
    console.log(`   Slug: ${crane.slug}`)
    console.log('   ' + '-'.repeat(60))
  })
}

async function addCrane() {
  console.log('\n➕ Add New Crane')
  console.log('=' .repeat(40))
  
  const name = await ask('Crane name: ')
  const model = await ask('Model: ')
  const year = parseInt(await ask('Year: '))
  const type = await ask('Type (topslewing/flattop/luffing/selferecting): ')
  const condition = await ask('Condition (excellent/very-good/good/fair): ')
  const serialNumber = await ask('Serial number: ')
  const maxCapacity = await ask('Max capacity (e.g., "8 tons"): ')
  const maxJibLength = await ask('Max jib length (e.g., "60 meters"): ')
  const maxHeight = await ask('Max height (e.g., "64.9 meters"): ')
  const status = await ask('Status (available/sold/coming-soon): ')
  const category = await ask('Category (sale/rental): ')
  const description = await ask('Description: ')
  
  const slug = name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  
  try {
    const crane = await prisma.crane.create({
      data: {
        name,
        slug,
        model,
        year,
        type,
        condition,
        serialNumber,
        maxCapacity,
        maxJibLength,
        maxHeight,
        counterJibLength: '',
        towerType: '',
        cabinType: '',
        hoistSpeed: '',
        trolleySpeed: '',
        slewing: '',
        powerRequirements: '',
        description,
        features: [],
        images: [],
        brochureUrl: null,
        isAvailable: status === 'available',
        status,
        category
      }
    })
    
    console.log(`✅ Crane "${name}" added successfully with ID: ${crane.id}`)
  } catch (error) {
    console.error('❌ Error adding crane:', error.message)
  }
}

async function updateCrane() {
  await listCranes()
  
  const id = parseInt(await ask('\nEnter crane ID to update: '))
  
  try {
    const crane = await prisma.crane.findUnique({ where: { id } })
    
    if (!crane) {
      console.log('❌ Crane not found')
      return
    }
    
    console.log(`\n✏️  Updating: ${crane.name}`)
    console.log('Leave blank to keep current value')
    
    const name = await ask(`Name (${crane.name}): `) || crane.name
    const status = await ask(`Status (${crane.status}): `) || crane.status
    const isAvailable = await ask(`Available (${crane.isAvailable}): `)
    
    const updateData = {
      name,
      status,
      isAvailable: isAvailable === '' ? crane.isAvailable : isAvailable.toLowerCase() === 'true'
    }
    
    await prisma.crane.update({
      where: { id },
      data: updateData
    })
    
    console.log('✅ Crane updated successfully')
  } catch (error) {
    console.error('❌ Error updating crane:', error.message)
  }
}

async function deleteCrane() {
  await listCranes()
  
  const id = parseInt(await ask('\nEnter crane ID to delete: '))
  
  try {
    const crane = await prisma.crane.findUnique({ where: { id } })
    
    if (!crane) {
      console.log('❌ Crane not found')
      return
    }
    
    const confirm = await ask(`Are you sure you want to delete "${crane.name}"? (yes/no): `)
    
    if (confirm.toLowerCase() === 'yes') {
      await prisma.crane.delete({ where: { id } })
      console.log('✅ Crane deleted successfully')
    } else {
      console.log('❌ Deletion cancelled')
    }
  } catch (error) {
    console.error('❌ Error deleting crane:', error.message)
  }
}

async function main() {
  console.log('🏗️  NIBM Crane Database Manager')
  console.log('=' .repeat(40))
  
  while (true) {
    console.log('\nOptions:')
    console.log('1. List all cranes')
    console.log('2. Add new crane')
    console.log('3. Update crane')
    console.log('4. Delete crane')
    console.log('5. Exit')
    
    const choice = await ask('\nEnter your choice (1-5): ')
    
    switch (choice) {
      case '1':
        await listCranes()
        break
      case '2':
        await addCrane()
        break
      case '3':
        await updateCrane()
        break
      case '4':
        await deleteCrane()
        break
      case '5':
        console.log('👋 Goodbye!')
        process.exit(0)
      default:
        console.log('❌ Invalid choice')
    }
  }
}

main().catch(console.error).finally(() => {
  rl.close()
  prisma.$disconnect()
}) 