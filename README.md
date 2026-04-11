# Webcraft Studio

> A complete, production-ready digital agency website built with Next.js 14, Fastify, and Supabase.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Fastify](https://img.shields.io/badge/Fastify-4-000000?logo=fastify)](https://fastify.io/)

## ✨ Features

- 🎨 **Premium Design** — Dark mode by default, cyan/violet accent, Framer Motion animations
- 📱 **Fully Responsive** — Mobile-first, hamburger nav, works on all devices
- 📝 **Contact Form** — Validated form with WhatsApp & phone CTAs
- 🔒 **Admin Dashboard** — Protected lead management with Supabase Auth
- 📊 **Lead Management** — Status tracking, search, filter, CSV export
- ⚡ **Performance Optimized** — Next.js App Router, server components, lazy loading
- 🛡️ **Secure API** — Rate limiting, Zod validation, JWT auth, Row Level Security

## 🗂️ Project Structure

```
webcraft-v3/
├── frontend/          # Next.js 14 App Router
│   ├── app/           # Pages and routes
│   ├── components/    # Reusable components
│   └── lib/           # Utilities and clients
├── backend/           # Fastify REST API
│   └── src/           # Routes, middleware, services
├── database/          # Supabase SQL schema
└── docs/              # Documentation
```

## 🚀 Quick Start

See [docs/SETUP.md](docs/SETUP.md) for full local development setup.

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend  
cd backend && npm install && npm run dev
```

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Home with hero, stats, services, testimonials |
| `/services` | Full services breakdown |
| `/case-studies` | Portfolio with results |
| `/about` | Team and company values |
| `/process` | Step-by-step workflow |
| `/testimonials` | Client reviews |
| `/pricing` | Transparent pricing tiers |
| `/contact` | Contact form + WhatsApp/phone CTA |
| `/admin` | Protected lead management dashboard |

## 📡 API Endpoints

See [docs/API.md](docs/API.md) for full API documentation.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/contact` | Public | Submit contact form |
| POST | `/api/auth/login` | Public | Admin login |
| GET | `/api/leads` | JWT | List leads |
| PATCH | `/api/leads/:id` | JWT | Update lead |
| POST | `/api/interactions` | JWT | Add note |

## 🛠️ Tech Stack

**Frontend:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, lucide-react, next-themes, Supabase JS

**Backend:** Node.js, Fastify, TypeScript, Zod, Supabase

**Database:** Supabase (PostgreSQL) with Row Level Security

**Deployment:** Vercel (frontend) + Railway (backend)

## 📞 Contact

- Phone/WhatsApp: +91 88223 22905
- Email: hello@webcraftstudio.com

---
update

Built with ❤️ by Webcraft Studio
