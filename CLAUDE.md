# TrailKit — Full Stack App Specification

## Project Overview

**TrailKit** is a Next.js platform for backpackers to showcase gear loadouts, track stats, discover upgrade paths, and find deals on gear. Users range from beginners to ultralight veterans.

---

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Zustand (client state) + TanStack Query v5 (server state/caching)
- **Data Visualization**: React Flow (DAG for upgrade path), Recharts (stats)
- **Forms**: React Hook Form + Zod
- **Notifications**: Web Push API (via `web-push` library)

### Backend
- **Runtime**: Next.js API Routes / Route Handlers (App Router)
- **Database ORM**: Prisma
- **Database**: PostgreSQL (via Supabase or Neon)
- **Auth**: NextAuth.js v5 (Auth.js) with credentials + OAuth (Google)
- **File Storage**: Supabase Storage or AWS S3 (avatars, gear images)
- **Background Jobs**: Vercel Cron Jobs (deal detection polling)
- **Web Scraping / Price Tracking**: Cheerio + Playwright (server-side, for AU marketplace scraping)
- **Push Notifications**: `web-push` + service worker
- **Email**: Resend (transactional emails, deal alerts fallback)

### Infrastructure
- **Hosting**: Vercel
- **DB**: Supabase (PostgreSQL + Storage)
- **CI/CD**: GitHub Actions

---

## Project Structure

```
/
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (app)/                    # Protected routes
│   │   ├── layout.tsx            # Top nav + auth guard
│   │   ├── loadout/page.tsx      # Page 1: Current gear loadout
│   │   ├── upgrades/page.tsx     # Page 2: Upgrade path DAG
│   │   ├── marketplace/page.tsx  # Page 3: Deal finder
│   │   └── profile/
│   │       ├── page.tsx          # Own profile
│   │       └── [username]/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── loadout/route.ts
│       ├── gear/route.ts
│       ├── upgrades/route.ts
│       ├── marketplace/route.ts
│       ├── watchlist/route.ts
│       ├── notifications/subscribe/route.ts
│       └── cron/deal-check/route.ts
├── components/
│   ├── nav/TopNav.tsx
│   ├── loadout/
│   │   ├── LoadoutCard.tsx
│   │   ├── GearSlot.tsx
│   │   ├── LoadoutStats.tsx
│   │   └── SubstituteModal.tsx
│   ├── upgrades/
│   │   ├── UpgradeGraph.tsx      # React Flow DAG
│   │   ├── GearNode.tsx
│   │   └── UpgradeEdge.tsx
│   ├── marketplace/
│   │   ├── DealCard.tsx
│   │   ├── WatchlistPanel.tsx
│   │   └── PriceHistory.tsx
│   ├── profile/
│   │   ├── ProfileHeader.tsx
│   │   ├── GearCollection.tsx
│   │   └── FollowStats.tsx
│   └── shared/
│       ├── GearCompareModal.tsx
│       ├── ReviewForm.tsx
│       └── StarRating.tsx
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── scrapers/
│   │   ├── wiggle.ts
│   │   ├── snowys.ts
│   │   └── base-scraper.ts
│   ├── upgrade-graph.ts          # DAG logic + preference filtering
│   ├── deal-detector.ts
│   └── push-notifications.ts
├── prisma/
│   └── schema.prisma
├── public/
│   └── sw.js                     # Service worker for push notifications
└── types/
    └── index.ts
```

---

## Database Schema (Prisma)

