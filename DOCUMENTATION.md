# 📘 FoodShare — Complete Project Documentation

> **Feed People, Not Landfills.**
> A premium, animated, frontend-only web application that connects **Restaurants**, **NGOs**, and **Volunteers** to rescue surplus food and serve communities.

---

## Table of Contents

1. [What is FoodShare?](#1-what-is-foodshare)
2. [The Problem & The Solution](#2-the-problem--the-solution)
3. [How It Works (User Flow)](#3-how-it-works-user-flow)
4. [The Four Roles](#4-the-four-roles)
5. [Feature Tour](#5-feature-tour)
6. [Tech Stack & Why](#6-tech-stack--why)
7. [Architecture Overview](#7-architecture-overview)
8. [Folder Structure](#8-folder-structure)
9. [How the Code Works](#9-how-the-code-works)
10. [Design System](#10-design-system)
11. [Requirements & Setup](#11-requirements--setup)
12. [Running the Project](#12-running-the-project)
13. [Demo Logins](#13-demo-logins)
14. [Routes Reference](#14-routes-reference)
15. [Connecting a Real Backend](#15-connecting-a-real-backend)
16. [FAQ / Troubleshooting](#16-faq--troubleshooting)

---

## 1. What is FoodShare?

FoodShare is a **food-rescue platform**. Every day, restaurants throw away perfectly good surplus food while millions of people go hungry. FoodShare bridges that gap by creating a real-time marketplace where:

- **Restaurants** list surplus food,
- **NGOs** claim it for the people they serve, and
- **Volunteers** pick it up and deliver it — earning points and badges along the way.

It is designed to feel like a blend of **Airbnb, Uber, Swiggy, and Notion** — beautiful, fast, gamified, and data-rich.

> ⚠️ **This is a frontend-only project.** There is no server or database. All data is served from a realistic **in-memory mock API** (`src/api/mockApi.ts`) with simulated network latency. This makes it perfect for demos, portfolios, and as a UI foundation to later plug into a real backend.

---

## 2. The Problem & The Solution

| The Problem | The FoodShare Solution |
|---|---|
| Restaurants waste edible surplus food daily | One-tap donation posting with photos & details |
| NGOs struggle to source consistent meals | Real-time alerts + filterable nearby donations |
| No easy way to move food from A to B | Uber-style volunteer pickup & delivery network |
| Volunteering feels like a chore | Gamification: points, levels, badges, leaderboards |
| Impact is invisible | Live dashboards: meals saved, people helped, CO₂ prevented |

---

## 3. How It Works (User Flow)

The core lifecycle of a single food donation:

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ 1. Restaurant│   │ 2. Nearby    │   │ 3. Volunteer │   │ 4. Food      │
│ posts a food │ → │ NGOs receive │ → │ accepts the  │ → │ delivered &  │
│ donation     │   │ an alert     │   │ pickup       │   │ confirmed    │
└──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
```

Each donation moves through a **status pipeline**:

`pending → active → assigned → picked_up → on_the_way → delivered`
(or `expired` if its best-before time passes)

This status drives:
- the **badge color** shown on cards (`StatusBadge`),
- the **live tracking timeline** (`StatusTimeline`),
- and the **rider position** on the map (`TrackingMap`).

---

## 4. The Four Roles

FoodShare is **role-based** — what you see depends on who you log in as.

### 🍽️ Restaurant
Posts surplus food and tracks where it goes.
- Analytics dashboard (donation trends, food-category mix, monthly impact)
- Create Donation form (drag-&-drop photos, allergens, timing)
- Donation management (Active / Pending / Assigned / Delivered / Expired tabs)

### 🤝 NGO
Receives food and coordinates distribution.
- Intake stats (meals received, deliveries, beneficiaries)
- Browse & filter available donations (by distance, category, expiry)
- Accept donations, assign volunteers, mark delivered

### 🚴 Volunteer
Picks up and delivers food; the gamified hero of the platform.
- Gamified dashboard (points, level, streak, distance)
- Uber-style available pickups with route preview
- **Live map tracking** of the active delivery
- Achievements: levels (Beginner → Legend) & unlockable badges

### 🛡️ Admin
Operates the platform.
- Platform-wide overview & analytics
- User management (search, filter by role, status)
- Verification queue (approve/reject restaurants & NGOs)
- Donation monitoring across the whole system

---

## 5. Feature Tour

| Area | What it does | Key files |
|---|---|---|
| **Landing page** | Animated hero with floating food cards + particles, scroll-reveal impact counters, How-It-Works timeline, auto-sliding testimonial marquee, FAQ accordion | `pages/Landing.tsx`, `components/shared/TestimonialSlider.tsx` |
| **Authentication** | Split-screen Login, Register (role picker), Forgot/Reset password, 6-digit OTP | `pages/auth/*` |
| **Dashboards** | Role-specific analytics with animated charts | `pages/restaurant`, `pages/ngo`, `pages/volunteer`, `pages/admin` |
| **Create Donation** | Drag-&-drop multi-image upload, validation, confetti success animation | `pages/restaurant/CreateDonation.tsx` |
| **Live Tracking** | Interactive Leaflet map, animated rider, ETA, status timeline | `pages/shared/LiveTracking.tsx`, `components/shared/TrackingMap.tsx` |
| **Gamification** | Levels, badges, unlock celebration with confetti | `pages/volunteer/Achievements.tsx`, `config/gamification.ts` |
| **Leaderboard** | Gold/silver/bronze podium + ranked list | `pages/shared/Leaderboard.tsx` |
| **Impact dashboard** | Global metrics + area/pie/bar charts | `pages/shared/Impact.tsx` |
| **Notifications** | Slide-in real-time drawer with unread badges | `components/shared/NotificationDrawer.tsx` |
| **Community** | Filterable social impact feed with likes | `pages/shared/Community.tsx` |
| **Profile** | Editable details, avatar upload, activity history | `pages/shared/Profile.tsx` |
| **Theme** | Full light/dark mode, persisted | `store/theme.ts`, `components/ui/ThemeToggle.tsx` |

---

## 6. Tech Stack & Why

| Technology | Role in the project | Why chosen |
|---|---|---|
| **React 19** | UI library | Latest features, concurrent rendering |
| **Vite 6** | Build tool / dev server | Instant HMR, fast builds |
| **TypeScript** | Type safety | Catches bugs at compile time |
| **Tailwind CSS 3** | Styling | Rapid, consistent design system |
| **Framer Motion** | Animations | Declarative, physics-based motion everywhere |
| **TanStack Query** | Server-state / data fetching | Caching, loading/error states, refetching |
| **Zustand** | Client state | Tiny, simple stores for auth/theme/notifications |
| **React Router 7** | Routing | Nested routes, protected routes |
| **React Hook Form + Zod** | Forms & validation | Performant forms with schema validation |
| **Recharts** | Charts | Composable, animated data viz |
| **React Leaflet** | Maps | Interactive open-source maps for tracking |
| **Lucide React** | Icons | Clean, consistent icon set |
| **clsx + tailwind-merge** | Class management | Conflict-free conditional classes |

---

## 7. Architecture Overview

FoodShare uses a clean, layered, enterprise-style architecture:

```
        ┌─────────────────────────────────────────────┐
        │                  PAGES                        │  ← screens per role
        │  (Landing, Auth, Restaurant, NGO, …)          │
        └───────────────┬─────────────────────────────┘
                        │ uses
        ┌───────────────▼─────────────────────────────┐
        │         COMPONENTS (ui / shared / system)     │  ← reusable building blocks
        └───────────────┬─────────────────────────────┘
                        │ reads/writes
   ┌────────────────────┼────────────────────┐
   │                    │                     │
┌──▼──────────┐  ┌──────▼───────┐   ┌─────────▼────────┐
│  STORES     │  │ QUERIES /    │   │  CONFIG / TYPES  │
│ (Zustand)   │  │ MOCK API     │   │  / DATA          │
│ auth/theme/ │  │ (TanStack)   │   │                  │
│ notif       │  │              │   │                  │
└─────────────┘  └──────┬───────┘   └──────────────────┘
                        │
                 ┌──────▼───────┐
                 │ In-memory    │  ← simulated backend
                 │ mock dataset │
                 └──────────────┘
```

**Two kinds of state:**
- **Server state** (donations, leaderboard, impact…) → handled by **TanStack Query** hooks in `src/api/queries.ts`, which call the mock API.
- **Client state** (who's logged in, theme, notification drawer open) → handled by **Zustand** stores in `src/store/`.

---

## 8. Folder Structure

```
FoodShare/
├── index.html                 # HTML entry, fonts, Leaflet CSS
├── package.json               # dependencies & scripts
├── vite.config.ts             # Vite config, @ alias, code-splitting
├── tailwind.config.js         # design tokens, colors, animations
├── tsconfig*.json             # TypeScript configs
├── public/favicon.svg
└── src/
    ├── main.tsx               # app bootstrap (providers, router, theme)
    ├── App.tsx                # all route definitions
    ├── index.css              # global styles + Tailwind layers
    │
    ├── api/
    │   ├── mockApi.ts         # simulated backend (in-memory data + latency)
    │   └── queries.ts         # TanStack Query hooks
    │
    ├── components/
    │   ├── ui/                # design-system primitives
    │   │   ├── Button, Card, Badge, Input, Modal, Avatar,
    │   │   ├── Skeleton, EmptyState, Tabs, ProgressBar,
    │   │   ├── AnimatedCounter, Confetti, Reveal, StatCard,
    │   │   └── ThemeToggle, Logo
    │   ├── shared/            # composite widgets
    │   │   ├── DonationCard, Charts, TrackingMap,
    │   │   ├── StatusTimeline, NotificationDrawer,
    │   │   ├── PageHeader, TestimonialSlider
    │   └── system/            # ErrorBoundary, ProtectedRoute
    │
    ├── config/
    │   ├── navigation.tsx     # sidebar items per role
    │   └── gamification.ts    # level definitions
    │
    ├── data/
    │   ├── mock.ts            # users, donations, badges, etc.
    │   └── adminMock.ts       # admin users & verifications
    │
    ├── layouts/
    │   ├── PublicLayout.tsx   # navbar + footer (marketing)
    │   └── DashboardLayout.tsx# sidebar + topbar (app)
    │
    ├── pages/
    │   ├── Landing.tsx, NotFound.tsx
    │   ├── auth/              # login, register, forgot, reset, OTP
    │   ├── restaurant/        # dashboard, create, management
    │   ├── ngo/               # dashboard, available, requests
    │   ├── volunteer/         # dashboard, pickups, achievements, active
    │   ├── admin/             # dashboard, users, verify, donations
    │   └── shared/            # leaderboard, impact, community, profile, tracking
    │
    ├── store/                 # Zustand: auth, theme, notifications
    ├── types/                 # shared TypeScript interfaces
    └── lib/                   # utilities (cn, formatNumber, countdown, …)
```

---

## 9. How the Code Works

### App bootstrap — `src/main.tsx`
Wraps the app in: `ErrorBoundary` → `QueryClientProvider` → `BrowserRouter`. It also applies the persisted theme before first paint to avoid a flash.

### Routing — `src/App.tsx`
- Public route (`/`) uses `PublicLayout`.
- Auth routes (`/login`, `/register`, …) are standalone.
- App routes (`/app/*`) are wrapped in `ProtectedRoute` + `DashboardLayout`.
- Each role's pages are further guarded: e.g. `roles={['restaurant']}`.
- `AnimatePresence` provides **page transition animations** on navigation.

### Protected routes — `components/system/ProtectedRoute.tsx`
Reads the Zustand auth store. If not logged in → redirect to `/login`. If the user's role isn't allowed for the route → redirect to their own dashboard.

### Authentication — `store/auth.ts`
A Zustand store (persisted to `localStorage`). It exposes `login(role)`, `loginWithEmail`, `register`, `logout`, `updateProfile`. Because there's no backend, "logging in" just loads a matching mock user.

### Data fetching — `api/queries.ts` + `api/mockApi.ts`
TanStack Query hooks (`useDonations`, `useImpact`, `useCreateDonation`, …) call functions on the `api` object. Those functions return mock data after a fake `delay()`. Mutations (create/update status) modify the in-memory array and invalidate queries so the UI refreshes automatically — exactly like a real API.

### Theme — `store/theme.ts`
Toggling adds/removes the `dark` class on `<html>`; Tailwind's `darkMode: 'class'` does the rest. The choice is persisted.

### Animations
- `Reveal` — scroll-triggered fade/slide-in (uses `whileInView`).
- `AnimatedCounter` — counts up when scrolled into view.
- `Confetti` — celebration on donation/badge unlock.
- `TestimonialSlider` — continuous auto-scrolling marquee (`useAnimationFrame`), pauses on hover.
- `TrackingMap` + `useRouteProgress` — animates the rider marker along the route.

---

## 10. Design System

**Colors** (defined in `tailwind.config.js`):
- **Primary:** Emerald / Forest green (`brand.50`–`brand.950`)
- **Accent:** Orange / Amber (`accent.*`, `amber.*`)

**Visual language:**
- Glassmorphism surfaces (`.glass`, `.glass-strong`)
- Premium cards with soft shadows (`.card`, `shadow-soft`, `shadow-glow`)
- Rounded corners (2xl–3xl), gradient text, mesh backgrounds
- Custom keyframe animations: `float`, `shimmer`, `gradient-x`, `pulse-ring`

**States covered everywhere:** loading **skeletons**, **empty states**, hover/tap **micro-interactions**, and full **dark mode**.

**Fonts:** Inter (body) + Plus Jakarta Sans (display), loaded in `index.html`.

---

## 11. Requirements & Setup

### Prerequisites
| Requirement | Version | Notes |
|---|---|---|
| **Node.js** | ≥ 18 (tested on 22) | [nodejs.org](https://nodejs.org) |
| **npm** | ≥ 9 (tested on 10) | comes with Node |
| A modern browser | latest | Chrome, Edge, Firefox, Safari |

### Internet connection
The UI loads a few assets from the web at runtime:
- **Google Fonts** (Inter, Plus Jakarta Sans)
- **Leaflet map tiles** (CARTO) and the **Leaflet CSS**
- **Sample photos** (Unsplash) & **avatars** (pravatar)

The app still runs offline, but fonts/photos/maps will show fallbacks.

### Install
```bash
npm install
```
> If you ever re-add `react-leaflet`, note it's pinned to **v5** (React 19 compatible). Installs use standard npm; no special flags needed for normal use.

---

## 12. Running the Project

```bash
npm run dev       # Start dev server with hot reload → http://localhost:5173
npm run build     # Type-check (tsc) + production build into /dist
npm run preview   # Serve the production build locally
npm run lint      # Lint (if ESLint configured)
```

**Deploying:** run `npm run build` and host the static `/dist` folder on any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, S3…). Because routing is client-side, configure your host to **redirect all routes to `index.html`** (SPA fallback).

---

## 13. Demo Logins

No real credentials exist. On the **Login** page:

- Click any **Quick demo login** button — **Restaurant**, **NGO**, **Volunteer**, or **Admin** — to jump straight into that dashboard.
- Or type **any** email/password — the mock API accepts everything. (Using `restaurant@foodshare.app`, `ngo@foodshare.app`, `volunteer@foodshare.app`, or `admin@foodshare.app` logs you in as that specific role.)
- **Register** also works and routes you through OTP verification (any 6 digits).

---

## 14. Routes Reference

| Path | Page | Access |
|---|---|---|
| `/` | Landing | Public |
| `/login`, `/register` | Auth | Public |
| `/forgot-password`, `/reset-password`, `/verify-otp` | Auth | Public |
| `/app/restaurant` | Restaurant dashboard | Restaurant |
| `/app/restaurant/create` | Create donation | Restaurant |
| `/app/restaurant/donations` | Donation management | Restaurant |
| `/app/ngo` | NGO dashboard | NGO |
| `/app/ngo/available` | Available donations | NGO |
| `/app/ngo/requests` | Requests management | NGO |
| `/app/volunteer` | Volunteer dashboard | Volunteer |
| `/app/volunteer/pickups` | Available pickups | Volunteer |
| `/app/volunteer/achievements` | Badges & levels | Volunteer |
| `/app/volunteer/active` | Active delivery (map) | Volunteer |
| `/app/admin` | Admin overview | Admin |
| `/app/admin/users` | User management | Admin |
| `/app/admin/verify` | Verifications | Admin |
| `/app/admin/donations` | Donation monitoring | Admin |
| `/app/leaderboard` | Leaderboard | Any logged-in |
| `/app/impact` | Impact dashboard | Any logged-in |
| `/app/community` | Community feed | Any logged-in |
| `/app/profile` | Profile | Any logged-in |
| `/track/:id` | Live tracking | Any logged-in |
| `*` | 404 Not Found | Public |

---

## 15. Connecting a Real Backend

The app is built so the backend swap is **isolated to one file**.

1. Open `src/api/mockApi.ts`.
2. Replace each method body (currently returning mock data after `delay()`) with a real HTTP call using **Axios** (already a dependency), e.g.:
   ```ts
   async getDonations(filter) {
     const { data } = await axios.get('/api/donations', { params: filter });
     return data;
   }
   ```
3. Update `src/store/auth.ts` to call your real auth endpoints and store a JWT.
4. Everything else — components, queries, caching, loading states — **stays the same**, because they only depend on the `api` interface and the TypeScript types in `src/types/`.

---

## 16. FAQ / Troubleshooting

**Q: The map is blank / fonts look default.**
A: You're likely offline or a network request was blocked. Map tiles, fonts, and photos load from the internet.

**Q: I refreshed a deep link (e.g. `/app/volunteer`) and got a 404 on my host.**
A: Configure your static host's SPA fallback to serve `index.html` for all routes.

**Q: Data resets when I reload.**
A: Expected — the mock API stores data in memory only. Auth & theme persist via `localStorage`; donations do not.

**Q: Can I change the demo content?**
A: Yes — edit `src/data/mock.ts` and `src/data/adminMock.ts`.

**Q: Build warns about chunk size?**
A: Handled — `vite.config.ts` splits vendors (react, charts, maps, motion, forms) via `manualChunks`.

---

### Made with 💚
Every meal shared is a life touched. FoodShare turns surplus into service — one donation, one pickup, one delivery at a time.
