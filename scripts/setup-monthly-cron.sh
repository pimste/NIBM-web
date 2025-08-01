#!/bin/bash

# Setup Monthly SEO Automation Cron Job
# This script sets up a cron job to run every 4 weeks

echo "🚀 Setting up Monthly SEO Automation Cron Job..."

# Get the current directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Create the cron job entry
# Runs every 4 weeks on the 1st of the month at 2 AM
CRON_JOB="0 2 1 */4 * cd $PROJECT_DIR && node scripts/monthly-seo-automation.js >> logs/monthly-seo.log 2>&1"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "monthly-seo-automation.js"; then
    echo "⚠️  Monthly SEO automation cron job already exists!"
    echo "Current cron jobs:"
    crontab -l | grep "monthly-seo-automation.js"
    echo ""
    read -p "Do you want to replace it? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Cron job setup cancelled."
        exit 1
    fi
    
    # Remove existing cron job
    crontab -l 2>/dev/null | grep -v "monthly-seo-automation.js" | crontab -
fi

# Create logs directory if it doesn't exist
mkdir -p "$PROJECT_DIR/logs"

# Add the new cron job
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "✅ Monthly SEO automation cron job added successfully!"
echo ""
echo "📅 Schedule: Every 4 weeks on the 1st of the month at 2:00 AM"
echo "📁 Project directory: $PROJECT_DIR"
echo "📄 Log file: $PROJECT_DIR/logs/monthly-seo.log"
echo ""
echo "📋 Current cron jobs:"
crontab -l
echo ""
echo "🔧 To manually run the automation:"
echo "   cd $PROJECT_DIR && node scripts/monthly-seo-automation.js"
echo ""
echo "📊 To view logs:"
echo "   tail -f $PROJECT_DIR/logs/monthly-seo.log"
echo ""
echo "🗑️  To remove the cron job:"
echo "   crontab -e"
echo "   (then delete the line with monthly-seo-automation.js)" 