```prisma
// prisma/schema.prisma

model User {
  id               String    @id @default(cuid())
  email            String    @unique
  username         String    @unique
  passwordHash     String?
  avatarUrl        String?
  bio              String?
  region           String    @default("AU")
  preferences      Json?     // { maxTentPrice: 500, weightUnit: "g", ... }
  createdAt        DateTime  @default(now())

  loadouts         Loadout[]
  ownedGear        UserGear[]
  reviews          Review[]
  watchlist        WatchlistItem[]
  followers        Follow[]  @relation("following")
  following        Follow[]  @relation("follower")
  pushSubscription PushSubscription?
}

model Follow {
  followerId  String
  followingId String
  follower    User @relation("follower", fields: [followerId], references: [id])
  following   User @relation("following", fields: [followingId], references: [id])
  @@id([followerId, followingId])
}

model GearCategory {
  id          String  @id @default(cuid())
  name        String  @unique  // "tent", "sleeping_bag", "backpack", "headtorch", "sleeping_pad", "shelter"
  displayName String
  icon        String?
  ratingFields Json   // ["weight", "packability", "waterproofness", ...] — category-specific
  items       GearItem[]
}

model GearItem {
  id           String    @id @default(cuid())
  name         String
  brand        String
  categoryId   String
  category     GearCategory @relation(fields: [categoryId], references: [id])
  weightGrams  Int?
  priceCents   Int?      // in AUD cents
  imageUrl     String?
  specs        Json?     // { loft: "800fp", material: "down", ... }
  isDiscontinued Boolean @default(false)
  createdAt    DateTime  @default(now())

  reviews      Review[]
  loadoutItems LoadoutItem[]
  ownedBy      UserGear[]
  watchlistItems WatchlistItem[]
  upgradesFrom UpgradeEdge[] @relation("from")
  upgradesTo   UpgradeEdge[] @relation("to")
  deals        Deal[]
}

// Directed upgrade graph
model UpgradeEdge {
  id           String   @id @default(cuid())
  fromId       String
  toId         String
  from         GearItem @relation("from", fields: [fromId], references: [id])
  to           GearItem @relation("to", fields: [toId], references: [id])
  edgeType     String   // "quality", "price", "value", "alternative", "similar"
  notes        String?
  @@unique([fromId, toId])
}

model Loadout {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  name      String   @default("My Loadout")
  isActive  Boolean  @default(false)
  createdAt DateTime @default(now())
  items     LoadoutItem[]
}

model LoadoutItem {
  id        String   @id @default(cuid())
  loadoutId String
  loadout   Loadout  @relation(fields: [loadoutId], references: [id])
  gearId    String
  gear      GearItem @relation(fields: [gearId], references: [id])
  slotType  String   // "tent", "sleeping_bag", etc. — matches GearCategory.name
  quantity  Int      @default(1)
  isWorn    Boolean  @default(false) // for base weight calculation
}

model UserGear {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  gearId    String
  gear      GearItem @relation(fields: [gearId], references: [id])
  status    String   // "owned", "sold", "want"
  purchasePrice Int?
  notes     String?
  createdAt DateTime @default(now())
  @@unique([userId, gearId])
}

model Review {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  gearId    String
  gear      GearItem @relation(fields: [gearId], references: [id])
  rating    Int      // 1–5 overall
  ratings   Json     // { weight: 4, packability: 5, waterproofness: 3 } — category-specific
  body      String
  createdAt DateTime @default(now())
  @@unique([userId, gearId]) // one review per owned item
}

model Deal {
  id           String   @id @default(cuid())
  gearId       String
  gear         GearItem @relation(fields: [gearId], references: [id])
  retailerName String
  retailerUrl  String
  priceCents   Int
  normalPrice  Int      // baseline for deal detection
  discountPct  Int      // calculated
  region       String   @default("AU")
  isActive     Boolean  @default(true)
  foundAt      DateTime @default(now())
  expiresAt    DateTime?
}

model WatchlistItem {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  gearId    String
  gear      GearItem @relation(fields: [gearId], references: [id])
  maxPrice  Int?     // alert only below this price
  notified  Boolean  @default(false)
  createdAt DateTime @default(now())
  @@unique([userId, gearId])
}

model PushSubscription {
  id           String @id @default(cuid())
  userId       String @unique
  user         User   @relation(fields: [userId], references: [id])
  endpoint     String
  p256dh       String
  auth         String
}
```

---

## Application Flow

### 1. Auth (login / signup)
- **Route**: `/login`, `/signup`
- NextAuth credentials provider + Google OAuth
- On signup: collect username, region (default AU), upload avatar (stored in Supabase Storage)
- Preferences modal post-signup: `maxTentPrice`, `maxPackWeight`, `weightUnit`, gear style (UL / lightweight / traditional)
- Preferences stored as JSON on `User.preferences`; used to filter upgrade graph

---

### 2. Top Navigation Bar
- **Component**: `TopNav.tsx`
- Routes: **Loadout** | **Upgrades** | **Marketplace** | **Profile**
- Shows avatar, username, notification bell (unread deal count)

---

### 3. Page 1 — Current Gear Loadout (`/loadout`)

**What it shows:**
- User avatar + active loadout name
- Grid of gear slots: Headtorch, Backpack, Sleeping Pad, Sleeping Bag / Quilt, Shelter (tent / hammock / tarp)
- Each slot shows: item name, brand, weight, price, image thumbnail
- Empty slots show an "Add gear" CTA

**Stats bar** (sticky or sidebar):
- Total base weight (g / oz toggle)
- Total cost (AUD)
- Count of items

