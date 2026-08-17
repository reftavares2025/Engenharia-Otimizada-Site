import React from 'react';
import { Factory, Compass, Home, Layers, HardHat, DollarSign, ArrowRight, ShieldCheck, Wrench } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <Factory className="w-7 h-7 text-slate-800" />,
      title: 'Fabricantes de Pré-Fabricados',
      description: 'Estruturas de concreto direto da fábrica. Produção de pilares, vigas, lajes e painéis com controle tecnológico de Fck e entrega pontual na obra.',
      tag: 'Fabricação Própria',
    },
    {
      icon: <Home className="w-7 h-7 text-slate-800" />,
      title: 'Chalés em Estrutura Metálica',
      description: 'Especialidade em aço e Steel Frame. Liberdade para você comprar o aço na usina que preferir. Entregamos o projeto executivo, cortes e equipe de montagem.',
      tag: 'Estrutura Metálica',
    },
    {
      icon: <Compass className="w-7 h-7 text-slate-800" />,
      title: 'Projetos Arquitetônicos & 3D',
      description: 'Plantas humanizadas, cortes, fachadas contemporâneas e renderizações 3D hiper-realistas sob medida para seu orçamento em todo o Brasil.',
      tag: 'Design Exclusivo',
    },
    {
      icon: <Layers className="w-7 h-7 text-slate-800" />,
      title: 'Projetos Estruturais & Fundações',
      description: 'Cálculo estrutural completo e dimensionamento de fundações com base em Laudo de Sondagem (SPT). Emissão de ART registrada no CREA.',
      tag: 'Segurança & ART',
    },
    {
      icon: <HardHat className="w-7 h-7 text-slate-800" />,
      title: 'Acompanhamento Técnico de Obra',
      description: 'Supervisão presencial no canteiro em municípios de SP e PR. Rigoroso controle de aprumo, montagem, concretagem e cronograma físico.',
      tag: 'Presencial SP e PR',
    },
    {
      icon: <DollarSign className="w-7 h-7 text-slate-800" />,
      title: 'Cobrimos Qualquer Orçamento',
      description: 'Por sermos fabricantes sem intermediários, garantimos o melhor custo-benefício. Apresente sua proposta concorrente e nós cobrimos o valor equivalente.',
      tag: 'Garantia de Preço',
    },
  ];

  return (
    <section id="pre-fabricados" className="py-16 sm:py-24 bg-stone-100/80 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-300 px-3.5 py-1 rounded-full text-[10px] font-mono font-extrabold text-slate-800 uppercase tracking-widest shadow-sm">
            <span>Soluções Completas de Engenharia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-display text-slate-900 tracking-tight">
            Engenharia Otimizada da <span className="font-bold italic text-slate-950">Concepção ao Acabamento</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Unimos a precisão da <strong className="text-slate-900 font-semibold">fabricação de pré-fabricados de concreto</strong> e <strong className="text-slate-900 font-semibold">chalés em estrutura metálica</strong> à excelência de <strong className="text-slate-900 font-semibold">projetos estruturais e acompanhamento técnico presencial (SP e PR)</strong>.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {services.map((service, index) => {
            const cardWhatsappUrl = buildWhatsAppLink(service.title, service.description);

            return (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-7 border border-stone-200/90 shadow-sm hover:shadow-2xl hover:shadow-slate-900/15 hover:border-slate-400 hover:bg-white/95 transform hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.99] transition-all duration-300 ease-out flex flex-col justify-between group relative overflow-hidden will-change-transform cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 bg-stone-100 rounded-xl group-hover:bg-slate-900 group-hover:text-white group-hover:scale-110 transition-all duration-300 ease-out">
                      {React.cloneElement(service.icon, {
                        className: 'w-6 h-6 group-hover:text-white transition-colors duration-300 text-slate-800',
                      })}
                    </div>
                    <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest bg-stone-200/80 text-slate-800 group-hover:bg-slate-900 group-hover:text-white px-2.5 py-1 rounded-full transition-colors duration-300">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-red-600 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-900 group-hover:text-red-600 transition-colors duration-300">
                  <span>Solicitar Consultoria</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>

                <a
                  href={cardWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label={service.title}
                />
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 bg-slate-900/90 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30 flex-shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Tem uma Proposta Comercial em Mãos?</h4>
              <p className="text-xs text-slate-300">
                Traga seu orçamento de pré-fabricados ou estrutura para o Eng. Régis Tavares. Cobrimos qualquer valor coerente com fabricação própria!
              </p>
            </div>
          </div>

          <a
            href={buildWhatsAppLink('Cobertura de Orçamento Concorrente', 'Tenho uma cotação de concorrente e gostaria que o Eng. Régis analisasse para cobrir a proposta!')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-600/20 whitespace-nowrap"
          >
            <span>Enviar Orçamento Concorrente</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
