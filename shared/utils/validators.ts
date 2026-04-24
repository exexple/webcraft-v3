// Shared validation helpers
// ============================================================
import { createHash, randomUUID } from 'node:crypto';

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^\+?[\d\s\-()]{7,20}$/.test(phone);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function hashIp(ip: string): string {
  // Use SHA-256 for secure, non-reversible IP anonymization
  const salt = process.env.IP_HASH_SALT || 'webcraft-studio-salt';
  return createHash('sha256')
    .update(ip + salt)
    .digest('hex')
    .substring(0, 16); // 64-bit equivalent for storage efficiency
}

export function generateSessionId(): string {
  return `ws_${randomUUID()}`;
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
}
