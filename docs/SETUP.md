# Local Development Setup

## Prerequisites

- Node.js 18+
- npm 9+
- Supabase account (or local Supabase via Docker)

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/your-org/webcraft-v3.git
cd webcraft-v3
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

For frontend:
```bash
cp frontend/.env.example frontend/.env.local
```

For backend:
```bash
cp backend/.env.example backend/.env
```

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

### 4. Start Backend

```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:4000
```

### 5. Database Setup

1. Create a Supabase project
2. Run `database/schema.sql` in the Supabase SQL editor
3. Optionally run `database/seed.sql` for sample data

## Development URLs

| Service   | URL                          |
|-----------|-------------------------------|
| Frontend  | http://localhost:3000         |
| Backend   | http://localhost:4000         |
| Admin     | http://localhost:3000/admin   |
| API Health| http://localhost:4000/health  |
