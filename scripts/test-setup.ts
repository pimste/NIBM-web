import { PrismaClient } from '../src/generated/prisma';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function testSetup() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test if tables exist
    const craneCount = await prisma.crane.count();
    console.log(`📊 Found ${craneCount} cranes in database`);
    
    const adminCount = await prisma.admin.count();
    console.log(`👤 Found ${adminCount} admin users in database`);
    
    // Create admin user if it doesn't exist
    if (adminCount === 0) {
      console.log('🔧 Creating default admin user...');
      const hashedPassword = await hashPassword('password');
      await prisma.admin.create({
        data: {
          username: 'admin',
          password: hashedPassword,
          email: 'admin@nibmcranes.com',
        },
      });
      console.log('✅ Default admin user created (username: admin, password: password)');
    }
    
    console.log('\n✅ Setup verification complete!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Open: http://localhost:3000/en/admin/login');
    console.log('3. Login with: admin / password');
    console.log('4. Start managing your tower cranes!');
    
  } catch (error) {
    console.error('❌ Setup verification failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testSetup(); 