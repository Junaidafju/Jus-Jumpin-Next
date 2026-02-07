



## 1. Project Vision

JusJumpin.com represents a chain of indoor trampoline & play parks across India. The new website must:

- Build **trust with parents**
- Create **excitement for kids & teens**
- Feel **professional for schools & corporates**
- Drive **bookings, enquiries, and visits**

Brand positioning:
> **Premium Playful Experience** – a hybrid of playful energy, clean structure, and premium trust.

---

## 2. Core Objectives

- Preserve existing SEO completely (no change in slugs, titles, descriptions)
- Improve performance (Core Web Vitals, loading speed)
- Enable easy content updates via CMS (Sanity)
- Support long-term scalability for new locations
- Create a modern UI with smooth, premium animations
- Build a strong foundation for SEO growth (blogs, locations, activities)

---

## 3. What Will Remain Exactly the Same (SEO Lock)

These elements will be migrated **without any change**:

- All existing URL slugs (e.g. `/kolkata-abc-square-building-best-adult-trampoline-park/`)
- All meta titles
- All meta descriptions
- Existing URL structure
- Page types and indexing behavior
- LocalBusiness schema intent and data

This ensures:

- No ranking loss
- No reindexing risk
- No traffic volatility
- Safe professional migration

---

## 4. Website Purpose & User Intent

People visit JusJumpin.com to:

- Discover activities (trampolines, soft play, climbing, etc.)
- Find nearby locations
- View pricing for a specific venue
- Book sessions (via embedded booking system)
- Enquire about birthday parties
- Enquire about school trips
- Contact for general queries

Primary audiences:

- Parents (25–45, kids aged 2–14)
- Birthday & event planners
- Teenagers and young adults
- Schools and institutions
- Corporate groups

---

## 5. Pages Required at Launch

These pages will be built in the new system:

- Home
- About
- Our Activities
- Birthday Celebration
- School Trips
- Blog (listing + single post)
- Contact
- Individual Location Pages (all existing slugs preserved)

Each location page includes:

- Venue details
- Pricing section
- Activities available
- Gallery
- Embedded booking widget
- Location-specific enquiry form

---

## 6. Technology Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion + Lenis (smooth scroll) + GSAP (for special sections)
- **CMS:** Sanity (content, locations, pricing, blogs)
- **Hosting:** Vercel
- **Analytics:** GA4 + Google Tag Manager
- **SEO Tools:** Next.js Metadata API, next-sitemap

This stack supports:

- High performance
- Easy scaling
- Modern UI
- SEO stability
- Editor-friendly CMS

---

## 7. CMS (Sanity) Content Structure

Sanity will be configured so that content can be updated without touching code.

### Location Document

Each location will contain:

- Name
- Slug (exact existing slug)
- City / State
- Address
- Phone number
- Google Maps link
- Images / gallery
- Pricing table
- Activities available
- Timings
- SEO Title (exact current title)
- SEO Description (exact current description)
- Schema-related data (address, geo, etc.)

### Other Content Types

- Activity
- Blog Post
- Party Package
- General Pages (About, School Trips, etc.)

---

## 8. SEO Migration Strategy

The migration will follow strict SEO-safe practices:

- Same URLs preserved
- Same meta titles & descriptions injected dynamically
- Canonical URLs preserved
- Schema output remains equivalent
- Sitemap regenerated and submitted
- Google Search Console monitored post-launch

No redirects required initially because slugs remain unchanged.

---

## 9. Animation & Experience Direction

Style direction:

- Premium but playful
- Friendly motion (not aggressive)
- Smooth transitions
- Delightful micro-interactions
- Professional clarity for parents

Motion examples:

- Smooth section reveals on scroll
- Playful hover effects on cards
- Magnetic buttons for CTAs
- Animated hero sections
- Gentle parallax on images

Goal:
> Feels modern and delightful, but still trustworthy for families.

---

## 10. Development Phases

