<div align="center">
  <img src="public/logo.png" alt="EasyUI Logo" width="80" height="80" />
  <h1>EasyUI</h1>
  <p><strong>Beautiful UI. Made easy.</strong></p>
  <p>A modern collection of micro-animated, physics-based React components distributed via the official <strong>shadcn GitHub Registry</strong>.</p>

  <p>
    <a href="https://github.com/Surajmaurya1/easyui/actions/workflows/registry.yml"><img src="https://github.com/Surajmaurya1/easyui/actions/workflows/registry.yml/badge.svg" alt="Registry CI" /></a>
    <a href="https://ui.shadcn.com"><img src="https://img.shields.io/badge/shadcn%20registry-GitHub-black.svg?style=flat-square&logo=shadcnui" alt="shadcn GitHub Registry" /></a>
    <a href="https://github.com/Surajmaurya1/easyui/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License: MIT" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19.x-61dafb.svg?style=flat-square&logo=react" alt="React 19" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?style=flat-square&logo=typescript" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/TailwindCSS-v4%20%2F%20v3-38bdf8.svg?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" /></a>
    <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Motion-Framer%20Motion-black.svg?style=flat-square&logo=framer" alt="Framer Motion" /></a>
  </p>

  <p>
    <a href="#quick-start">Quick Start</a> •
    <a href="#components">Components</a> •
    <a href="#developer-workflow-adding-new-components">Adding Components</a> •
    <a href="#automated-seo--audit-system">Automated SEO</a> •
    <a href="#architecture--automatic-registry-system">Architecture</a> •
    <a href="#directory-structure">Directory Structure</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## What is EasyUI?

EasyUI is an open-source library of micro-animated, tactile React components designed to make modern web applications feel alive.

- **Source Code Ownership** — Components are added directly into your codebase via the `shadcn` CLI. No opaque node modules, no forced styles, and no runtime version lock-in.
- **Spring-Physics Motion** — Built with Framer Motion and HTML5 Canvas to deliver organic velocity, elastic snap-back, and fluid continuous surfaces.
- **Automated Component Architecture** — Every component is automatically discovered, classified for npm dependencies, and synced to both `registry.json` and the website catalog with a single command (`npm run component:sync`).

---

## Quick Start

### 1. Install with shadcn CLI (Recommended)

EasyUI uses the official **shadcn GitHub Registry** format. You can install any component directly into any project initialized with shadcn:

```bash
npx shadcn@latest add Surajmaurya1/easyui/<component-name>
```

#### Available Component Install Commands:

```bash
# Buttons
npx shadcn@latest add Surajmaurya1/easyui/button
npx shadcn@latest add Surajmaurya1/easyui/magnetic-button

# Surfaces & Motion
npx shadcn@latest add Surajmaurya1/easyui/spotlight-card
npx shadcn@latest add Surajmaurya1/easyui/reveal-card
npx shadcn@latest add Surajmaurya1/easyui/dot-field

# Navigation
npx shadcn@latest add Surajmaurya1/easyui/glass-navbar
npx shadcn@latest add Surajmaurya1/easyui/animated-tabs
npx shadcn@latest add Surajmaurya1/easyui/floating-action-dock
npx shadcn@latest add Surajmaurya1/easyui/expandable-search

# Forms & Authentication
npx shadcn@latest add Surajmaurya1/easyui/form
npx shadcn@latest add Surajmaurya1/easyui/login
npx shadcn@latest add Surajmaurya1/easyui/sign-up

# Feedback & Overlays
npx shadcn@latest add Surajmaurya1/easyui/payment-receipt-printer
npx shadcn@latest add Surajmaurya1/easyui/faq
npx shadcn@latest add Surajmaurya1/easyui/notification-stack
npx shadcn@latest add Surajmaurya1/easyui/morphing-dialog
npx shadcn@latest add Surajmaurya1/easyui/smooth-accordion
npx shadcn@latest add Surajmaurya1/easyui/command-menu
```

#### What the CLI does automatically:
1. Downloads the component file into your `components/ui/` directory.
2. Automatically installs required dependencies (`framer-motion`, `lucide-react`, etc.) into your `package.json`.
3. Downloads any shared tokens or utilities (`lib/motion-tokens.ts`, `lib/utils.ts`) into your `lib/` directory.

