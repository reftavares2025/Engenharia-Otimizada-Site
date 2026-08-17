import React, { useState } from 'react';
import { Calculator, MessageSquare, ArrowRight, CheckCircle2, Clock, Sparkles, MapPin } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

export const ProjectCalculator: React.FC = () => {
  const [projectType, setProjectType] = useState('chale');
  const [areaM2, setAreaM2] = useState(75);
  const [city, setCity] = useState('Angatuba-SP e Região');
  const [needArchitectural, setNeedArchitectural] = useState(true);
  const [needStructural, setNeedStructural] = useState(true);
  const [needSupervision, setNeedSupervision] = useState(true);

  const calculatedDays = Math.max(10, Math.min(60, Math.ceil(areaM2 / 12)));

  const getProjectTypeLabel = (type: string) => {
    switch (type) {
      case 'chale':
        return 'Chalé em Estrutura Metálica (Steel Frame)';
      case 'galpao':
        return 'Galpão Logístico Pré-Fabricado';
      case 'comercial':
        return 'Edifício Comercial Pré-Fabricado';
      case 'residencial':
        return 'Residência Pré-Fabricada de Alto Padrão';
      case 'projeto-somente':
        return 'Apenas Projeto Arquitetônico e Estrutural';
      default:
        return 'Projeto Pré-Fabricado';
    }
  };

  const handleGenerateWhatsApp = () => {
    const servicesList = [];
    if (needArchitectural) servicesList.push('Projeto Arquitetônico Personalizado');
    if (needStructural) servicesList.push('Projeto Estrutural com Cálculo de Aço/Concreto');
    if (needSupervision) servicesList.push('Acompanhamento Técnico Presencial');

    return buildWhatsAppLink(
      `Simulador de Obra: ${getProjectTypeLabel(projectType)} (${areaM2} m²)`,
      `Cidade: ${city}\n• Área: ${areaM2}m²\n• Serviços inclusos: ${servicesList.join(', ') || 'Estrutura Pré-Fabricada'}\n• Dúvidas sobre Sondagem SPT e Fundação.`
    );
  };

  return (
    <section id="calculadora" className="py-16 sm:py-24 bg-stone-100/90 text-slate-800 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-300 px-3.5 py-1 rounded-full text-[10px] font-mono font-extrabold text-slate-800 uppercase tracking-widest shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-slate-700" />
            <span>Simulador de Projetos & Obras</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light font-display text-slate-900 tracking-tight">
            Monte a Estimativa Otimizada da <span className="font-bold italic text-slate-950">Sua Obra</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Selecione o tipo de construção, área e cidade para gerar o resumo do projeto e enviar diretamente para análise técnica do Eng. Régis Tavares!
          </p>
        </div>

        {/* Calculator Window */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden grid lg:grid-cols-12">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            
            {/* 1. Project Type */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                1. Qual é o tipo da sua construção?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'chale', name: 'Chalé em Aço' },
                  { id: 'galpao', name: 'Galpão Pré-Fabricado' },
                  { id: 'comercial', name: 'Prédio Comercial' },
                  { id: 'residencial', name: 'Casa Pré-Fabricada' },
                  { id: 'projeto-somente', name: 'Apenas Projetos' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProjectType(item.id)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center uppercase tracking-wider ${
                      projectType === item.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md font-mono'
                        : 'bg-white/60 backdrop-blur-md text-slate-700 border-stone-200 hover:bg-white'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Area M2 Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                  2. Área aproximada da obra (m²):
                </label>
                <span className="text-sm font-mono font-extrabold text-slate-900 bg-white border border-stone-200 px-3 py-1 rounded-lg shadow-sm">
                  {areaM2} m²
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="3000"
                step="10"
                value={areaM2}
                onChange={(e) => setAreaM2(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>30 m² (Chalé compacto)</span>
                <span>500 m²</span>
                <span>3.000 m²+ (Galpão)</span>
              </div>
            </div>

            {/* 3. Location */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>3. Cidade/Local da Obra (SP, PR e Região):</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex: Angatuba, Sorocaba, Sengés-PR, Botucatu, Avaré..."
                className="w-full bg-white/60 backdrop-blur-md border border-stone-200 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-slate-800 font-medium"
              />
            </div>

            {/* 4. Services Included */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                4. Serviços complementares desejados:
              </label>
              <div className="space-y-2 text-xs font-semibold text-slate-700">
                <label className="flex items-center gap-2.5 p-2.5 bg-white/60 backdrop-blur-md rounded-xl border border-stone-200 cursor-pointer hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    checked={needArchitectural}
                    onChange={(e) => setNeedArchitectural(e.target.checked)}
                    className="w-4 h-4 text-slate-900 rounded focus:ring-slate-800"
                  />
                  <span>Projeto Arquitetônico Personalizado</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 bg-white/60 backdrop-blur-md rounded-xl border border-stone-200 cursor-pointer hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    checked={needStructural}
                    onChange={(e) => setNeedStructural(e.target.checked)}
                    className="w-4 h-4 text-slate-900 rounded focus:ring-slate-800"
                  />
                  <span>Projeto Estrutural & Cálculo com ART (Aço/Concreto)</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 bg-white/60 backdrop-blur-md rounded-xl border border-stone-200 cursor-pointer hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    checked={needSupervision}
                    onChange={(e) => setNeedSupervision(e.target.checked)}
                    className="w-4 h-4 text-slate-900 rounded focus:ring-slate-800"
                  />
                  <span>Acompanhamento Técnico Presencial da Obra</span>
                </label>
              </div>
            </div>

          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-2xl text-white p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-amber-400">
                  Resumo da Simulação
                </span>
                <h3 className="text-lg font-bold font-display text-white mt-1">
                  {getProjectTypeLabel(projectType)}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2 text-xs text-slate-300 font-normal">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Fabricação própria sem intermediários</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Garantia de cobrir orçamentos coerentes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Chalés: Cliente pode comprar o aço onde quiser</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Atendimento presencial em São Paulo e Paraná</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl text-xs text-slate-300 font-normal">
                <strong className="text-white">Aviso de Fundação:</strong> A fundação é de responsabilidade do cliente. Podemos incluir o cálculo da fundação em projeto mediante o Laudo de Sondagem (SPT).
              </div>
            </div>

            <div className="pt-6">
              <a
                href={handleGenerateWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-xl shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Enviar Simulação para o WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
