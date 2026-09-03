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
    <a href="https://easyui.site/components">Components</a> •
    <a href="#running-locally">Running Locally</a> •
    <a href="#contributing">Contributing</a> •
    <a href="#license">License</a>
  </p>
</div>

---

##  What is EasyUI?

EasyUI is an open-source library of tactile, micro-animated React components designed to make modern web applications feel alive.

- **Direct Source Ownership** — Add components straight into your project via the `shadcn` CLI. No black-box dependencies or runtime lock-in.
- **Spring Physics & Micro-Interactions** — Built with Framer Motion and canvas for organic drag, magnetic pull, and smooth kinetic feedback.
- **Modern Tech Stack** — Fully typed in TypeScript, styled with Tailwind CSS, and optimized for React 18 & 19.

---

##  Quick Start

EasyUI is an official **shadcn GitHub Registry**. You can install any component directly into your project using the shadcn CLI:

```bash
npx shadcn@latest add Surajmaurya1/easyui/<component-name>
```

### Popular Components

```bash
# Magnetic proximity button
npx shadcn@latest add Surajmaurya1/easyui/magnetic-button

# Radial cursor spotlight card
npx shadcn@latest add Surajmaurya1/easyui/spotlight-card

# Glassmorphic spring navigation
npx shadcn@latest add Surajmaurya1/easyui/glass-navbar

# Global Command Palette (⌘K)
npx shadcn@latest add Surajmaurya1/easyui/command-menu
```

The CLI automatically downloads the component code into your `components/ui/` directory, resolves required dependencies, and sets up any shared tokens.

> **Browse all components:** Explore live previews, props, and install commands at **[easyui.site/components](https://easyui.site/components)**.

---

##  Usage Example

Import installed components directly from your own `components/ui` folder:

```tsx
import React from 'react';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { MagneticButton } from '@/components/ui/magnetic-button';
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

##  Running Locally

To run the interactive documentation showcase and testing sandbox locally:

```bash
# Clone the repository
git clone https://github.com/Surajmaurya1/easyui.git
cd easyui

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

##  Contributing

Contributions are welcome! Whether you want to add a new animated component, fix an issue, or improve the documentation:

1. Check out our **[Contributing Guide](CONTRIBUTING.md)** for our 3-step component workflow (`npm run component:new`).
2. Read the **[Architecture Guide](docs/ARCHITECTURE.md)** to learn about the auto-discovery registry engine.

---

##  Connect & Contact

Created with care by **Suraj Maurya**.

- **LinkedIn**: [linkedin.com/in/suraj-maurya-33a91325a](https://www.linkedin.com/in/suraj-maurya-33a91325a/)
- **Email**: [surajmaurya.pvt@gmail.com](mailto:surajmaurya.pvt@gmail.com)

---

##  License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.
