## Overview

AgroClimb is an AI-powered career guidance platform for agricultural students in India, focusing on ABM, Banking, and JRF Horticulture. It offers AI-guided quizzes, interactive learning games, personalized study plans, and alumni mentorship. Inspired by Duolingo's engagement patterns and Linear/Notion's design, the platform aims to provide career clarity through instant fit scores, adaptive learning, and gamified experiences. Key features include a comprehensive wellness center, study tools, and a hub for upskilling and webinars.

## Recent Updates (October 2025)

### Platform Rebrand (October 22, 2025)
-   **Platform Name**: Changed from "The Agro Vision" to "AgroClimb"
-   **New Logo**: Mountain with upward arrow design (emerald-cyan gradient)
-   **Logo Optimization**: 1.16 MB PNG → 33 KB WebP (97.2% reduction)
-   **All Visual Elements Preserved**: Gradients, animations, styling 100% intact
-   **Updated Files**: Nav, Footer, HTML meta tags, testimonials, value props

### Excel Entry System (Plan B)
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
-   **User Flow**: Seamless navigation from Excel Quiz → Orientation → Rocket Animation → Sprints

### Sprint 1 with Real Excel (October 23, 2025)
-   **Luckysheet Integration**: Replaced simple table with real Excel interface using Luckysheet library (jsDelivr CDN)
-   **Lazy Loading**: Luckysheet CSS/JS (3 files) only load when user clicks "Start Practice" or "Skip video" - zero network requests until needed
-   **Real Excel Features**: 
    - Full spreadsheet interface with cell selection, formulas, fill handle
    - Excel toolbar: undo/redo, bold, wrap text, merge cells, borders, alignment, freeze panes, formulas
    - Frozen header row for easy navigation
    - Formula support: users type `=C2*D2` for calculations
    - 50 rows × 12 columns workspace
-   **Seed Data**: 4 pre-filled rows (Aarav/Tomato, Meera/Potato, Ishita/Onion, Vikram/Chilli) with deliberate errors for learning
-   **Validation System**: Uses `luckysheet.getSheetData()` API to read cell data, checks for:
    - Task 1: ≥5 complete rows with no blanks
    - Task 2: Numeric Qty values (no commas like "1,000")
    - Task 3: Correct Total formulas (=Qty×Price)
-   **Farmer Kiran AI Hints**: Excel-specific guidance (formulas, fill handle, numeric formatting)
-   **Auto-Formula Helper**: If Total missing, writes `=C2*D2` and hints to fill down
-   **Error Highlighting**: Orange borders on problem cells when validation fails
-   **All Preserved**: Timer (8 min), 3 tasks, Reflect section, localStorage progress tracking
-   **Performance**: Lazy loading ensures no performance impact until practice starts

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