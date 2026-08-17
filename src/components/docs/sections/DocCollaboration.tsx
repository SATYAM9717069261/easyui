import React from 'react';
import { GitPullRequest, Check, Sparkles, ArrowRight } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';

export interface DocCollaborationProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocCollaboration: React.FC<DocCollaborationProps> = ({ onNavigateSection }) => {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono text-[#38BDF8] uppercase tracking-widest bg-[#38BDF8]/10 px-2.5 py-0.5 rounded-full border border-[#38BDF8]/20">
            Contributing Guide
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5] font-sans">
          How to Collaborate & Add Components
        </h1>
        <p className="text-base text-[#A1A1A1] mt-3 leading-relaxed max-w-3xl">
          EasyUI is built for frictionless collaboration. Whether you are crafting a new physics button, a smooth modal transition, or an interactive shader, this guide covers everything you need to build, document, sync, and submit your component.
        </p>
      </div>

      {/* Overview Card */}
      <div className="p-6 rounded-2xl border border-[#242424] bg-gradient-to-b from-[#0E0E0E] to-[#080808] space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#38BDF8]" />
          What You Need to Make (At a Glance)
        </h3>
        <p className="text-xs text-[#888888] leading-relaxed">
          When adding a new component to EasyUI, you only ever write <strong>two files</strong>:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl border border-[#222222] bg-[#050505]">
            <span className="text-emerald-400 font-bold block mb-1">1. Component Code (.tsx)</span>
            <span className="text-[#808080]">The React component using Tailwind CSS, Framer Motion, and TypeScript.</span>
          </div>
          <div className="p-3.5 rounded-xl border border-[#222222] bg-[#050505]">
            <span className="text-[#38BDF8] font-bold block mb-1">2. Component Metadata (.meta.ts)</span>
            <span className="text-[#808080]">Human-written title, description, props documentation, category, and usage snippet.</span>
          </div>
        </div>
        <p className="text-xs text-[#6F6F6F]">
          * Everything else (CLI command generation, shadcn `registry.json` entry, website catalog synchronization, and dependency discovery) is handled 100% automatically by the build engine!
        </p>
      </div>

      {/* Step 1: Scaffolding */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-xs font-mono font-bold text-[#38BDF8]">
            01
          </div>
          <h2 className="text-xl font-semibold text-white">Scaffold with the Component CLI</h2>
        </div>
        <p className="text-xs text-[#808080] leading-relaxed">
          Start by running the built-in scaffolding script. Pass the PascalCase component name:
        </p>
        <DocCodeBlock
          code="npm run component:new AuroraCard"
          language="bash"
          isTerminal={true}
        />
        <p className="text-xs text-[#808080] leading-relaxed">
          This command instantly creates:
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs text-[#A1A1A1] ml-2">
          <li><code className="text-[#ECECEC] font-mono">src/components/ui/AuroraCard.tsx</code> — Pre-populated component boilerplate.</li>
          <li><code className="text-[#ECECEC] font-mono">src/components/ui/AuroraCard.meta.ts</code> — Typed metadata template.</li>
        </ul>
      </div>

      {/* Step 2: Writing the Component Code */}
      <div className="space-y-4 pt-6 border-t border-[#181818]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-xs font-mono font-bold text-[#38BDF8]">
            02
          </div>
          <h2 className="text-xl font-semibold text-white">Implement the Component (.tsx)</h2>
        </div>
        <p className="text-xs text-[#808080] leading-relaxed">
          Follow these standards when writing the component:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-xs text-[#A1A1A1] ml-2">
          <li><strong className="text-white">Export Props Interface:</strong> Name it <code className="text-[#ECECEC] font-mono">&lt;ComponentName&gt;Props</code> and extend HTML element props where applicable.</li>
          <li><strong className="text-white">Use Tailwind Merge (`cn`):</strong> Always allow callers to pass custom <code className="text-[#ECECEC] font-mono">className</code> props via <code className="text-[#ECECEC] font-mono">cn(...)</code>.</li>
          <li><strong className="text-white">Leverage Motion Tokens:</strong> Import predefined spring physics from <code className="text-[#ECECEC] font-mono">../../lib/motion-tokens</code>.</li>
          <li><strong className="text-white">Zero Unnecessary Global State:</strong> Components should be self-contained and copy-paste friendly.</li>
        </ul>

        <DocCodeBlock
          code={`import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface AuroraCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const AuroraCard: React.FC<AuroraCardProps> = ({
  children,
  className,
  glowColor = '#38BDF8',
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={motionTransitions.springSnappy}
      className={cn(
        'p-6 rounded-2xl border border-[#202020] bg-[#0A0A0A] text-[#F5F5F5] relative overflow-hidden',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-[#38BDF8]" />
        <h3 className="text-sm font-semibold">Aurora Card</h3>
      </div>
      {children}
    </motion.div>
  );
};`}
          language="tsx"
          title="src/components/ui/AuroraCard.tsx"
        />
      </div>

      {/* Step 3: Writing the Metadata */}
      <div className="space-y-4 pt-6 border-t border-[#181818]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-xs font-mono font-bold text-[#38BDF8]">
            03
          </div>
          <h2 className="text-xl font-semibold text-white">Define Metadata (.meta.ts)</h2>
        </div>
        <p className="text-xs text-[#808080] leading-relaxed">
          The <code className="text-[#ECECEC] font-mono">.meta.ts</code> file powers the website documentation, ⌘K search palette, and props API table. Fill out each field thoroughly:
        </p>

        <DocCodeBlock
          code={`import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Aurora Card',
  description: 'An elevated dark surface with subtle ambient aurora glow interaction.',
  category: 'Motion', // 'Motion' | 'Buttons' | 'Navigation' | 'Feedback' | 'Overlays'
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
    { name: 'glowColor', type: 'string', default: '"#38BDF8"', description: 'Hex or HSL color for the radial glow' },
  ],
  accessibility: [
    'Contrast compliant with WCAG AA standards',
    'Respects prefers-reduced-motion media query',
    'Supports keyboard tab focusing and ARIA labels',
  ],
  usageCode: \`import { AuroraCard } from "@/components/ui/aurora-card";

export function Demo() {
  return (
    <AuroraCard glowColor="#38BDF8">
      <p>Hello EasyUI</p>
    </AuroraCard>
  );
}\`,
  featured: true,
};

export default meta;`}
          language="typescript"
          title="src/components/ui/AuroraCard.meta.ts"
        />
      </div>

      {/* Step 4: Running Sync */}
      <div className="space-y-4 pt-6 border-t border-[#181818]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-xs font-mono font-bold text-[#38BDF8]">
            04
          </div>
          <h2 className="text-xl font-semibold text-white">Sync the Registry Engine</h2>
        </div>
        <p className="text-xs text-[#808080] leading-relaxed">
          Run the sync command in your terminal:
        </p>
        <DocCodeBlock
          code="npm run component:sync"
          language="bash"
          isTerminal={true}
        />
        <p className="text-xs text-[#808080] leading-relaxed">
          This command runs the AST discovery engine, derives the CLI command <code className="text-[#ECECEC] font-mono">Surajmaurya1/easyui/aurora-card</code>, updates <code className="text-[#ECECEC] font-mono">registry.json</code>, updates <code className="text-[#ECECEC] font-mono">components-data.ts</code>, and runs the 10-point validation suite.
        </p>
      </div>

      {/* Step 5: Test & Validate */}
      <div className="space-y-4 pt-6 border-t border-[#181818]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-xs font-mono font-bold text-[#38BDF8]">
            05
          </div>
          <h2 className="text-xl font-semibold text-white">Test Locally & Validate</h2>
        </div>
        <p className="text-xs text-[#808080] leading-relaxed">
          Start the local development server and verify your component in the interactive showroom:
        </p>
        <DocCodeBlock
          code={`# Run dev server
npm run dev

# Run validation checks
npm run registry:validate
npx tsc -b
npm run lint`}
          language="bash"
          isTerminal={true}
        />
      </div>

      {/* Step 6: PR Submission */}
      <div className="space-y-4 pt-6 border-t border-[#181818]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-xs font-mono font-bold text-[#38BDF8]">
            06
          </div>
          <h2 className="text-xl font-semibold text-white">Commit & Open a Pull Request</h2>
        </div>
        <p className="text-xs text-[#808080] leading-relaxed">
          Commit your changes using conventional commit messages:
        </p>
        <DocCodeBlock
          code={`git checkout -b feat/aurora-card
git add .
git commit -m "feat: add AuroraCard component and metadata"
git push origin feat/aurora-card`}
          language="bash"
          isTerminal={true}
        />

        {/* PR Checklist */}
        <div className="p-4 rounded-xl border border-[#242424] bg-[#0B0B0B] space-y-2">
          <h4 className="text-xs font-semibold text-white flex items-center gap-2">
            <GitPullRequest className="w-4 h-4 text-[#38BDF8]" />
            Pull Request Checklist
          </h4>
          <ul className="space-y-1.5 text-xs text-[#888888]">
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Created <code className="text-[#ECECEC] font-mono">ComponentName.tsx</code> and <code className="text-[#ECECEC] font-mono">ComponentName.meta.ts</code></span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ran <code className="text-[#ECECEC] font-mono">npm run component:sync</code> successfully</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>All TypeScript types build without errors (<code className="text-[#ECECEC] font-mono">tsc -b</code>)</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Linter passes without errors (<code className="text-[#ECECEC] font-mono">npm run lint</code>)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-[#181818] grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigateSection('architecture')}
          className="flex items-center justify-between p-4 rounded-xl border border-[#1E1E1E] bg-[#0C0C0C] hover:bg-[#121212] hover:border-[#38BDF8]/30 transition-all text-left group"
        >
          <div>
            <span className="text-[11px] font-mono text-[#6F6F6F] block">Architecture</span>
            <span className="text-sm font-semibold text-white group-hover:text-[#38BDF8] transition-colors">How the Engine Works</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#6F6F6F] group-hover:text-[#38BDF8] group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => onNavigateSection('motion')}
          className="flex items-center justify-between p-4 rounded-xl border border-[#1E1E1E] bg-[#0C0C0C] hover:bg-[#121212] hover:border-[#38BDF8]/30 transition-all text-left group"
        >
          <div>
            <span className="text-[11px] font-mono text-[#6F6F6F] block">Motion System</span>
            <span className="text-sm font-semibold text-white group-hover:text-[#38BDF8] transition-colors">Motion Tokens & Spring Physics</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#6F6F6F] group-hover:text-[#38BDF8] group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>
    </div>
  );
};
