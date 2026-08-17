import React, { useState } from 'react';
import {
  MessageSquare,
  Compass,
  Factory,
  HardHat,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Truck,
  Sparkles,
  Calendar
} from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

interface ProjectFlowSectionProps {
  onOpenConsultation?: () => void;
}

interface StepDetail {
  number: string;
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  timeline: string;
  highlights: string[];
  description: string;
  deliverables: string[];
  normReference: string;
}

const FLOW_STEPS: StepDetail[] = [
  {
    number: '01',
    id: 'visita-tecnica',
    title: 'Visita Técnica & Viabilidade Local',
    subtitle: 'Análise do Terreno para Pré-Fabricado ou Estrutura Metálica',
    icon: MessageSquare,
    timeline: '3 a 7 dias úteis',
    highlights: [
      'Visita presencial para avaliar o terreno e acesso de carretas',
      'Diagnóstico se a melhor opção é Pré-Fabricado ou Estrutura Metálica',
      'Análise de inclinação, espaço para caminhão munck e canteiro'
    ],
    description:
      'Realização de Visita Técnica e reunião com a equipe de engenharia para inspecionar o local da obra. Avaliamos a topografia, a acessibilidade para carretas e caminhão munck e o espaço físico disponível. Definimos no próprio local se a solução mais vantajosa e viável para o seu projeto é o Pré-Fabricado de Concreto ou a Estrutura Metálica.',
    deliverables: [
      'Relatório de Visita Técnica e Análise do Local',
      'Diagnóstico de Viabilidade Construtiva (Pré-Fabricado x Estrutura Metálica)',
      'Estudo de rotas e acesso para logística e içamento de peças'
    ],
    normReference: 'Vistoria Técnica de Engenharia & Viabilidade de Canteiro'
  },
  {
    number: '02',
    id: 'projetos',
    title: 'Projetos & Emissão de ART',
    subtitle: 'Cálculo Estrutural e Modelagem BIM 3D',
    icon: Compass,
    timeline: '10 a 20 dias úteis',
    highlights: ['Dimensionamento de cargas', 'Detalhamento de conexões', 'Aprovação na Prefeitura'],
    description:
      'Elaboração de todo o pacote de engenharia: projeto arquitetônico 3D, cálculo estrutural completo (vento, sobrecarga e rigidez), projeto de fundação e emissão formal da Anotação de Responsabilidade Técnica (ART) junto ao CREA.',
    deliverables: [
      'Projeto Executivo completo e Caderno de Detalhes 3D',
      'ART (Anotação de Responsabilidade Técnica) registrada',
      'Memorial descritivo para aprovação municipal/condomínio'
    ],
    normReference: 'NBR 8800 (Aço) & NBR 6118 (Concreto Armado)'
  },
  {
    number: '03',
    id: 'fabricacao',
    title: 'Fabricação Industrial',
    subtitle: 'Produção Padronizada de Aço & Concreto',
    icon: Factory,
    timeline: '15 a 30 dias úteis',
    highlights: ['Gabaritos de alta precisão', 'Aço usinado e jateado', 'Concreto de alta resistência (Fck 35-50 MPa)'],
    description:
      'Fabricação das estruturas em ambiente industrial fabril sob rigoroso controle de qualidade. Os pilares, vigas, tesouras em aço ou pilares pré-moldados são produzidos em moldes metálicos calibrados e inspecionados antes do despacho.',
    deliverables: [
      'Lote de componentes com laudo técnico e rastreabilidade',
      'Tratamento anticorrosivo / galvanização a quente',
      'Controle de cura do concreto com ensaios de compressão'
    ],
    normReference: 'NBR 9062 (Estruturas de Concreto Pré-Moldado)'
  },
  {
    number: '04',
    id: 'montagem',
    title: 'Montagem & Entrega da Obra',
    subtitle: 'Içamento, Fixação e Chaves na Mão',
    icon: HardHat,
    timeline: '7 a 20 dias no canteiro',
    highlights: ['Montagem a seco e limpa', 'Zero desperdício de insumos', 'Garantia estrutural por escrito'],
    description:
      'Transporte especializado e montagem ágil no canteiro de obras por equipe altamente treinada. Içamento de pilares e tesouras com caminhão munck, aperto de parafusos estruturais de alta resistência e checagem final de nivelamento.',
    deliverables: [
      'Estrutura 100% erguida, travada e conferida em prumo',
      'Termo de garantia estrutural assinado',
      'Relatório fotográfico da entrega técnica final'
    ],
    normReference: 'Conformidade total com NR-18 e NR-35 (Segurança)'
  }
];

