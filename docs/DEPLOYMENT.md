# Deployment Guide

## Prerequisites

- Supabase project (free tier works)
- Vercel account (frontend)
- Railway account (backend)

## 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Run `database/schema.sql` in the SQL editor
3. Copy your Project URL and anon key
4. Create an admin user in Authentication > Users

## 2. Backend Deployment (Railway)

1. Push code to GitHub
2. Create new Railway project → Deploy from GitHub repo
3. Set root directory to `/backend`
4. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `CORS_ORIGIN=https://your-frontend.vercel.app`
   - `PORT=4000`
5. Railway auto-detects Node.js and runs `npm start`

## 3. Frontend Deployment (Vercel)

1. Import GitHub repo into Vercel
2. Set root directory to `/frontend`
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-backend.railway.app`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## Environment Variables Reference

See `.env.example` in the repo root for all variables.
