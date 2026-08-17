import React from 'react';
import { Menu, ArrowUp } from 'lucide-react';

interface PageNavigationHubProps {
  onSelectPage?: (pageId: string) => void;
  activePage?: string;
}

export const PageNavigationHub: React.FC<PageNavigationHubProps> = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-8 bg-slate-900 border-y border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Menu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Para Navegar em Outras Páginas
              </h3>
              <p className="text-xs text-slate-300">
                Clique no botão de <strong className="text-amber-400 font-semibold">Menu (3 Linhas)</strong> localizado no topo superior da página para abrir todas as opções de módulos.
              </p>
            </div>
          </div>

          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-md flex-shrink-0"
          >
            <ArrowUp className="w-4 h-4 text-slate-950" />
            <span>Ir ao Menu do Topo</span>
          </button>
        </div>
      </div>
    </section>
  );
};

