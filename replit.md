# The Agro Vision - AI-Guided Career Platform

## Overview

The Agro Vision is an AI-powered career guidance platform designed specifically for agricultural students in India. The platform helps students discover their best-fit career paths across ABM (Agribusiness Management), Banking, and JRF Horticulture through AI-guided quizzes, interactive learning games, and personalized study plans. It combines psychological engagement patterns from platforms like Duolingo with professional design aesthetics inspired by Linear and Notion to create an experience-focused education-tech solution.

The application aims to solve career clarity challenges by providing instant fit scores, adaptive study plans, gamified learning experiences, and direct alumni mentorship - all within a single cohesive platform.

### Current Pages
1. **Landing Page** (`/`) - Main marketing page with hero, features, pricing, and testimonials sections
2. **Books** (`/books`) - Study materials and books page with 7 books for ABM, Banking, and JRF Horticulture
3. **Interactive Games** (`/games`) - Stream-based gaming hub with four pedagogically designed learning games: 
   - **Flashcard Duel** (`/flashcard-duel`) - Fully functional AI quiz game with PDF upload, 3 difficulty modes (Easy/Difficult/Legendary), scoring system, combos, and TheAgriVision teal theme. Built directly in Replit (no external dependencies)
   - **Logic Orchard**, **Number Sprint**, **Word Sprint** - Under construction
   - Users select their academic stream first, then see only the games allocated to that stream
4. **Study With Me** (`/swm`) - Focus mode with binaural beats audio, timer, and session tracking
5. **Wellness Centre** (`/wellness`) - Complete mind-body wellness toolkit with interactive tools:
   - **Yoga Sessions**: Morning (6-9 AM IST) and Evening (9-11 PM IST) yoga with Start/End controls and on-demand video playback
   - **2-Minute Breathing Reset**: 4-4-4-4 box breathing timer with auto-repeating cycles
   - **Focus Soundscape**: Select from 3 ambient soundtracks (Euphoria, Ambrossia, Elixir), set custom time limit, and focus with background music
   - **5-4-3-2-1 Grounding**: Interactive sensory grounding exercise to reduce anxiety
   - **Weekly Reflection**: Quick journaling tool for goal tracking and stress checks
   - **Micro-Stretch Routine**: 5-minute posture and eye relief video exercises
   - **Motivational Thought**: Daily mantra/quote placeholder
   - All tools feature Start/End buttons with no auto-play interference
