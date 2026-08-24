import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface DocPaginationProps {
  currentTopic: string;
  onNavigateTopic: (topicId: string) => void;
}

interface DocNavEntry {
  id: string;
  title: string;
  category: string;
}

const DOC_ORDER: DocNavEntry[] = [
  { id: 'introduction', title: 'Introduction & Vision', category: 'Getting Started' },
  { id: 'quick-start', title: 'Quick Start & Setup', category: 'Getting Started' },
  { id: 'motion', title: 'Motion Tokens & Physics', category: 'Getting Started' },
  { id: 'architecture', title: 'Registry Architecture', category: 'Architecture & Engine' },
  { id: 'seo', title: 'Automated SEO System', category: 'Architecture & Engine' },
  { id: 'collaboration', title: 'Contributing Guide', category: 'Architecture & Engine' },
];

export const DocPagination: React.FC<DocPaginationProps> = ({
  currentTopic,
  onNavigateTopic,
}) => {
  const currentIndex = DOC_ORDER.findIndex((item) => item.id === currentTopic);
  const prevDoc = currentIndex > 0 ? DOC_ORDER[currentIndex - 1] : null;
  const nextDoc = currentIndex < DOC_ORDER.length - 1 ? DOC_ORDER[currentIndex + 1] : null;

  if (!prevDoc && !nextDoc) return null;

  return (
    <nav aria-label="Documentation Pagination" className="pt-8 mt-12 border-t border-[#363636] flex items-center justify-between gap-4 select-none">
      {prevDoc ? (
        <button
          onClick={() => onNavigateTopic(prevDoc.id)}
          className="group inline-flex items-center gap-2 text-sm text-[#A3A3A3] hover:text-white transition-colors py-1 text-left cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#8A8A8A] group-hover:text-white transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">{prevDoc.title}</span>
        </button>
      ) : (
        <div />
      )}

      {nextDoc && (
        <button
          onClick={() => onNavigateTopic(nextDoc.id)}
          className="group inline-flex items-center gap-2 text-sm text-[#A3A3A3] hover:text-white transition-colors py-1 ml-auto text-right cursor-pointer"
        >
          <span className="font-medium">{nextDoc.title}</span>
          <ArrowRight className="w-4 h-4 text-[#8A8A8A] group-hover:text-white transition-transform group-hover:translate-x-1" />
        </button>
      )}
    </nav>
  );
};
