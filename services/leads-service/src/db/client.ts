// ============================================================
// Leads Service — Database Client
// ============================================================

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Supabase requires:
// - ssl: 'require' in production (their servers enforce TLS)
// - prepare: false when using PgBouncer pooling (Transaction/Session mode)
// - idle_timeout: keep connections alive to avoid cold-start reconnects
const sql = postgres(process.env.DATABASE_URL, {
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
  prepare: false,  // Required for Supabase PgBouncer compatibility
  max: 5,
  idle_timeout: 30,
  connect_timeout: 15,
  onnotice: () => {},  // Suppress Supabase notice messages
});

export const db = drizzle(sql, { schema });
