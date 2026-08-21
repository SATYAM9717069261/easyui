import React from 'react';
import { Cpu, Layers, CheckCircle2, ShieldCheck, RefreshCw, Workflow } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';
import { DocPagination } from '../DocPagination';

export interface DocArchitectureProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocArchitecture: React.FC<DocArchitectureProps> = ({ onNavigateSection }) => {
  return (
    <article className="space-y-12 animate-fade-in text-[#D4D4D4]">
      {/* Header */}
      <header className="space-y-3 border-b border-[#1A1A1A] pb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Registry Architecture
        </h1>
        <p className="text-base text-[#A1A1A1] leading-relaxed max-w-2xl">
          EasyUI eliminates manual registry maintenance. Automated scripts scan TypeScript AST imports, parse prop definitions, package dependencies, and synchronize the shadcn registry and website catalog in real time.
        </p>
      </header>

      {/* Visual Pipeline Flow */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-white" />
          <h2 className="text-lg font-semibold text-white">Single Source of Truth Pipeline</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-[#1E1E1E] bg-[#0A0A0A] space-y-3">
            <div>
              <span className="text-[10px] font-mono text-[#8E8E8E] uppercase tracking-wider block mb-1">01. Inputs</span>
              <h3 className="text-white font-semibold mb-1">Source Code & Meta</h3>
              <p className="text-xs text-[#7E7E7E]">Author writes <code className="text-white font-mono">ComponentName.tsx</code> and <code className="text-white font-mono">.meta.ts</code></p>
            </div>
            <ul className="space-y-1 font-mono text-[#8E8E8E] text-[11px]">
              <li>• Component JSX logic</li>
              <li>• Props interface & docs</li>
              <li>• Optional companion CSS</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-[#282828] bg-[#0F0F0F] space-y-3">
            <div>
              <span className="text-[10px] font-mono text-white uppercase tracking-wider block mb-1">02. Generator Engine</span>
              <h3 className="text-white font-semibold mb-1">generate-registry.ts</h3>
              <p className="text-xs text-[#A1A1A1]">Automated AST scanner inspects imports and types</p>
            </div>
            <ul className="space-y-1 font-mono text-[#8E8E8E] text-[11px]">
              <li>• AST dependency resolver</li>
              <li>• Package.json validation</li>
              <li>• Utility file bundler</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-[#1E1E1E] bg-[#0A0A0A] space-y-3">
            <div>
              <span className="text-[10px] font-mono text-[#8E8E8E] uppercase tracking-wider block mb-1">03. Outputs</span>
              <h3 className="text-white font-semibold mb-1">Synced Endpoints</h3>
              <p className="text-xs text-[#7E7E7E]">All registries and catalog endpoints updated</p>
            </div>
            <ul className="space-y-1 font-mono text-[#8E8E8E] text-[11px]">
              <li>• <code className="text-white">public/r/*.json</code></li>
              <li>• shadcn CLI install targets</li>
              <li>• ⌘K search index</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feature 1: AST Import & Dependency Discovery */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-4 h-4 text-white" />
          <h2 className="text-lg font-semibold text-white">1. Automated Dependency Discovery</h2>
        </div>
        <p className="text-sm text-[#8E8E8E] leading-relaxed">
          When running <code className="text-white font-mono bg-[#141414] px-1.5 py-0.5 rounded text-xs">npm run component:sync</code>, the generator reads component source code to detect dependencies:
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-lg border border-[#1C1C1C] bg-[#0A0A0A] space-y-1">
            <span className="text-white font-semibold">External NPM Packages</span>
            <p className="text-[#8E8E8E]">
              Imports like <code className="text-white font-mono">framer-motion</code> or <code className="text-white font-mono">lucide-react</code> are verified and mapped to the registry dependencies array.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-[#1C1C1C] bg-[#0A0A0A] space-y-1">
            <span className="text-white font-semibold">Internal Utilities Linking</span>
            <p className="text-[#8E8E8E]">
              Imports from <code className="text-white font-mono">lib/motion-tokens</code> or <code className="text-white font-mono">lib/utils</code> are automatically added as registry prerequisites so the CLI downloads them cleanly.
            </p>
          </div>
        </div>
      </section>

      {/* Feature 2: Multi-File Support */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Layers className="w-4 h-4 text-white" />
          <h2 className="text-lg font-semibold text-white">2. Multi-File Widget Support</h2>
        </div>
        <p className="text-sm text-[#8E8E8E] leading-relaxed">
          Complex components split across multiple sub-files in a directory are fully supported:
        </p>

        <DocCodeBlock
          code={`src/components/ui/custom-dock/
├── CustomDock.tsx          # Primary component
├── dock-item.tsx           # Sub-component
├── dock-physics.ts         # Math/physics helper
└── meta.ts                 # Metadata descriptor`}
          language="text"
          title="Multi-File Component Layout"
        />
      </section>

      {/* Feature 3: Registry Validation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-white" />
          <h2 className="text-lg font-semibold text-white">3. Strict Validation Guarantees</h2>
        </div>
        <p className="text-sm text-[#8E8E8E]">
          Automated CI verification checks ensure zero broken installations before any release:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          {[
            'All registry JSON files conform to official shadcn schema',
            'Every component has a verified .meta.ts descriptor',
            'Zero missing or unresolvable npm dependencies',
            'Physical file paths on disk match registry targets',
            'Props documentation tables match TypeScript types',
            'Usage examples and code snippets are syntax-checked',
          ].map((check, idx) => (
            <div key={idx} className="flex items-start gap-2 p-3 rounded-lg border border-[#1A1A1A] bg-[#0A0A0A]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-[#A1A1A1]">{check}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Single Sync Command */}
      <section className="p-5 rounded-2xl border border-[#202020] bg-[#0A0A0A] space-y-3">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-white" />
          <h2 className="text-sm font-semibold text-white">One-Command Sync & Validate</h2>
        </div>
        <p className="text-xs text-[#8E8E8E]">
          Run the sync script anytime a component or metadata changes:
        </p>
        <DocCodeBlock
          code="npm run component:sync"
          language="bash"
          isTerminal={true}
        />
      </section>

      {/* Pagination Footer */}
      <DocPagination currentTopic="architecture" onNavigateTopic={onNavigateSection} />
    </article>
  );
};
