import React from 'react';
import { MessageSquare, Bot, ShieldCheck, CheckCircle2, ArrowRight, Building2, MapPin, Sparkles, Award } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { APP_IMAGES } from '../assets/images';
import { LazyImage } from './LazyImage';

export const Hero: React.FC = () => {
  const primaryWhatsappUrl = buildWhatsAppLink(
    'Solicitação de Orçamento - Pré-Fabricados & Chalés',
    'Gostaria de solicitar um orçamento diretamente com o Eng. Régis Tavares para minha obra em São Paulo / Paraná.'
  );

  const highlights = [
    "Fabricante Próprio sem Intermediários",
    "Batemos Qualquer Orçamento Coerente",
    "Chalés em Estrutura Metálica (Aço)",
    "Atendimento Presencial em SP & PR",
    "Projetos Arquitetônicos e Estruturais",
  ];

  return (
    <section id="inicio" className="relative bg-stone-900 text-white overflow-hidden pt-8 pb-16 lg:py-20">
      {/* Structural Grid Accent Background */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-slate-200 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-bold">FABRICAÇÃO PRÓPRIA</span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                Angatuba-SP • Obras em SP & PR
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.15] text-slate-100 tracking-tight">
              Sua Ideia Transformada em <span className="font-bold text-white italic underline decoration-amber-500 decoration-2 underline-offset-8">Engenharia Otimizada</span> & Pré-Fabricados
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
              Somos <strong className="text-white font-semibold">fabricantes de estruturas pré-fabricadas de concreto</strong>, especialistas em <strong className="text-amber-300 font-semibold italic">chalés em estrutura metálica</strong> e <strong className="text-white font-semibold">projetos arquitetônicos e estruturais Otimizados</strong>. Contamos com time de engenheiros experientes e <strong className="text-emerald-400 font-bold">garantia de cobrir qualquer orçamento coerente!</strong>
            </p>

            {/* Bullet Points */}
            <div className="grid sm:grid-cols-2 gap-2.5 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-medium tracking-wide text-slate-200 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={primaryWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl shadow-xl shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>Solicitar Orçamento no WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#assistente-ia"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-slate-100 border border-white/20 font-bold text-xs uppercase tracking-wider px-5 py-4 rounded-xl transition-all"
              >
                <Bot className="w-5 h-5 text-sky-400" />
                <span>Eng(a). Olívia • Gerar Projeto 3D</span>
              </a>
            </div>

            {/* Direct Contact Guarantee */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Atendimento direto com Eng. Régis Tavares • Resposta rápida no WhatsApp</span>
            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl p-2">
              
              <div className="grid grid-cols-2 gap-2">
                <LazyImage
                  src={APP_IMAGES.chaleAframe}
                  alt="Chalé A-Frame Compacto em Aço Estrutural"
                  loading="lazy"
                  containerClassName="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-white/10 group"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                >
                  <div className="absolute bottom-1.5 left-1.5 z-10 bg-slate-950/80 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-md border border-white/10">
                    Chalé A-Frame em Aço
                  </div>
                </LazyImage>

                <LazyImage
                  src={APP_IMAGES.chaleAlpino}
                  alt="Chalé de Luxo com Mezanino e Piscina"
                  loading="lazy"
                  containerClassName="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-white/10 group"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                >
                  <div className="absolute bottom-1.5 left-1.5 z-10 bg-slate-950/80 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-md border border-white/10">
                    Chalé Mezanino & Piscina
                  </div>
                </LazyImage>

                <LazyImage
                  src={APP_IMAGES.edificioComercial}
                  alt="Edifício Comercial Pré-Fabricado"
                  loading="lazy"
                  containerClassName="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-white/10 group"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                >
                  <div className="absolute bottom-1.5 left-1.5 z-10 bg-slate-950/80 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-md border border-white/10">
                    Prédio Comercial
                  </div>
                </LazyImage>

                <LazyImage
                  src={APP_IMAGES.estruturaMetalica}
                  alt="Estruturas Metálicas de Aço"
                  loading="lazy"
                  containerClassName="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-white/10 group"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                >
                  <div className="absolute bottom-1.5 left-1.5 z-10 bg-slate-950/80 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-md border border-white/10">
                    Estrutura Metálica
                  </div>
                </LazyImage>
              </div>

              {/* Float Overlay Card */}
              <div className="mt-2 p-4 bg-slate-900/80 backdrop-blur-xl border border-white/15 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-amber-400">Garantia Imbatível</span>
                    <h3 className="text-sm font-bold text-white">Batemos Qualquer Orçamento Coerente</h3>
                  </div>
                  <div className="bg-amber-500/20 border border-amber-500/40 p-2 rounded-xl text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
