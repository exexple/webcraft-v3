import { FastifyRequest, FastifyReply } from 'fastify'

export async function verifyAuth(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return reply.status(401).send({ error: 'No token provided' })
    }

    await request.jwtVerify()

  } catch (err) {
    return reply.status(401).send({ error: 'Unauthorized' })
  }
}
