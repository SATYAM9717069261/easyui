import React from 'react';
import { Sparkles, Code2, ShieldCheck, Zap, Layers, Terminal } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';
import { DocPagination } from '../DocPagination';

export interface DocIntroductionProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocIntroduction: React.FC<DocIntroductionProps> = ({ onNavigateSection }) => {
  return (
    <article className="space-y-12 animate-fade-in text-[#A3A3A3]">
      {/* Header */}
      <header className="space-y-3 border-b border-[#363636] pb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5]">
          Introduction
        </h1>
        <p className="text-base text-[#A3A3A3] leading-relaxed max-w-2xl">
          EasyUI is an open-source library of micro-animated React components distributed via the official <strong className="text-[#F5F5F5] font-medium">shadcn GitHub Registry</strong>. It combines realistic spring physics, dark-mode aesthetics, and full source code ownership.
        </p>
      </header>

      {/* Quick Copy Installation */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#F5F5F5]" />
          <h2 className="text-lg font-semibold text-[#F5F5F5]">Quick Installation</h2>
        </div>
        <p className="text-sm text-[#A3A3A3]">
          Add any component directly to your project using the shadcn CLI. The code is placed straight into your <code className="text-[#F5F5F5] font-mono bg-[#242424] border border-[#363636] px-1.5 py-0.5 rounded text-xs">components/ui/</code> folder.
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
          <h2 className="text-lg font-semibold text-[#F5F5F5]">Design Philosophy</h2>
          <p className="text-sm text-[#A3A3A3] mt-1">
            Built for developers who care about refined tactile details and clean, maintainable architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-[#363636] bg-[#202020] hover:border-[#4A4A4A] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#242424] border border-[#363636] flex items-center justify-center mb-3">
              <Code2 className="w-4 h-4 text-[#F5F5F5]" />
            </div>
            <h3 className="text-sm font-semibold text-[#F5F5F5] mb-1.5">Source Ownership</h3>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              No black-box npm dependencies. You get the raw TSX component code to customize styles, animation parameters, and markup freely.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#363636] bg-[#202020] hover:border-[#4A4A4A] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#242424] border border-[#363636] flex items-center justify-center mb-3">
              <Zap className="w-4 h-4 text-[#F5F5F5]" />
            </div>
            <h3 className="text-sm font-semibold text-[#F5F5F5] mb-1.5">Spring Physics</h3>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Every element feels responsive and tactile, driven by calibrated spring physics curves in Framer Motion instead of rigid linear transitions.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#363636] bg-[#202020] hover:border-[#4A4A4A] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#242424] border border-[#363636] flex items-center justify-center mb-3">
              <Layers className="w-4 h-4 text-[#F5F5F5]" />
            </div>
            <h3 className="text-sm font-semibold text-[#F5F5F5] mb-1.5">Auto-Synced Registry</h3>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Components, dependencies, and metadata are automatically extracted from source files through AST analysis for reliable CLI distribution.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#363636] bg-[#202020] hover:border-[#4A4A4A] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#242424] border border-[#363636] flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4 text-[#F5F5F5]" />
            </div>
            <h3 className="text-sm font-semibold text-[#F5F5F5] mb-1.5">Accessible & Type-Safe</h3>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Full TypeScript prop types, keyboard accessibility, ARIA standards, and automatic <code className="text-[#F5F5F5] font-mono bg-[#242424] border border-[#363636] px-1 rounded text-[11px]">prefers-reduced-motion</code> support.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Callout */}
      <section className="p-4 rounded-xl border border-[#363636] bg-[#202020] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-[#F5F5F5] shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-[#F5F5F5]">Built for modern React stacks</span>
            <p className="text-[#737373] mt-0.5">Compatible with Next.js (App Router / Pages), Vite, Remix, and Astro.</p>
          </div>
        </div>
      </section>

      {/* Pagination Footer */}
      <DocPagination currentTopic="introduction" onNavigateTopic={onNavigateSection} />
    </article>
  );
};
