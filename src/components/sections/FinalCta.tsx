import React from 'react';
import { Container } from '../layout/Container';
import { MagneticButton } from '../ui/MagneticButton';
import { ArrowRight } from 'lucide-react';
import { GithubIcon } from '../icons/GithubIcon';

export interface FinalCtaProps {
  onBrowse: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onBrowse }) => {
  return (
    <section className="py-28 bg-[#050505] border-t border-[#141414] relative overflow-hidden text-center">
      {/* Subtle bottom ambient radial */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] opacity-20 blur-[100px] bg-gradient-to-t from-[#38BDF8]/15 to-transparent" />

      <Container size="md">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#F5F5F5] leading-tight">
            Build something beautiful.
          </h2>

          <p className="text-sm sm:text-base text-[#8E8E8E] max-w-md mx-auto leading-relaxed">
            EasyUI gives you the pieces.
            <br />
            You decide what to build.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={onBrowse}
            >
              <span>Browse components</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              size="lg"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </MagneticButton>
          </div>
        </div>
      </Container>
    </section>
  );
};
