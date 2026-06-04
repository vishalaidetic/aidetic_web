import { NextRequest, NextResponse } from 'next/server'
import { insertMeetingRequest } from '@/lib/db/meeting_queries'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, organization, purpose } = body

    if (!name || !email || !organization || !purpose) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 1. Insert into database
    await insertMeetingRequest({
      name,
      email,
      phone: phone || null,
      organization,
      purpose,
    })

    // 2. Send email notification via SMTP
    const smtpHost = process.env.SMTP_HOST || ''
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587
    const smtpUser = process.env.SMTP_USER || ''
    const smtpPass = process.env.SMTP_PASS || ''
    const notifyEmail = process.env.NOTIFY_EMAIL || smtpUser

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      })

      await transporter.sendMail({
        from: `"Aidetic Website" <${smtpUser}>`,
        to: notifyEmail,
        subject: `New Meeting Request from ${name} — ${organization}`,
        text: `
You have a new "Request a Call" submission!

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Organization: ${organization}
Purpose: ${purpose}
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #533afd, #1B2340); padding: 24px 28px;">
              <h2 style="color: #fff; margin: 0; font-size: 20px;">New Meeting Request</h2>
              <p style="color: rgba(255,255,255,0.75); margin: 4px 0 0; font-size: 13px;">Submitted via aidetic.ai</p>
            </div>
            <div style="padding: 24px 28px; background: #fff;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #0d253d;">${name}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Email</td><td style="padding: 8px 0; font-weight: 600; color: #0d253d;"><a href="mailto:${email}" style="color: #533afd;">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Phone</td><td style="padding: 8px 0; font-weight: 600; color: #0d253d;">${phone || '—'}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Organization</td><td style="padding: 8px 0; font-weight: 600; color: #0d253d;">${organization}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; vertical-align: top;">Purpose</td><td style="padding: 8px 0; color: #0d253d;">${purpose}</td></tr>
              </table>
            </div>
          </div>
        `,
      })
    } else {
      console.warn('SMTP credentials not configured. Skipping email notification.')
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error in /api/book-call:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
