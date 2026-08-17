import React, { useState, useEffect, useMemo } from 'react';
import { FAQ_DATA } from '../data/faqs';
import { HelpCircle, ChevronDown, Search, X, MessageSquare, Sparkles, Filter, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

// Helper to normalize strings (removes accents/diacritics and converts to lowercase)
const normalizeText = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

// Component to highlight matched search terms in text
const HighlightedText: React.FC<{ text: string; search: string; className?: string }> = ({ text, search, className }) => {
  if (!search.trim()) {
    return <span className={className}>{text}</span>;
  }

  const queryTerms = search
    .trim()
    .split(/\s+/)
    .filter((term) => term.length > 0);

  if (queryTerms.length === 0) {
    return <span className={className}>{text}</span>;
  }

  // Create regex pattern to match any of the query terms (ignoring accents in matching)
  // We build a regex with escaped characters
  try {
    const escapedTerms = queryTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(`(${escapedTerms})`, 'gi');
    const parts = text.split(regex);

    return (
      <span className={className}>
        {parts.map((part, i) => {
          const isMatch = queryTerms.some((term) => normalizeText(part) === normalizeText(term));
          return isMatch ? (
            <mark
              key={i}
              className="bg-amber-200/90 text-slate-950 font-bold px-1 py-0.5 rounded-md shadow-sm border border-amber-300/60"
            >
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          );
        })}
      </span>
    );
  } catch {
    return <span className={className}>{text}</span>;
  }
};

export const FAQSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-atendimento-obras': true,
    'faq-chale-regra': true,
    'faq-fundacao-sondagem': true,
  });

  // Inject FAQPage Schema JSON-LD for Google SEO
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_DATA.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-jsonld-schema';
    script.text = JSON.stringify(faqSchema);

    const existingScript = document.getElementById('faq-jsonld-schema');
    if (existingScript) {
      existingScript.remove();
    }
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('faq-jsonld-schema');
      if (s) s.remove();
    };
  }, []);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    FAQ_DATA.forEach((item) => {
      allOpen[item.id] = true;
    });
    setOpenIds(allOpen);
  };

  const collapseAll = () => {
    setOpenIds({});
  };

  const categories = [
    { id: 'todas', label: 'Todas as Perguntas' },
    { id: 'chales', label: 'Chalés em Aço & Sondagem SPT' },
    { id: 'pre-fabricado', label: 'Pré-Fabricados & Estruturas' },
    { id: 'atendimento', label: 'Atendimento (SP, PR e Brasil)' },
    { id: 'projetos', label: 'Projetos Arquitetônicos & ART' },
    { id: 'custos-prazos', label: 'Orçamentos & Financiamento' },
  ];

  // Quick search suggestion chips
  const quickSearchSuggestions = [
    { label: 'Chalé em Aço', query: 'chalé aço' },
    { label: 'Sondagem SPT', query: 'sondagem SPT' },
    { label: 'Cidades Atendidas', query: 'cidades atendidas' },
    { label: 'Cobertura de Orçamento', query: 'cobrir orçamento' },
    { label: 'ART & CREA', query: 'ART CREA' },
    { label: 'Normas ABNT', query: 'normas ABNT' },
    { label: 'Financiamento Caixa', query: 'financiamento' },
  ];

  // Dynamic real-time filtered FAQs using normalized string comparison
  const filteredFAQs = useMemo(() => {
    const rawQuery = searchTerm.trim();
    const normalizedQuery = normalizeText(rawQuery);
    const queryTerms = normalizedQuery.split(/\s+/).filter(Boolean);

    return FAQ_DATA.filter((item) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'todas' || item.category === selectedCategory;

      if (!matchesCategory) return false;

      // Real-time search matching
      if (queryTerms.length === 0) return true;

      const normalizedQuestion = normalizeText(item.question);
      const normalizedAnswer = normalizeText(item.answer);
      const normalizedKeywords = (item.keywords || []).map(normalizeText).join(' ');

      const combinedText = `${normalizedQuestion} ${normalizedAnswer} ${normalizedKeywords}`;

      // Check if all terms typed in the search bar exist in the item
      return queryTerms.every((term) => combinedText.includes(term));
    });
  }, [searchTerm, selectedCategory]);

  // Auto-expand all filtered items in real-time when the user is actively searching
  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      const newOpenIds: Record<string, boolean> = {};
      filteredFAQs.forEach((item) => {
        newOpenIds[item.id] = true;
      });
      setOpenIds(newOpenIds);
    }
  }, [searchTerm, filteredFAQs]);

  const whatsappUrl = buildWhatsAppLink(
    'Dúvida Técnica sobre Projeto/Obra',
    'Olá Eng. Régis Tavares! Estava lendo as Perguntas Frequentes do site e gostaria de tirar uma dúvida técnica sobre meu projeto.'
  );

  return (
    <section id="faq" className="py-16 sm:py-24 bg-stone-100/80 text-slate-800 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-300 px-3.5 py-1 rounded-full text-[10px] font-mono font-extrabold text-slate-800 uppercase tracking-widest shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-slate-700" />
            <span>Perguntas Frequentes • Base Técnica Oficial</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light font-display text-slate-900 tracking-tight">
            Tire Suas Dúvidas Sobre <span className="font-bold italic text-slate-950">Pré-Fabricados & Chalés em Aço</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Respostas completas desenvolvidas pela equipe técnica de engenharia da <strong className="text-slate-900 font-semibold">Régis Tavares Engenharia Civil</strong>. Digite sua dúvida abaixo para filtragem instantânea.
          </p>
        </div>

        {/* Dynamic Search & Real-time Filter Bar */}
        <div className="space-y-4 mb-8">
          {/* Main Search Input Container */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none transition-colors" />
              <input
                id="faq-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar dúvida em tempo real (ex: chalé, aço, sondagem SPT, orçamento, ART)..."
                className="w-full bg-white/90 backdrop-blur-md border-2 border-stone-300 text-slate-900 placeholder-slate-400 text-sm sm:text-base rounded-2xl pl-12 pr-24 py-4 shadow-sm hover:border-stone-400 focus:outline-none focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/10 font-medium transition-all"
                autoComplete="off"
              />
              <div className="absolute right-3 flex items-center gap-1.5">
                {searchTerm && (
                  <button
                    id="faq-clear-search-btn"
                    onClick={() => setSearchTerm('')}
                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-stone-200/80 transition-colors"
                    title="Limpar busca"
                    aria-label="Limpar busca"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <span className="hidden sm:inline-flex items-center text-[11px] font-mono font-semibold bg-stone-100 text-slate-500 border border-stone-200 px-2 py-1 rounded-lg">
                  Tempo Real
                </span>
              </div>
            </div>
          </div>

          {/* Quick Search Chips */}
          <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 mr-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Sugestões:
            </span>
            {quickSearchSuggestions.map((item, idx) => {
              const isSelected = normalizeText(searchTerm) === normalizeText(item.query);
              return (
                <button
                  key={idx}
                  id={`faq-quick-chip-${idx}`}
                  onClick={() => {
                    if (isSelected) {
                      setSearchTerm('');
                    } else {
                      setSearchTerm(item.query);
                    }
                  }}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white/80 hover:bg-white text-slate-700 border border-stone-200 hover:border-slate-300'
                  }`}
                >
                  <span>{item.label}</span>
                  {isSelected && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {/* Search match counter indicator & Expand/Collapse controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-4xl mx-auto pt-2 px-1 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-700">
                Mostrando <strong className="text-slate-950 font-bold text-sm">{filteredFAQs.length}</strong> de {FAQ_DATA.length} perguntas
              </span>
              {searchTerm.trim() !== '' && (
                <span className="bg-amber-100 text-amber-900 border border-amber-300/80 px-2 py-0.5 rounded-md font-mono text-[11px] font-bold">
                  Filtro: &ldquo;{searchTerm}&rdquo;
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 font-mono">
              <button
                id="faq-expand-all-btn"
                onClick={expandAll}
                className="text-slate-700 hover:text-slate-950 font-medium hover:underline text-[11px] px-2 py-1 bg-white/60 hover:bg-white rounded border border-stone-200"
              >
                Expandir Todas
              </button>
              <button
                id="faq-collapse-all-btn"
                onClick={collapseAll}
                className="text-slate-700 hover:text-slate-950 font-medium hover:underline text-[11px] px-2 py-1 bg-white/60 hover:bg-white rounded border border-stone-200"
              >
                Recolher Todas
              </button>
            </div>
          </div>

          {/* Categories Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`faq-category-btn-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white/70 backdrop-blur-md text-slate-700 hover:bg-white border border-stone-200'
                }`}
              >
                {selectedCategory === cat.id && <Filter className="w-3 h-3 text-amber-400" />}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-3">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div
                  key={faq.id}
                  id={`faq-card-${faq.id}`}
                  className={`bg-white/80 backdrop-blur-xl rounded-2xl border transition-all duration-200 shadow-sm overflow-hidden ${
                    isOpen ? 'border-slate-800 ring-1 ring-slate-800/20 bg-white/95 shadow-md' : 'border-stone-200/90 hover:border-stone-300'
                  }`}
                >
                  <button
                    id={`faq-toggle-btn-${faq.id}`}
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-slate-950 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-display flex items-start gap-2.5 flex-1">
                      <span className="text-slate-800 font-black text-xs pt-0.5 flex-shrink-0">•</span>
                      <HighlightedText text={faq.question} search={searchTerm} />
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-slate-900' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-stone-200/60 bg-stone-50/50 font-normal">
                      <p className="whitespace-pre-line">
                        <HighlightedText text={faq.answer} search={searchTerm} />
                      </p>

                      {/* Keywords matching preview */}
                      {faq.keywords && faq.keywords.length > 0 && (
                        <div className="mt-3.5 pt-3 border-t border-stone-200/50 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                          <span className="text-slate-400">Palavras-chave:</span>
                          {faq.keywords.map((kw, kwIdx) => (
                            <span
                              key={kwIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSearchTerm(kw);
                              }}
                              className="cursor-pointer bg-white px-2 py-0.5 rounded border border-stone-200 hover:border-slate-400 hover:text-slate-800 transition-colors"
                            >
                              <HighlightedText text={kw} search={searchTerm} />
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl text-center border border-stone-200 space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 font-display">Nenhuma dúvida encontrada</h4>
                <p className="text-slate-600 text-xs sm:text-sm font-normal max-w-md mx-auto">
                  Não encontramos nenhuma pergunta com os termos &ldquo;<strong className="text-slate-900">{searchTerm}</strong>&rdquo; na categoria selecionada.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  id="faq-reset-filter-btn"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('todas');
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Limpar Busca e Ver Todas
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FAQ Direct Help Banner */}
        <div className="mt-10 bg-slate-900/90 backdrop-blur-2xl text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-white font-display">Não Encontrou Sua Dúvida Específica?</h3>
            <p className="text-xs text-slate-300 font-normal">
              Fale diretamente com o Eng. Régis Tavares pelo WhatsApp. Respondemos rapidamente com orientação técnica!
            </p>
          </div>

          <a
            id="faq-whatsapp-cta-link"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-md whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Falar com Engenheiro no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};


