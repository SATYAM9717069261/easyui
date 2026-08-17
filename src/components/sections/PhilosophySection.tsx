import React from 'react';
import { Container } from '../layout/Container';
import { Code, Wind, ShieldCheck, Sparkles } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  const principles = [
    {
      icon: <Code className="w-4 h-4 text-[#ECECEC]" />,
      title: 'Source you own.',
      description: 'Zero npm black boxes. Copy components into your project, inspect, customize, and extend freely.',
    },
    {
      icon: <Wind className="w-4 h-4 text-[#ECECEC]" />,
      title: 'Motion with purpose.',
      description: 'Physical spring dynamics that convey weight and continuity rather than distracting showmanship.',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#ECECEC]" />,
      title: 'Accessible by default.',
      description: 'WAI-ARIA compliant, full keyboard control, visible focus states, and reduced motion awareness.',
    },
    {
      icon: <Sparkles className="w-4 h-4 text-[#ECECEC]" />,
      title: 'Built for React.',
      description: 'Optimized for React 18+, Next.js App Router, Tailwind CSS, TypeScript, and Framer Motion.',
    },
  ];

  return (
    <section className="py-20 border-t border-b border-[#141414] bg-[#070707]">
      <Container size="lg">
        {/* Main Philosophy Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#6F6F6F]">
            The Standard
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#F5F5F5] tracking-tight mt-2">
            Built for developers who care about the details.
          </h2>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[#181818] bg-[#0B0B0B] hover:border-[#282828] transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#222222] flex items-center justify-center mb-4 group-hover:border-[#383838] transition-colors">
                {item.icon}
              </div>
              <h3 className="text-sm font-semibold text-[#F5F5F5] tracking-tight mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-[#808080] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