6. **Plan B & Webinars Hub** (`/planb-webinars`) - Navigation hub with two aesthetic card options: Plan B Skills (upskilling tracks) and Alumni Webinars (₹9 live sessions). Subheading includes clickable "Unlock with a Pro plan" link to pricing section
7. **Excel Entry Quiz** (`/excel-quiz`) - Advanced Excel skills assessment accessible from Plan B → Excel Training card:
   - **Friendly Intro Modal**: Welcome message with "Don't worry if you don't know something—just answer honestly" before quiz starts
   - **10 Advanced MCQs**: Covers VLOOKUP/XLOOKUP, cell references, dynamic arrays, PivotTables, error handling, Power Query, text functions, and charts
   - **Timer System**: 10 seconds per question with visual countdown bar and auto-advance on timeout or answer
   - **Scoring & Skill Assessment**: Real-time scoring with skill level (Beginner 0-3, Intermediate 4-7, Advanced 8-10) displayed with color coding
   - **Results Screen**: Shows skill level, score percentage, average time per question, and top 2 weakness areas to focus on
   - **localStorage Persistence**: Saves quiz results with skillLevel, score, avgTimeSec, weaknesses array, and completedAt timestamp
   - **TheAgriVision Theme**: Dark-teal gradient (#26A69A to #14B8A6) buttons, dark backgrounds (#0b1420, #101a28), consistent with platform design
8. **Excel Orientation** (`/excel-orientation`) - Duolingo-style step-by-step onboarding for Excel Plan B, accessible from Excel Quiz results:
   - **8-Step Flow**: Welcome, Skills overview, Learning flow, Quiz mindset, Timing info, Coach support, Final project, CTA
   - **Visual Design**: Farmer Kiran avatar guide, Lucide React icons for each step, speech bubbles for contextual tips
   - **Content Types**: Text descriptions, bullet lists (7 skills), numbered steps (learning flow), personalized guidance
   - **Navigation**: Back/Next buttons, clickable progress dots with accessible hit areas (40px), keyboard support (Arrow keys, Enter/Space)
   - **Progress Tracking**: localStorage saves last step index, auto-resume on reload, completion flag
   - **Fade Transitions**: Smooth 150ms opacity transitions between steps
   - **Accessibility**: ARIA labels, large touch targets, keyboard navigation, high contrast text
   - **Final Action**: "Start Orientation ▶" button navigates to Plan B hub, sets orientationCompleted flag
   - **Theme**: Consistent dark-teal design (#0b1420 bg, #26A69A accents), responsive layout (max-width 640px)

### Navigation System
- **Nav Component** (`client/src/components/Nav.tsx`) - Unified navigation bar used across all pages
- Uses Wouter Link for SPA routing (no page reloads)
- Responsive design for mobile and desktop:
  - **Desktop**: Full text for all links (Home, Books, Games, Plan B & Webinars, SWM, Wellness)
  - **Mobile**: Abbreviated text for space efficiency ("Plan B" for Plan B & Webinars, Wellness hidden on smallest screens, icon-only for Home)
- Logo always clickable and navigates to home
- Conditional rendering based on current page:
  - Landing page: Shows Features, Plans anchor links
  - Other pages: Shows Home button to return to landing
- All pages include the Nav component for consistent navigation experience
- "Get My Career Plan" button in nav links to Career Quiz Coming Soon page

### Games Integration
- **Games Page** (`client/src/pages/Games.tsx`) - Stream-based hub for pedagogically designed learning games
  - **Four Games Available**:
    - **Flashcard Duel**: Fully functional, links to external Lovable app with stream parameter. For recall and reinforcement (semantic memory)
    - **Logic Orchard**: Under construction. For reasoning and visual pattern recognition (fluid intelligence)
    - **Number Sprint**: Under construction. For timed computational fluency (processing speed)
    - **Word Sprint**: Under construction. For reading comprehension and vocabulary breadth (language intelligence)
  
- **Stream-Based Game Allocation** (Pedagogical Rationale):
  - JRF Horticulture → Flashcard Duel
  - Banking – English → Word Sprint
  - Banking – Quants & DI → Number Sprint
  - Banking – Logical Reasoning → Logic Orchard
  - Banking – Financial & Banking Affairs → Flashcard Duel
  - ABM – VARC → Word Sprint
  - ABM – DILR → Logic Orchard, Number Sprint
  - ABM – QA → Number Sprint
  - Banking – Agri Affairs → Flashcard Duel

- **User Flow**:
  1. User selects academic stream from dropdown
  2. Only games allocated to that stream are displayed
  3. User clicks game to launch it
  4. Flashcard Duel opens in new tab with stream parameter
  5. Other games show "coming soon" alert (pending implementation)

- **Navigation to Games**: All mentions of "games" or "interactive games" across the site link to `/games`:
  - Hero section: "Preview Games" button
  - CTA section: "Preview Games" button  
  - ValueProps: "Interactive Games" feature card
  - Footer: "Interactive Games" link
  - Nav: "Games" link
- All links use Wouter Link for SPA routing (no full page reloads)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management
- Framer Motion for animations and transitions

**UI Framework:**
- Shadcn/ui component library with Radix UI primitives
- Tailwind CSS for utility-first styling
- Custom design system based on "New York" style variant
- Dark mode as primary theme with emerald/cyan accent colors

**Component Architecture:**
- Atomic design pattern with reusable UI components in `/client/src/components/ui`
- Feature-based page components in `/client/src/pages`
- Shared utility functions in `/client/src/lib`
- Custom hooks in `/client/src/hooks`

**Design System:**
- Color palette: Deep slate backgrounds (950/900) with emerald-cyan gradients
- Typography: System font stack optimized for clarity
- Micro-interactions: Glow effects, pulse animations, float animations
- Responsive grid layouts with mobile-first approach

**Rationale:** This architecture prioritizes developer experience with TypeScript safety, component reusability through Shadcn/ui, and performance through Vite's fast builds. The design system creates emotional engagement crucial for student motivation while maintaining professional credibility.

### Backend Architecture

**Technology Stack:**
- Express.js server with TypeScript
- ESBuild for production bundling
- Session-based architecture (prepared for authentication)

**API Design:**
- RESTful API endpoints prefixed with `/api`
- JSON request/response format
- Middleware-based request logging with performance metrics
- Error handling with status code propagation

**Development vs Production:**
- Development: Vite middleware integration for HMR
- Production: Serves static assets from `/dist/public`
- Custom Vite plugins for Replit-specific tooling (cartographer, dev banner)

**Storage Layer:**
- Abstract storage interface (`IStorage`) for database operations
- In-memory implementation (`MemStorage`) as default
- Prepared for migration to persistent database (Drizzle ORM configured)

**Rationale:** The Express architecture provides flexibility for rapid prototyping with the in-memory store while maintaining a clean abstraction layer for future database integration. The separation of concerns allows the backend to scale independently as features are added.

### Data Storage Solutions

**Current Implementation:**
- In-memory storage using JavaScript Map structures
- User data model with id, username, and password fields
- UUID-based primary keys using Node's crypto module

**Prepared Infrastructure:**
- Drizzle ORM configured for PostgreSQL via `@neondatabase/serverless`
- Schema definition in `/shared/schema.ts` with Zod validation
- Migration setup in `/migrations` directory
- Environment-based database URL configuration

**Browser Storage:**
- LocalStorage for study session tracking (`agrivision_swm_sessions` key)
- Client-side data persistence for "Study With Me" timer and statistics
- Wellness Centre data (`wellness_morning_yoga`, `wellness_night_yoga`, `wellness_checkins`)
- No sensitive data stored client-side

**Rationale:** The dual-layer approach allows immediate development with in-memory storage while having PostgreSQL infrastructure ready for production deployment. Drizzle provides type-safe queries and automatic schema synchronization.

### Authentication and Authorization

**Current State:**
- User schema with username/password fields defined
- No active authentication middleware implemented
- Session infrastructure prepared (connect-pg-simple installed)

**Prepared Components:**
- User creation and retrieval methods in storage interface
- Password field in schema (ready for hashing implementation)
- Cookie-based session support configured

**Rationale:** Authentication infrastructure is intentionally minimal to allow rapid feature development. The foundation supports adding bcrypt password hashing and express-session middleware when user accounts become necessary.

### External Dependencies

**UI Component Libraries:**
- Radix UI: Accessible, unstyled component primitives (accordion, dialog, dropdown, tooltip, etc.)
- Framer Motion: Animation library for smooth transitions and micro-interactions
- Lucide React: Icon library for consistent visual elements
- Embla Carousel: Touch-friendly carousel component
- CMDK: Command palette functionality
- Vaul: Drawer component library

**Form Management:**
- React Hook Form: Form state management
- Hookform Resolvers: Zod schema validation integration
- Zod: Runtime type validation and schema definition

**Database & ORM:**
- Drizzle ORM: Type-safe SQL query builder
- Drizzle Zod: Schema to Zod validator conversion
- Neon Serverless: PostgreSQL driver optimized for serverless environments
- Connect-pg-simple: PostgreSQL session store for Express

**Styling & Design:**
- Tailwind CSS: Utility-first CSS framework
- Class Variance Authority: Type-safe component variant handling
- CLSX & Tailwind Merge: Conditional className utilities
- PostCSS & Autoprefixer: CSS processing

**Development Tools:**
- Vite: Build tool and dev server
- TSX: TypeScript execution for Node.js
- Replit Plugins: Runtime error overlay, cartographer, dev banner
- Date-fns: Date manipulation and formatting

**Rationale for Key Choices:**

- **Radix UI over Material-UI/Ant Design:** Provides complete styling control while ensuring accessibility, crucial for the custom brand experience required by the design guidelines.

- **Drizzle over Prisma:** Lighter weight, better TypeScript inference, and more flexible for the PostgreSQL-focused architecture. The SQL-like query builder provides better performance optimization opportunities.

- **Neon Serverless:** Optimized for serverless/edge deployments with connection pooling built-in, reducing cold start times critical for educational platform responsiveness.

- **React Hook Form + Zod:** Industry-standard combination providing both runtime validation and TypeScript type inference, reducing bugs in form-heavy quiz and assessment features.

- **Date-fns over Moment:** Smaller bundle size and tree-shakeable, important for the interactive games and study tracking features that require frequent date operations.