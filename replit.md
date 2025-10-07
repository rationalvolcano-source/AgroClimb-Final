# The Agri Vision - AI-Guided Career Platform

## Overview

The Agri Vision is an AI-powered career guidance platform designed specifically for agricultural students in India. The platform helps students discover their best-fit career paths across ABM (Agribusiness Management), Banking, and JRF Horticulture through AI-guided quizzes, interactive learning games, and personalized study plans. It combines psychological engagement patterns from platforms like Duolingo with professional design aesthetics inspired by Linear and Notion to create an experience-focused education-tech solution.

The application aims to solve career clarity challenges by providing instant fit scores, adaptive study plans, gamified learning experiences, and direct alumni mentorship - all within a single cohesive platform.

### Current Pages
1. **Landing Page** (`/`) - Main marketing page with hero, features, pricing, and FAQ sections
2. **Study With Me** (`/swm`) - Focus mode with binaural beats audio, timer, and session tracking
3. **Wellness Centre** (`/wellness`) - Calm corner with yoga videos, breathing exercises, mental sharpness tips, and daily check-ins

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