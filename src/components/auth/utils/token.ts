import { createHmac, randomBytes } from 'crypto';
import { env } from '../../../config/env';

export interface TokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

const ALGORITHM = 'sha256';

const getJwtSecret = (): string => {
  return env.JWT_SECRET;
};

const base64UrlEncode = (data: string | Buffer): string => {
  const base64 = Buffer.isBuffer(data)
    ? data.toString('base64')
    : Buffer.from(data).toString('base64');
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

const base64UrlDecode = (data: string): string => {
  const base64 = data.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  return Buffer.from(base64 + padding, 'base64').toString('utf-8');
};

const createSignature = (data: string, secret: string): string => {
  return base64UrlEncode(createHmac(ALGORITHM, secret).update(data).digest());
};

export const generateToken = (
  userId: string,
  email: string,
  expiresInSeconds: number = env.JWT_EXPIRES_IN
): string => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = {
    userId,
    email,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const signature = createSignature(dataToSign, getJwtSecret());

  return `${dataToSign}.${signature}`;
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const [encodedHeader, encodedPayload, signature] = parts;
    
    if (!encodedHeader || !encodedPayload || !signature) {
      return null;
    }
    
    const dataToVerify = `${encodedHeader}.${encodedPayload}`;

    // Verify signature
    const expectedSignature = createSignature(dataToVerify, getJwtSecret());
    if (signature !== expectedSignature) {
      return null;
    }

    // Decode payload
    const payload: TokenPayload = JSON.parse(base64UrlDecode(encodedPayload));

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
};

export const generateRefreshToken = (): string => {
  return randomBytes(40).toString('hex');
};
