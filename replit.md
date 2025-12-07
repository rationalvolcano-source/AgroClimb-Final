## Overview

AgroClimb is an AI-powered career guidance platform for agricultural students in India, focusing on ABM, Banking, and JRF Horticulture. It offers AI-guided quizzes, interactive learning games, personalized study plans, and alumni mentorship. Inspired by Duolingo's engagement patterns and Linear/Notion's design, the platform aims to provide career clarity through instant fit scores, adaptive learning, and gamified experiences. Key features include a comprehensive wellness center, study tools, and a hub for upskilling and webinars.

## Recent Updates (December 2025)

### Clerk Authentication Integration (December 7, 2025)
-   **Replaced Replit Auth with Clerk**: Fixes production authentication on custom domain (www.agroclimb.com)
-   **Issue Resolved**: Replit Auth caused "getaddrinfo EAI_AGAIN helium" DNS errors on custom domains
-   **Clerk Features**: Google Sign-in enabled, modal-based authentication
-   **Files Updated**:
    - `client/src/App.tsx` - ClerkProvider wraps app
    - `client/src/hooks/useAuth.ts` - Uses Clerk's useUser hook
    - `client/src/components/EnrollmentGate.tsx` - Uses Clerk's SignInButton
-   **Environment Variables**:
    - `VITE_CLERK_PUBLISHABLE_KEY` - Frontend publishable key
    - `CLERK_SECRET_KEY` - Backend secret (for future backend integration)
-   **Protected Pages**: /digital-skills, /alumni-webinars, /daily-news (enrollment requires sign-in)

### PWA Implementation (December 6, 2025)
-   **Progressive Web App**: Site now installable as an Android app
-   **Manifest.json**: App name, icons (8 sizes: 72x72 to 512x512), theme colors, shortcuts
-   **Service Worker (sw.js)**: Offline caching with strategies:
    - Network-first for navigation requests
    - Cache-first for static assets (images, fonts, CSS)
    - Stale-while-revalidate for API calls
-   **Install Prompt Component**: User-friendly prompt to install the app
-   **Cached Routes**: Homepage, career quiz, interview prep, daily news, digital skills
-   **Files**:
    - `/public/manifest.json` - PWA manifest
    - `/public/sw.js` - Service worker
    - `/public/icons/` - App icons in 8 sizes
    - `/client/src/components/PWAInstallPrompt.tsx` - Install prompt UI

### SEO Keyword Optimization (December 1, 2025)
-   **Primary Target Keywords**: agriculture career guidance, agriculture career plan, horticulture career guidance, horticulture career plan
-   **Homepage Meta Updates**:
    - Title: "Agriculture Career Guidance & Career Plan | Horticulture Career Quiz - AgroClimb"
    - Description includes all 4 target keywords naturally
    - OG and Twitter cards updated with keyword-rich content
-   **Hero Section Updates**:
    - Headline: "Get your Agriculture Career Plan in 5 minutes"
    - Subheadline mentions both agriculture and horticulture career guidance
-   **Structured Data Updated**: JSON-LD descriptions include target keywords
-   **Mobile Navigation Fixed**: Interview Prep and Daily News now visible in Plan B dropdown on mobile
-   **Preview Games Button Removed**: CTA section cleaned up (games feature scrapped)

### Security Implementation (November 29, 2025)
-   **HTTPS Redirect**: HTTP to HTTPS redirect for production environment
-   **Security Headers**: Content-Security-Policy (upgrade-insecure-requests), X-Content-Type-Options, X-Frame-Options, Referrer-Policy
-   **CSP Meta Tag**: Added as client-side fallback in index.html

### SEO Implementation (November 29, 2025)
-   **Custom useSEO Hook**: Dynamic meta tag management with proper cleanup on route changes
-   **Sitemap.xml**: Dynamic sitemap served at /sitemap.xml with all pages, priorities, and change frequencies
-   **Robots.txt**: Crawler-friendly robots.txt at /robots.txt pointing to sitemap
-   **Structured Data** (JSON-LD in index.html):
    - EducationalOrganization schema (platform info)
    - WebSite schema with search action
    - FAQPage schema for common career questions
-   **SEO Landing Pages**: 5 career path pages (/careers/research, /careers/academics, /careers/agribusiness, /careers/banking, /careers/govt-jobs)
-   **Target Keywords**: BSc Agriculture career, BSc Horticulture jobs, ICAR JRF, IBPS AFO, agriculture career guidance India, government jobs agriculture

### Navigation & Feature Restructure (November 28, 2025)
-   **Main Navigation Updated**: 
    - Books, Plan B dropdown, Interview Prep, Daily News
    - Removed: Wellness Centre, Study With Me (SWM)
-   **Plan B Dropdown**: Now contains:
    - Digital Skills (/digital-skills) - Live Zoom training
    - Alumni Webinars (/alumni-webinars)
-   **Interview Prep** - Now a main nav item at /interview-prep:
    - Exam selection dropdown: ABM/CAT, IBPS SO-AFO, Others (with text input)
    - Topics covered: Self-presentation, common questions, body language, mock interviews
    - WhatsApp CTA with selected exam name pre-filled in message
    - Button disabled until exam type is selected