---

### 2. Usage in your Project

Import the installed component directly from your own `components/ui/` folder:

```tsx
import React from 'react';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { ArrowUpRight } from 'lucide-react';

export function Demo() {
  return (
    <SpotlightCard className="max-w-md p-6 bg-[#0A0A0A] rounded-2xl border border-[#222222]">
      <h3 className="text-base font-semibold text-white">Edge Telemetry</h3>
      <p className="text-xs text-neutral-400 mt-1 mb-4">
        Dynamic pointer tracking with zero layout penalty.
      </p>

      <MagneticButton strength={0.4} variant="primary">
        <span>Launch Console</span>
        <ArrowUpRight className="w-4 h-4" />
      </MagneticButton>
    </SpotlightCard>
  );
}
```

---

### 3. Run the Showcase Locally

```bash
git clone https://github.com/Surajmaurya1/easyui.git
cd easyui
npm install
npm run dev
```

Visit `http://localhost:5173` to test the interactive preview showroom and copy source code.

---

## Components

| Component | Slug | Category | Description | Auto-Detected Dependencies |
|:---|:---|:---|:---|:---|
| **Button** | `button` | Buttons | Multi-variant button system with 8 styles, 4 sizes, loading spinner, and spring tap feedback | `framer-motion`, `lucide-react` |
| **GlassNavbar** | `glass-navbar` | Navigation | Glassmorphic responsive navbar with spring indicator pills and mobile menu drawer | `framer-motion`, `lucide-react` |
| **Form** | `form` | Forms | Composable form system with inputs, textarea, select, checkbox, radio, switch, and error alerts | `framer-motion`, `lucide-react` |
| **Login** | `login` | Auth | Authentication card with password show/hide, validation, remember me, and social SSO | `framer-motion`, `lucide-react` |
| **SignUp** | `sign-up` | Auth | User registration card with live password strength telemetry and terms validation | `framer-motion`, `lucide-react` |
| **FAQ** | `faq` | Feedback | Expandable spring-physics accordion with search filter and category navigation | `framer-motion`, `lucide-react` |
| **MagneticButton** | `magnetic-button` | Buttons | Proximity-aware spring pull and snap-back with 4 visual variants | `framer-motion` |
| **SpotlightCard** | `spotlight-card` | Motion | Dark surface card with real-time radial illumination tracking cursor | `framer-motion` |
| **AnimatedTabs** | `animated-tabs` | Navigation | Tab switcher with spring sliding pill indicator & cross-fading panels | `framer-motion` |
| **FloatingActionDock** | `floating-action-dock` | Navigation | macOS-inspired quick dock with continuous magnification curve | `framer-motion` |
| **NotificationStack** | `notification-stack` | Feedback | Stacked toast feed with elevation physics & drag-to-dismiss | `framer-motion`, `lucide-react` |
| **MorphingDialog** | `morphing-dialog` | Overlays | Shared `layoutId` modal expansion with continuous surface interpolation | `framer-motion`, `lucide-react` |
| **RevealCard** | `reveal-card` | Motion | 3D perspective-tilt card with dynamic glare & hidden hover reveal layer | `framer-motion` |
| **SmoothAccordion** | `smooth-accordion` | Feedback | Zero-jank collapsible panels with spring height calculation | `framer-motion`, `lucide-react` |
| **CommandMenu** | `command-menu` | Overlays | Global `⌘K` command palette with fuzzy search & category filters | `framer-motion`, `lucide-react` |
| **DotField** | `dot-field` | Motion | 60 FPS HTML5 Canvas particle matrix with cursor bulge & SVG radial glow | *(none — zero runtime deps)* |
| **ExpandableSearch** | `expandable-search` | Navigation | Compact search pill with spring width expansion & keyboard hints | `framer-motion`, `lucide-react` |
| **PaymentReceiptPrinter** | `payment-receipt-printer` | Feedback | Animated payment receipt printer with thermal paper extrusion motion & replay | `framer-motion`, `lucide-react` |


---

