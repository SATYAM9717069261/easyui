import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { Copy, Check, BookOpen, ArrowRight } from 'lucide-react';
import { copyToClipboard } from '../../lib/utils';

export interface DevExperienceProps {
  onExploreDocs?: () => void;
}

export const DevExperience: React.FC<DevExperienceProps> = ({ onExploreDocs }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const steps = [
    {
      step: '01',
      badge: 'Step 1',
      title: 'Pick a Component',
      description:
        'Browse our collection of modern UI components. Preview animations live, test features, and copy the 1-line install command.',
      label: 'CLI Command',
      code: 'npx shadcn@latest add Surajmaurya1/easyui/magnetic-button',
    },
    {
      step: '02',
      badge: 'Step 2',
      title: 'Add to Your Project',
      description:
        'Run the CLI command or paste the code directly into your repository. You get clean TypeScript source code with 100% full ownership.',
      label: 'File Location',
      code: 'src/components/ui/magnetic-button.tsx',
    },
    {
      step: '03',
      badge: 'Step 3',
      title: 'Import and Use',
      description:
        'Import the component anywhere in your React or Next.js app. Customize styling with Tailwind CSS and tweak settings freely.',
      label: 'React Example',
      code: `import { MagneticButton } from "@/components/ui/magnetic-button";

export function Hero() {
  return (
    <MagneticButton strength={0.4}>
      Get Started
    </MagneticButton>
  );
}`,
    },
  ];

  const handleCopy = (code: string, idx: number) => {
    copyToClipboard(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="how-it-works" className="py-20 bg-[#151515] border-t border-[#363636] scroll-mt-12">
      {/* Anchor alias for backwards compatibility */}
      <span id="workflow" className="sr-only" />
      <span id="dev-experience" className="sr-only" />

      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono text-[#737373] uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#F5F5F5] tracking-tight mt-1">
              How to use EasyUI in 3 easy steps.
            </h2>
            <p className="text-sm text-[#A3A3A3] mt-1.5 leading-relaxed">
              No complex setup or heavy npm packages. Drop beautiful, production-ready components straight into your React & Next.js codebase.
            </p>
          </div>

          {onExploreDocs && (
            <button
              onClick={onExploreDocs}
              className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#202020] hover:bg-[#242424] border border-[#363636] hover:border-[#484848] text-xs font-medium text-[#F5F5F5] transition-colors group shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#8A8A8A]" />
              <span>Read Full Docs</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </button>
          )}
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between h-full p-6 rounded-xl border border-[#363636] bg-[#202020] hover:border-[#4A4A4A] transition-all group"
            >
              <div className="flex-1 flex flex-col">
                {/* Step Top Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#242424] border border-[#363636] text-[#A3A3A3]">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[#F5F5F5] mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-[#A3A3A3] leading-relaxed mb-6 flex-1 min-h-[48px]">
                  {item.description}
                </p>
              </div>

              {/* Code Snippet Box (Uniform Fixed Height & Clean Scroll) */}
              <div className="h-[110px] flex flex-col rounded-lg border border-[#363636] bg-[#151515] overflow-hidden shrink-0">
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#1C1C1C] border-b border-[#363636] text-[11px] shrink-0">
                  <span className="font-mono text-[#737373] text-[10px] uppercase tracking-wider">
                    {item.label}
                  </span>
                  <button
                    onClick={() => handleCopy(item.code, idx)}
                    className="flex items-center gap-1 text-[11px] text-[#737373] hover:text-[#F5F5F5] transition-colors py-0.5 px-1 rounded hover:bg-[#242424]"
                    title="Copy snippet"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-white" />
                        <span className="text-white text-[10px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span className="text-[10px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="flex-1 p-3 text-xs font-mono overflow-auto scrollbar-none flex items-center">
                  <pre className="text-[#A3A3A3] whitespace-pre leading-relaxed selection:bg-white/20 w-full">
                    <code>{item.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
