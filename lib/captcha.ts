import { createHmac, timingSafeEqual } from 'crypto';

type CaptchaOp = '+' | '-' | '*';

interface CaptchaPayload {
  a: number;
  b: number;
  op: CaptchaOp;
  exp: number;
}

const CAPTCHA_TTL_MS = 10 * 60 * 1000;

function base64UrlEncode(input: string): string {
  return Buffer.from(input, 'utf8').toString('base64url');
}

function base64UrlDecode(input: string): string {
  return Buffer.from(input, 'base64url').toString('utf8');
}

function getSecret(): string {
  return process.env.CONTACT_CAPTCHA_SECRET || 'norixis-captcha-secret';
}

function signPayload(payloadB64: string): string {
  return createHmac('sha256', getSecret()).update(payloadB64).digest('base64url');
}

function calculateAnswer(a: number, b: number, op: CaptchaOp): number {
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  return a * b;
}

export function issueCaptchaChallenge() {
  const ops: CaptchaOp[] = ['+', '-', '*'];
  const op = ops[Math.floor(Math.random() * ops.length)];

  let a = 0;
  let b = 0;

  if (op === '*') {
    a = 2 + Math.floor(Math.random() * 10);
    b = 2 + Math.floor(Math.random() * 10);
  } else {
    a = 12 + Math.floor(Math.random() * 78);
    b = 3 + Math.floor(Math.random() * 39);
    if (op === '-' && b > a) {
      [a, b] = [b, a];
    }
  }

  const payload: CaptchaPayload = {
    a,
    b,
    op,
    exp: Date.now() + CAPTCHA_TTL_MS,
  };

  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const signature = signPayload(payloadB64);

  return {
    token: `${payloadB64}.${signature}`,
    question: `What is ${a} ${op} ${b}?`,
  };
}

export function verifyCaptchaChallenge(token: string, answerRaw: string): boolean {
  const [payloadB64, signature] = token.split('.');
  if (!payloadB64 || !signature) {
    return false;
  }

  const expectedSig = signPayload(payloadB64);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSig);
  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }
  if (!timingSafeEqual(actualBuffer, expectedBuffer)) {
    return false;
  }

  let payload: CaptchaPayload;
  try {
    payload = JSON.parse(base64UrlDecode(payloadB64)) as CaptchaPayload;
  } catch {
    return false;
  }

  if (!payload || payload.exp < Date.now()) {
    return false;
  }

  const answer = Number(answerRaw);
  if (!Number.isFinite(answer)) {
    return false;
  }

  return answer === calculateAnswer(payload.a, payload.b, payload.op);
}