## Architecture & Automatic Registry System

EasyUI is built on a **Single Source of Truth** architecture. Developers never manually maintain JSON registry files, copy-paste code into catalog arrays, or maintain hardcoded install commands in multiple files.

```
Component Source (.tsx) + Component Metadata (.meta.ts)
                          ↓
              scripts/generate-registry.ts
                          ↓
  ┌─────────────────────────────────────────────────────────┐
  │ • Root registry.json (official shadcn schema)           │
  │ • src/components/registry/components-data.ts (catalog)  │
  │ • CLI command generation (Surajmaurya1/easyui/<slug>)   │
  │ • Dependency & local utility auto-detection             │
  │ • Raw source extraction directly from source files      │
  └─────────────────────────────────────────────────────────┘
                          ↓
              scripts/validate-registry.ts
                          ↓
           Website UI + shadcn GitHub Registry
```

### Core Automation Capabilities:
1. **Automatic Discovery** — Scans `src/components/ui/` for components (supports flat `.tsx` files as well as folder-based multi-file components).
2. **AST Dependency Inspection** — Inspects TypeScript import statements, cross-references with `package.json`, and registers only necessary external packages (e.g. `framer-motion`, `lucide-react`).
3. **Local Utility Linking** — Automatically identifies imports of internal shared utilities (`motion-tokens.ts`, `utils.ts`, `GithubIcon.tsx`, companion CSS files) and adds them to the registry item's `files` manifest with the proper `registry:lib` or `registry:ui` target.
4. **Source Code Extraction** — Automatically reads the raw source code from disk during build/sync to feed website code viewers. No manual code duplication in data files.
5. **Dynamic UI Integration** — The `⌘K` Command Palette, category filters, and component directory dynamically consume the generated catalog. Newly added components are instantly searchable.

---

## Developer Workflow: Adding New Components

Adding a new component to EasyUI is a 3-step, zero-friction process:

### Step 1: Scaffold or Create the Component

You can scaffold a new component instantly using the CLI helper:
```bash
npm run component:new AuroraCard
```

This creates:
- `src/components/ui/AuroraCard.tsx` (Component code)
- `src/components/ui/AuroraCard.meta.ts` (Human-written metadata)

#### Example Component (`AuroraCard.tsx`):
```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface AuroraCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const AuroraCard: React.FC<AuroraCardProps> = ({ children, className, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={motionTransitions.springSnappy}
      className={cn('p-6 rounded-2xl border border-[#222222] bg-[#0E0E0E] text-[#F5F5F5]', className)}
      {...props}
    >
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-[#38BDF8]" />
        <h3 className="text-sm font-semibold">Aurora Card</h3>
      </div>
      {children}
    </motion.div>
  );
};
```

#### Example Metadata (`AuroraCard.meta.ts`):
```typescript
import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Aurora Card',
  description: 'An elevated dark surface with subtle ambient aurora glow interaction.',
  category: 'Motion',
  tagline: 'Ambient aurora gradient pointer glow',
  badges: ['Spring Physics', 'Tailwind', 'Interactive'],
  features: [
    'Pointer proximity ambient aurora illumination',
    'Configurable blur and gradient stops',
    'Accessible contrast and keyboard focus states',
  ],
  props: [
    { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Content rendered inside card' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Custom CSS classes' },
  ],
  accessibility: [
    'Contrast compliant with WCAG AA standards',
    'Respects prefers-reduced-motion media query',
  ],
  usageCode: `import { AuroraCard } from "@/components/ui/aurora-card";

export function Demo() {
  return <AuroraCard>Hello World</AuroraCard>;
}`,
};

export default meta;
```

---

### Step 2: Sync Registry & Website Catalog

Run the single sync command:
```bash
npm run component:sync
```

**What happens behind the scenes:**
- `aurora-card` slug is automatically computed.
- Dependencies (`framer-motion`, `lucide-react`) and shared utilities (`utils.ts`, `motion-tokens.ts`) are detected.
- Root `registry.json` is updated.
- `src/components/registry/components-data.ts` is updated with raw source code and CLI command:
  `npx shadcn@latest add Surajmaurya1/easyui/aurora-card`.
