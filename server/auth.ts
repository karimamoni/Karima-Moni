import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET: string = (() => {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET must be set and contain at least 32 characters.');
  }
  return secret;
})();
export const AUTH_COOKIE_NAME = 'km_admin_session';

export interface AdminPayload {
  userId: string;
  email: string;
  role: 'admin';
}

export function hashPassword(plainText: string): string {
  return bcrypt.hashSync(plainText, 10);
}

export function comparePassword(plainText: string, hash: string): boolean {
  return bcrypt.compareSync(plainText, hash);
}

export function generateToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as unknown as AdminPayload;
  } catch {
    return null;
  }
}

export function setAuthCookie(res: Response, token: string): void {
  res.cookie(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  });
}

export function clearAuthCookie(res: Response): void {
  res.clearCookie(AUTH_COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export interface AuthenticatedRequest extends Request {
  user?: AdminPayload;
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  // Check cookie or Bearer token header
  const tokenFromCookie = req.cookies?.[AUTH_COOKIE_NAME];
  const authHeader = req.headers.authorization;
  const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const token = tokenFromCookie || tokenFromHeader;

  if (!token) {
    res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
    return;
  }

  const payload = verifyToken(token);
  if (!payload || payload.role !== 'admin') {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired admin session' });
    return;
  }

  req.user = payload;
  next();
}
