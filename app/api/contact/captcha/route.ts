import { NextResponse } from 'next/server';
import { issueCaptchaChallenge } from '@/lib/captcha';

export async function GET() {
  const challenge = issueCaptchaChallenge();
  return NextResponse.json(challenge, { status: 200 });
}
