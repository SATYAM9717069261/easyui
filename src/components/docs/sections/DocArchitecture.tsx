import React from 'react';
import { Cpu, Layers, CheckCircle2, ShieldCheck, ArrowRight, RefreshCw, Workflow } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';

export interface DocArchitectureProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocArchitecture: React.FC<DocArchitectureProps> = ({ onNavigateSection }) => {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono text-[#38BDF8] uppercase tracking-widest bg-[#38BDF8]/10 px-2.5 py-0.5 rounded-full border border-[#38BDF8]/20">
            Engine & Pipeline
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5] font-sans">
          The Automatic Structure & Registry Engine
        </h1>
        <p className="text-base text-[#A1A1A1] mt-3 leading-relaxed max-w-3xl">
          EasyUI eliminates manual registry maintenance. Learn how the automated build scripts scan components, parse AST imports, detect dependencies, and synchronize both the <strong className="text-white">shadcn Registry</strong> and the website catalog in real time.
        </p>
      </div>

      {/* Architecture Flow Diagram */}
      <div className="p-6 rounded-2xl border border-[#222222] bg-[#0A0A0A] space-y-6">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Workflow className="w-4 h-4 text-[#38BDF8]" />
          Single Source of Truth Architecture
        </h3>

        {/* Visual Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl border border-[#242424] bg-[#0F0F0F] flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] text-[#38BDF8] font-bold uppercase tracking-wider block mb-1">01. Inputs</span>
              <h4 className="text-white font-semibold mb-2">Component & Metadata</h4>
              <ul className="space-y-1 text-[#808080]">
                <li>• <code className="text-[#ECECEC]">ComponentName.tsx</code></li>
                <li>• <code className="text-[#ECECEC]">ComponentName.meta.ts</code></li>
                <li>• Optional companion CSS/Utils</li>
              </ul>
            </div>
            <span className="text-[11px] text-[#6F6F6F]">Human author writes code & props API</span>
          </div>

          <div className="p-4 rounded-xl border border-[#38BDF8]/30 bg-[#38BDF8]/5 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] text-[#38BDF8] font-bold uppercase tracking-wider block mb-1">02. Generator Engine</span>
              <h4 className="text-white font-semibold mb-2">scripts/generate-registry.ts</h4>
              <ul className="space-y-1 text-[#808080]">
                <li>• AST import parser</li>
                <li>• Package.json cross-checker</li>
                <li>• Local utility dependency resolver</li>
                <li>• Raw source code disk reader</li>
              </ul>
            </div>
            <span className="text-[11px] text-[#38BDF8]">Zero manual JSON manipulation</span>
          </div>

          <div className="p-4 rounded-xl border border-[#242424] bg-[#0F0F0F] flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-1">03. Outputs</span>
              <h4 className="text-white font-semibold mb-2">Synced Artifacts</h4>
              <ul className="space-y-1 text-[#808080]">
                <li>• <code className="text-[#ECECEC]">registry.json</code> (shadcn)</li>
                <li>• <code className="text-[#ECECEC]">components-data.ts</code> (UI)</li>
                <li>• CLI installation endpoints</li>
                <li>• Dynamic ⌘K search index</li>
              </ul>
            </div>
            <span className="text-[11px] text-emerald-400">Validated via CI pipeline</span>
          </div>
        </div>
      </div>

      {/* Deep Dive 1: AST Dependency Detection */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">1. AST Import & Dependency Discovery</h2>
            <p className="text-xs text-[#808080]">How external packages and internal helpers are mapped automatically</p>
          </div>
        </div>

        <p className="text-xs text-[#808080] leading-relaxed">
          When <code className="text-[#ECECEC] font-mono">npm run component:sync</code> runs, the generator reads each component’s TypeScript source code and executes regex-based import parsing:
        </p>

        <ul className="list-disc list-inside space-y-2 text-xs text-[#A1A1A1] ml-2">
          <li>
            <strong className="text-white">External NPM Dependencies:</strong> If a component imports from <code className="text-[#ECECEC] font-mono">'framer-motion'</code> or <code className="text-[#ECECEC] font-mono">'lucide-react'</code>, the script verifies them against <code className="text-[#ECECEC] font-mono">package.json</code> and attaches them to the <code className="text-[#ECECEC] font-mono">dependencies</code> array in <code className="text-[#ECECEC] font-mono">registry.json</code>.
          </li>
          <li>
            <strong className="text-white">Internal Utilities Linking:</strong> If a component imports <code className="text-[#ECECEC] font-mono">'../../lib/motion-tokens'</code> or <code className="text-[#ECECEC] font-mono">'../../lib/utils'</code>, the script automatically adds <code className="text-[#ECECEC] font-mono">lib/motion-tokens.ts</code> (with <code className="text-[#ECECEC] font-mono">registry:lib</code> type) into the file manifest so that the shadcn CLI downloads all prerequisite utilities seamlessly.
          </li>
          <li>
            <strong className="text-white">Companion Stylesheets:</strong> If a component has an associated <code className="text-[#ECECEC] font-mono">.css</code> file (like <code className="text-[#ECECEC] font-mono">DotField.css</code>), it is automatically discovered and bundled.
          </li>
        </ul>
      </div>

      {/* Deep Dive 2: Multi-file Component Structure */}
      <div className="space-y-4 pt-6 border-t border-[#181818]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">2. Multi-File Component Support</h2>
            <p className="text-xs text-[#808080]">Support for complex widgets split into multiple files</p>
          </div>
        </div>

        <p className="text-xs text-[#808080] leading-relaxed">
          EasyUI natively supports both single-file components (<code className="text-[#ECECEC] font-mono">MagneticButton.tsx</code>) and multi-file directories. For complex widgets, simply create a folder inside <code className="text-[#ECECEC] font-mono">src/components/ui/</code>:
        </p>

        <DocCodeBlock
          code={`src/components/ui/custom-dock/
├── CustomDock.tsx          # Main React component
├── dock-item.tsx           # Sub-component
├── dock-physics.ts         # Math / physics helper
├── dock.css                # Optional scoped CSS
└── meta.ts                 # Component metadata definition`}
          language="text"
          title="Directory Structure for Multi-File Components"
        />

        <p className="text-xs text-[#808080] leading-relaxed">
          The generator automatically discovers every nested file, classifies their registry targets, and bundles them into the component entry. When a user runs <code className="text-[#ECECEC] font-mono">npx shadcn add Surajmaurya1/easyui/custom-dock</code>, all files are downloaded into their proper project paths.
        </p>
      </div>

      {/* Deep Dive 3: Automated Validation Suite */}
      <div className="space-y-4 pt-6 border-t border-[#181818]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">3. 10-Point Registry Validation Suite</h2>
            <p className="text-xs text-[#808080]">Strict CI verification ensuring zero broken installs</p>
          </div>
        </div>

        <p className="text-xs text-[#808080] leading-relaxed">
          The validation script (<code className="text-[#ECECEC] font-mono">scripts/validate-registry.ts</code>) enforces 10 automated guarantees:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            'Validates root registry.json matches official shadcn schema',
            'Checks that all declared files physically exist on disk',
            'Ensures every component has a corresponding .meta.ts',
            'Verifies unique slugs and kebap-case CLI naming',
            'Asserts zero missing external npm dependencies',
            'Validates props API tables and type definitions',
            'Tests that components-data.ts is in 100% sync with registry.json',
            'Ensures usage snippets and examples are syntactically valid',
            'Confirms accessibility criteria are documented for each component',
            'Checks CI consistency to prevent unsynced git commits',
          ].map((check, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg border border-[#1E1E1E] bg-[#0A0A0A]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-[#A1A1A1]">{check}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Single Sync Command */}
      <div className="p-6 rounded-2xl border border-[#222222] bg-[#0E0E0E] space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-[#38BDF8]" />
          The One-Click Sync Command
        </h3>
        <p className="text-xs text-[#808080] leading-relaxed">
          Whenever a component or metadata is added or changed, run the sync command. It generates both registries and executes validation in a single pass:
        </p>
        <DocCodeBlock
          code="npm run component:sync"
          language="bash"
          isTerminal={true}
        />
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-[#181818] grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigateSection('collaboration')}
          className="flex items-center justify-between p-4 rounded-xl border border-[#1E1E1E] bg-[#0C0C0C] hover:bg-[#121212] hover:border-[#38BDF8]/30 transition-all text-left group"
        >
          <div>
            <span className="text-[11px] font-mono text-[#6F6F6F] block">Next Guide</span>
            <span className="text-sm font-semibold text-white group-hover:text-[#38BDF8] transition-colors">How to Collaborate & Contribute</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#6F6F6F] group-hover:text-[#38BDF8] group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => onNavigateSection('motion')}
          className="flex items-center justify-between p-4 rounded-xl border border-[#1E1E1E] bg-[#0C0C0C] hover:bg-[#121212] hover:border-[#38BDF8]/30 transition-all text-left group"
        >
          <div>
            <span className="text-[11px] font-mono text-[#6F6F6F] block">Deep Dive</span>
            <span className="text-sm font-semibold text-white group-hover:text-[#38BDF8] transition-colors">Motion Tokens & Spring Physics</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#6F6F6F] group-hover:text-[#38BDF8] group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>
    </div>
  );
};