- Full registry validation suite executes to guarantee zero broken paths or missing dependencies.

---

### Step 3: Commit and Push

```bash
git add .
git commit -m "feat: add AuroraCard component"
git push
```

The GitHub Actions CI workflow automatically regenerates, validates, and checks that committed registry and catalog files are in sync.

---

---

## Automated SEO & Audit System

EasyUI features an automated, zero-config SEO pipeline. When a developer creates a new component, it automatically inherits complete search engine optimization across the entire application without any manual configuration:

```text
                 COMPONENT
                     │
                     ▼
          npm run component:new <Name>
                     │
              ┌──────┴──────┐
              ▼             ▼
      <Name>.tsx       <Name>.meta.ts (Single Source of Truth)
              │             │
              └──────┬──────┘
                     ▼
         npm run build / component:sync
                     │
       ┌─────────────┼──────────────┐
       ▼             ▼              ▼
  registry.json  components-data  sitemap.xml (All 31+ URLs)
       │             │              │
       └─────────────┼──────────────┘
                     ▼
             src/lib/seo Engine
                     │
       ┌─────────────┼──────────────┐
       ▼             ▼              ▼
  Dynamic Titles  Canonicals    JSON-LD & Breadcrumbs
  & Meta Tags    & OG Cards    (SoftwareApp, WebSite, etc.)
       │             │              │
       └─────────────┼──────────────┘
                     ▼
             SEO Audit Guard
                     │
                     ▼
             Production Build (Vite)
```

### What is Automated?

- **Dynamic Metadata** — Dynamic page title, meta description, robots directives, and keywords generated per component.
- **Canonical URLs** — Normalized, clean canonical URLs (`https://easyui.site/#components/${slug}`).
- **Dynamic XML Sitemap** — `public/sitemap.xml` automatically syncs all component routes, documentation topics, and pagination pages.
- **Open Graph & Twitter Cards** — Rich social sharing cards generated from component metadata and brand visuals.
- **Structured Data (JSON-LD)** — Rich Google schemas (`SoftwareApplication`, `TechArticle`, `BreadcrumbList`, `WebSite` with `SearchAction`, `Organization`).
- **Internal Linking & Related Components** — Contextual pairings dynamically suggested on every component modal.
- **SEO Build Guard & CLI Audit** — `npm run seo:audit` runs 44 automated health checks across 7 categories to prevent broken metadata or sitemaps from reaching production.

```bash
# Run automated SEO audit
npm run seo:audit
```

---

## Multi-File Component Support

EasyUI supports complex components split across multiple files. You can create a dedicated folder inside `src/components/ui/`:

```text
src/components/ui/my-complex-widget/
├── MyComplexWidget.tsx         # Primary component
├── widget-utils.ts             # Auxiliary logic
├── widget.css                  # Custom styling
└── meta.ts                     # Component metadata
```

The generator will automatically:
1. Discover the directory and identify the primary component.
2. Read `meta.ts`.
3. Include all source files in the registry manifest so that `npx shadcn@latest add Surajmaurya1/easyui/my-complex-widget` downloads all companion files.

---

## Developer Scripts

| Command | Purpose |
|:---|:---|
| `npm run component:sync` | **Primary developer sync command.** Regenerates `registry.json`, website catalog, and `sitemap.xml`, then runs full validation. |
| `npm run component:new <Name>` | Scaffolds a new component boilerplate (`.tsx` + `.meta.ts`) with SEO-ready defaults. |
| `npm run seo:audit` | Runs the automated 7-category SEO audit and prints a detailed health report. |
| `npm run seo:sitemap` | Generates `public/sitemap.xml` with all current pages, catalog pagination, doc topics, and component deep links. |
| `npm run registry:generate` | Runs discovery and regenerates `registry.json` and `components-data.ts`. |
| `npm run registry:validate` | Validates schemas, unique slugs, file paths, and package dependencies. |
| `npm run dev` | Starts Vite local development server (`http://localhost:5173`). |
| `npm run build` | Full automated pipeline: syncs registry/sitemap, runs SEO audit guard, typechecks (`tsc -b`), and builds Vite bundle. |
| `npm run lint` | Runs `oxlint` for lightning-fast linting. |

