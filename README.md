# AgroClimb

AI-powered career guidance platform for BSc Agriculture and Horticulture students in India. Discover your best career path through an intelligent quiz system with personalized recommendations.

## Features

### Core Features
- **AI Career Quiz** - Intelligent 6-7 question quiz that analyzes priorities, work preferences, risk tolerance, and subject interests to recommend the best career path
- **5 Career Pathways** - Research, Academics, Agribusiness Management, Government Banking & Finance, and Other Government Jobs
- **Lock-In System** - Users can lock their career choice to stay focused, with unlock flow that encourages mentor consultation
- **Results Download** - Save quiz results as images to share with the Telegram community

### Additional Features
- **Excel Coaching Module** - Multi-sprint learning system with AI-powered assignment evaluation
- **User Analytics** - Track user journeys, page views, and engagement metrics
- **PWA Support** - Installable as a mobile app with offline caching
- **SEO Optimized** - Dynamic meta tags, structured data, sitemap, and landing pages

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + Shadcn/ui
- Framer Motion (animations)
- TanStack Query (data fetching)
- Wouter (routing)

### Backend
- Express.js + TypeScript
- Drizzle ORM
- PostgreSQL (Neon serverless)

### Authentication
- Clerk (Google Sign-in)

### Integrations
- html2canvas (results screenshot)
- SheetJS (Excel file processing)

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components (routes)
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and query client
├── server/                 # Backend Express application
│   ├── routes.ts           # API endpoints
│   ├── storage.ts          # Database operations
│   └── db.ts               # Database connection
├── shared/                 # Shared code between frontend/backend
│   └── schema.ts           # Drizzle schema + Zod validation
└── public/                 # Static files (sprint HTML pages)
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Environment Variables

Create these environment variables (or add to `.env`):

```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
VITE_CLERK_PUBLISHABLE_KEY=pk_...
```

### Installation

```bash
# Install dependencies
npm install

# Push database schema
npm run db:push

# Start development server
npm run dev
```

The app will be available at `http://localhost:5000`

### Production Build

```bash
npm run build
npm start
```

## Database Schema

Key tables:
- `users` - User accounts
- `user_profiles` - Gmail and WhatsApp info
- `user_career_choices` - Locked career pathway recommendations
- `user_journey_events` - Analytics events
- `user_weekly_activity` - Weekly engagement rollups
- `user_daily_page_metrics` - Daily page visit metrics

## API Endpoints

### Authentication (requires Clerk auth)
- `GET /api/auth/user` - Get current user info

### Career Choice
- `GET /api/career-choice` - Get user's locked career choice
- `POST /api/career-choice` - Lock in a career choice
- `POST /api/career-choice/unlock` - Unlock career choice

### Profile
- `GET /api/profile` - Get user profile
- `POST /api/profile` - Save/update profile

### Analytics
- `POST /api/analytics/events` - Record user events
- `GET /api/admin/analytics/export` - Export analytics (admin only)

### Excel Evaluation
- `POST /api/evaluate-excel` - Evaluate Sprint 1 assignment
- `POST /api/evaluate-sprint2` - Evaluate Sprint 2 assignment

## Deployment

### Replit
1. Import the repository
2. Set environment variables in Secrets
3. Click "Run" - the app will start automatically

### Other Platforms (Vercel, Railway, etc.)
1. Clone the repository
2. Set environment variables
3. Build: `npm run build`
4. Start: `npm start`
5. Ensure PostgreSQL is accessible

## Community

- **Telegram**: [Join AgroClimb Community](https://t.me/+uQNpa83oEmIxOTA9)
- **Instagram**: [@agroclimb](https://www.instagram.com/agroclimb)

## License

Private - All rights reserved

---

Built with care for agricultural students in India.