**Interactions:**
- Click any slot → opens `SubstituteModal`: search gear by category, filter by weight/price, swap item in/out
- "Compare" button on slot → opens `GearCompareModal` to compare two items in the same category side by side (stats table + category-specific ratings)
- Toggle loadout name to rename
- "New Loadout" to create a second loadout (e.g. summer vs winter)

**API routes:**
- `GET /api/loadout` — fetch active loadout with gear items
- `PATCH /api/loadout/[id]` — update slot (swap item)
- `GET /api/gear?category=tent&q=` — search gear for substitution

---

### 4. Page 2 — Upgrade Path (`/upgrades`)

**What it shows:**
- Directed Acyclic Graph (DAG) rendered with **React Flow**
- One subgraph per gear category (tabbed or all visible)
- Current user's item is highlighted (green outline)
- Nodes = gear items; edges = upgrade relationships (labelled by type: Quality / Value / Alternative / Similar)
- Items filtered by user preferences (e.g. price cap → nodes exceeding `maxTentPrice` are greyed out / hidden, togglable)
- Terminal nodes (no outgoing edges) are marked "Best in class" ⭐

**Edge types:**
- `quality` — meaningfully better quality (e.g. Nemo Tensor → Nemo Tensor All-Season)
- `value` — better value for money
- `alternative` — lateral move, different style (e.g. tent → tarp)
- `similar` — marginally better, same category

**Node detail panel** (click a node):
- Item stats, price, weight
- Review summary (avg rating + top review snippet)
- "Add to Watchlist" button
- Link to Marketplace deals

**Preference filter sidebar:**
- Max price per category
- Max weight
- Freestanding only, etc.
- Filters re-run `lib/upgrade-graph.ts` client-side (graph is pre-fetched, filtering is UI-only)

**API routes:**
- `GET /api/upgrades?userId=` — returns full upgrade graph for all categories the user has items in, including neighbour nodes

---

### 5. Page 3 — Marketplace (`/marketplace`)

**Tabs:** All Deals | Watchlist

**All Deals:**
- Card grid of active `Deal` records
- Filter by: category, retailer, discount % threshold
- Each `DealCard` shows: item name, normal price, deal price, discount %, retailer, "Go to deal" link, "Watch" toggle
- Deal cards for items already on user's watchlist are highlighted

**Watchlist tab:**
- Items the user is watching
- Shows latest deal (if any) for each watched item
- "Set price alert" — update `WatchlistItem.maxPrice`
- Remove from watchlist

**Deal Detection (background):**
- Vercel Cron job: `GET /api/cron/deal-check` runs every 4 hours
- `lib/scrapers/` scrapes AU retailers: Snowys, Paddy Pallin, Wildfire Sports, Bogong
- Compares scraped price to `GearItem.priceCents` (normal price baseline)
- If `discount >= 20%`, create/update `Deal` record
- Check `WatchlistItem` for affected gear → if `priceCents <= maxPrice` or deal is ≥ 20% off, send push notification via `lib/push-notifications.ts`
- Service worker (`public/sw.js`) handles push display and click-to-open

**Push notification flow:**
1. On login, browser prompts for notification permission
2. `navigator.serviceWorker` registers `/sw.js`
3. `PushManager.subscribe()` → send subscription to `POST /api/notifications/subscribe`
4. Stored in `PushSubscription` table
5. Cron job queries subscriptions for affected users and calls `web-push.sendNotification()`

**API routes:**
- `GET /api/marketplace/deals` — paginated deal list with filters
- `POST /api/watchlist` — add item to watchlist
- `DELETE /api/watchlist/[id]` — remove
- `PATCH /api/watchlist/[id]` — update max price
- `POST /api/notifications/subscribe` — save push subscription
- `GET /api/cron/deal-check` — protected cron route (Vercel CRON_SECRET header)

---

### 6. Page 4 — Profile (`/profile`, `/profile/[username]`)

**Own profile:**
- Avatar, username, bio (editable inline)
- Follower / following counts + list modal
- **Stats**: total items owned, heaviest / lightest loadout, average spent per category
- **Gear collection**: list of `UserGear` records
  - Each item shows status badge: **Owned** / **Sold** / **Want**
  - "Mark as Sold" removes from Owned, adds sold date
  - "I bought this" → marks as Owned (requires previous `Want` or direct add)
  - Owned items unlock the **Write Review** button for that item
- **Loadouts list**: all named loadouts, quick switch active

**Other user's profile (read-only):**
- Same view but no edit controls
- "Follow" / "Unfollow" button
- See their public loadouts
- See their reviews