### Phase 1: Architecture & Setup

- Setup Next.js project
- Setup Tailwind
- Setup Sanity project
- Define CMS schemas
- Configure routing to match slugs

### Phase 2: Core System

- Layout system
- Header & footer
- SEO metadata system
- Dynamic slug-based routing
- Schema injection

### Phase 3: Page Builds

- Home
- About
- Activities
- Birthday
- School Trips
- Contact
- Blog
- Location pages

### Phase 4: Integration

- Sanity content integration
- Booking widget embed
- Forms integration

### Phase 5: SEO & Performance

- Metadata validation
- Sitemap generation
- Core Web Vitals optimization
- Mobile responsiveness testing

### Phase 6: Launch & Validation

- Production deployment
- Search Console validation
- Analytics verification
- Final QA

---

## 11. Scalability Plan

This architecture allows:

- Adding new locations without dev work
- Adding new blogs easily
- Expanding to new services
- Multi-city SEO scaling
- Future dashboards or booking systems

The website becomes a long-term digital platform, not just a brochure site.

---

## 12. Current Constraints (Locked Decisions)

- SEO fields must not change for now
- Slugs must remain exactly the same
- Focus on quality over speed
- CMS must be included
- Project is long-term scalable

---

## 13. Success Criteria

The rebuild is considered successful when:

- All pages retain rankings
- Site performance improves significantly
- Content updates are easy via CMS
- Users find the site easier to navigate
- Enquiries and bookings increase
- Platform supports future growth

---

## 14. Next Implementation Step

With this plan finalized, the next execution step is typically one of:

- Build Next.js project structure
- Design homepage experience layout
- Implement CMS schemas
- Build SEO system (metadata + schema engine)

---
## 14. Next Implementation Step

With this plan finalized, the recommended execution order is:

1. Set up the development environment (local tools, repos, accounts)
2. Create the base Next.js project
3. Create the Sanity CMS project and schemas
4. Connect Next.js ↔ Sanity (data fetching)
5. Implement SEO system (metadata + schema)
6. Build Location page first (highest business + SEO value)
7. Build remaining pages (Home, Activities, Birthday, etc.)

---

## 15. How to Start (Practical Step-by-Step Kickoff)

This section explains exactly how the project should begin from zero.

### 15.1 Accounts & Tools Required

Before development begins, ensure these are ready:

- GitHub account (code repository)
- Vercel account (deployment & previews)
- Sanity account (CMS project)
- Google Analytics (GA4 property)
- Google Search Console access for jusjumpin.com
- Domain & DNS access (GoDaddy)

These are foundational for professional workflow.

---

### 15.2 Development Environment Setup

On the development machine:

- Node.js (LTS version)
- npm or pnpm
- VS Code
- Git installed

This ensures any developer can run the project locally without friction.

---

### 15.3 Repository Structure (Professional Workflow)

Create a GitHub repository such as:

- jusjumpin-nextjs

Main branches:

- main → production-ready code
- dev → ongoing development

Deployment flow:

- Push to dev → Preview deployment on Vercel
- Merge to main → Production deployment

This gives you:

- Version history
- Safe testing
- Rollback capability
- Team collaboration

---

### 15.4 First Technical Milestone

The very first deliverable should be:

> A working Next.js app deployed on Vercel showing a basic page but running on the real domain (or preview URL).

This confirms:

- Hosting is working
- CI/CD is working
- Project foundation is correct

Only after this should real features be built.

---

## 16. Recommended Build Order (So the project stays structured)

Instead of building everything randomly, follow this sequence:

1. Base setup (Next.js + Tailwind + layout)
2. SEO system (metadata injection, schema support)
3. Sanity schemas (Location, Blog, Activity)
4. Location pages (dynamic routing using existing slugs)
5. Contact forms integration
6. Home page
7. Activities page
8. Birthday page
9. School trips page
10. Blog system
11. Final performance & SEO validation

This ensures:

- SEO-critical pages are validated first
- Architecture stays clean
- No rework later

---

## 17. Developer Handover Checklist

If you give this project to a developer or agency, they should clearly confirm:

- [ ] Slugs will remain identical to WordPress
- [ ] Meta titles and descriptions will be migrated without change
- [ ] Dynamic routing supports all existing URLs
- [ ] Sanity CMS is properly structured
- [ ] Schema is implemented for all location pages
- [ ] Lighthouse performance is optimized
- [ ] Mobile UX is fully tested
- [ ] Forms are tested end-to-end
- [ ] GA4 and events are firing correctly

If a developer cannot confidently agree to these points, they are not ready to handle a sensitive SEO migration.

---

## 18. Risk Control

To keep the migration safe:

- No URL changes at initial launch
- No bulk SEO rewrites initially
- No indexing experiments
- Careful staging/testing before go-live

Only after stability is confirmed should SEO optimizations begin.

---

## 19. Page-by-Page Wireframe Structure

This section defines the **exact content structure** for each major page so designers and developers know what to build and in what order. This is UX + conversion focused while keeping SEO intact.

---

### 19.1 Home Page (Conversion-Focused)

Purpose: Inspire, build trust, and drive users to booking or enquiry.

Recommended sections (top to bottom):

1. Hero Section
   - Large headline (emotion-driven)
   - Subheadline explaining value
   - Primary CTA: Book Now
   - Secondary CTA: Explore Locations
   - Visual: High-quality play zone imagery or video

2. Trust Strip
   - Safety, Hygiene, Trained Staff, Fun for All Ages
   - Icons or badges

3. Why Jus Jumpin
   - Key differentiators (diverse zones, safe, premium experience, mall locations)

4. Activities Preview
   - Cards for top activities (Trampoline, Soft Play, Climbing, etc.)
   - Link to full Activities page

5. Locations Preview
   - Top cities shown
   - Link to individual location pages

6. Birthday & Events Highlight
   - Emotional section focused on celebrations
   - Link to Birthday Celebration page

7. Testimonials / Social Proof
   - Parent feedback
   - Google rating if available

8. Primary CTA Section
   - Strong visual block
   - "Plan Your Visit" or "Book Your Slot"

---

### 19.2 Location Page (Highest SEO + Business Value)

Each location page (using existing slug) should contain:

1. Location Hero
   - Venue name
   - City + Mall name
   - Strong venue image

2. Quick Info Bar
   - Address
   - Phone
   - Timings
   - Google Map link

3. About This Venue
   - Short description from CMS

4. Activities Available Here
   - Filtered list of activities present at this location

5. Pricing Section
   - Pulled from CMS
   - Clear readable pricing table

6. Gallery
   - Venue photos

7. Booking Section
   - Embedded booking widget (existing system)

8. Enquiry Form
   - Location-specific form (birthday, school, general)

9. FAQs (Optional but recommended)

---

### 19.3 Activities Page

Purpose: SEO growth + helping parents understand offerings.

Structure:

- Hero: "Our Activities"
- Grid of activity cards
- Each activity includes:
  - Name
  - Image
  - Short description
  - Benefits for kids

Activities can be managed through Sanity CMS.

---

### 19.4 Birthday Celebration Page

Purpose: Lead generation and conversion.

Structure:

- Hero focused on kids joy
- Why celebrate birthdays at Jus Jumpin
- Packages (from CMS)
- What’s included
- Gallery of past parties
- Testimonials
- Enquiry form (high prominence)

---

### 19.5 School Trips Page

Purpose: Institutional trust + group leads.

Structure:

- Hero with school-friendly messaging
- Educational + physical benefits
- Safety & supervision assurance
- Group packages (if applicable)
- Process for schools
- Enquiry form

---

### 19.6 Blog

Blog Listing:

- Grid of articles
- Category/tag support (optional)

Single Blog Post:

- Title
- Featured image
- Content body
- Internal links to activities/locations

