import React from 'react';
import { Sparkles, Code2, ShieldCheck, Zap, Layers, Terminal } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';
import { DocPagination } from '../DocPagination';

export interface DocIntroductionProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocIntroduction: React.FC<DocIntroductionProps> = ({ onNavigateSection }) => {
  return (
    <article className="space-y-12 animate-fade-in text-[#D4D4D4]">
      {/* Header */}
      <header className="space-y-3 border-b border-[#1A1A1A] pb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Introduction
        </h1>
        <p className="text-base text-[#A1A1A1] leading-relaxed max-w-2xl">
          EasyUI is an open-source library of micro-animated React components distributed via the official <strong className="text-white font-medium">shadcn GitHub Registry</strong>. It combines realistic spring physics, dark-mode aesthetics, and full source code ownership.
        </p>
      </header>

      {/* Quick Copy Installation */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-white" />
          <h2 className="text-lg font-semibold text-white">Quick Installation</h2>
        </div>
        <p className="text-sm text-[#8E8E8E]">
          Add any component directly to your project using the shadcn CLI. The code is placed straight into your <code className="text-white font-mono bg-[#141414] px-1.5 py-0.5 rounded text-xs">components/ui/</code> folder.
        </p>
        <DocCodeBlock
          code="npx shadcn@latest add Surajmaurya1/easyui/magnetic-button"
          language="bash"
          isTerminal={true}
        />
      </section>

      {/* Core Principles (4 clean cards) */}
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-white">Design Philosophy</h2>
          <p className="text-sm text-[#8E8E8E] mt-1">
            Built for developers who care about refined tactile details and clean, maintainable architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-[#1E1E1E] bg-[#0A0A0A] hover:border-[#2E2E2E] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#222222] flex items-center justify-center mb-3">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1.5">Source Ownership</h3>
            <p className="text-xs text-[#8E8E8E] leading-relaxed">
              No black-box npm dependencies. You get the raw TSX component code to customize styles, animation parameters, and markup freely.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#1E1E1E] bg-[#0A0A0A] hover:border-[#2E2E2E] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#222222] flex items-center justify-center mb-3">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1.5">Spring Physics</h3>
            <p className="text-xs text-[#8E8E8E] leading-relaxed">
              Every element feels responsive and tactile, driven by calibrated spring physics curves in Framer Motion instead of rigid linear transitions.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#1E1E1E] bg-[#0A0A0A] hover:border-[#2E2E2E] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#222222] flex items-center justify-center mb-3">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1.5">Auto-Synced Registry</h3>
            <p className="text-xs text-[#8E8E8E] leading-relaxed">
              Components, dependencies, and metadata are automatically extracted from source files through AST analysis for reliable CLI distribution.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#1E1E1E] bg-[#0A0A0A] hover:border-[#2E2E2E] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#222222] flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1.5">Accessible & Type-Safe</h3>
            <p className="text-xs text-[#8E8E8E] leading-relaxed">
              Full TypeScript prop types, keyboard accessibility, ARIA standards, and automatic <code className="text-white font-mono text-[11px]">prefers-reduced-motion</code> support.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Callout */}
      <section className="p-4 rounded-xl border border-[#1C1C1C] bg-[#0C0C0C] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-white shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-white">Built for modern React stacks</span>
            <p className="text-[#777777] mt-0.5">Compatible with Next.js (App Router / Pages), Vite, Remix, and Astro.</p>
          </div>
        </div>
      </section>

      {/* Pagination Footer */}
      <DocPagination currentTopic="introduction" onNavigateTopic={onNavigateSection} />
    </article>
  );
};
