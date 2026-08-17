import React from 'react';
import { Sparkles, Code2, ShieldCheck, Zap, Layers, ArrowRight } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';

export interface DocIntroductionProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocIntroduction: React.FC<DocIntroductionProps> = ({ onNavigateSection }) => {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono text-[#A1A1A1] uppercase tracking-widest bg-[#181818] px-2.5 py-0.5 rounded-full border border-[#282828]">
            Overview
          </span>
          <span className="text-[11px] font-mono text-[#6F6F6F]">v1.0 • shadcn Registry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5] font-sans">
          Introduction to EasyUI
        </h1>
        <p className="text-base text-[#A1A1A1] mt-3 leading-relaxed max-w-3xl">
          EasyUI is an open-source, micro-animated React component system distributed via the official <strong className="text-white">shadcn GitHub Registry</strong>. It combines refined spring physics, sleek dark-mode aesthetics, and an automated single-source-of-truth developer engine.
        </p>
      </div>

      {/* Hero Quick Copy */}
      <div className="p-6 rounded-2xl border border-[#222222] bg-[#0A0A0A] relative overflow-hidden">
        <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#ECECEC]" />
          Instant Installation via shadcn CLI
        </h3>
        <p className="text-xs text-[#888888] mb-4">
          Add components straight into your project. Source code is dropped directly into your codebase with auto-installed dependencies.
        </p>
        <DocCodeBlock
          code="npx shadcn@latest add Surajmaurya1/easyui/magnetic-button"
          language="bash"
          isTerminal={true}
        />
      </div>

      {/* Core Pillars */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Core Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] hover:border-[#282828] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#242424] flex items-center justify-center mb-3">
              <Code2 className="w-4 h-4 text-[#ECECEC]" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Source Code Ownership</h3>
            <p className="text-xs text-[#808080] leading-relaxed">
              No opaque npm packages or locked CSS modules. You own 100% of the component code, allowing unconstrained styling and physics tweaks.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] hover:border-[#282828] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#242424] flex items-center justify-center mb-3">
              <Zap className="w-4 h-4 text-[#ECECEC]" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Spring Physics & Micro-Motion</h3>
            <p className="text-xs text-[#808080] leading-relaxed">
              Every element feels responsive and alive, leveraging Framer Motion spring physics curves, cursor-tracking shaders, and continuous 60fps canvas particles.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] hover:border-[#282828] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#242424] flex items-center justify-center mb-3">
              <Layers className="w-4 h-4 text-[#ECECEC]" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Automated Single Source of Truth</h3>
            <p className="text-xs text-[#808080] leading-relaxed">
              All components, metadata, dependencies, and CLI commands are synced automatically via AST inspection scripts — zero manual registry editing.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] hover:border-[#282828] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#242424] flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4 text-[#ECECEC]" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Accessible & Type-Safe</h3>
            <p className="text-xs text-[#808080] leading-relaxed">
              Full TypeScript definition files, WCAG AA compliant contrast ratios, ARIA landmarks, and automatic reduced-motion fallbacks.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Quick Links */}
      <div className="pt-6 border-t border-[#181818] grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigateSection('quick-start')}
          className="flex items-center justify-between p-4 rounded-xl border border-[#1E1E1E] bg-[#0C0C0C] hover:bg-[#121212] hover:border-[#383838] transition-all text-left group"
        >
          <div>
            <span className="text-[11px] font-mono text-[#6F6F6F] block">Next Guide</span>
            <span className="text-sm font-semibold text-white group-hover:text-white transition-colors">Quick Start & Setup</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#6F6F6F] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => onNavigateSection('architecture')}
          className="flex items-center justify-between p-4 rounded-xl border border-[#1E1E1E] bg-[#0C0C0C] hover:bg-[#121212] hover:border-[#383838] transition-all text-left group"
        >
          <div>
            <span className="text-[11px] font-mono text-[#6F6F6F] block">Deep Dive</span>
            <span className="text-sm font-semibold text-white group-hover:text-white transition-colors">Automatic Registry Architecture</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#6F6F6F] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>
    </div>
  );
};
