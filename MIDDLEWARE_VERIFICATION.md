# Middleware Changes Verification Guide

## Changes Made

### 1. Bot Blocking in Middleware
- **Location**: `middleware.ts` - `isBlockedBot()` function
- **What it does**:
  - Blocks known spam referrers (mysticforge.top, neonflux.top, etc.)
  - Blocks suspicious user agents (curl, wget, python-requests, scrapy, selenium, etc.)
  - **Allows legitimate search engine bots** (Google, Bing, Yahoo, etc.)
  - Blocks bots early to reduce edge function invocations

### 2. Optimized Middleware Matcher
- **Location**: `middleware.ts` - `config.matcher`
- **What it does**:
  - Excludes static files from middleware processing (images, fonts, videos, etc.)
  - Reduces unnecessary edge function executions
  - Only processes actual page requests

### 3. Rate Limiting on API Routes
- **Location**: `src/lib/rateLimit.ts` (shared utility)
- **Implementation**:
  - Contact API: 5 requests per 15 minutes per IP
  - Vitals API: 30 requests per minute per IP
  - Video API: 10 requests per minute per IP
  - Uses in-memory rate limiting with automatic cleanup

## Important Logic Changes

### API Routes Handling
- **Before**: API routes were checked after bot blocking
- **After**: API routes are checked FIRST, and only spam referrers are blocked (not user agents)
- **Why**: Allows legitimate automated API calls (monitoring, webhooks, etc.) to work while still blocking spam

### Bot Blocking Priority
1. API routes: Only block spam referrers (allow all user agents)
2. Page routes: Block spam referrers AND suspicious user agents (but allow legitimate bots)

## How to Verify Everything Works

### 1. Manual Testing

#### Test Legitimate Traffic
```bash
# Start your dev server
npm run dev

# Test normal browser request (should work)
curl -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)" http://localhost:3000/en

# Test Googlebot (should work)
curl -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1)" http://localhost:3000/en
```

#### Test Bot Blocking
```bash
# Test spam referrer (should be blocked - 403)
curl -H "Referer: https://mysticforge.top" http://localhost:3000/en

# Test suspicious user agent (should be blocked - 403)
curl -H "User-Agent: curl/7.68.0" http://localhost:3000/en

# Test API route with spam referrer (should be blocked - 403)
curl -X POST -H "Referer: https://neonflux.top" -H "Content-Type: application/json" http://localhost:3000/api/contact

# Test API route without spam referrer (should work even with curl user agent)
curl -H "User-Agent: curl/7.68.0" http://localhost:3000/api/health
```

#### Test Rate Limiting
```bash
# Test contact API rate limiting (5 requests per 15 minutes)
for i in {1..6}; do
  curl -X POST -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","message":"Test"}' \
    http://localhost:3000/api/contact
  echo ""
done
# 6th request should return 429

# Test vitals API rate limiting (30 requests per minute)
for i in {1..31}; do
  curl -X POST -H "Content-Type: application/json" \
    -d '{"name":"FCP","value":1234}' \
    http://localhost:3000/api/vitals
done
# 31st request should return 429
```

### 2. Automated Testing

Run the test script:
```bash
# Make script executable
chmod +x scripts/test-middleware-changes.js

# Run tests (requires dev server running)
node scripts/test-middleware-changes.js

# Or test against production
TEST_URL=https://your-domain.com node scripts/test-middleware-changes.js
```

### 3. Verify in Production

#### Check Vercel/Deployment Logs
- Monitor for 403 responses (should see spam bots being blocked)
- Check edge function invocation counts (should decrease)
- Verify legitimate traffic still works

#### Monitor API Routes
- Check contact form submissions still work
- Verify web vitals are still being collected
- Ensure video API still serves videos

## Potential Issues to Watch For

### 1. False Positives
- **Issue**: Legitimate users might be blocked if they have unusual user agents
- **Solution**: The legitimate bots list is comprehensive. If you see false positives, add the user agent pattern to `LEGITIMATE_BOTS`

### 2. API Route Blocking
- **Issue**: Legitimate automated API calls might be blocked
- **Solution**: API routes only check referrers, not user agents. If needed, you can whitelist specific IPs or user agents

### 3. Rate Limiting Memory
- **Issue**: In-memory rate limiting doesn't work across multiple edge function instances
- **Solution**: For production at scale, consider upgrading to Redis/Vercel KV (see `src/lib/rateLimit.ts` comments)

## Rollback Plan

If something breaks:

1. **Quick fix**: Comment out bot blocking in middleware:
```typescript
// if (isBlockedBot(request)) {
//   return new NextResponse('Forbidden', { status: 403 });
// }
```

2. **Rate limiting**: Remove rate limit checks from API routes (they'll still work, just without protection)

3. **Git revert**: 
```bash
git revert <commit-hash>
```

## Files Changed

- `middleware.ts` - Added bot blocking and optimized matcher
- `src/lib/rateLimit.ts` - New shared rate limiting utility
- `src/app/api/contact/route.ts` - Updated rate limiting (5 per 15 min)
- `src/app/api/vitals/route.ts` - Added rate limiting (30 per minute)
- `src/app/api/video/route.ts` - Added rate limiting (10 per minute)

## Expected Results

✅ **Reduced edge function invocations**: Static files bypass middleware
✅ **Blocked spam bots**: Spam referrers and suspicious user agents blocked
✅ **Allowed legitimate bots**: Search engines can still crawl
✅ **Protected API routes**: Rate limiting prevents abuse
✅ **Normal traffic works**: All legitimate user traffic should work as before
