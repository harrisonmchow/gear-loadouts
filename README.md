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
│   └── api/                      # Route handlers
│       ├── auth/                 # NextAuth endpoints
│       ├── loadout/              # Loadout CRUD
│       ├── gear/                 # Gear search & ownership
│       ├── upgrades/             # Upgrade graph data
│       ├── marketplace/          # Deal listings
│       ├── watchlist/            # Watchlist management
│       ├── notifications/        # Push subscription
│       └── cron/                 # Scheduled deal checking
├── components/
│   ├── nav/                      # Top navigation bar
│   ├── loadout/                  # Loadout cards, gear slots, stats
│   ├── upgrades/                 # React Flow graph, nodes, edges
│   ├── marketplace/              # Deal cards, watchlist, price history
│   ├── profile/                  # Profile header, gear collection, follows
│   └── shared/                   # Gear compare modal, reviews, star rating
├── lib/
│   ├── prisma.ts                 # Prisma client
│   ├── auth.ts                   # Auth configuration
│   ├── scrapers/                 # AU retailer scrapers
│   ├── upgrade-graph.ts          # DAG logic & preference filtering
│   ├── deal-detector.ts          # Deal detection logic
│   └── push-notifications.ts     # Web push utilities
├── prisma/
│   └── schema.prisma             # Database schema
├── public/
│   └── sw.js                     # Service worker for push notifications
└── types/
    └── index.ts                  # Shared TypeScript types
```

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

   Required variables:
   - `DATABASE_URL` — PostgreSQL connection string
   - `NEXTAUTH_SECRET` — Auth secret key
   - `NEXTAUTH_URL` — App URL (http://localhost:3000 for dev)
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth
   - `SUPABASE_URL` / `SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` — Supabase
   - `VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` / `VAPID_EMAIL` — Push notifications
   - `RESEND_API_KEY` — Email
   - `CRON_SECRET` — Cron job auth

4. Set up the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).
