import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { copyToClipboard } from '../../lib/utils';

export interface DocCodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  isTerminal?: boolean;
  className?: string;
}

export const DocCodeBlock: React.FC<DocCodeBlockProps> = ({
  code,
  language = 'bash',
  title,
  isTerminal = false,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] overflow-hidden my-4 transition-colors hover:border-[#4A4A4A] ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0B0B0B] border-b border-[#1F1F1F] text-xs">
        <div className="flex items-center gap-2">
          {isTerminal ? (
            <>
              <Terminal className="w-3.5 h-3.5 text-[#525252]" />
              <span className="font-mono text-[11px] text-[#A1A1A1]">{title || 'Terminal'}</span>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5 opacity-60">
                <span className="w-2 h-2 rounded-full bg-[#1F1F1F]" />
                <span className="w-2 h-2 rounded-full bg-[#1F1F1F]" />
                <span className="w-2 h-2 rounded-full bg-[#1F1F1F]" />
              </div>
              {title && <span className="font-mono text-[11px] text-[#A1A1A1] ml-1.5">{title}</span>}
              {!title && <span className="font-mono text-[#6B6B6B] uppercase text-[10px] ml-1">{language}</span>}
            </>
          )}
        </div>

        <button
          onClick={handleCopy}
          aria-label={copied ? 'Code copied' : 'Copy code to clipboard'}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#141414] hover:bg-[#171717] border border-[#1F1F1F] text-[#A1A1A1] hover:text-[#FFFFFF] transition-all text-[11px] font-mono cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <pre className="p-4 text-[13px] font-mono text-[#A1A1A1] bg-[#050505] overflow-x-auto leading-relaxed scrollbar-thin">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
};
