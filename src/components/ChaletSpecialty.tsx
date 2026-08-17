import React, { useState } from 'react';
import {
  Compass,
  Zap,
  Hammer,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Box,
  Maximize2
} from 'lucide-react';
import { APP_IMAGES } from '../assets/images';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { LazyImage } from './LazyImage';
import { Interactive3DViewerModal } from './r3f/Interactive3DViewerModal';
import { Model3DType } from './r3f/types';

export const ChaletSpecialty: React.FC = () => {
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model3DType>('chale-aframe');

  const open3DModel = (model: Model3DType) => {
    setSelectedModel(model);
    setIs3DModalOpen(true);
  };

  const engineeringRules = [
    {
      icon: Compass,
      title: 'Topografia e Nivelamento',
      desc: 'Adaptação estrutural para declives acentuados sem movimentação excessiva de terra.',
    },
    {
      icon: Zap,
      title: 'Cargas de Vento NBR 6123',
      desc: 'Cálculo de empuxo e ancoragens reforçadas para regiões montanhosas e campos abertos.',
    },
    {
      icon: Hammer,
      title: 'Precisão Milimétrica Steel Frame',
      desc: 'Perfis galvanizados de alta durabilidade com proteção anticorrosiva de fábrica.',
    },
    {
      icon: TrendingDown,
      title: 'Desperdício Zero no Canteiro',
      desc: 'Peças pré-dimensionadas e etiquetadas para montagem rápida e limpa em até 15 dias.',
    },
  ];

  return (
    <section id="chales" className="py-16 sm:py-24 bg-stone-900 text-white relative overflow-hidden">
      {/* Background Blueprint Grid Line */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1 rounded-full text-[10px] font-mono font-extrabold text-slate-200 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Especialidade Exclusiva</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-display tracking-tight text-slate-100">
            Chalés em Estrutura Metálica <span className="font-bold text-amber-400 italic">de Alto Padrão</span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Perfeito para pousadas, turismo rural, Airbnb e moradias de campo. Montagem rápida, arquitetura contemporânea e <strong className="text-white">liberdade de fornecedores de aço</strong> para você comprar direto da usina.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {engineeringRules.map((rule, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6 space-y-4 hover:border-white/30 hover:bg-white/15 transition-all shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-amber-300">
                  <rule.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold font-display text-white">{rule.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">{rule.desc}</p>
              </div>

              <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                Garantia de Engenharia
              </div>
            </div>
          ))}
        </div>

        {/* Photo Showcase & SPT Warning */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {/* Card 1 - Chalé A-Frame Pequeno Padrão */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md group aspect-[4/3] flex flex-col justify-between">
              <LazyImage
                src={APP_IMAGES.chaleAframe}
                alt="Chalé A-Frame Compacto em Aço Estrutural"
                loading="lazy"
                containerClassName="absolute inset-0 w-full h-full"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-95 pointer-events-none" />
              
              {/* Top Floating 3D Badge */}
              <div className="relative z-10 p-3 flex justify-between items-start">
                <span className="bg-slate-950/80 text-amber-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border border-amber-500/30 uppercase tracking-widest backdrop-blur-md">
                  A-Frame Compacto
                </span>
                <button
                  onClick={() => open3DModel('chale-aframe')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 transition-all transform hover:scale-105"
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>Girar em 3D</span>
                </button>
              </div>

              <div className="relative z-10 p-4">
                <span className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-widest">Pequeno Padrão • A-Frame em Aço</span>
                <h4 className="text-sm font-bold text-white font-display">Chalé A-Frame em Aço Estrutural</h4>
                <p className="text-[11px] text-slate-300">Pé-direito duplo com mezanino e fechamento de vidro</p>
              </div>
            </div>

            {/* Card 2 - Chalé Alpino de Grande Padrão */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md group aspect-[4/3] flex flex-col justify-between">
              <LazyImage
                src={APP_IMAGES.chaleAlpino}
                alt="Chalé de Luxo com Mezanino e Piscina em Aço"
                loading="lazy"
                containerClassName="absolute inset-0 w-full h-full"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-95 pointer-events-none" />
              
              {/* Top Floating 3D Badge */}
              <div className="relative z-10 p-3 flex justify-between items-start">
                <span className="bg-slate-950/80 text-amber-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border border-amber-500/30 uppercase tracking-widest backdrop-blur-md">
                  Alpino Mezanino
                </span>
                <button
                  onClick={() => open3DModel('chale-alpino')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 transition-all transform hover:scale-105"
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>Girar em 3D</span>
                </button>
              </div>

              <div className="relative z-10 p-4">
                <span className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-widest">Alto Padrão • Mezanino & Piscina</span>
                <h4 className="text-sm font-bold text-white font-display">Chalé de Luxo com Mezanino</h4>
                <p className="text-[11px] text-slate-300">Estrutura metálica pesada, varanda panorâmica e deck gourmet</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-5 h-5" />
              <span>Atenção sobre a Fundação e Laudo SPT</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              A responsabilidade de execução da fundação é do cliente. Para que nossa equipe de engenharia projete o vigamento da fundação no cálculo estrutural, exigimos o <strong className="text-white">LAUDO DE SONDAGEM (SPT)</strong> do terreno.
            </p>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-white/10 text-[11px] text-slate-300 space-y-1 font-mono">
              <div>• Projeto Estrutural em Aço (NBR 8800)</div>
              <div>• Cortes Computadorizados</div>
              <div>• Equipe Especializada de Montagem</div>
            </div>

            <a
              href={buildWhatsAppLink(
                'Solicitar Projeto de Chalé em Aço & Dúvidas sobre Sondagem SPT',
                'Olá Eng. Régis! Gostaria de consultar sobre meu chalé em estrutura metálica e entender os passos da sondagem SPT do terreno.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Falar no WhatsApp Direct</span>
            </a>
          </div>

        </div>

        {/* Standalone 3D Inspector Modal */}
        <Interactive3DViewerModal
          isOpen={is3DModalOpen}
          onClose={() => setIs3DModalOpen(false)}
          initialModel={selectedModel}
        />

      </div>
    </section>
  );
};
