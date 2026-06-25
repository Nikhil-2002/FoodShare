# 🌱 FoodShare — Feed People, Not Landfills

A world-class, production-grade frontend for a food-rescue platform connecting **Restaurants**, **NGOs**, and **Volunteers** to turn surplus food into served meals. Premium, animated, fully responsive, with light & dark mode.

> Frontend-only. All data is served from a realistic in-memory **mock API** — no backend required.

---

## ✨ Highlights

- **Stunning landing page** — animated hero with floating food cards, particles, scroll-reveal sections, animated counters, How-It-Works timeline, testimonials & an animated FAQ accordion.
- **Full auth flows** — split-screen Login, Register (role picker), Forgot/Reset password & 6-digit OTP. Built with **React Hook Form + Zod**.
- **Role-based dashboards** with protected routes:
  - 🍽️ **Restaurant** — analytics, drag-&-drop donation creation, tabbed donation management (grid & table views).
  - 🤝 **NGO** — intake stats, filterable/searchable available donations, request & volunteer assignment.
  - 🚴 **Volunteer** — gamified dashboard, Uber-style pickups, **live Leaflet map tracking** with an animated route, achievements & badges.
  - 🛡️ **Admin** — user management, verification queue, donation monitoring.
- **Gamification** — levels (Beginner → Legend), unlockable badges with celebration + confetti, and a podium **leaderboard** (gold/silver/bronze).
- **Live tracking** — interactive map (pickup / delivery / rider markers), animated movement, ETA & a status timeline.
- **Impact dashboard** — animated metrics and charts (area, pie, bar) via Recharts.
- **Real-time notification drawer**, **community feed**, and **editable profiles** with avatar upload.
- **Design system** — glassmorphism, emerald/forest + orange/amber palette, soft shadows, micro-interactions, loading skeletons, empty states, full dark mode.

## 🧱 Tech Stack

React 19 · Vite 6 · TypeScript · Tailwind CSS · TanStack Query · Zustand · React Router · Framer Motion · React Hook Form · Zod · Recharts · React Leaflet · Lucide React

## 🚀 Getting Started

```bash
npm install      # already done if node_modules exists
npm run dev      # start dev server → http://localhost:5173
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## 🔑 Demo Logins

On the **Login** page click any **Quick demo login** button (Restaurant / NGO / Volunteer / Admin) to jump straight into that role's dashboard. Email login and registration also work — any credentials are accepted by the mock API.

## 📁 Project Structure

```
src/
├── api/            # mock API + TanStack Query hooks
├── components/
│   ├── ui/         # reusable design-system primitives
│   ├── shared/     # composite widgets (DonationCard, Charts, maps, drawers)
│   └── system/     # ErrorBoundary, ProtectedRoute
├── config/         # navigation & gamification config
├── data/           # mock datasets
├── layouts/        # PublicLayout, DashboardLayout
├── pages/          # landing, auth, restaurant, ngo, volunteer, admin, shared
├── store/          # Zustand stores (auth, theme, notifications)
├── types/          # shared TypeScript types
└── lib/            # utilities
```

Made with 💚 — every meal shared is a life touched.
