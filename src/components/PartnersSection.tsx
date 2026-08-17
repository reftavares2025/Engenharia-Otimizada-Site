import React from 'react';
import { ShieldCheck, Award, Layers, CheckCircle2 } from 'lucide-react';

interface PartnerBrand {
  name: string;
  category: string;
  tag: string;
  description: string;
}

const PARTNER_BRANDS: PartnerBrand[] = [
  {
    name: 'Gerdau',
    category: 'Aço Estrutural & CA-50',
    tag: 'Aço Estrutural',
    description: 'Perfis W, H e armaduras de alta resistência para fundações e estruturas metálicas.'
  },
  {
    name: 'ArcelorMittal',
    category: 'Steel Frame & Perfis',
    tag: 'Sistemas em Aço',
    description: 'Aço galvanizado de alta durabilidade para chalés, vigas e tesouras de cobertura.'
  },
  {
    name: 'CSN',
    category: 'Siderurgia & Telhas',
    tag: 'Aço Galvanizado',
    description: 'Chapas, perfis dobrados e cobertura termoacústica com proteção anticorrosiva.'
  },
  {
    name: 'Votorantim Cimentos',
    category: 'Concreto Usinado & Cimento',
    tag: 'Concreto Fck 30-50 MPa',
    description: 'Cimento estrutural de alta resistência inicial para pré-fabricados e lajes protendidas.'
  },
  {
    name: 'Tuper',
    category: 'Tubos & Estruturas Metálicas',
    tag: 'Tubos Estruturais',
    description: 'Tubos de aço estruturais com certificação ISO e rigoroso controle dimensional.'
  },
  {
    name: 'Belgo Bekaert',
    category: 'Telas & Cordoalhas',
    tag: 'Concreto Protendido',
    description: 'Cordoalhas e telas soldadas para pré-moldados e galpões de grande vão livre.'
  },
  {
    name: 'Saint-Gobain / Isover',
    category: 'Isolamento Termoacústico',
    tag: 'Lã de Rocha / Vidro',
    description: 'Mantas termoacústicas de alta performance para chalés e coberturas industriais.'
  },
  {
    name: 'Hilti',
    category: 'Sistemas de Ancoragem',
    tag: 'Chumbadores Químicos',
    description: 'Ancoragens de alta carga e chumbadores mecânicos/químicos para bases de concreto.'
  }
];

const CERTIFICATIONS = [
  { title: 'NBR 8800', detail: 'Projeto de Estruturas de Aço' },
  { title: 'NBR 9062', detail: 'Estruturas de Concreto Pré-Moldado' },
  { title: 'NBR 6118', detail: 'Projeto de Estruturas de Concreto' },
  { title: 'ISO 9001', detail: 'Rigoroso Controle de Qualidade' }
];

export const PartnersSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-900 border-t border-slate-800 text-slate-100 relative overflow-hidden">
      {/* Subtle background ambient gradients */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 px-3.5 py-1 rounded-full text-[10px] font-mono font-extrabold text-amber-400 uppercase tracking-widest shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Qualidade e Matéria-Prima Certificada</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-display tracking-tight text-white">
            Parceiros & <span className="font-bold text-amber-400 italic">Fornecedores de Elite</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Utilizamos exclusivamente insumos de usinas e fabricantes líderes mundiais em siderurgia, concreto usinado e sistemas de ancoragem com certificação ABNT e ISO.
          </p>
        </div>

        {/* Monochromatic Brand Logos & Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-12 pb-12">
          {PARTNER_BRANDS.map((brand, idx) => (
            <div
              key={idx}
              className="group bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/60 hover:border-amber-500/40 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-1"
            >
              <div className="space-y-3">
                {/* Brand Visual Logo Representation */}
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                  <div className="font-display font-black tracking-tighter text-xl text-slate-200 group-hover:text-amber-400 transition-colors uppercase">
                    {brand.name}
                  </div>
                  <span className="text-[9px] font-mono font-extrabold uppercase bg-slate-900/90 text-slate-400 border border-slate-700/80 px-2 py-0.5 rounded">
                    {brand.tag}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-amber-300/90 font-mono">
                    {brand.category}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {brand.description}
                  </p>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="pt-4 mt-3 border-t border-slate-700/40 flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Rastreabilidade & Laudo de Usina</span>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Standards & Norms Bar */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Garantia Estrutural e Controle Tecnológico</h3>
              <p className="text-xs text-slate-400">Ensaios de tração em aço e romprimeito de corpos de prova de concreto em laboratório credenciado.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-center">
                <span className="block text-xs font-bold font-mono text-amber-400">{cert.title}</span>
                <span className="block text-[9px] text-slate-400 font-medium truncate">{cert.detail}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
