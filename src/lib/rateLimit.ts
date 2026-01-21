/**
 * In-memory rate limiting utility
 * Can be upgraded to Redis/Vercel KV for distributed systems
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitEntry {
  requests: number[];
  resetAt: number;
}

// In-memory store for rate limiting
// Key: `${ip}:${route}`, Value: RateLimitEntry
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries periodically to prevent memory leaks
const CLEANUP_INTERVAL = 60 * 1000; // 1 minute
let cleanupTimer: NodeJS.Timeout | null = null;

function startCleanupTimer() {
  if (cleanupTimer) return;
  
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetAt < now) {
        rateLimitStore.delete(key);
      }
    }
  }, CLEANUP_INTERVAL);
}

/**
 * Check if a request should be rate limited
 * @param ip - Client IP address
 * @param route - Route identifier (e.g., 'contact', 'vitals', 'video')
 * @param config - Rate limit configuration
 * @returns true if rate limited, false otherwise
 */
export function isRateLimited(
  ip: string,
  route: string,
  config: RateLimitConfig
): boolean {
  startCleanupTimer();
  
  const key = `${ip}:${route}`;
  const now = Date.now();
  
  let entry = rateLimitStore.get(key);
  
  // If no entry or window expired, create new entry
  if (!entry || entry.resetAt < now) {
    entry = {
      requests: [now],
      resetAt: now + config.windowMs,
    };
    rateLimitStore.set(key, entry);
    return false;
  }
  
  // Remove old requests outside the current window
  entry.requests = entry.requests.filter(
    (timestamp) => now - timestamp < config.windowMs
  );
  
  // Check if limit exceeded
  if (entry.requests.length >= config.maxRequests) {
    return true;
  }
  
  // Add current request
  entry.requests.push(now);
  rateLimitStore.set(key, entry);
  
  return false;
}

/**
 * Get remaining requests and reset time
 * @param ip - Client IP address
 * @param route - Route identifier
 * @param config - Rate limit configuration
 * @returns Object with remaining requests and reset time
 */
export function getRateLimitInfo(
  ip: string,
  route: string,
  config: RateLimitConfig
): { remaining: number; resetAt: number } {
  const key = `${ip}:${route}`;
  const now = Date.now();
  
  const entry = rateLimitStore.get(key);
  
  if (!entry || entry.resetAt < now) {
    return {
      remaining: config.maxRequests,
      resetAt: now + config.windowMs,
    };
  }
  
  // Remove old requests outside the current window
  entry.requests = entry.requests.filter(
    (timestamp) => now - timestamp < config.windowMs
  );
  
  return {
    remaining: Math.max(0, config.maxRequests - entry.requests.length),
    resetAt: entry.resetAt,
  };
}

/**
 * Get client IP from request headers
 * @param request - Next.js request object
 * @returns Client IP address
 */
export function getClientIP(request: Request | { headers: Headers }): string {
  const headers = request.headers;
  
  // Check for forwarded IP (Vercel, Cloudflare, etc.)
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim();
  }
  
  // Check for real IP header
  const realIP = headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }
  
  // Check for CF-Connecting-IP (Cloudflare)
  const cfIP = headers.get('cf-connecting-ip');
  if (cfIP) {
    return cfIP.trim();
  }
  
  return 'unknown';
}
