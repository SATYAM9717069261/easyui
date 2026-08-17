import React from 'react';
import { Container } from '../layout/Container';
import { MagneticButton } from '../ui/MagneticButton';
import { ArrowRight } from 'lucide-react';
import { GithubIcon } from '../icons/GithubIcon';
import { GITHUB_URL } from '../../lib/constants';

export interface FinalCtaProps {
  onBrowse: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onBrowse }) => {
  return (
    <section className="py-24 bg-[#050505] border-t border-[#141414] relative overflow-hidden text-center">
      {/* Subtle bottom ambient neutral glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] opacity-10 blur-[80px] bg-gradient-to-t from-white/15 to-transparent" />

      <Container size="md">
        <div className="max-w-xl mx-auto space-y-5">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F5F5F5] leading-tight">
            Build something beautiful.
          </h2>

          <p className="text-sm text-[#808080] max-w-sm mx-auto leading-relaxed">
            EasyUI gives you the pieces. You decide what to build.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <MagneticButton
              variant="primary"
              size="md"
              onClick={onBrowse}
            >
              <span>Browse components</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              size="md"
              onClick={() => window.open(GITHUB_URL, '_blank')}
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </MagneticButton>
          </div>
        </div>
      </Container>
    </section>
  );
};
