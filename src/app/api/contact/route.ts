import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateContactForm, hasErrors } from '@/models/contact';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? '');
  const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL;
  const data = await req.json();

  const errors = validateContactForm(data);
  if (hasErrors(errors)) {
    return NextResponse.json({ error: 'Validation failed', errors }, { status: 400 });
  }

  const name = data.name.trim().slice(0, 100);
  const email = data.email.trim().slice(0, 254);
  const projectType = data.projectType?.trim().slice(0, 100) ?? '';
  const subject = data.subject?.trim().slice(0, 200) ?? 'New contact form submission';
  const message = data.message.trim().slice(0, 5000);

  try {
    await resend.emails.send({
      from: 'BFL Design <noreply@bfl.design>',
      to: [process.env.CONTACT_EMAIL ?? ''],
      subject: `Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\n${message}`,
    });

    if (SLACK_WEBHOOK) {
      await fetch(SLACK_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `New contact from *${name}* (${email})\n*Type:* ${projectType}\n*Subject:* ${subject}\n> ${message.slice(0, 300)}`,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
