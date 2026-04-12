import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set. Contact form inserts will fail.');
} else if (process.env.NODE_ENV !== 'production') {
  console.log('Supabase client initialized with service role key.');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
