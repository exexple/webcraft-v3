# Webcraft Studio API Documentation

Base URL: `http://localhost:4000` (development) | `https://api.webcraftstudio.com` (production)

## Authentication

Protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <supabase_jwt_token>
```

## Endpoints

### Public

#### POST /api/contact
Submit a contact form.

**Request Body:**
```json
{
  "name": "string (required, min 2 chars)",
  "email": "string (required, valid email)",
  "message": "string (required, min 10 chars)",
  "phone": "string (optional)"
}
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "message": "string",
    "status": "new",
    "created_at": "timestamp"
  }
}
```

#### POST /api/auth/login
Admin login.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response 200:**
```json
{
  "data": {
    "session": { "access_token": "jwt_token", "..." : "..." },
    "user": { "...": "..." }
  }
}
```

### Protected (requires Bearer token)

#### GET /api/leads
Get paginated leads list.

**Query Parameters:**
- `status` - Filter by status (new|contacted|qualified|closed|converted)
- `search` - Search by name or email
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)

**Response 200:**
```json
{
  "data": [],
  "total": 42,
  "page": 1,
  "limit": 20
}
```

#### GET /api/leads/:id
Get single lead with interactions.

#### PATCH /api/leads/:id
Update lead status.

**Request Body:**
```json
{
  "status": "contacted"
}
```

#### DELETE /api/leads/:id
Soft-delete a lead.

#### POST /api/interactions
Add an interaction note to a lead.

**Request Body:**
```json
{
  "lead_id": "uuid",
  "note": "string",
  "type": "call|whatsapp|email|meeting"
}
```

#### GET /health
Health check endpoint.
