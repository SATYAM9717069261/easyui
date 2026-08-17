import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Copy, ChevronRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { DotField } from '../ui/DotField';
import { copyToClipboard } from '../../lib/utils';

export interface HeroSectionProps {
  onExplore: () => void;
  onSelectComponent?: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'cli' | 'react'>('cli');

  const copyInstallCommand = () => {
    copyToClipboard('npx shadcn@latest add Surajmaurya1/easyui/magnetic-button');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const logos = [
    {
      name: 'git',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M21.6 10.86L13.14 2.4a2.23 2.23 0 0 0-3.16 0L8.03 4.35l3.99 3.99a2.65 2.65 0 0 1 3.36 3.39l3.85 3.85a2.63 2.63 0 1 1-1.58 1.55l-3.58-3.58v4.94a2.64 2.64 0 1 1-2.24 0V13.5a2.64 2.64 0 0 1-1.42-3.46L6.46 6.05 2.4 10.12a2.23 2.23 0 0 0 0 3.16l8.46 8.46a2.23 2.23 0 0 0 3.16 0l7.58-7.58a2.23 2.23 0 0 0 0-3.3z" />
        </svg>
      ),
    },
    {
      name: 'npm',
      icon: (
        <svg className="w-5 h-3 fill-current" viewBox="0 0 256 256">
          <path d="M0 0v256h256V0H0zm64 192H32V64h96v128H96v-96H64v96zm96 0h-32V64h96v128h-32v-96h-32v96z" />
        </svg>
      ),
    },
    {
      name: 'React',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0-7.5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      ),
    },
    {
      name: 'TailwindCSS',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      ),
    },
    {
      name: 'TypeScript',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm10.74 14.83h2.38c.41 0 .76-.08 1.04-.24.28-.16.5-.39.66-.69.16-.3.24-.66.24-1.08 0-.44-.09-.81-.27-1.12a1.86 1.86 0 0 0-.75-.72 2.7 2.7 0 0 0-1.13-.28h-2.17v4.13zm-2.04-6.42v8.42H7.95v-8.42h-2.9V6.58h8.04v1.83h-2.89zm4.42 0h2.47c1.03 0 1.87.24 2.52.72.65.48 1.08 1.13 1.29 1.95.21.82.21 1.76 0 2.58a4.1 4.1 0 0 1-1.29 1.95c-.65.48-1.49.72-2.52.72h-2.47V8.41z" />
        </svg>
      ),
    },
    {
      name: 'Next.js',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.666 17.666l-5.666-8.5v8.5H10V6.334h2.166l5.5 8.25V6.334h2v11.332h-2z" />
        </svg>
      ),
    },
    {
      name: 'Framer Motion',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative pt-16 sm:pt-24 pb-20 overflow-hidden min-h-[780px]">
      {/* Background Interactive DotField */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <DotField
          dotRadius={1.5}
          dotSpacing={15}
          bulgeStrength={65}
          glowRadius={180}
          sparkle={true}
          waveAmplitude={0}
          gradientFrom="rgba(255, 255, 255, 0.22)"
          gradientTo="rgba(255, 255, 255, 0.08)"
          glowColor="rgba(255, 255, 255, 0.05)"
          className="w-full h-full"
        />
        {/* Soft atmospheric gradients matching deep dark theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_90%)]" />
      </div>

      {/* Subtle top ambient neutral glow */}
      <div 
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[400px] opacity-15 blur-[130px] bg-gradient-to-b from-white/15 to-transparent z-0" 
      />

      <div className="relative z-10">
        <Container size="lg">
          {/* Header Content Area */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            {/* Top Eyebrow Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0D0D0D] border border-[#222222] text-[12px] font-sans text-[#A1A1A1] shadow-sm mb-6 backdrop-blur-md hover:border-[#383838] transition-all cursor-pointer group"
              onClick={onExplore}
            >
              <span className="px-2 py-0.5 rounded-full bg-[#181818] text-[#ECECEC] text-[10px] font-semibold tracking-wide border border-[#282828]">
                Open Source
              </span>
              <span className="text-[#D4D4D4] group-hover:text-white transition-colors">
                Open Source & Copy-Paste Components
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#6F6F6F] group-hover:translate-x-0.5 transition-transform" />
            </motion.div>

            {/* Main Headline - Single prominent centered statement */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-[68px] font-bold tracking-tight text-[#F5F5F5] leading-[1.08]"
            >
              Beyond Ordinary UI
            </motion.h1>

            {/* Subtitle / Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-[#8E8E8E] max-w-2xl mt-5 font-normal leading-relaxed"
            >
              Integrate EasyUI effortlessly with our developer-friendly library. Carefully crafted with polished interaction, thoughtful motion, and source you fully own—get started in seconds.
            </motion.p>

            {/* Call to Actions - Pill Capsule Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-3 mt-7"
            >
              <button
                onClick={onExplore}
                className="px-6 py-2.5 rounded-full bg-[#F5F5F5] hover:bg-white text-[#0A0A0A] text-xs sm:text-sm font-semibold tracking-tight transition-all shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <span>Try EasyUI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  const elem = document.getElementById('philosophy');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#181818] text-[#A1A1A1] hover:text-white border border-[#242424] text-xs sm:text-sm font-medium tracking-tight transition-all backdrop-blur-sm hover:border-[#333333]"
              >
                How it works
              </button>
            </motion.div>
          </div>

          {/* Central Hero Component: Sleek Terminal & Code Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative max-w-3xl mx-auto"
          >
            {/* Ambient neutral reflection underneath the card */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent blur-xl opacity-40" />

            {/* Main Terminal Window Card */}
            <div className="relative rounded-2xl border border-[#222222] bg-[#0A0A0A]/95 backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#1A1A1A] bg-[#0E0E0E]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#262626]" />
                  <span className="w-3 h-3 rounded-full bg-[#262626]" />
                  <span className="w-3 h-3 rounded-full bg-[#262626]" />
                  <span className="ml-3 font-mono text-[11px] text-[#6F6F6F]">easyui-terminal ~ zsh</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex bg-[#141414] p-0.5 rounded-lg border border-[#222222]">
                    <button
                      onClick={() => setActiveTab('cli')}
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono transition-all ${
                        activeTab === 'cli' ? 'bg-[#242424] text-white font-medium' : 'text-[#717171] hover:text-[#A1A1A1]'
                      }`}
                    >
                      Terminal
                    </button>
                    <button
                      onClick={() => setActiveTab('react')}
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono transition-all ${
                        activeTab === 'react' ? 'bg-[#242424] text-white font-medium' : 'text-[#717171] hover:text-[#A1A1A1]'
                      }`}
                    >
                      React JSX
                    </button>
                  </div>

                  <button
                    onClick={copyInstallCommand}
                    className="p-1.5 rounded-lg bg-[#141414] border border-[#222222] hover:border-[#383838] text-[#888888] hover:text-white transition-all flex items-center gap-1 text-[11px] font-mono"
                    title="Copy command"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Code Content Area with Line Numbers */}
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed text-[#D4D4D4] overflow-x-auto select-text">
                {activeTab === 'cli' ? (
                  <div className="space-y-1">
                    <div className="flex gap-4 text-[#525252]">
                      <span className="w-6 select-none text-right">1</span>
                      <span className="text-[#717171]">Last login: Mon Aug 17 2026 10:45:00 on console</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 select-none text-right text-[#525252]">2</span>
                      <div>
                        <span className="text-[#A1A1A1]">$ </span>
                        <span className="text-[#F5F5F5]">npx shadcn@latest add </span>
                        <span className="text-[#D4D4D4]">Surajmaurya1/easyui/</span>
                        <span className="text-white">magnetic-button</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 select-none text-right text-[#525252]">3</span>
                      <span className="text-[#ECECEC]">✔ Resolved Surajmaurya1/easyui registry</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 select-none text-right text-[#525252]">4</span>
                      <span className="text-[#A1A1A1]">Installing framer-motion...</span>
                    </div>
                    <div className="flex gap-4 text-[#525252]">
                      <span className="w-6 select-none text-right">5</span>
                      <span className="text-[#ECECEC]">✔ Done. File added: components/ui/magnetic-button.tsx</span>
                    </div>
                    <div className="flex gap-4 text-[#525252]">
                      <span className="w-6 select-none text-right">6</span>
                      <span></span>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 select-none text-right text-[#525252]">7</span>
                      <div>
                        <span className="text-[#A1A1A1]">$ </span>
                        <span className="text-[#F5F5F5]">npx shadcn@latest add </span>
                        <span className="text-[#D4D4D4]">Surajmaurya1/easyui/</span>
                        <span className="text-white">spotlight-card</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 select-none text-right text-[#525252]">8</span>
                      <span className="text-[#ECECEC]">✔ Resolved Surajmaurya1/easyui registry</span>
                    </div>
                    <div className="flex gap-4 text-[#525252]">
                      <span className="w-6 select-none text-right">9</span>
                      <span className="text-[#ECECEC]">✔ Done. File added: components/ui/spotlight-card.tsx</span>
                    </div>
                    <div className="flex gap-4 text-[#525252]">
                      <span className="w-6 select-none text-right">10</span>
                      <span></span>
                    </div>
                    <div className="flex gap-4 text-[#525252]">
                      <span className="w-6 select-none text-right">11</span>
                      <span className="text-[#A1A1A1]"> Ready! Import directly from '@/components/ui'</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex gap-4">
                      <span className="w-6 select-none text-right text-[#525252]">1</span>
                      <div>
                        <span className="text-[#888888]">import </span>
                        <span className="text-[#888888]">{'{ '}</span>
                        <span className="text-white">SpotlightCard</span>
                        <span className="text-[#888888]">, </span>
                        <span className="text-white">MagneticButton</span>
                        <span className="text-[#888888]">{' } '}</span>
                        <span className="text-[#888888]">from </span>
                        <span className="text-[#D4D4D4]">'@/components/ui'</span>
                        <span className="text-[#888888]">;</span>
                      </div>
                    </div>
                    <div className="flex gap-4 text-[#525252]">
                      <span className="w-6 select-none text-right">2</span>
                      <span></span>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 select-none text-right text-[#525252]">3</span>
                      <div>
                        <span className="text-[#888888]">export default function </span>
                        <span className="text-white">Dashboard</span>
                        <span className="text-[#888888]">() {'{'}</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 select-none text-right text-[#525252]">4</span>
                      <div className="pl-4">
                        <span className="text-[#888888]">return </span>
                        <span className="text-[#888888]">(</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 select-none text-right text-[#525252]">5</span>
                      <div className="pl-8">
                        <span className="text-[#6F6F6F]">&lt;</span>
                        <span className="text-white">SpotlightCard </span>
                        <span className="text-[#D4D4D4]">spotlightSize</span>
                        <span className="text-[#6F6F6F]">=</span>
                        <span className="text-[#888888]">{'{'}</span>
                        <span className="text-[#ECECEC]">350</span>
                        <span className="text-[#888888]">{'}'}</span>
                        <span className="text-[#6F6F6F]">&gt;</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 select-none text-right text-[#525252]">6</span>
                      <div className="pl-12">
                        <span className="text-[#6F6F6F]">&lt;</span>
                        <span className="text-white">MagneticButton </span>
                        <span className="text-[#D4D4D4]">variant</span>
                        <span className="text-[#6F6F6F]">=</span>
                        <span className="text-[#ECECEC]">"primary"</span>
                        <span className="text-[#6F6F6F]">&gt;</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 select-none text-right text-[#525252]">7</span>
                      <div className="pl-16">
                        <span className="text-[#F5F5F5]">Interact</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 select-none text-right text-[#525252]">8</span>
                      <div className="pl-12">
                        <span className="text-[#6F6F6F]">&lt;/</span>
                        <span className="text-white">MagneticButton</span>
                        <span className="text-[#6F6F6F]">&gt;</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 select-none text-right text-[#525252]">9</span>
                      <div className="pl-8">
                        <span className="text-[#6F6F6F]">&lt;/</span>
                        <span className="text-white">SpotlightCard</span>
                        <span className="text-[#6F6F6F]">&gt;</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-6 select-none text-right text-[#525252]">10</span>
                      <div className="pl-4">
                        <span className="text-[#888888]">);</span>
                      </div>
                    </div>
                    <div className="flex gap-4 text-[#525252]">
                      <span className="w-6 select-none text-right">11</span>
                      <div>
                        <span className="text-[#888888]">{'}'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Card Footer Glow & Status Bar */}
              <div className="px-4 py-2.5 bg-[#0C0C0C] border-t border-[#181818] flex items-center justify-between text-[11px] font-mono text-[#737373]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-[#A1A1A1]">Ready to copy & paste</span>
                </div>
                <div className="text-[#606060]">
                  UTF-8 • TypeScript 5.0
                </div>
              </div>
            </div>

            {/* Bottom Tech Ecosystem */}
            <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-4 text-[#6F6F6F]">
              {logos.map((logo) => (
                <div
                  key={logo.name}
                  className="flex items-center gap-2 text-xs sm:text-sm font-medium hover:text-[#F5F5F5] transition-colors opacity-70 hover:opacity-100 cursor-default"
                >
                  <span className="text-[#808080]">{logo.icon}</span>
                  <span className="font-mono tracking-tight">{logo.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
};