---

### 19.7 Contact Page

Structure:

- General contact form
- Central contact info
- Business enquiries
- Franchise / partnership (optional future expansion)

---

### 19.8 About Page

Structure:

- Brand story
- Vision & mission
- Safety philosophy
- Growth across India
- Team or brand credibility

---
## 20. Sanity CMS Schema Definitions (Technical, Unambiguous)

This section defines the **exact content models** that must exist in Sanity so developers and editors have a clear, consistent structure. These schemas are designed to support your current SEO lock (slugs, titles, descriptions unchanged) while allowing future scalability.

> All SEO fields below must be filled with the **existing values from WordPress** during migration.

---

### 20.1 Location (Core Content Type)

Used for every existing location page such as:
`/kolkata-abc-square-building-best-adult-trampoline-park/`

**Fields:**

- `name` (string, required)
  - Example: "Kolkata - ABC Square Building"

- `slug` (slug, required, unique)
  - Must match existing slug exactly
  - Example: `kolkata-abc-square-building-best-adult-trampoline-park`

- `city` (string, required)
  - Example: Kolkata

- `state` (string, required)
  - Example: West Bengal

- `address` (text, required)

- `phone` (string, required)

- `email` (string, optional)

- `googleMapUrl` (url, required)

- `latitude` (number, required)

- `longitude` (number, required)

- `timings` (string, required)
  - Example: "11:00 AM – 9:30 PM"

- `heroImage` (image, required)

- `gallery` (array of images)

- `activities` (array of references → Activity)

- `pricingTable` (array of objects)
  - Each object contains:
    - `label` (string) → e.g. "Weekday 1 Hour"
    - `price` (string) → e.g. "₹499"

- `shortDescription` (text)

- `seoTitle` (string, required)
  - Must match existing meta title exactly

- `seoDescription` (text, required)
  - Must match existing meta description exactly

This ensures each location page can fully generate:
- Page content
- SEO metadata
- LocalBusiness schema

---

### 20.2 Activity

Used for Activities page and for filtering activities per location.

**Fields:**

- `title` (string, required)
- `slug` (slug, required)
- `image` (image)
- `shortDescription` (text)
- `ageGroup` (string, optional)
- `benefits` (array of strings)

---

### 20.3 Blog Post

Used for SEO growth and content marketing.

**Fields:**

- `title` (string, required)
- `slug` (slug, required)
- `featuredImage` (image)
- `publishedDate` (datetime)
- `author` (string)
- `content` (rich text / portable text)
- `seoTitle` (string)
- `seoDescription` (text)

---

### 20.4 Page (Generic Pages like About, Contact, School Trips)

This allows flexible editing for non-location pages.

**Fields:**

- `title` (string, required)
- `slug` (slug, required)
- `heroTitle` (string)
- `heroSubtitle` (text)
- `content` (rich text / blocks)
- `seoTitle` (string, required)
- `seoDescription` (text, required)

Examples used for:
- About
- Birthday Celebration
- School Trips
- Contact

---

### 20.5 Party Package (Optional but Recommended)

Used on Birthday Celebration pages.

**Fields:**

- `name` (string)
- `price` (string)
- `duration` (string)
- `includes` (array of strings)
- `highlighted` (boolean)

---

## 21. Editorial Rules (Important for Data Consistency)

These rules must be followed by anyone managing the CMS:

- Slug must never be changed for migrated pages
- SEO Title must remain unchanged unless SEO phase begins
- SEO Description must remain unchanged unless SEO phase begins
- Phone numbers and addresses must stay accurate per location
- Images should be compressed and high quality

These guardrails protect SEO and brand integrity.

## 22. SEO Implementation (Technical – Next.js + Sanity)

This section defines exactly how SEO will be implemented technically while preserving existing slugs, titles, and descriptions.

---

### 22.1 Metadata (Title & Description)

Each page will use Next.js Metadata API and fetch SEO fields from Sanity.