-   **Daily News** - Now a main nav item at /daily-news:
    - Coming Soon placeholder page
    - WhatsApp notification signup
-   **Digital Skills Page** (/digital-skills):
    - 7-week curriculum: Excel (Weeks 1-3), Data Visualization (Weeks 4-5), PowerPoint (Weeks 6-7)
    - Highlights: Weekly live sessions, 1-2 hours per session, Small batch, WhatsApp group
    - WhatsApp CTA to join training group (+91 8250904021)
    - Lightweight design for 2G/3G networks
-   **Legacy Redirect**: /planb-webinars now redirects to /digital-skills

### Games Section Removed (November 28, 2025)
-   **Games Scrapped**: All game pages removed (Flashcard Duel, Number Sprint, Word Sprint)
-   **Simplified Focus**: Platform now focuses on career prep and upskilling

## Previous Updates (October 2025)

### Platform Rebrand (October 22, 2025)
-   **Platform Name**: Changed from "The Agro Vision" to "AgroClimb"
-   **New Logo**: Mountain with upward arrow design (emerald-cyan gradient)
-   **Logo Optimization**: 1.16 MB PNG → 33 KB WebP (97.2% reduction)
-   **All Visual Elements Preserved**: Gradients, animations, styling 100% intact
-   **Updated Files**: Nav, Footer, HTML meta tags, testimonials, value props

### Plan B Coaching Flow (Excel Entry System)
-   **Overall Architecture**: Welcome Page → Quiz → Orientation → Video Lesson → Assignment → Excel File Upload → Farmer Kiran AI Evaluation
-   **Excel Quiz Scoring**: Updated thresholds to 0-6 (Beginner/red), 7-9 (Intermediate/amber), 10 (Expert/green)
-   **Excel Orientation**: Enhanced with hero section headings for all 8 steps (e.g., "Welcome Aboard!", "What You Will Learn", "Ready for Takeoff?") using gradient text styling
-   **Rocket Launch Animation**: 2-second rocket animation on final orientation step, auto-navigates to Excel Sprints page
-   **Excel Sprints Page**: New page at `/excel-sprints` featuring 8 sprint cards:
    - Sprint 1: Introduction to Excel (BookOpen icon, unlocked)
    - Sprint 2: Clean Messy Data (Database icon)
    - Sprint 3: Formulas That Think (Brain icon)
    - Sprint 4: Pivots & Charts (BarChart3 icon)
    - Sprint 5: Print-Ready Reports (Printer icon)
    - Sprint 6: Quick Automation (Zap icon)
    - Sprint 7: Everyday Tricks (Download icon)
    - Sprint 8: Final Project (Trophy icon)
    - Sprints 2-8 locked with progression system
-   **Learning Flow**: Each sprint follows consistent pattern: Video Tutorial → Practice Assignment → File Upload → AI Evaluation → Unlock Next Sprint
-   **No In-Browser Sandbox**: Students practice in their own Excel application (Microsoft Excel, Google Sheets, LibreOffice) for real-world skill building

### Sprint 1 - File Upload + AI Evaluation System (October 23, 2025)
-   **Approach Change**: Scrapped in-browser Excel sandbox in favor of simpler file upload + AI evaluation
-   **User Flow**: Students watch video → practice in their own Excel → upload file → receive AI feedback
-   **File Support**: Primary support for Excel files (.xlsx, .xls) with CSV fallback for compatibility
-   **URL Structure**: Accessible at `/sprint1.html` (legacy `/sprint1-v2.html` redirects for backward compatibility)
-   **Backend Architecture**:
    - SheetJS (xlsx library) for universal spreadsheet parsing
    - Multer for file upload handling (5MB limit)
    - Column name normalization to handle special character encoding (₹ symbol)
    - Defensive validation: file type, empty data, parse errors
-   **AI Evaluation Logic** (Rule-based):
    - Task 1: Check for ≥5 complete rows (all fields filled)
    - Task 2: Verify Qty values are numeric (no commas)
    - Task 3: Validate Total = Qty × Price (correct formula calculations)
    - Score: 3/3 required to pass and unlock Sprint 2
-   **Frontend Features**:
    - Standalone HTML file (sprint1.html) optimized for 2G/3G networks
    - Drag-drop file upload with file info display
    - Loading states during evaluation
    - Detailed feedback with checkmarks/error messages
    - Retry functionality
    - localStorage progress tracking
-   **Error Handling**: Comprehensive validation with user-friendly error messages
-   **Performance**: Lightweight implementation (<50KB), fast parsing, minimal network usage
-   **Benefits**: Students use real Excel (builds actual skills), works on all devices, simpler architecture

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

### File Processing

-   **Multer:** File upload middleware for Express.
-   **SheetJS (xlsx):** Excel and CSV file parsing library.
-   **PapaParse:** CSV parsing (deprecated in favor of SheetJS).

### Development Tools

-   **Vite:** Build tool and dev server.
-   **TSX:** TypeScript execution for Node.js.
-   **Replit Plugins:** Runtime error overlay, cartographer, dev banner.
-   **Date-fns:** Date manipulation and formatting.