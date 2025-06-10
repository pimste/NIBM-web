import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key directly for testing
const resend = new Resend('re_R3BhHz6f_Kr1D6LEJXJ3sfWbeK3cyUdPh');

export async function POST(request: Request) {
  try {
    // Parse incoming form data
    const formData = await request.json();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format HTML content for the email
    const htmlContent = `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
      <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${formData.subject || 'Not provided'}</p>
      <h2>Message:</h2>
      <p>${formData.message}</p>
    `;

    console.log('Sending email with Resend...');
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'NIBM Tower Cranes <onboarding@resend.dev>',
      to: ['gid.gehlen@nibmtowercranes.com'],
      subject: `New Contact Form: ${formData.subject || 'Website Inquiry'}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);
    
    return NextResponse.json({ 
      success: true,
      message: 'Your message has been sent successfully',
      data: data
    });
    
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 