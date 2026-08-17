import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';

export interface DocQuickStartProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocQuickStart: React.FC<DocQuickStartProps> = ({ onNavigateSection }) => {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono text-[#A1A1A1] uppercase tracking-widest bg-[#181818] px-2.5 py-0.5 rounded-full border border-[#282828]">
            Installation
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5] font-sans">
          Quick Start & Installation
        </h1>
        <p className="text-base text-[#A1A1A1] mt-3 leading-relaxed max-w-3xl">
          Get started with EasyUI in less than 2 minutes. Add components directly into any React project using shadcn CLI or copy-paste the source.
        </p>
      </div>

      {/* Step 1: Project Setup */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-xs font-mono font-bold text-white">
            01
          </div>
          <h2 className="text-xl font-semibold text-white">Initialize shadcn in your project</h2>
        </div>
        <p className="text-xs text-[#808080] leading-relaxed">
          If your project doesn't have shadcn initialized yet, run the official initialization command:
        </p>
        <DocCodeBlock
          code="npx shadcn@latest init"
          language="bash"
          isTerminal={true}
        />
      </div>

      {/* Step 2: Add Any Component */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-xs font-mono font-bold text-white">
            02
          </div>
          <h2 className="text-xl font-semibold text-white">Add EasyUI Components via GitHub Registry</h2>
        </div>
        <p className="text-xs text-[#808080] leading-relaxed">
          EasyUI is published as an official <strong>shadcn GitHub Registry</strong>. You can install any component directly by referencing the repository name and component slug:
        </p>
        <DocCodeBlock
          code={`# Install Magnetic Button
npx shadcn@latest add Surajmaurya1/easyui/magnetic-button

# Install Spotlight Card
npx shadcn@latest add Surajmaurya1/easyui/spotlight-card

# Install Animated Tabs
npx shadcn@latest add Surajmaurya1/easyui/animated-tabs

# Install Notification Stack
npx shadcn@latest add Surajmaurya1/easyui/notification-stack`}
          language="bash"
          isTerminal={true}
          title="Install via shadcn CLI"
        />

        <div className="p-4 rounded-xl border border-[#202020] bg-[#0C0C0C] text-xs text-[#A1A1A1] space-y-2">
          <div className="flex items-center gap-2 text-white font-medium">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>What happens during installation:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[#808080] ml-1">
            <li>The component file is placed into your <code className="text-[#ECECEC] bg-[#141414] px-1.5 py-0.5 rounded font-mono">components/ui/</code> directory.</li>
            <li>Required packages (<code className="text-[#ECECEC] bg-[#141414] px-1.5 py-0.5 rounded font-mono">framer-motion</code>, <code className="text-[#ECECEC] bg-[#141414] px-1.5 py-0.5 rounded font-mono">lucide-react</code>, etc.) are installed automatically.</li>
            <li>Shared motion tokens and utilities are downloaded into <code className="text-[#ECECEC] bg-[#141414] px-1.5 py-0.5 rounded font-mono">lib/</code> if needed.</li>
          </ul>
        </div>
      </div>

      {/* Step 3: Usage in Code */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-xs font-mono font-bold text-white">
            03
          </div>
          <h2 className="text-xl font-semibold text-white">Import & Use in your Code</h2>
        </div>
        <p className="text-xs text-[#808080] leading-relaxed">
          Import directly from your local <code className="text-[#ECECEC] font-mono">@/components/ui/</code> directory with full TypeScript autocompletion:
        </p>

        <DocCodeBlock
          code={`import React from 'react';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { Sparkles, ArrowRight } from 'lucide-react';

export function FeaturePreview() {
  return (
    <SpotlightCard className="max-w-md p-6 bg-[#0B0B0B] border border-[#202020] rounded-2xl">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-[#ECECEC]" />
        <h3 className="text-sm font-semibold text-white">Edge Telemetry</h3>
      </div>
      
      <p className="text-xs text-neutral-400 mb-6">
        Pointer-aware micro-animations with 60 FPS spring physics.
      </p>

      <MagneticButton variant="primary" strength={0.4}>
        <span>Deploy to Edge</span>
        <ArrowRight className="w-4 h-4" />
      </MagneticButton>
    </SpotlightCard>
  );
}`}
          language="tsx"
          title="src/components/FeaturePreview.tsx"
        />
      </div>

      {/* Manual Setup & Tokens (Optional) */}
      <div className="space-y-4 pt-6 border-t border-[#181818]">
        <h2 className="text-xl font-semibold text-white">Manual Setup (Utilities & Tokens)</h2>
        <p className="text-xs text-[#808080] leading-relaxed">
          If you are manually copying components into an existing project without shadcn CLI, make sure you have the standard <code className="text-[#ECECEC] font-mono">cn</code> helper and <code className="text-[#ECECEC] font-mono">motion-tokens.ts</code>:
        </p>

        <DocCodeBlock
          code={`// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
          language="typescript"
          title="src/lib/utils.ts"
        />

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
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-[#181818] grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigateSection('architecture')}
          className="flex items-center justify-between p-4 rounded-xl border border-[#1E1E1E] bg-[#0C0C0C] hover:bg-[#121212] hover:border-[#383838] transition-all text-left group"
        >
          <div>
            <span className="text-[11px] font-mono text-[#6F6F6F] block">Next Guide</span>
            <span className="text-sm font-semibold text-white group-hover:text-white transition-colors">Automatic Structure & Registry</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#6F6F6F] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => onNavigateSection('collaboration')}
          className="flex items-center justify-between p-4 rounded-xl border border-[#1E1E1E] bg-[#0C0C0C] hover:bg-[#121212] hover:border-[#383838] transition-all text-left group"
        >
          <div>
            <span className="text-[11px] font-mono text-[#6F6F6F] block">Contribute</span>
            <span className="text-sm font-semibold text-white group-hover:text-white transition-colors">How to Collaborate & Add Components</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#6F6F6F] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>
    </div>
  );
};
