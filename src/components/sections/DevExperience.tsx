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
      title: 'Add with shadcn CLI',
      description: 'Install any component directly from the EasyUI GitHub registry. No npm package — the source lands straight into your project.',
      code: 'npx shadcn@latest add Surajmaurya1/easyui/magnetic-button',
    },
    {
      step: '02',
      title: 'Copy the source',
      description: 'The complete TypeScript & Tailwind component file lands right in your components/ui folder.',
      code: 'import { MagneticButton } from "@/components/ui/magnetic-button";',
    },
    {
      step: '03',
      title: 'Make it yours',
      description: 'Zero third-party vendor lock-in. Adjust tokens, physics stiffness, or styling freely to match your brand.',
      code: '<MagneticButton strength={0.4} variant="primary">\n  Deploy Now\n</MagneticButton>',
    },
  ];

  const handleCopy = (code: string, idx: number) => {
    copyToClipboard(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="dev-experience" className="py-20 bg-[#050505] border-t border-[#141414]">
      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono text-[#737373] uppercase tracking-widest">
              Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#F5F5F5] tracking-tight mt-1">
              Built for velocity.
            </h2>
            <p className="text-sm text-[#808080] mt-1.5">
              No bundle overhead, no forced themes. Drop components directly into your codebase in seconds.
            </p>
          </div>

          {onExploreDocs && (
            <button
              onClick={onExploreDocs}
              className="self-start md:self-auto flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0E0E0E] hover:bg-[#141414] border border-[#1E1E1E] hover:border-[#2C2C2C] text-xs font-medium text-[#F5F5F5] transition-colors group"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D4D4D4]" />
              <span>Full Documentation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </button>
          )}
        </div>

        {/* 3 Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 rounded-xl border border-[#161616] bg-[#080808] hover:border-[#242424] transition-colors"
            >
              <div>
                <span className="text-xs font-mono font-medium text-[#555555] tracking-wider block mb-3">
                  {item.step}
                </span>
                <h3 className="text-sm font-semibold text-[#F5F5F5] mb-1.5 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-[#808080] leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Code Snippet Box */}
              <div className="rounded-lg border border-[#161616] bg-[#0C0C0C] p-3 text-xs font-mono flex items-start justify-between gap-2 overflow-hidden">
                <span className="text-[#A1A1A1] overflow-x-auto whitespace-pre leading-relaxed scrollbar-none py-0.5">
                  {item.code}
                </span>
                <button
                  onClick={() => handleCopy(item.code, idx)}
                  className="shrink-0 p-1 rounded hover:bg-[#161616] text-[#737373] hover:text-[#F5F5F5] transition-colors"
                  title="Copy code"
                >
                  {copiedIndex === idx ? (
                    <Check className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
