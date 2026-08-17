import React from 'react';
import { MapPin, ShieldCheck, Navigation, Globe, Building2, CheckCircle2 } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

export const CoverageSection: React.FC = () => {
  const cities = [
    'Angatuba - SP (Sede Fabril)',
    'Itapetininga - SP',
    'Sorocaba - SP',
    'Botucatu - SP',
    'Avaré - SP',
    'Capão Bonito - SP',
    'Tatuí - SP',
    'Sengés - PR',
    'Jaguariaíva - PR',
    'Castro - PR',
    'Arapoti - PR',
    'Itararé - SP / Divisa PR',
    'Piracicaba - SP',
    'Campinas - SP',
    'São Paulo & Região',
  ];

  return (
    <section className="py-16 sm:py-20 bg-stone-900 text-white relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Description */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-extrabold text-slate-200 uppercase tracking-widest">
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
              <span>Sede em Angatuba - SP • Atendimento SP & PR</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-light font-display tracking-tight text-slate-100">
              Atendimento de Obras em <span className="font-bold text-white italic">São Paulo & Paraná</span> & <span className="font-bold text-white italic">Projetos para Todo o Brasil</span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              Nossa fábrica e centro logístico estão estrategicamente situados em <strong className="text-white">Angatuba-SP</strong>, próximos à divisa com o estado do <strong className="text-white">Paraná (PR)</strong>. Atendemos com logística rápida, transporte de peças pré-fabricadas e acompanhamento técnico presencial de obras abrangendo municípios de <strong className="text-amber-300">São Paulo e Paraná</strong>.
            </p>

            <div className="p-4 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Globe className="w-4 h-4" />
                <span>Projetos Arquitetônicos & Estruturais em Todo o Brasil</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Para desenvolvimento de projetos arquitetônicos personalizados, cálculos estruturais e detalhamento executivo sem montagem presencial, atendemos clientes de qualquer cidade ou estado do país!
              </p>
            </div>
          </div>

          {/* Right Cities List Grid */}
          <div className="lg:col-span-6 bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-bold text-white text-base font-display">Cidades Atendidas em São Paulo & Paraná</h3>
                <p className="text-xs text-slate-300 font-normal">Atendimento presencial com engenheiros no canteiro de obras</p>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider">
                SP & PR
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 text-xs font-medium text-slate-200">
              {cities.map((city, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-950/60 backdrop-blur-md rounded-xl border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                  <span className="text-xs font-normal">{city}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-300 border-t border-white/10">
              <span className="font-normal">Outras cidades em SP e PR sob consulta rápida</span>
              <a
                href={buildWhatsAppLink('Consulta de Localização de Obra (SP/PR)', 'Gostaria de verificar o atendimento e montagem de obra na minha cidade.')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-wider text-[11px]"
              >
                Consultar Minha Cidade →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
