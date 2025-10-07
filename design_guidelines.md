# TAV Career Compass - Design Guidelines

## Design Approach: Reference-Based (Education-Tech Hybrid)

**Primary References:**
- **Duolingo** - Gamification, progress tracking, psychological engagement
- **Linear** - Clean typography, minimal animations, professional dark mode
- **Notion** - Content hierarchy, card-based layouts, friendly yet professional

**Rationale:** This is an experience-focused platform where emotional engagement drives conversion. Students need to feel motivated, capable, and excited about their career path while trusting the platform's credibility.

---

## Color Palette

### Dark Mode (Primary)
- **Background:** Slate-950 (deep, professional darkness)
- **Surface:** Slate-900/60 opacity for cards and sections
- **Borders:** Slate-800 for subtle definition, Slate-700 for hover states

### Brand Colors
- **Primary Emerald:** 160° 84% 45% (trust, growth, achievement)
- **Accent Emerald Light:** 160° 60% 60% (highlights, CTAs)
- **Accent Cyan:** 180° 65% 55% (gradient accents, visual interest)

### Semantic Colors
- **Text Primary:** Slate-50 (high contrast)
- **Text Secondary:** Slate-300/90 opacity (body text)
- **Text Muted:** Slate-400 (labels, captions)
- **Success/Highlight:** Emerald-400 (quiz results, achievements)

### Gradient Applications
- **Hero Background:** Subtle radial gradients from emerald-600/20 to cyan-600/10
- **CTA Sections:** from-emerald-600/20 to-cyan-600/10 with emerald-500/30 borders
- **Glow Effects:** Positioned absolute decorative dots with emerald-to-cyan gradients

---

## Typography

### Font Stack
- **Primary:** System font stack (SF Pro Display, Segoe UI, system-ui) for clean, native feel
- **Weights:** Semibold (600) for headings, Regular (400) for body

### Hierarchy
- **H1 (Hero):** 3xl mobile / 5xl desktop, leading-tight, font-semibold
- **H2 (Section Titles):** 2xl mobile / 3xl desktop, font-semibold
- **H3 (Card Titles):** base to lg, font-semibold
- **Body:** base mobile / lg desktop, text-slate-300/90
- **Small Text:** sm (14px) for captions, stats, fine print
- **Micro Text:** xs (12px) for badges, labels

---

## Layout System

### Spacing Primitives
- **Container:** max-w-7xl with px-4 (consistent page margins)
- **Vertical Rhythm:** py-12 for sections, py-6 for compact sections, py-16 for major CTAs
- **Card Padding:** p-6 for content cards, p-4 for compact cards
- **Gap Sizes:** gap-3 (buttons), gap-4 (cards), gap-6 (major sections), gap-8 (grid layouts)

### Grid Systems
- **Hero:** 2-column grid on desktop (md:grid-cols-2), stacked mobile
- **Features:** 4-column grid (md:grid-cols-4), responsive collapse
- **Pricing:** 3-column grid (md:grid-cols-3)
- **Testimonials/FAQ:** 3-column grid (md:grid-cols-3)

### Border Radius
- **Cards:** rounded-2xl to rounded-3xl (16-24px) for modern, friendly feel
- **Buttons:** default rounded-md
- **Badges/Pills:** rounded-full
- **Images/Mockups:** rounded-3xl for hero visual

---

## Component Library

### Navigation
- **Sticky top bar** with backdrop-blur and 70% opacity background
- **Logo area:** Sparkles icon + brand name
- **Links:** Hidden on mobile, visible md+, opacity-80 with hover:opacity-100
- **CTAs:** Ghost variant for Sign In, Emerald primary for main action

### Hero Section
- **Layout:** Two-column with content left, visual right
- **Badge:** Small pill with icon, emerald-500/10 background, ring-1 ring-emerald-500/30
- **Headline:** Large, bold, with emerald-400 accent on key phrase
- **Description:** Generous line-height, max-w-xl constraint
- **CTA Group:** Primary + Secondary buttons stacked mobile, row desktop
- **Micro-bullets:** 3-column grid of small feature mentions below CTAs

### Social Proof Bar
- **Format:** 4-column stat grid in rounded container
- **Stats:** Large numbers (2xl font), small labels (xs text-slate-400)
- **Background:** slate-900/50 with border-slate-800

