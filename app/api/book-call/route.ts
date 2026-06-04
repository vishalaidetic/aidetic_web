import { NextRequest, NextResponse } from 'next/server'
import { insertMeetingRequest } from '@/lib/db/meeting_queries'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, organization, purpose } = body

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
      organization,
      purpose,
    })

    // 2. Send email notification via SMTP
    // You must configure these environment variables in your .env.local
    const smtpHost = process.env.SMTP_HOST || ''
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587
    const smtpUser = process.env.SMTP_USER || ''
    const smtpPass = process.env.SMTP_PASS || ''
    const notifyEmail = process.env.NOTIFY_EMAIL || smtpUser

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })

      const mailOptions = {
        from: `"Aidetic Website" <${smtpUser}>`,
        to: notifyEmail,
        subject: `New Meeting Request from ${name}`,
        text: `
You have a new "Request a Call" request!

Name: ${name}
Email: ${email}
Organization: ${organization}
Purpose: ${purpose}
        `,
        html: `
          <h3>New "Request a Call" Request</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Organization:</strong> ${organization}</p>
          <p><strong>Purpose:</strong> ${purpose}</p>
        `,
      }

      await transporter.sendMail(mailOptions)
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