export const ProjectFlowSection: React.FC<ProjectFlowSectionProps> = ({ onOpenConsultation }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = FLOW_STEPS[activeStepIndex];

  const whatsappUrl = buildWhatsAppLink(
    `Dúvida sobre a Etapa ${activeStep.number} (${activeStep.title})`,
    `Olá Eng. Régis Tavares! Gostaria de tirar dúvidas sobre o fluxo de trabalho da etapa "${activeStep.title}".`
  );

  return (
    <section id="fluxo-de-projeto" className="py-20 sm:py-28 bg-slate-950 text-slate-100 relative overflow-hidden border-t border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1 rounded-full text-[10px] font-mono font-extrabold text-amber-400 uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Passo a Passo Transparente</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-display tracking-tight text-white">
            Do Projeto à Entrega das Chaves: <span className="font-bold text-amber-400 italic">O Ciclo de Vida da Obra</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Conheça o processo de engenharia ponta a ponta. Garantimos previsibilidade de prazos, controle de custos e máxima segurança estrutural em cada fase.
          </p>
        </div>

        {/* Desktop / Tablet Process Step Cards Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-12 pb-8">
          {FLOW_STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            const isActive = activeStepIndex === idx;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-900 border-amber-500 shadow-xl shadow-amber-500/10 scale-[1.02] z-20'
                    : 'bg-slate-900/50 border-slate-800 hover:bg-slate-900/90 hover:border-slate-700'
                }`}
              >
                {/* Active Indicator Top Line */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-emerald-400" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-2xl font-black font-mono tracking-wider ${isActive ? 'text-amber-400' : 'text-slate-600 group-hover:text-slate-400'}`}>
                      {step.number}
                    </span>
                    <div className={`p-2.5 rounded-xl border ${isActive ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className={`text-base font-bold font-display leading-tight mb-1 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {step.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono font-semibold">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{step.timeline}</span>
                  </span>
                  <span className={`${isActive ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                    {isActive ? 'Selecionado' : 'Ver detalhes →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Breakdown Card for Selected Step */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Detailed Step Description */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-black px-3 py-1 rounded-lg uppercase tracking-wider">
                  Etapa {activeStep.number} de 04
                </span>
                <span className="bg-slate-800 text-slate-300 border border-slate-700 text-xs font-mono px-3 py-1 rounded-lg flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Prazo Estimado: <strong className="text-white">{activeStep.timeline}</strong></span>
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {activeStep.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {activeStep.description}
                </p>
              </div>

              {/* Deliverables List */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-amber-400" />
                  <span>Entregáveis e Documentos de Engenharia nesta Fase:</span>
                </h4>
                <div className="space-y-2">
                  {activeStep.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Norm Badge */}
              <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Norma Técnica de Referência: <strong className="text-slate-200">{activeStep.normReference}</strong></span>
              </div>

            </div>

            {/* Right Column: Key Summary & Immediate Action CTAs */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 flex flex-col justify-between h-full">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span>Garantias da Etapa {activeStep.number}</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  {activeStep.highlights.map((hl, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-2 text-xs text-slate-300">
                  <span className="font-bold text-amber-400 block">Atendimento com o Eng. Régis:</span>
                  <p className="text-[11px] leading-relaxed text-slate-400">
                    Você pode conversar diretamente com o engenheiro responsável para alinhar os detalhes desta etapa ou agendar uma consultoria técnica prévia.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  <span>Agendar Consultoria para Esta Etapa</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Dúvidas no WhatsApp</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
