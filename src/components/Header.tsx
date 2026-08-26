import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { MessageSquare, Calendar, Menu, X, ShieldCheck, ChevronDown, Sparkles, Building2, Home, Compass, LayoutGrid, Bot, Calculator, HelpCircle, PhoneCall } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

interface HeaderProps {
  activePage: string;
  onSelectPage: (pageId: string) => void;
  onOpenConsultation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onSelectPage, onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navPages = [
    { id: 'inicio', name: 'Início', icon: Home, badge: 'Principal', category: 'Navegação' },
    { id: 'pre-fabricados', name: 'Pré-Fabricados de Concreto', icon: Building2, badge: 'Fck 35-50 MPa', category: 'Sistemas Construtivos' },
    { id: 'chales', name: 'Chalés em Aço de Luxo', icon: Home, badge: 'Especialidade', category: 'Sistemas Construtivos' },
    { id: 'fluxo-de-projeto', name: 'Fluxo & Viabilidade da Obra', icon: Compass, badge: 'Passo a Passo', category: 'Engenharia' },
    { id: 'projetos', name: 'Portfólio de Obras & Renders', icon: LayoutGrid, badge: 'Projetos 3D', category: 'Engenharia' },
    { id: 'assistente-ia', name: 'Assistente Técnica & Modelo 3D', icon: Bot, badge: 'Interativo', category: 'Ferramentas' },
    { id: 'calculadora', name: 'Simulador de Custos & Prazos', icon: Calculator, badge: 'Cotação', category: 'Ferramentas' },
    { id: 'parceiros', name: 'Fornecedores & Qualidade', icon: ShieldCheck, badge: 'Gerdau/Votorantim', category: 'Institucional' },
    { id: 'faq', name: 'Perguntas Frequentes (FAQ)', icon: HelpCircle, badge: '16+ Dúvidas', category: 'Institucional' },
    { id: 'contato', name: 'Contato & Localização', icon: PhoneCall, badge: 'SP & PR', category: 'Institucional' },
  ];

  const activePageObj = navPages.find((p) => p.id === activePage) || navPages[0];

  const whatsappUrl = buildWhatsAppLink(
    'Solicitação de Orçamento Geral',
    'Olá Eng. Régis! Vim pelo site e gostaria de solicitar um orçamento de projeto/pré-fabricado.'
  );

  return (
    <>
      {/* Main Header with Frosted Glass styling */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-stone-200/90 py-3'
            : 'bg-white/95 backdrop-blur-sm border-b border-stone-200/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => {
              onSelectPage('inicio');
              setMenuOpen(false);
            }}
            className="focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg text-left flex-shrink-0"
          >
            <BrandLogo />
          </button>

          {/* Exclusive "3 Lines Menu" Trigger Button for ALL screen sizes */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-200 shadow-sm focus:outline-none ${
                menuOpen
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md'
                  : 'bg-slate-900 text-white border-slate-800 hover:bg-slate-800 hover:border-amber-500/50'
              }`}
              aria-label="Abrir Menu de Navegação (3 Linhas)"
            >
              <div className="flex items-center justify-center">
                {menuOpen ? <X className="w-5 h-5 text-slate-950" /> : <Menu className="w-5 h-5 text-amber-400" />}
              </div>
              <div className="text-left hidden sm:block">
                <span className="block text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-300/90">
                  {menuOpen ? 'Fechar Menu' : 'Menu de Páginas'}
                </span>
                <span className="block text-xs font-bold leading-none text-white">
                  {activePageObj.name}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${menuOpen ? 'rotate-180 text-slate-950' : 'text-slate-400'}`} />
            </button>

            {/* Direct Action Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-xl shadow-sm transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-950" />
                <span>Agendar Horário</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-xl shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                <span>Orçamento</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3-Lines Navigation Drawer / Modal for ALL Screen Sizes */}
        {menuOpen && (
          <div className="bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 text-slate-100 px-4 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200 absolute top-full left-0 right-0 z-50 max-h-[85vh] overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                    <Menu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-display text-white">
                      Selecione a Página Desejada
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Navegue entre todos os módulos e simuladores do projeto
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  <span>Fechar</span>
                </button>
              </div>

              {/* Pages Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                {navPages.map((p) => {
                  const PageIcon = p.icon;
                  const isCurrent = activePage === p.id;

                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectPage(p.id);
                        setMenuOpen(false);
                      }}
                      className={`text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
                        isCurrent
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-lg ring-2 ring-amber-400/40'
                          : 'bg-slate-900/90 hover:bg-slate-900 border-slate-800 text-slate-200 hover:border-amber-500/40'
                      }`}
                    >
                      <div className={`p-2 rounded-lg border flex-shrink-0 ${
                        isCurrent ? 'bg-slate-950 text-amber-400 border-slate-800' : 'bg-slate-800 text-amber-400 border-slate-700'
                      }`}>
                        <PageIcon className="w-4 h-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className={`text-xs font-bold truncate ${isCurrent ? 'text-slate-950' : 'text-white'}`}>
                            {p.name}
                          </span>
                        </div>
                        <span className={`block text-[10px] font-mono ${isCurrent ? 'text-slate-800' : 'text-slate-400'}`}>
                          {p.badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Direct WhatsApp Callout inside Menu */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-slate-300">Prefere atendimento direto pelo WhatsApp com o Eng. Régis Tavares?</span>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Falar no WhatsApp</span>
                </a>
              </div>

            </div>
          </div>
        )}
      </header>
    </>
  );
};


