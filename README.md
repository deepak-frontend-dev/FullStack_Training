# Movie Management System (Training Monorepo)

This repository is a **deliberately imperfect** full-stack project for training junior developers.

It is designed to:

- run successfully
- feel realistic
- contain technical debt, bugs, and weak patterns that students should improve

## Project Structure

```text
project-root/
  backend/
    prisma/
      schema.prisma
    src/
      index.js
      prisma.js
    .env.example
    package.json
  frontend/
    app/
      dashboard/page.js
      login/page.js
      movies/page.js
      globals.css
      layout.js
      page.js
    components/
      MovieCard.js
      Providers.js
    context/
      AuthContext.js
    lib/
      api.js
    store/
      index.js
      slices/movieSlice.js
    next.config.js
    package.json
    postcss.config.js
    tailwind.config.js
  PHASE_GUIDE.md
  README.md
```

## Tech Stack

- Backend: Node.js, Express, Prisma, MySQL
- Frontend: Next.js (App Router), Tailwind CSS, Context API, Redux Toolkit

## Setup

## 1) Backend setup

```bash
cd backend
npm install
copy .env.example .env
```

Update `.env` values as needed, then:

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Backend runs at `http://localhost:5000`.

## 2) Frontend setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

## 3) Quick test flow

1. Open `http://localhost:3000/movies`
2. Add a movie from UI
3. (Optional) Use Postman/Insomnia:
   - `POST /api/movies/sync` with `{ "keyword": "batman" }`
   - `POST /api/auth/register`
   - `POST /api/auth/login`
4. Open `http://localhost:3000/dashboard`

## Phase Design

- **Phase 1 (Beginner Day 1)**: Basic API + static-ish frontend + minimal structure
- **Phase 2 (Day 2-3)**: Prisma + movie sync + real API data + small bugs
- **Phase 3 (Day 4-5)**: Auth + protected route concept + security mistakes
- **Phase 4 (Day 6-7)**: Stabilization targets (validation, errors, architecture, UX/state)

See `PHASE_GUIDE.md` for mentor instructions.

## Intentionally Wrong Areas

### Backend

- Logic is inside route handlers instead of service layers
- Missing validation in several endpoints
- Missing try/catch in routes like sync and auth
- Duplicate inserts possible during movie sync
- Missing `await` in sync insert path
- Plain text password storage
- Incorrect HTTP status codes in some responses

### Frontend

- API calls directly inside page components
- No consistent loading/error states
- Repeated UI logic instead of reusable patterns
- Mixed/unclear state ownership (Context + Redux + local state)
- Dashboard route is not truly protected at routing level

This is intentional for training purposes.

## Backend Concepts Coverage (Training Checklist)

The backend already contains some code for many of these items, but it does not fully implement them all yet.

### Presence (concept exists in some form)
- Basic Server Setup: Present (Express app + `express.json()` + `cors()` in `backend/src/index.js`).
- Express Server Routes: Present (there are multiple routes, not just 3: health, movies, auth, sync).
- Database Setup (Prisma + Movie model): Present (`backend/prisma/schema.prisma` includes `Movie` and `User`).
- API Sync (fetch external API and store in DB): Present (`POST /api/movies/sync` calls OMDb and writes to `prisma.movie`).
- Authentication (register/login with JWT): Present (`/api/auth/register`, `/api/auth/login`, JWT signing).
- Protected Routes: Present in part (JWT middleware exists and is used for `/api/auth/me`).
- Environment Config (`.env` variables): Present (`dotenv.config()` and `backend/.env.example`).
- CRUD APIs: Present in part (`GET /api/movies`, `POST /api/movies`, `PUT /api/movies/:id`, `DELETE /api/movies/:id`).

### Not covered yet (left for you to implement)
- Project Structure (routes/controllers/services refactor): Not present (logic currently lives in `backend/src/index.js`).
- Cron Job (run sync periodically): Not present.
- Validation (request validation): Not present (there are TODOs noting missing validation).
- Error Handling (global error handler): Not present (no centralized error middleware).
- Protected Routes (secure movie endpoints): Not present (movie routes are not protected by auth middleware).
- Pagination and Search (query + limits/offset): Not present.
- CRUD completeness + consistency: Not fully covered (e.g., missing `GET /api/movies/:id`, and response codes are inconsistent).
- Standard Response Format (consistent API envelope): Not present (responses vary between arrays/objects/messages).

## Frontend Concepts Coverage (Training Checklist)

The frontend already has some code that demonstrates most concepts, but a few are missing or only partially shown.

### Presence (concept exists in some form)
- JS Basics: Present (basic state + rendering patterns in `frontend/app/movies/page.js`).
- Async JS: Present (client-side `fetch`/async API calls in `frontend/app/movies/page.js` and `frontend/lib/api.js`).
- React Basics: Present (pages/components like `frontend/components/MovieCard.js`).
- React Hooks: Present (usage of `useState`/`useEffect` in multiple pages).
- Next.js Setup: Present (Next app with `frontend/app/` router).
- Next Routing: Present (file-based routes exist for `/`, `/movies`, `/login`, `/dashboard`).
- Tailwind Setup: Present (`frontend/tailwind.config.js` and `frontend/app/globals.css`).
- UI Components: Present (`frontend/components/MovieCard.js`, plus `frontend/components/Providers.js`).
- API Integration: Present (`frontend/lib/api.js` and `fetch` calls from pages).
- CSR Implementation: Present (`"use client"` pages fetching data in the browser).
- SSR Implementation: Present in concept only (not implemented as an SSR data-fetching example).
- Context API: Present (`frontend/context/AuthContext.js`).
- Redux Basics: Present (`frontend/store/index.js` and `frontend/store/slices/movieSlice.js`).
- Authentication UI: Present (`frontend/app/login/page.js` + dashboard logout via context).
- Protected Routes: Present in part (dashboard uses the token in context, but there is no real route protection).
- Forms & Validation: Present but weak (login form exists, but validation is TODO/insufficient).
- Responsive Design: Partial (Tailwind is used, but there are no explicit responsive breakpoint patterns like `sm:`/`md:`).
- Error Handling: Partial (some basic messaging exists, but loading/error handling is missing for key flows).

### Not covered yet (left for you to implement)
- Next Routing (dynamic routes): Not present (no `[id]`-style routes in `frontend/app/`).
- SSR Implementation (example): Not present (no server-side data fetching pattern implemented in pages).
- Protected Routes (real enforcement): Not present (no middleware/guard logic to restrict pages).
- Forms & Validation (proper validation): Not present (TODO-level validation gaps remain).
- Error Handling (loading + error states): Not present consistently (movies/dashboard UI includes TODOs for this).
- Responsive Design (mobile-friendly patterns): Not present explicitly (no breakpoint-driven layout examples).
