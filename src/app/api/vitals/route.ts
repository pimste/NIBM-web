import { NextResponse } from 'next/server';

/**
 * API route for collecting Core Web Vitals metrics
 * This could be connected to any analytics or monitoring service
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Log the metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals]', body);
    }

    // In production, you would typically send this data to:
    // 1. Google Analytics 4
    // 2. Your own analytics/monitoring service
    // 3. A database for later analysis

    // Example: you could store these in a database
    // if (process.env.NODE_ENV === 'production') {
    //   const { name, value, id, page } = body;
    //   await db.insert({ name, value, id, page, timestamp: new Date() }).into('web_vitals');
    // }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving web vitals:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 