---

## Directory Structure

```text
easyui/
├── .github/
│   └── workflows/
│       └── registry.yml                   # CI validation & build workflow
├── public/
│   ├── logo.png                           # Brand identity logo & favicon
│   ├── robots.txt                         # Search crawler directives
│   ├── sitemap.xml                        # [AUTO-GENERATED] Dynamic XML sitemap
│   └── site.webmanifest                   # Web Application Manifest
├── scripts/
│   ├── generate-registry.ts               # Auto-discovery & registry generator
│   ├── generate-sitemap.ts                # Dynamic sitemap generator
│   ├── validate-registry.ts               # Registry & catalog validator
│   ├── seo-audit.ts                       # Automated SEO health audit
│   └── component-new.ts                   # Component scaffolding CLI
├── src/
│   ├── components/
│   │   ├── docs/                          # Interactive documentation modal
│   │   ├── icons/                         # Brand icons (GithubIcon, etc.)
│   │   ├── layout/                        # Navbar, Footer, Container
│   │   ├── registry/
│   │   │   └── components-data.ts         # [AUTO-GENERATED] Website component catalog
│   │   ├── sections/                      # Hero, Showcases, Directory, Philosophy
│   │   └── ui/                            # Component source files + metadata
│   │       ├── AnimatedTabs.tsx
│   │       ├── AnimatedTabs.meta.ts
│   │       ├── CommandMenu.tsx
│   │       ├── CommandMenu.meta.ts
│   │       ├── DotField.tsx
│   │       ├── DotField.meta.ts
│   │       ├── DotField.css
│   │       ├── ExpandableSearch.tsx
│   │       ├── ExpandableSearch.meta.ts
│   │       ├── FloatingActionDock.tsx
│   │       ├── FloatingActionDock.meta.ts
│   │       ├── MagneticButton.tsx
│   │       ├── MagneticButton.meta.ts
│   │       ├── MorphingDialog.tsx
│   │       ├── MorphingDialog.meta.ts
│   │       ├── NotificationStack.tsx
│   │       ├── NotificationStack.meta.ts
│   │       ├── RevealCard.tsx
│   │       ├── RevealCard.meta.ts
│   │       ├── SmoothAccordion.tsx
│   │       ├── SmoothAccordion.meta.ts
│   │       ├── SpotlightCard.tsx
│   │       └── SpotlightCard.meta.ts
│   ├── lib/
│   │   ├── seo/                           # Automated SEO engine (config, helpers, JSON-LD, metadata, useSEO)
│   │   ├── constants.ts                   # URLs & global constants
│   │   ├── motion-tokens.ts               # Reusable Framer Motion transitions
│   │   └── utils.ts                       # Class merging (cn) & clipboard helpers
│   ├── types/
│   │   └── component.ts                   # Component metadata type definitions
│   ├── App.tsx
│   └── main.tsx
├── registry.json                          # [AUTO-GENERATED] Root shadcn GitHub Registry
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Contributing

Contributions, component additions, and improvements are welcome!

1. Fork the Project.
2. Create your Feature Branch:
   ```bash
   git checkout -b feature/NewComponent
   ```
3. Scaffold your component:
   ```bash
   npm run component:new NewComponent
   ```
4. Build the component and fill in `NewComponent.meta.ts`.
5. Sync and validate:
   ```bash
   npm run component:sync
   ```
6. Commit your changes:
   ```bash
   git commit -m "feat: add NewComponent"
   ```
7. Push to the branch and open a Pull Request.

---

## Connect & Contact

Created with care by **Suraj Maurya**. If you'd like to connect, collaborate, or share feedback:

- **LinkedIn:** [linkedin.com/in/suraj-maurya-33a91325a](https://www.linkedin.com/in/suraj-maurya-33a91325a/)
- **Email:** [surajmaurya.pvt@gmail.com](mailto:surajmaurya.pvt@gmail.com)
- **GitHub:** [@Surajmaurya1](https://github.com/Surajmaurya1)

---

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

<div align="center">
  <sub>Built for developers who care about interaction and craft.</sub>
</div>