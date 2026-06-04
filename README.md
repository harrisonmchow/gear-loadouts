# TrailKit

A Next.js platform for backpackers to showcase gear loadouts, track stats, discover upgrade paths, and find deals on gear. Built for the Australian market, targeting everyone from beginners to ultralight veterans.

## Features

### Gear Loadout Management
- Create and manage multiple named loadouts (e.g. summer vs winter)
- Grid of gear slots across categories: Headtorch, Backpack, Sleeping Pad, Sleeping Bag/Quilt, Shelter
- Swap items in/out with search and filtering
- Track base weight, total cost, and item count
- Side-by-side gear comparison with category-specific rating dimensions

### Upgrade Path Discovery
- Interactive directed acyclic graph (DAG) visualising upgrade relationships between gear
- Edge types: Quality, Value, Alternative, Similar
- Filter by user preferences (price caps, weight limits)
- Terminal nodes marked as "Best in class"
- Click any node for stats, reviews, and watchlist actions

### Marketplace & Deal Finder
- Automated deal detection via scheduled scraping of AU retailers (Snowys, Paddy Pallin, Wildfire Sports, Bogong)
- Deals surfaced when discount is 20% or more off baseline price
- Personal watchlist with configurable price alerts
- Push notifications and email fallback for deal alerts

### Profile & Social
- Gear collection tracking with ownership status (Owned / Sold / Want)
- Ownership-gated reviews with category-specific rating dimensions
- Follow other users and view their public loadouts and reviews
- Profile stats: total items owned, heaviest/lightest loadout, average spend per category

## Tech Stack

### Frontend
- **Next.js 15** (App Router) with **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- **Zustand** (client state) + **TanStack Query v5** (server state/caching)
- **React Flow** (upgrade path DAG) + **Recharts** (stats & radar charts)
- **React Hook Form** + **Zod** (form validation)

### Backend
- **Next.js API Routes** (Route Handlers)
- **Prisma** ORM + **PostgreSQL** (via Supabase)
- **NextAuth.js v5** (credentials + Google OAuth)
- **Supabase Storage** (avatars, gear images)
- **Cheerio** + **Playwright** (AU retailer scraping)
- **web-push** + service worker (push notifications)
- **Resend** (transactional email)
- **Vercel Cron Jobs** (scheduled deal detection)

### Infrastructure
- **Vercel** (hosting)
- **Supabase** (PostgreSQL + Storage)
- **GitHub Actions** (CI/CD)

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Login & signup pages
│   ├── (app)/                    # Protected routes
│   │   ├── loadout/              # Gear loadout management
│   │   ├── upgrades/             # Upgrade path DAG
│   │   ├── marketplace/          # Deal finder
│   │   └── profile/              # User profile & public profiles
│   └── api/                      # Route handlers (thin wrappers only)
│       ├── auth/                 # NextAuth endpoints + signup
│       ├── loadout/              # Loadout CRUD
│       ├── gear/                 # Gear search, ownership, requests
│       ├── upgrades/             # Upgrade graph data
│       ├── marketplace/          # Deal listings
│       ├── watchlist/            # Watchlist management
│       ├── notifications/        # Push subscription
│       └── cron/                 # Scheduled deal checking
├── server/                       # Backend service layer (separation of concerns)
│   ├── services/                 # Business logic & DB access
│   │   ├── auth.service.ts       # Signup logic
│   │   ├── gear.service.ts       # Gear search, ownership
│   │   ├── loadout.service.ts    # Loadout CRUD
│   │   ├── review.service.ts     # Reviews + external review sync
│   │   ├── marketplace.service.ts # Deals, watchlist, deal-check cron
│   │   ├── profile.service.ts    # Profile, follow/unfollow
│   │   ├── notification.service.ts # Push subscription storage
│   │   └── gear-request.service.ts # User gear requests
│   ├── middleware/               # Route handler middleware (HOF composition)
│   │   ├── with-auth.ts          # Require authenticated session
│   │   ├── with-validation.ts    # Zod schema validation + sanitization
│   │   ├── with-error-handling.ts # Catch AppError and map to HTTP responses
│   │   ├── with-cron-auth.ts     # Bearer token + Vercel cron header check
│   │   └── rate-limit.ts         # In-memory sliding window rate limiter
│   └── lib/
│       ├── errors.ts             # AppError, NotFoundError, ForbiddenError, etc.
│       ├── api-response.ts       # successResponse / errorResponse helpers
│       └── sanitize.ts           # Strip HTML tags from string inputs
├── components/
│   ├── items/                    # Item detail sub-components
│   ├── nav/                      # Top navigation bar
│   ├── loadout/                  # Loadout cards, gear slots, stats
│   ├── upgrades/                 # React Flow graph, nodes, edges
│   ├── marketplace/              # Deal cards, watchlist, price history
│   ├── profile/                  # Profile header, gear collection, follows
│   └── shared/                   # Gear compare modal, reviews, star rating
├── hooks/
│   ├── use-gear.ts               # useGearItem, useCategoryItems
│   └── ...                       # Other data-fetching hooks
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   ├── auth.ts                   # NextAuth configuration
│   ├── validators.ts             # Zod schemas (used by routes + forms)
│   ├── scrapers/                 # AU retailer scrapers
│   ├── upgrade-graph.ts          # DAG layout & preference filtering
│   ├── deal-detector.ts          # Deal detection logic
│   └── push-notifications.ts    # Web push utilities
├── middleware.ts                 # Next.js root middleware (auth + security)
├── prisma/
│   └── schema.prisma             # Database schema with indexes
├── public/
│   └── sw.js                     # Service worker for push notifications
└── types/
    └── index.ts                  # Shared TypeScript types
