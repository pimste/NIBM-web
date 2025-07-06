#!/bin/bash

echo "🚀 NIBM Tower Crane CMS - Quick Start Setup"
echo "=========================================="

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local with your database configuration:"
    echo "DATABASE_URL=\"mysql://username:password@localhost:3306/nibm_cranes\""
    echo "SESSION_SECRET=\"your-session-secret-here\""
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Generating Prisma client..."
npm run db:generate

echo "🗄️  Pushing database schema..."
npm run db:push

echo "📊 Migrating existing data..."
npm run db:migrate

echo "🧪 Testing setup..."
npm run db:test

echo ""
echo "✅ Setup complete! You can now:"
echo "   1. Run 'npm run dev' to start the development server"
echo "   2. Visit http://localhost:3000/admin/login"
echo "   3. Login with username: admin, password: password"
echo ""
echo "🎉 Happy coding!" 