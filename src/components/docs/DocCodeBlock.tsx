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
    <div className={`rounded-xl border border-[#1E1E1E] bg-[#0A0A0A] overflow-hidden my-4 shadow-sm ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0F0F0F] border-b border-[#1A1A1A] text-xs">
        <div className="flex items-center gap-2">
          {isTerminal ? (
            <>
              <Terminal className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="font-mono text-[#8A8A8A]">{title || 'Terminal'}</span>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#262626]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#262626]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#262626]" />
              </div>
              {title && <span className="font-mono text-[#A1A1A1] ml-2">{title}</span>}
              {!title && <span className="font-mono text-[#6F6F6F] uppercase text-[10px]">{language}</span>}
            </>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#161616] hover:bg-[#202020] border border-[#242424] text-[#A1A1A1] hover:text-[#F5F5F5] transition-all text-[11px] font-mono"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
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
      <pre className="p-4 text-xs font-mono text-[#ECECEC] overflow-x-auto leading-relaxed scrollbar-thin">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
};
