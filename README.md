# Legpro Solutions

Modern corporate website for **Legpro Consultants Private Limited** — recruitment, staffing, training, and job portal (Phase 1).

## Stack

- **Frontend:** Next.js 15, React, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (contact form; optional for Phase 1)

## Project structure

```
legpro-solutions/
├── apps/web/          # Next.js marketing site + /jobs
├── apps/api/          # Express REST API
└── content/site.json  # Marketing copy (from legpro.co.in)
```

## Quick start

### Prerequisites

- Node.js 18+
- MongoDB (optional — API works without DB for jobs stub; contact logs to console)

### Install

```bash
cd C:\Users\RITS\Projects\legpro-solutions
npm install
```

### Environment

```bash
copy apps\api\.env.example apps\api\.env
copy apps\web\.env.local.example apps\web\.env.local
```

### Run (both apps)

```bash
npm run dev
```

- **Website:** http://localhost:3000
- **API:** http://localhost:4000

### Run separately

```bash
npm run dev:web   # port 3000
npm run dev:api   # port 4000
```

## API endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/v1/contact` | Submit contact form |
| GET | `/api/v1/jobs` | List jobs (stub data, filterable) |
| GET | `/api/v1/jobs/:id` | Job detail |

## Deployment

- **Frontend:** Vercel — root directory `apps/web`
- **Backend:** Render or AWS — root `apps/api`, set `MONGODB_URI` and `CORS_ORIGIN`

## Phase 2 (planned)

- Admin dashboard
- Dynamic jobs from MongoDB
- Resume upload
- Blog/CMS
- Authentication
