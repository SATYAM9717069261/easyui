import React from 'react';
import { Container } from '../layout/Container';
import { ArrowRight } from 'lucide-react';
import { GITHUB_URL } from '../../lib/constants';

export interface FinalCtaProps {
  onBrowse: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onBrowse }) => {
  return (
    <section className="py-24 sm:py-32 lg:py-36 bg-[#050505] border-t border-[#1F1F1F] relative overflow-hidden text-center">
      {/* Quiet bottom glow — same as before, slightly softer */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[420px] h-[180px] opacity-[0.08] blur-[80px] bg-gradient-to-t from-white/15 to-transparent" />

      <Container size="md">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-[56px] lg:text-[64px] font-semibold tracking-[-0.03em] text-[#FAFAFA] leading-[1.02]">
            Build something
            <br />
            beautiful.
          </h2>

          <p className="mt-6 text-[15px] sm:text-[16px] text-[#A1A1A1] max-w-md mx-auto leading-relaxed">
            EasyUI gives you the pieces. You decide what to build.
          </p>

          <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <button
              onClick={onBrowse}
              className="group inline-flex items-center gap-2 text-[14px] font-medium text-[#FAFAFA] transition-colors focus-ring rounded cursor-pointer"
            >
              <span className="relative">
                Browse components
                <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 bg-[#FAFAFA] transition-transform duration-300" />
              </span>
              <ArrowRight className="w-4 h-4 text-[#A1A1A1] group-hover:text-[#FAFAFA] group-hover:translate-x-0.5 transition-all duration-300" />
            </button>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[14px] font-medium text-[#A1A1A1] hover:text-[#FAFAFA] transition-colors focus-ring rounded"
            >
              <span className="relative">
                Star on GitHub
                <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 bg-[#A1A1A1] transition-transform duration-300" />
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};
