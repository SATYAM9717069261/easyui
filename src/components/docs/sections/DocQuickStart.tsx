import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';
import { DocPagination } from '../DocPagination';

export interface DocQuickStartProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocQuickStart: React.FC<DocQuickStartProps> = ({ onNavigateSection }) => {
  return (
    <article className="space-y-14 animate-fade-in text-[#A1A1A1]">
      {/* Header */}
      <header className="space-y-4 border-b border-[#1F1F1F] pb-10">
        <span className="text-[11px] font-mono text-[#6B6B6B] uppercase tracking-[0.18em]">
          Getting Started · 02
        </span>
        <h1 className="text-3xl sm:text-[40px] font-semibold tracking-[-0.02em] text-[#FAFAFA] leading-[1.1]">
          Quick Start
        </h1>
        <p className="text-[15px] text-[#A1A1A1] leading-relaxed max-w-2xl">
          Get started with EasyUI in under 2 minutes. Install components directly into any React project using the shadcn CLI or copy the raw source code.
        </p>
      </header>

      {/* Step 1: Initialize shadcn */}
      <section className="space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] tracking-[0.18em] text-[#6B6B6B] uppercase">
            Step 01
          </span>
        </div>
        <h2 className="text-[16px] font-semibold text-[#FAFAFA] tracking-[-0.01em]">Initialize shadcn in your project</h2>
        <p className="text-[14px] text-[#A1A1A1] leading-relaxed">
          If your project doesn't have shadcn initialized yet, run the setup command in your terminal:
        </p>
        <DocCodeBlock
          code="npx shadcn@latest init"
          language="bash"
          isTerminal={true}
        />
      </section>

      {/* Step 2: Add Components */}
      <section className="space-y-4">
        <span className="font-mono text-[11px] tracking-[0.18em] text-[#6B6B6B] uppercase">
          Step 02
        </span>
        <h2 className="text-[16px] font-semibold text-[#FAFAFA] tracking-[-0.01em]">Install Components via shadcn CLI</h2>
        <p className="text-[14px] text-[#A1A1A1] leading-relaxed">
          Reference the repository path and component slug to install any component directly:
        </p>
        <DocCodeBlock
          code={`# Install Magnetic Button
npx shadcn@latest add Surajmaurya1/easyui/magnetic-button

# Install Spotlight Card
npx shadcn@latest add Surajmaurya1/easyui/spotlight-card

# Install Animated Tabs
npx shadcn@latest add Surajmaurya1/easyui/animated-tabs`}
          language="bash"
          isTerminal={true}
          title="Terminal"
        />

        <div className="p-4 rounded-lg border border-[#1F1F1F] bg-[#0B0B0B] space-y-2.5">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-[#FAFAFA]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Automatic during CLI installation:</span>
          </div>
          <ul className="text-[13px] text-[#A1A1A1] space-y-1.5 pl-5 list-disc marker:text-[#525252]">
            <li>Component source file is placed in your <code className="text-[#FAFAFA] font-mono bg-[#0E0E0E] border border-[#1F1F1F] px-1.5 py-0.5 rounded text-[12px]">components/ui/</code> folder.</li>
            <li>Required packages (<code className="text-[#FAFAFA] font-mono text-[12px]">framer-motion</code>, <code className="text-[#FAFAFA] font-mono text-[12px]">lucide-react</code>) are installed.</li>
            <li>Shared motion tokens and utilities are placed in <code className="text-[#FAFAFA] font-mono text-[12px]">lib/</code> automatically if referenced.</li>
          </ul>
        </div>
      </section>

      {/* Step 3: Usage in Code */}
      <section className="space-y-4">
        <span className="font-mono text-[11px] tracking-[0.18em] text-[#6B6B6B] uppercase">
          Step 03
        </span>
        <h2 className="text-[16px] font-semibold text-[#FAFAFA] tracking-[-0.01em]">Import & Use in your Code</h2>
        <p className="text-[14px] text-[#A1A1A1] leading-relaxed">
          Import the installed component directly into your React pages or components with full TypeScript autocomplete:
        </p>

        <DocCodeBlock
          code={`import React from 'react';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { ArrowRight } from 'lucide-react';

export function FeaturePreview() {
  return (
    <SpotlightCard className="p-6 bg-[#0E0E0E] border border-[#1F1F1F] rounded-2xl max-w-sm">
      <h3 className="text-sm font-semibold text-white mb-2">Tactile Interface</h3>
      <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
        Pointer-aware micro-animations with continuous 60 FPS physics.
      </p>

      <MagneticButton variant="primary" strength={0.35}>
        <span>Explore Components</span>
        <ArrowRight className="w-4 h-4" />
      </MagneticButton>
    </SpotlightCard>
  );
}`}
          language="tsx"
          title="src/components/FeaturePreview.tsx"
        />
      </section>

      {/* Manual Setup Utilities */}
      <section className="space-y-4 pt-6 border-t border-[#1F1F1F]">
        <div className="space-y-1.5">
          <h2 className="text-[16px] font-semibold text-[#FAFAFA] tracking-[-0.01em]">Manual Setup (Utilities & Tokens)</h2>
          <p className="text-[14px] text-[#A1A1A1] leading-relaxed max-w-2xl">
            If you are copying source code manually without the shadcn CLI, ensure you have standard <code className="text-[#FAFAFA] font-mono bg-[#0E0E0E] border border-[#1F1F1F] px-1.5 py-0.5 rounded text-[12px]">cn</code> and motion tokens:
          </p>
        </div>

        <DocCodeBlock
          code={`// src/lib/motion-tokens.ts
export const motionTransitions = {
  springSmooth: { type: 'spring', stiffness: 300, damping: 30 },
  springSnappy: { type: 'spring', stiffness: 400, damping: 25 },
  springBouncy: { type: 'spring', stiffness: 500, damping: 15 },
  springGentle: { type: 'spring', stiffness: 180, damping: 24 },
  easeOutCubic: { ease: [0.33, 1, 0.68, 1], duration: 0.25 },
} as const;`}
          language="typescript"
          title="src/lib/motion-tokens.ts"
        />
      </section>

      {/* Pagination Footer */}
      <DocPagination currentTopic="quick-start" onNavigateTopic={onNavigateSection} />
    </article>
  );
};
