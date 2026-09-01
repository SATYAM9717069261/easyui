import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { DotField } from '../ui/DotField';
import { NeonEdgeButton } from '../ui/NeonEdgeButton';
import { copyToClipboard } from '../../lib/utils';

export interface HeroSectionProps {
  onExplore: () => void;
  onSelectComponent?: (id: string) => void;
}

const INSTALL_COMMAND = 'npx shadcn@latest add Surajmaurya1/easyui/neon-edge-button';

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(INSTALL_COMMAND);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[100svh] sm:min-h-0 pt-28 sm:pt-28 lg:pt-36 pb-16 sm:pb-28 lg:pb-36 overflow-hidden flex items-start sm:items-center">
      {/* Atmosphere: same DotField + radial vignette as the rest of the site */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <DotField
          dotRadius={1.5}
          dotSpacing={18}
          gradientFrom="rgba(10, 10, 10, 0.18)"
          gradientTo="rgba(10, 10, 10, 0.05)"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--bg)_95%)]" />
      </div>

      <Container size="lg">
        <div className="relative flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* ONE strong headline — comma + period punctuation for typographic drama */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-7 text-[40px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.035em] text-text-primary leading-[1.02]"
          >
            Beautiful Components,
            <br />
            Made to Stand Out.
          </motion.h1>

          {/* ONE short description — tells a first-timer what it is, what it does, how to install */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 sm:mt-9 text-[15px] sm:text-[16px] text-text-secondary max-w-md leading-relaxed"
          >
            Beautiful, open source and animated React components you can copy, customize, and install with one command.
          </motion.p>

          {/* Command bar + primary action, side-by-side — minimal, single row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 sm:mt-12 w-full max-w-xl"
          >
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy install command"
                className="group flex-1 min-w-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-md border border-border bg-surface/60 hover:border-border-hover hover:bg-surface-hover/60 transition-colors focus-ring"
              >
                <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-text-muted shrink-0 select-none">
                  CLI
                </span>
                <span className="text-[12.5px] font-sans text-text-secondary truncate flex-1 text-left select-all">
                  {INSTALL_COMMAND}
                </span>
                <span className="shrink-0 text-text-subtle group-hover:text-text-primary transition-colors">
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </span>
              </button>

              <span className="w-full sm:w-auto self-stretch inline-flex easyui-hero-start-scope">
                <style>{`
                  .easyui-hero-start-scope > button > span:nth-of-type(2) > svg:first-of-type {
                    display: none !important;
                  }
                `}</style>
                <NeonEdgeButton
                  onClick={onExplore}
                  aria-label="Browse components"
                  className="w-full sm:w-auto"
                >
                  <span className="inline-flex items-center gap-1.5">
                    Browse components
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </NeonEdgeButton>
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
