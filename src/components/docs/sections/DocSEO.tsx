import React from 'react';
import { Globe, FileCode, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';
import { DocPagination } from '../DocPagination';

export interface DocSEOProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocSEO: React.FC<DocSEOProps> = ({ onNavigateSection }) => {
  return (
    <article className="space-y-12 animate-fade-in text-[#A1A1A1]">
      {/* Header */}
      <header className="space-y-3 border-b border-[#1F1F1F] pb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA]">
          Automated SEO System
        </h1>
        <p className="text-base text-[#A1A1A1] leading-relaxed max-w-2xl">
          Every component in EasyUI inherits search engine optimization automatically—including dynamic document titles, canonical URLs, XML sitemaps, Open Graph preview cards, and schema.org JSON-LD structured data.
        </p>
      </header>

      {/* Feature 1: Dynamic SEO Hook */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Globe className="w-4 h-4 text-[#FAFAFA]" />
          <h2 className="text-lg font-semibold text-white">1. Dynamic Head & Canonical Resolution</h2>
        </div>
        <p className="text-sm text-[#A1A1A1] leading-relaxed">
          The <code className="text-[#FAFAFA] font-mono bg-[#141414] border border-[#1F1F1F] px-1.5 py-0.5 rounded text-xs">useSEO()</code> hook synchronizes page titles, meta descriptions, canonical URLs, and social tags as users navigate routes, pagination pages, or modal deep links:
        </p>

        <DocCodeBlock
          title="src/lib/seo/useSEO.ts"
          language="typescript"
          code={`useSEO({
  activeView,             // 'showcase' | 'components' | 'docs'
  componentPage,          // Page number (1, 2, ...)
  activeDocTopic,         // 'introduction' | 'quick-start' | ...
  selectedModalComponent, // EasyComponentMeta | null
});`}
        />
      </section>

      {/* Feature 2: Structured Data */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <FileCode className="w-4 h-4 text-[#FAFAFA]" />
          <h2 className="text-lg font-semibold text-[#FAFAFA]">2. Schema.org JSON-LD Structured Data</h2>
        </div>
        <p className="text-sm text-[#A1A1A1]">
          Search engines receive rich structured metadata for each component:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] space-y-1.5">
            <h3 className="text-[#FAFAFA] font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              SoftwareApplication Schema
            </h3>
            <p className="text-[#A1A1A1]">
              Declares application category, open-source MIT license, zero cost ($0.00), and framework dependencies (React, Tailwind, Framer Motion).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] space-y-1.5">
            <h3 className="text-[#FAFAFA] font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              BreadcrumbList & TechArticle
            </h3>
            <p className="text-[#A1A1A1]">
              Generates accurate navigation trails (<code className="text-[#FAFAFA] font-mono">EasyUI → Components → Magnetic Button</code>) and technical documentation timestamps.
            </p>
          </div>
        </div>
      </section>

      {/* Feature 3: Dynamic Sitemap */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-4 h-4 text-[#FAFAFA]" />
          <h2 className="text-lg font-semibold text-[#FAFAFA]">3. Automated Sitemap Generation</h2>
        </div>
        <p className="text-sm text-[#A1A1A1] leading-relaxed">
          On every build or component sync, <code className="text-[#FAFAFA] font-mono bg-[#141414] border border-[#1F1F1F] px-1.5 py-0.5 rounded text-xs">public/sitemap.xml</code> is automatically updated with:
        </p>

        <ul className="text-xs text-[#A1A1A1] space-y-1.5 pl-5 list-disc">
          <li>All component showcase pages and deep links (<code className="text-[#FAFAFA] font-mono">/components/magnetic-button</code>)</li>
          <li>All documentation topics (<code className="text-[#FAFAFA] font-mono">/docs/introduction</code>, <code className="text-[#FAFAFA] font-mono">/docs/quick-start</code>)</li>
          <li>Canonical home and directory pagination pages</li>
        </ul>
      </section>

      {/* Feature 4: Automated CLI SEO Audit */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#FAFAFA]" />
          <h2 className="text-lg font-semibold text-[#FAFAFA]">4. 44-Point Automated SEO Health Audit</h2>
        </div>
        <p className="text-sm text-[#A1A1A1]">
          Run the audit tool in CI or locally to verify tag compliance, structured data validity, and sitemap parity:
        </p>

        <DocCodeBlock
          title="Terminal"
          isTerminal={true}
          language="bash"
          code="npm run seo:audit"
        />

        <div className="p-4 rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-mono font-bold text-emerald-400 text-sm">
              100
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[#FAFAFA]">Technical SEO Score: 100/100</h3>
              <p className="text-[11px] text-[#6B6B6B]">44 automated health checks passing with 0 errors or warnings.</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 self-start sm:self-auto">
            Audit Passing
          </span>
        </div>
      </section>

      {/* Pagination Footer */}
      <DocPagination currentTopic="seo" onNavigateTopic={onNavigateSection} />
    </article>
  );
};
