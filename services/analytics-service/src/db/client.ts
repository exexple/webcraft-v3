// ============================================================
// Analytics Service — Database Client 
// ============================================================

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';
import { setDefaultResultOrder } from 'node:dns';

// Force IPv4 (safe for Render free tier)
setDefaultResultOrder('ipv4first');

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Correct config for Supabase + PgBouncer + postgres-js
const sql = postgres(process.env.DATABASE_URL, {
  ssl: {
    rejectUnauthorized: false, // 🔥 CRITICAL FIX
  },
  prepare: false,              // required for pooler
  max: 5,                      // free tier friendly
  idle_timeout: 30,
  connect_timeout: 15,
  onnotice: () => {},
});

// Optional debug (remove later)
sql`SELECT 1`
  .then(() => console.log("✅ DB CONNECTED"))
  .catch(err => console.error("❌ DB ERROR:", err));

export const db = drizzle(sql, { schema });
