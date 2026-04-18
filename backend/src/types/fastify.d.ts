import '@fastify/jwt'

declare module 'fastify' {
  interface FastifyRequest {
    jwtVerify: () => Promise<void>
  }
}
