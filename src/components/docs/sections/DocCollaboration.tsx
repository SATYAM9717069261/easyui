import React from 'react';
import { GitPullRequest, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
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
          <span className="text-[11px] font-mono text-[#A1A1A1] uppercase tracking-widest bg-[#181818] px-2.5 py-0.5 rounded-full border border-[#282828]">
            Contributors Manual
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5] font-sans">
          How to Collaborate & Add Components
        </h1>
        <p className="text-base text-[#A1A1A1] mt-3 leading-relaxed max-w-3xl">
          Everything you need to know to contribute new components to EasyUI. Because of our automated single source of truth engine, adding a component takes just a few steps.
        </p>
      </div>

      {/* Summary Banner */}
      <div className="p-5 rounded-xl border border-[#222222] bg-[#0A0A0A] space-y-2">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-white" />
          The Rule of Two Files
        </h3>
        <p className="text-xs text-[#808080] leading-relaxed">
          When contributing a component, you only ever create or touch two files in <code className="text-[#ECECEC] font-mono">src/components/ui/</code>:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-lg border border-[#1E1E1E] bg-[#121212] text-xs">
            <span className="text-white font-bold block mb-1">1. Component Implementation (.tsx)</span>
            <span className="text-[#808080]">The React + Tailwind + Framer Motion component code.</span>
          </div>
          <div className="p-3 rounded-lg border border-[#1E1E1E] bg-[#121212] text-xs">
            <span className="text-white font-bold block mb-1">2. Component Metadata (.meta.ts)</span>
            <span className="text-[#808080]">Name, description, props documentation, and usage examples.</span>
          </div>
        </div>
        <p className="text-[11px] text-[#6F6F6F] pt-1">
          Everything else (<code className="text-[#808080]">registry.json</code>, showcase card, search index, website docs) is generated automatically.
        </p>
      </div>

      {/* Step 1: Scaffold using CLI Generator */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-xs font-mono font-bold text-white">
            01
          </div>
          <h2 className="text-xl font-semibold text-white">Scaffold a New Component in Seconds</h2>
        </div>
        <p className="text-xs text-[#808080] leading-relaxed">
          Use the built-in scaffolding command to generate starter files with boilerplate TypeScript types, motion tokens, and metadata:
        </p>
        <DocCodeBlock
          code="npm run component:new <ComponentName>"
          language="bash"
          isTerminal={true}
        />
        <p className="text-xs text-[#808080]">
          Example: <code className="text-[#ECECEC] font-mono">npm run component:new TiltCard</code> creates:
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs text-[#A1A1A1] ml-2">
          <li><code className="text-[#ECECEC] font-mono">src/components/ui/TiltCard.tsx</code> (Ready-to-edit component template)</li>
          <li><code className="text-[#ECECEC] font-mono">src/components/ui/TiltCard.meta.ts</code> (Pre-configured metadata definition)</li>
        </ul>
      </div>

      {/* Step 2: Implement Component Code */}
      <div className="space-y-4 pt-6 border-t border-[#181818]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-xs font-mono font-bold text-white">
            02
          </div>
          <h2 className="text-xl font-semibold text-white">Write the Component Implementation</h2>
        </div>
        <p className="text-xs text-[#808080] leading-relaxed">
          Follow EasyUI design standards: use spring physics, dark-mode tones, keyboard accessibility, and export clean props interfaces:
        </p>

        <DocCodeBlock
          code={`import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;
  className?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  maxTilt = 15,
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 300, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    rotateX.set((-y / (rect.height / 2)) * maxTilt);
    rotateY.set((x / (rect.width / 2)) * maxTilt);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'rounded-2xl border border-[#222222] bg-[#0C0C0C] p-6 shadow-xl transition-colors',
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
};`}
          language="tsx"
          title="src/components/ui/TiltCard.tsx"
        />
      </div>

      {/* Step 3: Write Metadata */}
      <div className="space-y-4 pt-6 border-t border-[#181818]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-xs font-mono font-bold text-white">
            03
          </div>
          <h2 className="text-xl font-semibold text-white">Define Component Metadata (.meta.ts)</h2>
        </div>
        <p className="text-xs text-[#808080] leading-relaxed">
          Fill in the metadata file. This automatically powers the documentation tables, search keywords, and installation snippets:
        </p>

        <DocCodeBlock
          code={`import type { EasyComponentMeta } from '../../types/component';

export const TiltCardMeta: EasyComponentMeta = {
  id: 'tilt-card',
  name: 'Tilt Card',
  category: 'Motion',
  description: 'Tactile 3D perspective tilt card that tracks cursor coordinates with physical springs.',
  badges: ['Framer Motion', '3D Perspective', 'Physics'],
  cliCommand: 'npx shadcn@latest add Surajmaurya1/easyui/tilt-card',
  dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  files: ['src/components/ui/TiltCard.tsx'],
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Inner contents rendered inside 3D canvas',
    },
    {
      name: 'maxTilt',
      type: 'number',
      defaultValue: '15',
      description: 'Maximum angular rotation degrees on X/Y axes',
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: '""',
      description: 'Additional Tailwind CSS classes',
    },
  ],
  usageExample: \`import { TiltCard } from "@/components/ui/tilt-card";

export function Demo() {
  return (
    <TiltCard maxTilt={20}>
      <h3 className="text-white font-bold">Interactive Card</h3>
      <p className="text-neutral-400 text-xs">Hover to feel 3D spring momentum.</p>
    </TiltCard>
  );
}\`,
  sourceCode: '', // Automatically populated by registry generator
};`}
          language="typescript"
          title="src/components/ui/TiltCard.meta.ts"
        />
      </div>

      {/* Step 4: Sync & Verify */}
      <div className="space-y-4 pt-6 border-t border-[#181818]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-xs font-mono font-bold text-white">
            04
          </div>
          <h2 className="text-xl font-semibold text-white">Sync Registry & Validate</h2>
        </div>
        <p className="text-xs text-[#808080] leading-relaxed">
          Run the sync command. The engine reads your code, maps imports, updates <code className="text-[#ECECEC] font-mono">registry.json</code> and website catalog, and verifies 0 errors:
        </p>

        <DocCodeBlock
          code={`# Sync & regenerate registry + website data
npm run component:sync

# Validate all components and schema integrity
npm run registry:validate

# Typecheck and lint
npx tsc -b
npm run lint`}
          language="bash"
          isTerminal={true}
        />
      </div>

      {/* PR Checklist */}
      <div className="p-6 rounded-2xl border border-[#222222] bg-[#0A0A0A] space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <GitPullRequest className="w-4 h-4 text-white" />
          Pull Request Checklist
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            'Component is written in TypeScript (.tsx) with clean exports',
            'Corresponding .meta.ts is complete with props and usage example',
            'npm run component:sync executed before committing',
            'npm run registry:validate passed with 0 errors',
            'Works seamlessly in both light/dark container themes',
            'Includes smooth spring motion and accessible keyboard states',
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg border border-[#1E1E1E] bg-[#101010]">
              <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <span className="text-[#A1A1A1]">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-[#181818] grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigateSection('motion')}
          className="flex items-center justify-between p-4 rounded-xl border border-[#1E1E1E] bg-[#0C0C0C] hover:bg-[#121212] hover:border-[#383838] transition-all text-left group"
        >
          <div>
            <span className="text-[11px] font-mono text-[#6F6F6F] block">Next Guide</span>
            <span className="text-sm font-semibold text-white group-hover:text-white transition-colors">Motion Tokens & Spring Physics</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#6F6F6F] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => onNavigateSection('introduction')}
          className="flex items-center justify-between p-4 rounded-xl border border-[#1E1E1E] bg-[#0C0C0C] hover:bg-[#121212] hover:border-[#383838] transition-all text-left group"
        >
          <div>
            <span className="text-[11px] font-mono text-[#6F6F6F] block">Overview</span>
            <span className="text-sm font-semibold text-white group-hover:text-white transition-colors">Back to Introduction</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#6F6F6F] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>
    </div>
  );
};
