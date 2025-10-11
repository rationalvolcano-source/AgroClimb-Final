## Overview

The Agro Vision is an AI-powered career guidance platform for agricultural students in India, focusing on ABM, Banking, and JRF Horticulture. It offers AI-guided quizzes, interactive learning games, personalized study plans, and alumni mentorship. Inspired by Duolingo's engagement patterns and Linear/Notion's design, the platform aims to provide career clarity through instant fit scores, adaptive learning, and gamified experiences. Key features include a comprehensive wellness center, study tools, and a hub for upskilling and webinars.

## Recent Updates (October 2025)

### Excel Entry System (Plan B)
-   **Excel Quiz Scoring**: Updated thresholds to 0-6 (Beginner/red), 7-9 (Intermediate/amber), 10 (Expert/green)
-   **Excel Orientation**: Enhanced with hero section headings for all 8 steps (e.g., "Welcome Aboard!", "What You Will Learn", "Ready for Takeoff?") using gradient text styling
-   **Rocket Launch Animation**: 2-second rocket animation on final orientation step, auto-navigates to Excel Sprints page
-   **Excel Sprints Page**: New page at `/excel-sprints` featuring 7 sprint cards with unique Lucide icons (Database, Brain, BarChart3, Printer, Zap, Download, Trophy), Sprint 1 unlocked, Sprints 2-7 locked with progression system
-   **User Flow**: Seamless navigation from Excel Quiz → Orientation → Rocket Animation → Sprints

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

-   **Technology Stack:** React 18, TypeScript, Vite, Wouter, TanStack Query, Framer Motion.
-   **UI Framework:** Shadcn/ui (Radix UI primitives), Tailwind CSS, custom "New York" style design system, dark mode with emerald/cyan accents.
-   **Component Architecture:** Atomic design (reusable UI components), feature-based pages, shared utilities, custom hooks.
-   **Design System:** Deep slate backgrounds, emerald-cyan gradients, system font stack, micro-interactions (glow, pulse, float animations), responsive grid layouts.

### Backend

-   **Technology Stack:** Express.js, TypeScript, ESBuild.
-   **API Design:** RESTful API (`/api` prefix), JSON format, middleware for logging and error handling.
-   **Storage Layer:** Abstract `IStorage` interface, in-memory (`MemStorage`) default, prepared for Drizzle ORM (PostgreSQL).

### Data Storage Solutions

-   **Current:** In-memory storage (JavaScript Map) for user data (id, username, password), UUID-based primary keys.
-   **Prepared Infrastructure:** Drizzle ORM for PostgreSQL (`@neondatabase/serverless`), schema defined in `/shared/schema.ts` with Zod validation, migration setup, environment-based DB config.
-   **Browser Storage:** LocalStorage for study session tracking, wellness data, and quiz results.

### Authentication and Authorization

-   **Current:** User schema defined; no active authentication middleware; session infrastructure prepared.
-   **Prepared Components:** User creation/retrieval methods, password field in schema (ready for hashing), cookie-based session support.

## External Dependencies

### UI Component Libraries

-   **Radix UI:** Accessible, unstyled component primitives.
-   **Framer Motion:** Animation library.
-   **Lucide React:** Icon library.
-   **Embla Carousel:** Touch-friendly carousel.
-   **CMDK:** Command palette functionality.
-   **Vaul:** Drawer component library.

### Form Management

-   **React Hook Form:** Form state management.
-   **Hookform Resolvers:** Zod schema validation integration.
-   **Zod:** Runtime type validation and schema definition.

### Database & ORM

-   **Drizzle ORM:** Type-safe SQL query builder.
-   **Drizzle Zod:** Schema to Zod validator conversion.
-   **Neon Serverless:** PostgreSQL driver.
-   **Connect-pg-simple:** PostgreSQL session store for Express.

### Styling & Design

-   **Tailwind CSS:** Utility-first CSS framework.
-   **Class Variance Authority:** Type-safe component variant handling.
-   **CLSX & Tailwind Merge:** Conditional className utilities.
-   **PostCSS & Autoprefixer:** CSS processing.

### Development Tools

-   **Vite:** Build tool and dev server.
-   **TSX:** TypeScript execution for Node.js.
-   **Replit Plugins:** Runtime error overlay, cartographer, dev banner.
-   **Date-fns:** Date manipulation and formatting.