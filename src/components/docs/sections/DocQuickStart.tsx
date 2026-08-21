import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';
import { DocPagination } from '../DocPagination';

export interface DocQuickStartProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocQuickStart: React.FC<DocQuickStartProps> = ({ onNavigateSection }) => {
  return (
    <article className="space-y-12 animate-fade-in text-[#D4D4D4]">
      {/* Header */}
      <header className="space-y-3 border-b border-[#1A1A1A] pb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Quick Start
        </h1>
        <p className="text-base text-[#A1A1A1] leading-relaxed max-w-2xl">
          Get started with EasyUI in under 2 minutes. Install components directly into any React project using the shadcn CLI or copy the raw source code.
        </p>
      </header>

      {/* Step 1: Initialize shadcn */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-[#181818] border border-[#262626] flex items-center justify-center text-[11px] font-mono font-bold text-white">
            1
          </span>
          <h2 className="text-lg font-semibold text-white">Initialize shadcn in your project</h2>
        </div>
        <p className="text-sm text-[#8E8E8E]">
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
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-[#181818] border border-[#262626] flex items-center justify-center text-[11px] font-mono font-bold text-white">
            2
          </span>
          <h2 className="text-lg font-semibold text-white">Install Components via shadcn CLI</h2>
        </div>
        <p className="text-sm text-[#8E8E8E]">
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

        <div className="p-4 rounded-xl border border-[#1E1E1E] bg-[#0A0A0A] space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Automatic during CLI installation:</span>
          </div>
          <ul className="text-xs text-[#8E8E8E] space-y-1.5 pl-5 list-disc">
            <li>Component source file is placed in your <code className="text-white font-mono bg-[#141414] px-1.5 py-0.5 rounded">components/ui/</code> folder.</li>
            <li>Required packages (<code className="text-white font-mono">framer-motion</code>, <code className="text-white font-mono">lucide-react</code>) are installed.</li>
            <li>Shared motion tokens and utilities are placed in <code className="text-white font-mono">lib/</code> automatically if referenced.</li>
          </ul>
        </div>
      </section>

      {/* Step 3: Usage in Code */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-[#181818] border border-[#262626] flex items-center justify-center text-[11px] font-mono font-bold text-white">
            3
          </span>
          <h2 className="text-lg font-semibold text-white">Import & Use in your Code</h2>
        </div>
        <p className="text-sm text-[#8E8E8E]">
          Import the installed component directly into your React pages or components with full TypeScript autocomplete:
        </p>

        <DocCodeBlock
          code={`import React from 'react';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { ArrowRight } from 'lucide-react';

export function FeaturePreview() {
  return (
    <SpotlightCard className="p-6 bg-[#0B0B0B] border border-[#202020] rounded-2xl max-w-sm">
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
      <section className="space-y-4 pt-6 border-t border-[#1A1A1A]">
        <div>
          <h2 className="text-lg font-semibold text-white">Manual Setup (Utilities & Tokens)</h2>
          <p className="text-sm text-[#8E8E8E] mt-1">
            If you are copying source code manually without the shadcn CLI, ensure you have standard <code className="text-white font-mono bg-[#141414] px-1.5 py-0.5 rounded text-xs">cn</code> and motion tokens:
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
