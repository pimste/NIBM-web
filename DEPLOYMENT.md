# 🚀 NIBM Web Deployment Guide

This guide will help you deploy your NIBM tower crane website to Vercel with your custom domain `nibmvb.eu`.

## 📋 Prerequisites

- GitHub account
- Vercel account
- Domain access for `nibmvb.eu`
- Database provider account (PlanetScale or Supabase)

## 🗄️ Step 1: Set Up Production Database

### Option A: PlanetScale (Recommended)

1. Go to [planetscale.com](https://planetscale.com)
2. Create a free account
3. Create a new database: `nibm-production`
4. Go to your database dashboard
5. Click "Connect" and copy the connection string
6. It should look like: `mysql://username:password@host/database?sslaccept=strict`

### Option B: Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a free account
3. Create a new project
4. Go to Settings > Database
5. Copy the connection string

## 🔧 Step 2: Prepare Your Code

1. **Initialize Git (if not done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/yourusername/nibm-web.git
   git push -u origin main
   ```

## 🚀 Step 3: Deploy to Vercel

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables:**
   In your Vercel project settings, add these environment variables:

   ```env
   DATABASE_URL=your_database_connection_string_here
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password_here
   NEXTAUTH_URL=https://nibmvb.eu
   NEXTAUTH_SECRET=your_random_secret_here
   ```

   **To generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

3. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete

## 🌐 Step 4: Configure Custom Domain

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Click "Domains"
   - Add `nibmvb.eu` and `www.nibmvb.eu`

2. **Configure DNS:**
   Add these records to your domain provider:

   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com

   Type: A
   Name: @
   Value: 76.76.19.19

   Type: A
   Name: @
   Value: 76.76.21.21
   ```

## 🗃️ Step 5: Initialize Database

After deployment, run these commands locally with your production DATABASE_URL:

```bash
# Set your production database URL
export DATABASE_URL="your_production_database_url"

# Deploy database schema and sample data
npm run db:deploy

# Test connection
npm run db:connect
```

## 🔧 Database Management

### Command Line Tools

1. **Database Manager (Interactive):**
   ```bash
   npm run db:manage
   ```
   This opens an interactive menu to:
   - List all cranes
   - Add new cranes
   - Update existing cranes
   - Delete cranes

2. **Database Studio (GUI):**
   ```bash
   npm run db:studio
   ```
   Opens Prisma Studio in your browser for visual database management

3. **Test Connection:**
   ```bash
   npm run db:connect
   ```

### Remote Database Access

To manage your production database from anywhere:

1. **Create a .env file with production credentials:**
   ```env
   DATABASE_URL="your_production_database_url"
   ```

2. **Run management commands:**
   ```bash
   npm run db:manage
   ```

## 📱 Admin Panel Access

Once deployed, you can access the admin panel at:
- `https://nibmvb.eu/en/admin/login`
- Login with your configured admin credentials

## 🔄 Updating Your Site

1. **Make changes to your code**
2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. **Vercel will automatically redeploy**

## 🛠️ Troubleshooting

### Database Connection Issues

```bash
# Check if environment variables are set
npm run db:connect

# Reset database (⚠️ This will delete all data)
npm run db:reset
```

### Build Failures

1. Check Vercel build logs
2. Ensure all environment variables are set
3. Verify package.json dependencies

### Domain Issues

1. Verify DNS propagation: [whatsmydns.net](https://whatsmydns.net)
2. Check SSL certificate status in Vercel
3. Ensure domain is properly configured

## 📊 Monitoring

- **Vercel Analytics:** Monitor performance and usage
- **Database Monitoring:** Check your database provider's dashboard
- **Error Tracking:** Check Vercel function logs

## 🔐 Security Checklist

- [ ] Strong admin password set
- [ ] NEXTAUTH_SECRET is secure and random
- [ ] Database connection uses SSL
- [ ] Environment variables are properly configured
- [ ] Domain has SSL certificate

## 🎯 Post-Deployment Tasks

1. **Test all functionality:**
   - Public crane listings
   - Admin login
   - Crane management (add/edit/delete)
   - Contact forms (if implemented)

2. **Add sample data:**
   - Use the admin panel or database manager
   - Upload crane images
   - Create crane listings

3. **SEO Setup:**
   - Submit sitemap to Google Search Console
   - Configure meta tags
   - Set up analytics

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test database connection
4. Check DNS configuration

---

🎉 **Congratulations!** Your NIBM tower crane website should now be live at `https://nibmvb.eu` 