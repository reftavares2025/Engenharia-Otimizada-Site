import React from 'react';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';

interface PageHeaderBannerProps {
  title: string;
  subtitle: string;
  categoryTag?: string;
  onSelectPage: (pageId: string) => void;
}

export const PageHeaderBanner: React.FC<PageHeaderBannerProps> = ({
  title,
  subtitle,
  categoryTag = 'Régis Tavares Engenharia',
  onSelectPage
}) => {
  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[400px] h-[200px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-4">
        {/* Breadcrumb & Back Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => onSelectPage('inicio')}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5 text-amber-400" />
              <span>Início</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-400 font-bold">{title}</span>
          </div>

          <button
            onClick={() => onSelectPage('inicio')}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3 py-1 rounded-lg border border-slate-700/80 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Início</span>
          </button>
        </div>

        {/* Page Main Title & Subtitle */}
        <div className="space-y-1.5 max-w-4xl">
          <span className="inline-block text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded">
            {categoryTag}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light font-display text-white tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
