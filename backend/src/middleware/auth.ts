import { FastifyRequest, FastifyReply } from 'fastify';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

export async function verifyAuth(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
  );
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return reply.status(401).send({ error: 'Invalid or expired token' });
  }
  (request as FastifyRequest & { user: typeof user }).user = user;
}
