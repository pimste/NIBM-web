import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting (simple in-memory store)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];
  
  // Remove old requests outside the window
  const validRequests = userRequests.filter((time: number) => now - time < RATE_LIMIT_WINDOW);
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  return false;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    
    // Check rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse incoming form data
    const formData = await request.json();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: formData.phone ? sanitizeInput(formData.phone) : '',
      company: formData.company ? sanitizeInput(formData.company) : '',
      subject: formData.subject ? sanitizeInput(formData.subject) : '',
      message: sanitizeInput(formData.message),
      craneModel: formData.craneModel ? sanitizeInput(formData.craneModel) : '',
      inquiryType: formData.inquiryType ? sanitizeInput(formData.inquiryType) : 'General Inquiry'
    };

    // Validate message length
    if (sanitizedData.message.length > 5000) {
      return NextResponse.json(
        { error: 'Message is too long. Please keep it under 5000 characters.' },
        { status: 400 }
      );
    }

    // Format HTML content for the email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission - NIBM Tower Cranes</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background-color: #0F172A; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #0F172A; }
            .value { margin-left: 10px; }
            .message-box { background-color: white; padding: 15px; border-left: 4px solid #0F172A; margin-top: 20px; }
            .footer { padding: 10px; font-size: 12px; color: #666; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🏗️ New Contact Form Submission</h1>
            <p>NIBM Tower Cranes Website</p>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="label">👤 Name:</span>
              <span class="value">${sanitizedData.name}</span>
            </div>
            
            <div class="field">
              <span class="label">📧 Email:</span>
              <span class="value">${sanitizedData.email}</span>
            </div>
            
            ${sanitizedData.phone ? `
            <div class="field">
              <span class="label">📞 Phone:</span>
              <span class="value">${sanitizedData.phone}</span>
            </div>
            ` : ''}
            
            ${sanitizedData.company ? `
            <div class="field">
              <span class="label">🏢 Company:</span>
              <span class="value">${sanitizedData.company}</span>
            </div>
            ` : ''}
            
            ${sanitizedData.craneModel ? `
            <div class="field">
              <span class="label">🏗️ Crane Model:</span>
              <span class="value">${sanitizedData.craneModel}</span>
            </div>
            ` : ''}
            
            <div class="field">
              <span class="label">📋 Inquiry Type:</span>
              <span class="value">${sanitizedData.inquiryType}</span>
            </div>
            
            <div class="field">
              <span class="label">📝 Subject:</span>
              <span class="value">${sanitizedData.subject || 'Website Inquiry'}</span>
            </div>
            
            <div class="message-box">
              <div class="label">💬 Message:</div>
              <div style="margin-top: 10px; white-space: pre-wrap;">${sanitizedData.message}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This email was sent from the NIBM Tower Cranes website contact form.</p>
            <p>Received on: ${new Date().toLocaleString('en-NL', { timeZone: 'Europe/Amsterdam' })}</p>
          </div>
        </body>
      </html>
    `;

    console.log('Sending email with Resend...');
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `NIBM Tower Cranes <${process.env.RESEND_FROM_EMAIL || 'noreply@nibmvb.eu'}>`,
      to: [process.env.RESEND_TO_EMAIL || 'gid.gehlen@nibmtowercranes.com'],
      subject: `🏗️ ${sanitizedData.inquiryType}: ${sanitizedData.subject || 'Website Contact'} - ${sanitizedData.name}`,
      html: htmlContent,
      // Add reply-to so you can reply directly to the customer
      replyTo: sanitizedData.email,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data?.id);
    
    return NextResponse.json({ 
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
    });
    
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
} 