**API routes:**
- `GET /api/profile/[username]` — public profile data
- `PATCH /api/profile` — update own avatar/bio/preferences
- `POST /api/gear/own` — add item to user's collection
- `PATCH /api/gear/own/[id]` — update status (owned → sold)
- `POST /api/follow/[userId]` — follow
- `DELETE /api/follow/[userId]` — unfollow

---

## Reviews & Ratings System

- Only users with `UserGear.status = "owned"` for an item can post a review
- One review per user per item (enforced by DB unique constraint + API check)
- Each `GearCategory` defines `ratingFields` — a JSON array of dimension names:
  - Backpack: `["weight", "comfort", "durability", "packability", "organization"]`
  - Tent/Shelter: `["weight", "packability", "setup_ease", "weather_resistance", "space"]`
  - Sleeping Bag/Quilt: `["warmth_accuracy", "weight", "packability", "comfort", "moisture_resistance"]`
  - Sleeping Pad: `["weight", "packability", "insulation", "comfort", "durability"]`
  - Headtorch: `["brightness", "battery_life", "weight", "durability", "beam_modes"]`
  - Rain Jacket: `["weight", "packability", "comfort", "waterproofness", "sustainability"]`
- `Review.ratings` stores dimension scores (1–5) as JSON
- Aggregate scores shown on item nodes in upgrade graph and on gear detail panels

---

## Gear Comparison

- Triggered from the Loadout page (compare slot item vs another)
- Only items in the **same GearCategory** can be compared
- `GearCompareModal` renders a side-by-side table:
  - Weight, price, specs (from `GearItem.specs` JSON)
  - Category-specific rating dimensions (radar chart via Recharts)
  - User review count + average per dimension
- Max 2 items per comparison (v1)

---

## Key Business Logic

### Upgrade Graph (`lib/upgrade-graph.ts`)
```typescript
// Pseudo-logic
function buildFilteredGraph(
  allEdges: UpgradeEdge[],
  allItems: GearItem[],
  preferences: UserPreferences
): { nodes: Node[], edges: Edge[] } {
  // Filter items that exceed user preference caps
  const visibleItems = allItems.filter(item => {
    if (preferences.maxTentPrice && item.category === 'tent') {
      return item.priceCents <= preferences.maxTentPrice * 100;
    }
    return true;
  });
  // Build React Flow nodes and edges from visible items only
}
```

### Deal Detector (`lib/deal-detector.ts`)
```typescript
// For each scraped price:
// 1. Find GearItem by name/sku match
// 2. Compare to GearItem.priceCents (baseline)
// 3. If discountPct >= 20, upsert Deal record
// 4. Find users watching this item whose maxPrice >= deal price
// 5. Send push notification
```

---

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://...

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Storage
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Push Notifications
VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
VAPID_EMAIL=mailto:admin@trailkit.app

# Email
RESEND_API_KEY=

# Cron security
CRON_SECRET=

# Scraping (optional Playwright/BrowserBase)
SCRAPER_DELAY_MS=2000
```

---

## Implementation Order

1. **Auth + DB schema** — NextAuth, Prisma, Supabase setup, seed gear data
2. **Gear data seed** — Populate `GearItem`, `GearCategory`, `UpgradeEdge` for AU-relevant gear
3. **Loadout page** — Core CRUD: view slots, swap items, stats
4. **Profile page** — Own/sell gear, reviews, follow system
5. **Upgrade graph** — React Flow DAG, preference filtering
6. **Marketplace** — Deal cards, watchlist, scraper for 1–2 AU retailers
7. **Push notifications** — Service worker, VAPID, cron job
8. **Polish** — Gear compare modal, external insights (YouTube/Reddit links on item detail)

---

## Notes & Constraints

- **Region**: MVP targets Australia (AU pricing, AU retailers). Region field on User enables future expansion.
- **Gear database**: Seeded manually for v1 with ~50–100 items across 6 categories. User-submitted gear requests added in v2.
- **Upgrade graph**: Edges are curated manually by admins (not auto-generated). The graph is opinionated and community-maintained long term.
- **Reviews**: Gated behind ownership to maintain quality. In v2, add "verified purchase" via receipt upload.
- **Marketplace scraping**: Respect `robots.txt`. Add rate limiting + delays. Consider affiliate links as revenue model.
- **Push notifications**: Fallback to email (Resend) if push subscription is missing or expired.
- **Item categories for v1**: Headtorch, Backpack, Sleeping Pad, Sleeping Bag / Quilt, Shelter (tent / hammock / tarp). Rain jacket and other categories added in v2.