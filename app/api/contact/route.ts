import { NextResponse } from 'next/server';
import { verifyCaptchaChallenge } from '@/lib/captcha';

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  captchaAnswer: string;
  captchaToken: string;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<ContactPayload>;
    const name = body.name?.trim() || '';
    const email = body.email?.trim() || '';
    const subject = body.subject?.trim() || '';
    const message = body.message?.trim() || '';
    const captchaAnswer = body.captchaAnswer?.trim() || '';
    const captchaToken = body.captchaToken?.trim() || '';

    if (!name || !email || !subject || !message || !captchaAnswer || !captchaToken) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    if (!verifyCaptchaChallenge(captchaToken, captchaAnswer)) {
      return NextResponse.json(
        {
          error: 'Captcha verification failed.',
          userMessage: 'Captcha check failed or expired. Please solve the new challenge and try again.',
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const toEmail = process.env.BREVO_TO_EMAIL;
    const fromEmail = process.env.BREVO_FROM_EMAIL;
    const fromName = process.env.BREVO_FROM_NAME || 'Norixis Website';

    if (!apiKey || !toEmail || !fromEmail) {
      return NextResponse.json(
        { error: 'Email service is not configured. Please set BREVO_* env vars.' },
        { status: 500 }
      );
    }

    const htmlContent = `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br />')}</p>
    `;

    const textContent = `New Contact Request
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
`;

    const brevoResp = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { email: fromEmail, name: fromName },
        to: [{ email: toEmail }],
        replyTo: { email, name },
        subject: `[Norixis Contact] ${subject}`,
        htmlContent,
        textContent,
      }),
      cache: 'no-store',
    });

    if (!brevoResp.ok) {
      const brevoError = await brevoResp.text();
      let brevoMessage = '';
      try {
        const parsed = JSON.parse(brevoError) as { message?: string; code?: string };
        brevoMessage = parsed.message || parsed.code || '';
      } catch {
        brevoMessage = brevoError;
      }

      let userMessage = 'We could not send your message right now. Please try again in a few minutes.';
      if (brevoResp.status === 401 || brevoResp.status === 403) {
        userMessage = 'Our email service is temporarily unavailable. Please contact us again shortly.';
      } else if (brevoResp.status === 429) {
        userMessage = 'Too many requests right now. Please try again in a minute.';
      } else if (brevoResp.status === 400 && /sender|replyTo|email/i.test(brevoMessage)) {
        userMessage = 'We could not validate email settings right now. Please try again later.';
      }

      console.error('Brevo send failed', {
        status: brevoResp.status,
        message: brevoMessage || brevoError,
      });

      return NextResponse.json(
        { error: 'Brevo send failed.', userMessage, details: brevoMessage || brevoError },
        { status: 502 }
      );
    }

    const brevoData = (await brevoResp.json().catch(() => ({}))) as { messageId?: string };
    if (brevoData?.messageId) {
      console.log('Brevo send accepted', { messageId: brevoData.messageId, toEmail });
    }

    return NextResponse.json({ ok: true, messageId: brevoData?.messageId || null });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Unexpected server error.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
