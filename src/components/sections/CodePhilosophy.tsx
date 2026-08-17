import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { MagneticButton } from '../ui/MagneticButton';
import { Sparkles, Terminal, Copy, Check, Sliders } from 'lucide-react';
import { copyToClipboard } from '../../lib/utils';

export const CodePhilosophy: React.FC = () => {
  // Live interactive playground states
  const [strength, setStrength] = useState(0.45);
  const [label, setLabel] = useState('Deploy to Edge');
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'outline'>('primary');
  const [copied, setCopied] = useState(false);

  const generatedCode = `// 1. Copy into your project (components/ui/magnetic-button.tsx)
<MagneticButton
  strength={${strength}}
  variant="${variant}"
  glow={true}
>
  <span>${label}</span>
  <ArrowUpRight className="w-4 h-4" />
</MagneticButton>`;

  const handleCopy = () => {
    copyToClipboard(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-[#050505] border-t border-[#141414]">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Narrative Philosophy */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-mono text-[#A1A1A1] uppercase tracking-widest">
              Philosophy
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold text-[#F5F5F5] tracking-tight leading-[1.1]">
              Your code.
              <span className="block text-[#A1A1A1] font-light mt-1">
                Your components.
              </span>
            </h2>

            <div className="space-y-4 text-sm text-[#8E8E8E] leading-relaxed">
              <p>
                EasyUI gives you the source. No locked packages, runtime bloat, or brittle wrappers.
              </p>
              <p>
                Copy the component directly into your repository. Modify the spring stiffness, adjust the surface alphas, and tailor every interaction to match your product's voice.
              </p>
            </div>

            {/* Quick interactive controls panel */}
            <div className="p-4 rounded-xl border border-[#1D1D1D] bg-[#0A0A0A] space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F5F5]">
                <Sliders className="w-3.5 h-3.5 text-[#ECECEC]" />
                <span>Tweak Parameters in Real-Time</span>
              </div>

              {/* Strength Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[#A1A1A1]">
                  <span>Magnetic Strength</span>
                  <span className="font-mono text-white">{strength}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={strength}
                  onChange={(e) => setStrength(parseFloat(e.target.value))}
                  className="w-full accent-white bg-[#1C1C1C] h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Label Text Input */}
              <div className="space-y-1">
                <span className="text-xs text-[#A1A1A1]">Button Text</span>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-[#141414] border border-[#222222] text-[#F5F5F5] focus-ring"
                />
              </div>

              {/* Variant Selector */}
              <div className="flex items-center gap-2 pt-1">
                {(['primary', 'secondary', 'outline'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`px-2.5 py-1 text-xs rounded-md capitalize transition-colors ${
                      variant === v
                        ? 'bg-[#222222] text-[#F5F5F5] border border-[#333333]'
                        : 'text-[#6F6F6F] hover:text-[#A1A1A1]'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Code Editor & Live Preview Pair */}
          <div className="lg:col-span-7 space-y-4">
            {/* Live Rendered Target */}
            <div className="rounded-2xl border border-[#202020] bg-[#0A0A0A] p-10 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden bg-dot-subtle">
              <div className="absolute top-3 left-4 text-[10px] font-mono text-[#6F6F6F]">
                LIVE PREVIEW
              </div>
              <MagneticButton
                strength={strength}
                variant={variant}
                glow={true}
                size="lg"
              >
                <span>{label || 'Interactive Button'}</span>
                <Sparkles className="w-4 h-4 text-[#ECECEC]" />
              </MagneticButton>
              <div className="absolute bottom-3 text-[11px] text-[#6F6F6F]">
                Hover to feel adjusted {strength}x spring dynamics
              </div>
            </div>

            {/* Restrained Code Block */}
            <div className="rounded-2xl border border-[#1E1E1E] bg-[#090909] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D0D0D] border-b border-[#1A1A1A] text-xs text-[#6F6F6F]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#ECECEC]" />
                  <span className="font-mono text-[11px] text-[#A1A1A1]">App.tsx</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[11px] text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-white" />
                      <span className="text-white">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy JSX</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-[#CCCCCC] overflow-x-auto leading-relaxed selection:bg-white/20">
                <code>{generatedCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
