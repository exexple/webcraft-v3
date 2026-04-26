async function proxyRequest(
  request: FastifyRequest,
  reply: FastifyReply,
  targetUrl: string
) {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Forwarded-For': request.ip,
      'X-Request-Id': String(request.id),
    };

    // Forward cookies (still useful)
    if (request.headers.cookie) {
      headers['cookie'] = request.headers.cookie;
    }

    // convert cookie → Authorization header
    const token = request.cookies.wc_admin_token;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const body =
      request.method !== 'GET' && request.method !== 'DELETE'
        ? JSON.stringify(request.body)
        : undefined;

    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
    });

    const data = await response.json();
    return reply.status(response.status).send(data);
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Service unavailable';
    return reply.status(503).send({ success: false, error });
  }
}