### Feature Cards
- **Icon Container:** 10x10 rounded-xl box with emerald-500/10 background
- **Title:** text-base font-semibold with mt-3
- **Description:** text-sm text-slate-400
- **Hover State:** border-slate-700 transition

### Pricing Cards
- **Highlight Treatment:** Popular plan gets emerald-500/60 border + shadow-emerald-500/20
- **Badge:** "Popular" badge positioned top-right of card header
- **Price Display:** 3xl font-semibold
- **Bullets:** Emerald dot + text layout
- **CTA:** Full-width button at card bottom

### Testimonial Cards
- **Quote Styling:** Regular text-slate-200 with quote marks
- **Attribution:** Small text-slate-400 with em-dash

### Buttons
- **Primary:** bg-emerald-500 hover:bg-emerald-400 with icons (ArrowRight, PlayCircle)
- **Secondary:** bg-slate-200 text-slate-900 hover:bg-white
- **Ghost:** Subtle for secondary actions
- **Sizes:** Standard and lg for major CTAs

---

## Animations & Interactions

### Framer Motion Variants
- **Fade Up:** opacity 0→1, y 20→0, duration 0.6s
- **Trigger:** whileInView with viewport: { once: true } for scroll reveals
- **Application:** Hero elements, feature cards, section content

### Transitions
- **Hover States:** transition-all for smooth border/background changes
- **No Excessive Animation:** Keep animations purposeful and subtle
- **Performance:** Use transform and opacity for GPU-accelerated animations

### Decorative Elements
- **Glow Dots:** Absolute positioned gradient circles for visual interest
- **Gradient Backgrounds:** Subtle, large-scale radial gradients behind hero

---

## Images

### Hero Visual (Right Column)
- **Type:** Mockup card showing quiz interface or dashboard preview
- **Treatment:** Wrapped in rounded-3xl gradient border container (from-slate-800/60 to-slate-900/60)
- **Shadow:** shadow-2xl for depth
- **Decorative:** Add 2 positioned glow dots around mockup for visual interest
- **Placeholder:** Create simple card showing quiz questions, progress bar, or career pathways visualization

### No Other Images Required
- Icons from Lucide React library sufficient for feature cards
- Focus on clean, icon-driven design without stock photography
- If adding visual elements later: Use illustrations in emerald/cyan gradient style

---

## Psychological Design Elements

### Trust Builders
- **Stats Section:** Real numbers (25k+ quiz completions) immediately after hero
- **Testimonials:** Specific names with track mentions (Ananya, ABM)
- **Badges:** "AI-guided, exam-proven learning" badge in hero
- **Pricing Transparency:** Clear "3 free plays per Gmail" note

### FOMO & Urgency
- **Popular Badge:** On Pro pricing tier
- **Social Proof:** Alumni session frequency, active user metrics
- **Quick Win:** "Take Free Career Quiz" as immediate, no-commitment action

### Clarity & Progression
- **Value Prop Cards:** Each feature gets dedicated card with icon + clear benefit
- **Quiz-First Funnel:** Free quiz → See results → Upgrade path
- **Tiered Offerings:** Clear progression from Books → Pro → Ultra with cumulative benefits

### Motivational Language
- **Headline:** "Clarity today. Career wins all year." (immediate + long-term benefit)
- **Action-Oriented:** "Take," "Explore," "Get," "Go" verbs in CTAs
- **Student-Centric:** References to "fit score," "your plan," "your pathway"

---

## Accessibility & Usability

- **Contrast:** All text meets WCAG AA on dark backgrounds
- **Focus States:** Visible keyboard navigation indicators
- **Responsive:** Mobile-first with intentional desktop enhancements
- **Smooth Scroll:** Anchor links to #features, #pricing, #faq sections
- **Loading States:** Instant navigation, no loading spinners on static page

---

## Implementation Notes

- **Single-Page Component:** All sections in one scrollable page
- **Module Placeholders:** CTAs link to future modules (quiz, games, sign-in)
- **Performance:** Lazy-load Framer Motion, optimize for initial render
- **Consistency:** Use shadcn/ui Button and Card components throughout