# Database Setup Guide

## Prerequisites

1. **Install MySQL**: Make sure you have MySQL installed and running
   - macOS: `brew install mysql` or use MySQL installer
   - Ubuntu: `sudo apt install mysql-server`
   - Windows: Download from MySQL website

2. **Create Database**: Create a database for the project
   ```sql
   CREATE DATABASE nibm_cranes;
   ```

3. **Update Environment Variables**: Update `.env.local` with your database credentials
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/nibm_cranes"
   ```

## Setup Steps

1. **Generate Prisma Client**:
   ```bash
   npm run db:generate
   ```

2. **Push Database Schema** (creates tables):
   ```bash
   npm run db:push
   ```

3. **Migrate Existing Data** (optional - populates with sample data):
   ```bash
   npm run db:migrate
   ```

4. **Open Prisma Studio** (optional - database GUI):
   ```bash
   npm run db:studio
   ```

## Admin Access

Once setup is complete, you can access the admin panel:

- **URL**: `http://localhost:3000/en/admin/login`
- **Username**: `admin`
- **Password**: `password`

## API Endpoints

- `GET /api/cranes` - Get all cranes
- `POST /api/cranes` - Create new crane (requires auth)
- `GET /api/cranes/[id]` - Get single crane
- `PUT /api/cranes/[id]` - Update crane (requires auth)
- `DELETE /api/cranes/[id]` - Delete crane (requires auth)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout

## Troubleshooting

1. **Connection Issues**: 
   - Check if MySQL is running
   - Verify database credentials in `.env.local`
   - Ensure database exists

2. **Prisma Issues**:
   - Run `npm run db:generate` after schema changes
   - Use `npm run db:push` to sync schema with database

3. **Permission Issues**:
   - Check MySQL user permissions
   - Ensure user has CREATE, READ, UPDATE, DELETE permissions 