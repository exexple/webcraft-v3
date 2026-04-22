import { FastifyRequest, FastifyReply } from 'fastify'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
)

export async function verifyAuth(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization

    //  No header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.status(401).send({ error: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]

    //  No token extracted
    if (!token) {
      return reply.status(401).send({ error: 'Invalid token format' })
    }

    //  Verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data?.user) {
      console.error('JWT ERROR:', error) 
      return reply.status(401).send({ error: 'Invalid or expired token' })
    }

    //  Attach user to request
    ;(request as any).user = data.user

  } catch (err) {
    console.error('AUTH MIDDLEWARE ERROR:', err) 
    return reply.status(401).send({ error: 'Unauthorized' })
  }
}
