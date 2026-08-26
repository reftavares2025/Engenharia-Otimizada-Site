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
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-xs font-medium text-slate-200">
              <span className="text-emerald-400 font-bold">FABRICAÇÃO PRÓPRIA</span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                Obras em SP & PR
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight text-slate-100">
              Projetos e Construções de <span className="font-bold text-white">Alto Padrão</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
              Somos fabricantes de estruturas pré-fabricadas e especialistas em chalés metálicos. Desenvolvemos desde o projeto de arquitetura até a montagem da obra.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={primaryWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-wider px-6 py-4 rounded-xl shadow-lg transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Orçamento via WhatsApp</span>
              </a>

              <a
                href="#assistente-ia"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-slate-100 border border-white/20 font-bold text-sm uppercase tracking-wider px-6 py-4 rounded-xl transition-all"
              >
                <Bot className="w-5 h-5 text-sky-400" />
                <span>Simulador 3D</span>
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <LazyImage
                src={APP_IMAGES.chaleAlpino}
                alt="Projeto de Chalé Alpino de Alto Padrão"
                loading="lazy"
                containerClassName="relative aspect-video sm:aspect-[4/3] bg-slate-800"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
