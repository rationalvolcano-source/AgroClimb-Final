## Overview

AgroClimb is an AI-powered career guidance platform for agricultural students in India, specifically targeting ABM, Banking, and JRF Horticulture. It provides career clarity through AI-guided quizzes, interactive learning, personalized study plans, and alumni mentorship. Inspired by Duolingo's engagement and Linear/Notion's design, it aims for adaptive learning and gamified experiences, including a wellness center, study tools, and a hub for upskilling and webinars. The platform’s ambition is to streamline career preparation for agricultural students.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Technology Stack:** React 18, TypeScript, Vite, Wouter, TanStack Query, Framer Motion.
- **UI Framework:** Shadcn/ui (Radix UI primitives), Tailwind CSS, custom "New York" style design system, dark mode with emerald/cyan accents.
- **Component Architecture:** Atomic design, feature-based pages, shared utilities, custom hooks.
- **Design System:** Deep slate backgrounds, emerald-cyan gradients, system font stack, micro-interactions, responsive grid layouts.
- **PWA Implementation:** Progressive Web App with `manifest.json` and `sw.js` for offline caching and installability.
- **SEO Features:** Dynamic meta tags, structured data (JSON-LD), sitemap.xml, robots.txt, and dedicated SEO landing pages.

### Backend
- **Technology Stack:** Express.js, TypeScript, ESBuild.
- **API Design:** RESTful API (`/api` prefix), JSON format, middleware for logging and error handling.
- **Storage Layer:** Abstract `IStorage` interface, current in-memory (`MemStorage`), prepared for Drizzle ORM (PostgreSQL).
- **Authentication:** Clerk for user authentication (Google Sign-in), replacing previous Replit Auth, protecting specific routes and pages.
- **Analytics:** Tracks signed-in user behavior, including page views, CTA clicks, session tracking, and page duration, with data stored in `user_journey_events`, `user_weekly_activity`, and `user_daily_page_metrics` tables. Admin analytics export functionality is available.

### Data Storage Solutions
- **Current:** In-memory storage (JavaScript Map) for user data.
- **Prepared Infrastructure:** Drizzle ORM for PostgreSQL (`@neondatabase/serverless`), schema defined in `/shared/schema.ts` with Zod validation.
- **Browser Storage:** LocalStorage for study session tracking, wellness data, and quiz results.

### Core Features
- **Excel Coaching Flow:** Guided learning path including quizzes, orientation, video lessons, assignments, file upload, and AI evaluation.
- **AI Evaluation System:** Rule-based AI for evaluating uploaded Excel assignments, providing feedback, and unlocking subsequent learning sprints.
- **Security:** HTTPS redirect and robust security headers (CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy).

## External Dependencies

### Authentication
- **Clerk:** User authentication and management.

### UI Component Libraries
- **Radix UI:** Accessible, unstyled component primitives.
- **Framer Motion:** Animation library.
- **Lucide React:** Icon library.
- **Embla Carousel:** Touch-friendly carousel.
- **CMDK:** Command palette functionality.
- **Vaul:** Drawer component library.

### Form Management
- **React Hook Form:** Form state management.
- **Hookform Resolvers:** Zod schema validation integration.
- **Zod:** Runtime type validation and schema definition.

### Database & ORM
- **Drizzle ORM:** Type-safe SQL query builder.
- **Drizzle Zod:** Schema to Zod validator conversion.
- **Neon Serverless:** PostgreSQL driver.

### Styling & Design
- **Tailwind CSS:** Utility-first CSS framework.
- **Class Variance Authority:** Type-safe component variant handling.
- **CLSX & Tailwind Merge:** Conditional className utilities.

### File Processing
- **Multer:** File upload middleware for Express.
- **SheetJS (xlsx):** Excel and CSV file parsing library.

### Development Utilities
- **Vite:** Build tool and dev server.
- **TSX:** TypeScript execution for Node.js.
- **Date-fns:** Date manipulation and formatting.