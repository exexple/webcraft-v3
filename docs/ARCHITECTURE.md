# Webcraft Studio — Architecture

## Overview

A full-stack digital agency website with a Next.js frontend, Fastify REST API backend, and Supabase (PostgreSQL) database.

## Stack

| Layer      | Technology                         |
|------------|-------------------------------------|
| Frontend   | Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion |
| Backend    | Node.js, Fastify, TypeScript, Zod   |
| Database   | Supabase (PostgreSQL)               |
| Auth       | Supabase Auth (JWT)                 |
| Hosting    | Vercel (frontend), Railway (backend) |

## Directory Structure

```
webcraft-v3/
├── frontend/           # Next.js application
│   ├── app/            # App Router pages
│   ├── components/     # Reusable components
│   └── lib/            # Utilities and clients
├── backend/            # Fastify REST API
│   └── src/
│       ├── routes/     # API route handlers
│       ├── middleware/  # Auth middleware
│       ├── services/    # Supabase client
│       └── types/      # TypeScript types
├── database/           # SQL schema and seeds
└── docs/               # Documentation
```

## Data Flow

1. User submits contact form on frontend
2. Frontend validates fields client-side
3. POST /api/contact to backend
4. Backend validates with Zod, stores in Supabase leads table
5. Admin logs into /admin with Supabase Auth
6. Admin fetches leads via GET /api/leads (JWT protected)
7. Admin updates lead status / adds notes via PATCH /api/leads/:id

## Security

- Rate limiting: 100 req/min per IP
- Input validation: Zod schemas on all inputs
- Authentication: Supabase JWT tokens
- Row Level Security (RLS) on all tables
- Environment variables for all secrets
- Soft deletes (deleted_at) for leads
