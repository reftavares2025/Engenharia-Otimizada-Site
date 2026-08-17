import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  Quote,
  Home,
  Building2,
  Package,
  Smile,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export interface Testimonial {
  id: string;
  clientName: string;
  roleLocation: string;
  projectType: string;
  isChalet: boolean;
  rating: number;
  whatWasDelivered: string;
  howTheyFeltAfter: string;
  highlightTag: string;
  completionTime: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: '1',
    clientName: 'Ricardo & Patrícia Silveira',
    roleLocation: 'Campos do Jordão - SP',
    projectType: 'Chalé A-Frame em Aço Estrutural (110m²)',
    isChalet: true,
    rating: 5,
    whatWasDelivered: 'Estrutura metálica completa em aço NBR 8800 usinado, vedações de fachada em vidro duplo, mezanino de madeira teca e deck gourmet integrado.',
    howTheyFeltAfter: 'Absolutamente encantados e tranquilos! Vínhamos de uma péssima experiência com alvenaria tradicional cheia de desperdício. Receber o chalé com encaixes milimétricos e zero sujeira no terreno nos fez sentir realizadores da casa de campo dos nossos sonhos.',
    highlightTag: 'Chave na Mão & Zero Desperdício',
    completionTime: 'Entregue em 26 dias'
  },
  {
    id: '2',
    clientName: 'Marcos Vinícius T. e Família',
    roleLocation: 'Avaré - SP',
    projectType: 'Chalé Alpino com Mezanino e Subsolo (140m²)',
    isChalet: true,
    rating: 5,
    whatWasDelivered: 'Projeto estrutural em aço cortado em CNC, vigamento de cobertura, laje de mezanino e estrutura para pilares no terreno em aclive.',
    howTheyFeltAfter: 'Aliviados e extremamente satisfeitos. Estávamos apreensivos com o terreno inclinado, mas a precisão do cálculo de fundação e a agilidade do transporte das peças tornaram tudo muito simples. Ver o chalé erguido e seguro trouxe um sentimento indescritível de paz.',
    highlightTag: 'Terreno em Aclive Solucionado',
    completionTime: 'Entregue em 32 dias'
  },
  {
    id: '3',
    clientName: 'Eng. Eduardo M. & Juliana',
    roleLocation: 'Ponta Grossa - PR',
    projectType: 'Galpão Pré-Fabricado de Concreto (450m²)',
    isChalet: false,
    rating: 5,
    whatWasDelivered: 'Pilares pré-moldados NBR 9062 com consolos duplos, vigas calha em concreto protendido, laje alveolar e painéis de fechamento vertical.',
    howTheyFeltAfter: 'Com a sensação de dever cumprido e máximo retorno financeiro. O cronograma foi seguido ao pé da letra, permitindo iniciar a operação logística 2 meses antes do previsto no mercado convencional. Sentimo-nos seguros e impressionados com o rigor técnico.',
    highlightTag: 'Pronto para Operação Comercial',
    completionTime: 'Entregue em 38 dias'
  },
  {
    id: '4',
    clientName: 'Dra. Fernanda R. Mendes',
    roleLocation: 'Angatuba - SP',
    projectType: 'Chalé Minimalista Modular de Aço (85m²)',
    isChalet: true,
    rating: 5,
    whatWasDelivered: 'Kit esqueleto em perfis estruturais de aço recoberto, fachada frontal envidraçada, pergolado metálico para garagem e cobertura termoacústica.',
    howTheyFeltAfter: 'Realizada e sem estresse. Como trabalho o dia todo na área da saúde, não tinha tempo para gerenciar obra. Receber a estrutura montada, limpa e pronta para receber a decoração foi um presente de vida.',
    highlightTag: 'Montagem Rápida & Limpa',
    completionTime: 'Entregue em 19 dias'
  },
  {
    id: '5',
    clientName: 'Carlos Henrique & Associados',
    roleLocation: 'Itapetininga - SP',
    projectType: 'Prédio Comercial Pré-Fabricado de 3 Pavimentos (320m²)',
    isChalet: false,
    rating: 5,
    whatWasDelivered: 'Estrutura pré-moldada de concreto reforçado NBR 6118, lajes alveolares para 3 andares, marquesa de entrada metálica e laudo estrutural assinado.',
    howTheyFeltAfter: 'Satisfeitíssimos e com total confiança no investimento. A precisão dimensional facilitou a colocação das esquadrias e vidros sem qualquer ajuste de campo. Tivemos a certeza de ter feito a escolha mais inteligente e duradoura.',
    highlightTag: 'Alta Precisão Dimensional',
    completionTime: 'Entregue em 45 dias'
  }
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const current = testimonialsData[currentIndex];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Experiências Reais & Resultados Entregues</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Depoimentos de Quem Já Construiu
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Confira o que entregamos detalhadamente em cada obra e como nossos clientes se sentiram após receberem suas estruturas pré-fabricadas e chalés concluídos.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Active Card */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm transition-all duration-300">
            {/* Top Bar: Tag & Rating */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-700/60">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {current.highlightTag}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {current.completionTime}
                </span>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            {/* Client Info Header */}
            <div className="flex items-start justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 font-black text-lg flex items-center justify-center shadow-lg flex-shrink-0">
                  {current.clientName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {current.clientName}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span>{current.roleLocation}</span>
                    <span>•</span>
                    <span className="text-amber-400/90 font-medium">{current.projectType}</span>
                  </p>
                </div>
              </div>

              <div className="hidden sm:block text-slate-600">
                <Quote className="w-12 h-12 opacity-40 text-amber-400" />
              </div>
            </div>

            {/* Grid 2 Columns: What We Delivered & How They Felt */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box 1: O Que Entregamos */}
              <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-700/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2.5">
                    <Package className="w-4 h-4" />
                    <span>O Que Entregamos</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {current.whatWasDelivered}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Entrega rigorosamente conferida e aprovada</span>
                </div>
              </div>

              {/* Box 2: Como Ficou / Sentimento do Cliente */}
              <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-700/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2.5">
                    <Smile className="w-4 h-4" />
                    <span>Como Ficaram Após Receber</span>
                  </div>
                  <p className="text-slate-200 text-sm italic leading-relaxed">
                    "{current.howTheyFeltAfter}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400 font-medium">
                  {current.isChalet ? (
                    <Home className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  ) : (
                    <Building2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  )}
                  <span>Cliente 100% satisfeito com o resultado final</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Counter */}
            <div className="text-xs font-mono text-slate-400">
              <span className="text-amber-400 font-bold">{currentIndex + 1}</span> / {testimonialsData.length} Depoimentos
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-amber-400'
                      : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Ir para depoimento ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors shadow-md"
                aria-label="Depoimento Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold flex items-center justify-center transition-colors shadow-md"
                aria-label="Próximo Depoimento"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