For every page (Location, Blog, Generic Page):

- `seoTitle` → Injected into `<title>`
- `seoDescription` → Injected into `<meta name="description">`

Behavior rules:

- If SEO fields exist in Sanity → use them directly (no modification)
- Slugs remain unchanged → routes resolve dynamically

This guarantees the live HTML output matches current SEO.

---

### 22.2 Canonical URLs

Each page will include a canonical tag based on its live URL:

- Example for location page:
  - https://www.jusjumpin.com/kolkata-abc-square-building-best-adult-trampoline-park/

This avoids duplicate content issues and protects rankings.

---

### 22.3 Schema (JSON-LD)

Schema will be generated dynamically on location pages using Sanity fields:

Location pages will output `LocalBusiness` schema using:

- Name
- Address
- Phone
- Geo (latitude, longitude)
- Opening hours
- Image
- URL
- Map link

The structure will match your current schema intent, but will be dynamically generated instead of hard-coded.

This ensures:

- Google understands each venue as a unique entity
- Easy scalability when new locations are added
- No manual schema coding per page

---

### 22.4 Sitemap.xml

A dynamic sitemap will be generated including:

- Home
- About
- Activities
- Birthday
- School Trips
- Contact
- All Location pages (Location) (Click/Hover)
├── West Bengal
│   ├── Kolkata - ABC Square Building
│   ├── Kolkata - Avani Mall
│   ├── Kolkata - Axis Mall
│   ├── Kolkata - City Centre 2
│   ├── Siliguri - City Centre
│   └── Durgapur - Junction Mall
├── Karnataka
│   ├── Bengaluru - M5 Ecity Mall
│   └── Bengaluru - Meenakshi Mall
├── Jharkhand
│   ├── Dhanbad - Prabhatam Mall
│   ├── Jamshedpur - P&M Mall
│   └── Ranchi - Nucleus Mall
├── Uttar Pradesh
│   ├── Noida - GIP Mall
│   └── Noida - Spectrum Mall
├── Maharashtra
│   ├── Thane - R Mall
│   ├── Nagpur - VR Mall
│   ├── Pune - Seasons Mall
│   ├── Nashik - City Centre
│   └── Ghatkopar - R City Mall
├── Chhattisgarh
│   └── Raipur - Zora Mall
└── Gujarat
    └── Surat - VR Mall
- All Blog posts

The sitemap will auto-update whenever new content is added in Sanity.

This ensures:

- Fast indexing
- No manual SEO maintenance
- Scalable growth

---

### 22.5 robots.txt

Robots file behavior:

- Allow all public pages
- Block admin or preview URLs
- Reference sitemap location

Example behavior:

- Allow: /
- Disallow: /studio (Sanity CMS)
- Sitemap: https://www.jusjumpin.com/sitemap.xml

---

### 22.6 Redirect Strategy

Because slugs are preserved:

- No bulk redirects are required initially

Future SEO phase (optional later):

- If slugs are optimized later
- Then 301 redirects will be added using Next.js redirects configuration

For now:
> Zero SEO disruption

---

## 23. Component Library Specification (Reusable System)

This defines the reusable React components that must be built to ensure consistency, scalability, and maintainability.

---

### 23.1 Layout Components

- `SiteHeader`
  - Logo
  - Navigation
  - Mobile menu

- `SiteFooter`
  - Footer links
  - Contact info
  - Social links

- `PageLayout`
  - Shared layout wrapper

---

### 23.2 SEO & System Components

- `SeoHead`
  - Injects title, description, canonical, schema

- `SchemaRenderer`
  - Outputs JSON-LD dynamically

- `RouteGuard`
  - Handles dynamic slug-based routing

---

### 23.3 UI Components

- `Button`
- `MagneticButton`
- `Card`
- `ImageCard`
- `IconBadge`
- `PricingTable`
- `TestimonialCard`

---

### 23.4 Page Sections

Reusable sections used across pages:

- `HeroSection`
- `TrustStrip`
- `ActivitiesGrid`
- `LocationsGrid`
- `GallerySlider`
- `BookingEmbed`
- `EnquiryForm`
- `FaqAccordion`
- `CtaSection`

---

### 23.5 Location-Specific Components

- `LocationHero`
- `LocationInfoBar`
- `LocationGallery`
- `LocationPricing`
- `LocationActivities`

---

### 23.6 Blog Components

- `BlogCard`
- `BlogGrid`
- `BlogContent`

---

### 23.7 CMS-Driven Components

These must accept data directly from Sanity:

- `LocationPageRenderer`
- `ActivityRenderer`
- `BlogRenderer`
- `GenericPageRenderer`

This ensures all content is dynamic and editable without code changes.

---

## 24. Why This Component System Matters

This approach ensures:

- Design consistency
- Faster future development
- Easy redesigns later
- Safe scaling when adding new locations
- Clean, professional codebase


**Document Status:** Approved Planning Blueprint


## 25. Project Folder Structure
 | app
 |--about
 |   |--page.tsx
 |--activities
 |   |--page.tsx
 |--birthday-celebration
 |   |--page.tsx
 |--blogs
 |   |--page.tsx
 |--components
 |   |--AnimatedHeader.tsx
 |   |--HomeHero3D.tsx
 |--contacts
 |   |--page.tsx
 |--school-trips
 |   |--page.tsx
 |--favicon.ico
 |--globals.css
 |--layout.tsx
 |--page.tsx
 |node_modules
 |public
 |.gitignore
 |eslint.config.mjs
 |next-env.d.ts
 |next.config
 |package-lock.json
 |package.json.ts
 |postcss.config.mjs
 |README.md
 |tsconfig.json



This file represents the agreed roadmap for rebuilding JusJumpin.com on a modern stack while preserving SEO integrity.


#Debuggings 
Implementation Plan - Home Hero 3D Animation
Goal
Implement a smooth 3D scroll animation for the Home Hero section using 300 frame sequence located in /public/frames/hero.

User Review Required
NOTE

The animation will control the scroll experience for the hero section. 300 images will be preloaded, which might affect initial load time.

Proposed Changes
app/components
[MODIFY] 
HomeHero3D.tsx
Update frameCount to 300.
Implement 
render
 function to draw images with "object-fit: cover" logic (center and scale to fill).
Configure ScrollTrigger to pin the .hero-3d section for a longer duration (e.g., +=500%) to allow smooth scrubbing through all 300 frames.
Add resize handling to re-calculate drawing dimensions.
Ensure correct pathing for images (/frames/hero/maleXXXX.png).
Verification Plan
Manual Verification
Run npm run dev.
Scroll down the home page.
Verify the hero section pins and the character animates through the 300 frames as I scroll.
Verify responsiveness: Resize window and check if the image still covers the canvas correctly.

#CHANGES
Changes
3D Scroll Animation (HomeHero3D)
Implemented a smooth 3D scroll animation using 300 pre-rendered frames.

[MODIFY] 
HomeHero3D.tsx
Implemented gsap.context for safe cleanup in React Strict Mode.
Added object-fit: cover logic in Canvas 
render
 function.
Configured pinned scrolling for 500% viewport height.
Runtime Error Fix (AnimatedHeader)
Fixed NotFoundError: Failed to execute 'insertBefore' on 'Node' which occurred because GSAP's pinning modified the DOM structure, confusing React's reconciliation of the AnimatedHeader fragment.

[MODIFY] 
AnimatedHeader.tsx
Wrapped the returned Fragment in a <header> tag. This isolates AnimatedHeader's DOM subtree, preventing React from losing track of its position when siblings (like the pinned Hero section) are moved by GSAP.
Verification
Build Success: npm run build passes with exit code 0.
Runtime Check: The error should no longer appear on load or hot reload, as the DOM structure is now stable.