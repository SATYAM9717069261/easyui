import React from 'react';
import { Globe, FileCode, CheckCircle2, ShieldCheck, ArrowRight, RefreshCw, Cpu } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';

export interface DocSEOProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocSEO: React.FC<DocSEOProps> = ({ onNavigateSection }) => {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono text-[#A1A1A1] uppercase tracking-widest bg-[#181818] px-2.5 py-0.5 rounded-full border border-[#282828]">
            Automated Infrastructure
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5] font-sans">
          Automated SEO & Audit System
        </h1>
        <p className="text-base text-[#A1A1A1] mt-3 leading-relaxed max-w-3xl">
          EasyUI eliminates manual SEO configuration. Every component created in EasyUI automatically inherits complete search engine optimization—including dynamic meta tags, canonical URLs, XML sitemaps, Open Graph social cards, and schema.org JSON-LD structured data.
        </p>
      </div>

      {/* Visual Pipeline Diagram */}
      <div className="p-6 rounded-2xl border border-[#222222] bg-[#0A0A0A] space-y-6">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-white" />
          Single Source of Truth SEO Pipeline
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl border border-[#242424] bg-[#0F0F0F] flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] text-[#A1A1A1] font-bold uppercase tracking-wider block mb-1">01. Metadata Input</span>
              <h4 className="text-white font-semibold mb-2">ComponentName.meta.ts</h4>
              <ul className="space-y-1 text-[#808080]">
                <li>• Component Title & Tagline</li>
                <li>• Description (70–165 chars)</li>
                <li>• Category & Badges</li>
                <li>• Features & Props API</li>
              </ul>
            </div>
            <span className="text-[11px] text-[#6F6F6F]">Single source of truth</span>
          </div>

          <div className="p-4 rounded-xl border border-[#333333] bg-[#141414] flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] text-white font-bold uppercase tracking-wider block mb-1">02. Automated Engine</span>
              <h4 className="text-white font-semibold mb-2">src/lib/seo Engine</h4>
              <ul className="space-y-1 text-[#808080]">
                <li>• Dynamic Title & Description</li>
                <li>• Normalized Canonical URLs</li>
                <li>• Open Graph & Twitter Cards</li>
                <li>• JSON-LD Structured Data</li>
              </ul>
            </div>
            <span className="text-[11px] text-white">Zero manual HTML edits</span>
          </div>

          <div className="p-4 rounded-xl border border-[#242424] bg-[#0F0F0F] flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] text-[#A1A1A1] font-bold uppercase tracking-wider block mb-1">03. Automated Artifacts</span>
              <h4 className="text-white font-semibold mb-2">Sitemap & Audit Guard</h4>
              <ul className="space-y-1 text-[#808080]">
                <li>• <code className="text-[#ECECEC]">public/sitemap.xml</code> sync</li>
                <li>• <code className="text-[#ECECEC]">robots.txt</code> crawl policies</li>
                <li>• 44-point CLI health audit</li>
                <li>• Pre-build deployment guard</li>
              </ul>
            </div>
            <span className="text-[11px] text-[#ECECEC]">Verified on every build</span>
          </div>
        </div>
      </div>

      {/* Feature 1: Dynamic SEO Metadata */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#242424] flex items-center justify-center">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">1. Dynamic Metadata & Canonical Resolution</h2>
            <p className="text-xs text-[#808080]">Automatic document head updates on route & modal navigation</p>
          </div>
        </div>

        <p className="text-xs text-[#808080] leading-relaxed">
          The <code className="text-[#ECECEC] font-mono">useSEO()</code> hook automatically synchronizes the active page title, meta description, canonical URL, and social tags whenever the user navigates between the Showcase, All Components directory (with pagination), documentation topics, or opens a component deep link:
        </p>

        <DocCodeBlock
          title="src/lib/seo/useSEO.ts"
          language="typescript"
          code={`// Automatically updates DOM head based on route & opened component modal
useSEO({
  activeView,          // 'showcase' | 'components' | 'docs'
  componentPage,       // Page number (1, 2, ...)
  activeDocTopic,      // 'introduction' | 'quick-start' | 'seo' | ...
  selectedModalComponent, // EasyComponentMeta | null
});`}
        />
      </div>

      {/* Feature 2: Structured Data (JSON-LD) */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#242424] flex items-center justify-center">
            <FileCode className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">2. Schema.org JSON-LD Structured Data</h2>
            <p className="text-xs text-[#808080]">Standardized Google search schemas generated directly from component attributes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] space-y-2">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              SoftwareApplication & ItemPage
            </h4>
            <p className="text-[#808080]">
              Informs search engines of component categories (<code className="text-[#ECECEC]">DeveloperApplication</code>), open-source license, pricing ($0.00), and requirements (React, Tailwind CSS, Framer Motion).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] space-y-2">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              BreadcrumbList & TechArticle
            </h4>
            <p className="text-[#808080]">
              Generates navigational breadcrumbs (<code className="text-[#ECECEC]">EasyUI → Components → Magnetic Button</code>) and technical documentation articles with publication timestamps.
            </p>
          </div>
        </div>
      </div>

      {/* Feature 3: Dynamic Sitemap Automation */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#242424] flex items-center justify-center">
            <RefreshCw className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">3. Automated Sitemap Synchronization</h2>
            <p className="text-xs text-[#808080]">Zero-config dynamic XML sitemap generation</p>
          </div>
        </div>

        <p className="text-xs text-[#808080] leading-relaxed">
          Whenever components are synchronized or built (<code className="text-[#ECECEC] font-mono">npm run component:sync</code> or <code className="text-[#ECECEC] font-mono">npm run build</code>), <code className="text-[#ECECEC] font-mono">public/sitemap.xml</code> is automatically updated to include:
        </p>

        <ul className="list-disc list-inside space-y-1.5 text-xs text-[#A1A1A1] ml-2">
          <li>Homepage (<code className="text-[#ECECEC] font-mono">https://easyui-v1.vercel.app/</code>)</li>
          <li>All Components directory (<code className="text-[#ECECEC] font-mono">/#components</code> and pagination pages)</li>
          <li>All 22+ component deep links (<code className="text-[#ECECEC] font-mono">/#components/magnetic-button</code>, etc.)</li>
          <li>All Documentation topics (<code className="text-[#ECECEC] font-mono">/#docs/introduction</code>, <code className="text-[#ECECEC] font-mono">/#docs/seo</code>, etc.)</li>
        </ul>
      </div>

      {/* Feature 4: Automated CLI SEO Audit */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#242424] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">4. 44-Point CLI SEO Health Audit</h2>
            <p className="text-xs text-[#808080]">Automated technical SEO audit and build guard</p>
          </div>
        </div>

        <p className="text-xs text-[#808080] leading-relaxed">
          Run the audit command locally or in CI to inspect metadata integrity, content thickness, sitemap parity, and structured data schemas:
        </p>

        <DocCodeBlock
          title="Terminal"
          isTerminal={true}
          language="bash"
          code={`# Run the automated SEO health audit
npm run seo:audit`}
        />

        <div className="p-4 rounded-xl border border-[#1C1C1C] bg-[#070707] font-mono text-[11px] text-[#A1A1A1] space-y-1 leading-relaxed">
          <div className="text-white font-bold">EASYUI AUTOMATED SEO AUDIT REPORT</div>
          <div className="text-white font-semibold">Technical SEO Health Score: 100/100</div>
          <div className="text-[#606060] pt-1">  Technical SEO          [████████████████████] 100% (11/11 checks)</div>
          <div className="text-[#606060]">  Metadata               [████████████████████] 100% (15/15 checks)</div>
          <div className="text-[#606060]">  Content                [████████████████████] 100% (2/2 checks)</div>
          <div className="text-[#606060]">  Links                  [████████████████████] 100% (2/2 checks)</div>
          <div className="text-[#606060]">  Images                 [████████████████████] 100% (4/4 checks)</div>
          <div className="text-[#606060]">  Structured Data        [████████████████████] 100% (8/8 checks)</div>
          <div className="text-[#606060]">  Performance & A11y     [████████████████████] 100% (2/2 checks)</div>
          <div className="text-white pt-1">✓ Passed Checks: 44 — Zero Critical Issues</div>
        </div>
      </div>

      {/* Next Step Navigation */}
      <div className="pt-6 border-t border-[#1C1C1C] flex items-center justify-between">
        <button
          onClick={() => onNavigateSection('architecture')}
          className="text-xs text-[#808080] hover:text-white transition-colors"
        >
          ← Architecture & Registry
        </button>
        <button
          onClick={() => onNavigateSection('collaboration')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-[#E0E0E0] transition-colors"
        >
          <span>Contributing Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