```

## Architecture: Adding a New API Endpoint

All API routes follow a three-layer pattern:

**1. Define a Zod validator** in `lib/validators.ts`:
```ts
export const mySchema = z.object({ field: z.string().min(1) });
```

**2. Implement business logic** in `server/services/my.service.ts`:
```ts
export async function doSomething(userId: string, data: z.infer<typeof mySchema>) {
  // Prisma queries, domain rules, throw AppError subclasses on failure
}
```

**3. Create a thin route handler** in `app/api/my-route/route.ts`:
```ts
export const POST = withErrorHandling(
  withAuth(
    withValidation(mySchema, async (_req, { session, data }) => {
      const result = await doSomething(session.user.id, data);
      return successResponse(result, 201);
    })
  )
);
```

The middleware stack handles auth, validation, sanitization, and error mapping automatically. Route handlers contain no business logic.

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Supabase project)

### Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd gear-loadouts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

   Configure the variables (see [Environment Variables](#environment-variables) below for details).
   At minimum, you need `DATABASE_URL` and `AUTH_SECRET` to run locally.

4. Set up the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

   If making changes to seeded items, run the following:
   
   ```bash
   npx prisma db push    # syncs schema to DB without migrations
   npx prisma db seed    # then reseed
   ```

   To reset the entire DB (Dev only)
   ```bash
   npx prisma migrate reset
   npx prisma db seed    # then reseed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and configure the following:

### Database

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string. Used by Prisma for all DB operations. |

### Auth

| Variable | Description |
|---|---|
| `AUTH_SECRET` | Random secret used by NextAuth.js v5 to sign/encrypt JWTs and session cookies. Generate with `npx auth secret` or `openssl rand -base64 32`. |
| `AUTH_URL` | Base URL of the app. NextAuth uses it for callback URLs and redirects. `http://localhost:3000` locally, your Vercel URL in production. |
| `GOOGLE_CLIENT_ID` | OAuth 2.0 client ID from Google Cloud Console. Enables "Sign in with Google". |
| `GOOGLE_CLIENT_SECRET` | Corresponding secret for Google OAuth. Both ID and secret are required for Google sign-in. |

### Storage

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Your Supabase project URL (e.g. `https://xyz.supabase.co`). Used for file storage (avatars, gear images). |
| `SUPABASE_ANON_KEY` | Public/anon key for client-side Supabase access (row-level security enforced). |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin key that bypasses RLS. Used server-side only for privileged storage operations. |

### Push Notifications

| Variable | Description |
|---|---|
| `VAPID_PUBLIC_KEY` | Public key for Web Push (VAPID protocol). Sent to the browser when subscribing to push notifications. Generate a keypair with `npx web-push generate-vapid-keys`. |
| `VAPID_PRIVATE_KEY` | Private key for signing push messages server-side. Never exposed to the client. |
| `VAPID_EMAIL` | Contact email sent to push services so they can reach you if there's an issue with your push messages. |

### Email

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from [Resend](https://resend.com). Used as a fallback to send deal alert emails when push notifications aren't available. |

### Cron Security

| Variable | Description |
|---|---|
| `CRON_SECRET` | Secret token that Vercel sends in the `Authorization` header when triggering `/api/cron/deal-check`. Prevents unauthorized access to the cron route. |

### Scraping

| Variable | Description |
|---|---|
| `SCRAPER_DELAY_MS` | Delay in milliseconds between scraping requests to retailer sites. Defaults to `2000` to respect rate limits. |

> **Minimum to run locally:** `DATABASE_URL` and `AUTH_SECRET`. Google OAuth, Supabase, VAPID, Resend, and cron variables can be left empty — those features just won't work until configured.
