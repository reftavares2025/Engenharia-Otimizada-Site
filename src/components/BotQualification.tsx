import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, MessageSquare, ShieldCheck, MapPin, CheckCircle, RefreshCw, Layers, CheckCircle2, ChevronRight, AlertTriangle, Box } from 'lucide-react';
import { Project3DViewer, Project3DParams } from './Project3DViewer';
import { buildWhatsAppLink } from '../utils/whatsapp';

interface ChatStep {
  id: string;
  question: string;
  field: keyof Project3DParams;
  options?: { label: string; value: any }[];
  isTextInput?: boolean;
  placeholder?: string;
  isChaletOnly?: boolean;
}

export const BotQualification: React.FC = () => {
  // Form State for Enga. Olívia
  const [params, setParams] = useState<Project3DParams>({
    projectType: 'chalé',
    city: 'Angatuba - SP',
    areaM2: 60,
    hasLand: 'Sim, terreno próprio',
    hasArchitectural: 'Não, preciso criar do zero',
    isApproved: 'Ainda não',
    bedrooms: '2 quartos',
    hasGourmet: true,
    hasChurrasqueira: true,
    hasGarage: false,
    hasSubsolo: false,
    hasMezzanine: true,
    hasSondagemSPT: 'Ainda não possuo a sondagem',
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [customText, setCustomText] = useState('');

  const steps: ChatStep[] = [
    {
      id: 'step-type',
      question: 'Olá! Sou a Eng(a). Olívia, assistente técnica da Régis Tavares Engenharia Civil.\n\nPara começarmos e eu gerar seu modelo 3D em tempo real na tela, qual é o tipo da sua obra?',
      field: 'projectType',
      options: [
        { label: '🏡 Chalé em Estrutura Metálica (Exclusivo Steel Frame)', value: 'chalé' },
        { label: '🏭 Galpão Pré-Fabricado de Concreto', value: 'galpão' },
        { label: '🏢 Edifício Comercial Pré-Fabricado', value: 'comercial' },
        { label: '🏗️ Cobertura / Estrutura Metálica Industrial', value: 'metálico' },
      ],
    },
    {
      id: 'step-city',
      question: 'Em qual cidade e estado será realizada a obra?\n(Atendemos presencialmente obras em SP e PR, e elaboramos projetos para todo o Brasil!)',
      field: 'city',
      isTextInput: true,
      placeholder: 'Ex: Sorocaba-SP, Sengés-PR, Botucatu-SP, Avaré-SP...',
    },
    {
      id: 'step-area',
      question: 'Qual é a metragem quadrada estimada aproximada (m²)?',
      field: 'areaM2',
      options: [
        { label: '📐 35 m² a 50 m² (Pequeno Padrão Compacto)', value: 45 },
        { label: '📐 60 m² a 90 m² (Médio Padrão / Pousada)', value: 75 },
        { label: '📐 100 m² a 180 m² (Grande Padrão / Luxo)', value: 140 },
        { label: '📐 200 m² a 500 m² (Galpão / Comercial)', value: 300 },
        { label: '📐 Mais de 500 m²', value: 600 },
      ],
    },
    {
      id: 'step-land',
      question: 'Você já possui o terreno para a construção?',
      field: 'hasLand',
      options: [
        { label: '✅ Sim, terreno próprio quitado', value: 'Sim, próprio' },
        { label: '⏳ Em negociação / compra', value: 'Em negociação' },
        { label: '❌ Ainda estou procurando', value: 'Não' },
      ],
    },
    {
      id: 'step-arch',
      question: 'Você já possui o Projeto Arquitetônico pronto?',
      field: 'hasArchitectural',
      options: [
        { label: '✅ Sim, já tenho o projeto completo', value: 'Sim, pronto' },
        { label: '🛠️ Não, quero que a Régis Tavares desenvolva do zero', value: 'Não, criar do zero' },
      ],
    },
    {
      id: 'step-appr',
      question: 'O projeto já está aprovado na prefeitura municipal?',
      field: 'isApproved',
      options: [
        { label: '✅ Sim, projeto aprovado e com alvará', value: 'Sim, aprovado' },
        { label: '⏳ Em andamento na prefeitura', value: 'Em andamento' },
        { label: '❌ Ainda não iniciou a aprovação', value: 'Ainda não' },
      ],
    },
    // Chalet Specific Questions:
    {
      id: 'step-bed',
      question: 'Para o seu Chalé em Estrutura Metálica, quantos quartos você deseja?',
      field: 'bedrooms',
      isChaletOnly: true,
      options: [
        { label: '🛏️ 1 Suíte Aconchegante', value: '1 Suíte' },
        { label: '🛏️ 2 Quartos (Ideal para Família/Airbnb)', value: '2 Quartos' },
        { label: '🛏️ 3 ou mais Quartos', value: '3+ Quartos' },
      ],
    },
    {
      id: 'step-gourmet',
      question: 'Deseja incluir Varanda / Área Gourmet com Churrasqueira integrada?',
      field: 'hasGourmet',
      isChaletOnly: true,
      options: [
        { label: '🔥 Sim, Varanda Gourmet com Churrasqueira', value: true },
        { label: '❌ Não, apenas o chalé básico', value: false },
      ],
    },
    {
      id: 'step-mezzanine',
      question: 'Deseja incluir Mezanino com Vidraçaria Cênica Panorâmica?',
      field: 'hasMezzanine',
      isChaletOnly: true,
      options: [
        { label: '🖼️ Sim, Mezanino Panorâmico', value: true },
        { label: '❌ Não, apenas pavimento térreo', value: false },
      ],
    },
    {
      id: 'step-subsolo',
      question: 'Seu terreno tem declive/aclive que exija Pilotis ou Subsolo elevado?',
      field: 'hasSubsolo',
      isChaletOnly: true,
      options: [
        { label: '⛰️ Sim, terreno em declive com Pilotis/Subsolo', value: true },
        { label: '🛣️ Não, terreno plano', value: false },
      ],
    },
    {
      id: 'step-spt',
      question: '⚠️ NOTA TÉCNICA IMPORTANTE DE ENGENHARIA (NBR 6122 / NBR 8800):\n\nA execução da fundação é de responsabilidade do cliente. A Régis Tavares fornece o projeto estrutural, corte do aço e equipe de montagem.\nPodemos incluir o projeto da fundação, porém precisamos do LAUDO DE SONDAGEM (SPT) do terreno para precificação exata do aço e mão de obra.\n\nVocê já possui o Laudo de Sondagem (SPT) do seu terreno?',
      field: 'hasSondagemSPT',
      options: [
        { label: '📋 Sim, já tenho o Laudo de Sondagem (SPT)', value: 'Sim, laudo pronto' },
        { label: '🛠️ Não, mas quero orçar a sondagem e o projeto completo', value: 'Não, orçar junto' },
        { label: '❓ Preciso de orientação sobre como fazer a sondagem', value: 'Preciso de orientação' },
      ],
    },
  ];

  // Filter steps based on project type
  const activeSteps = steps.filter((s) => {
    if (s.isChaletOnly) {
      return params.projectType.toLowerCase().includes('chal') || params.projectType === 'chalé';
    }
    return true;
  });

  const currentStep = activeSteps[currentStepIndex];

  const handleSelectOption = (value: any) => {
    if (!currentStep) return;

    setParams((prev) => ({
      ...prev,
      [currentStep.field]: value,
    }));

    if (currentStepIndex < activeSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;
    handleSelectOption(customText.trim());
    setCustomText('');
  };

  const resetWizard = () => {
    setCurrentStepIndex(0);
    setIsCompleted(false);
  };

  return (
    <section id="assistente-ia" className="py-16 sm:py-24 bg-slate-950 text-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-extrabold text-sky-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Assistente Técnica • Eng(a). Olívia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light font-display tracking-tight text-slate-100">
            Qualificação Técnica & <span className="font-bold text-white italic">Simulador 3D em Tempo Real</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Responda às perguntas da <strong className="text-white">Eng(a). Olívia</strong>. Ao final, veja na tela o <strong className="text-sky-300">Modelo 3D Interativo</strong> do seu projeto com estimativa de aço NBR 8800 e envie para o Eng. Régis Tavares!
          </p>
        </div>

        {/* Main Interface Window */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden min-h-[580px] flex flex-col">
          
          {/* Top Status Bar */}
          <div className="bg-slate-900 px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 p-0.5 flex items-center justify-center">
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-sky-300">
                    <Bot className="w-5 h-5" />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>

              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
                  <span>Eng(a). Olívia • Assistente Régis Tavares</span>
                  <span className="bg-sky-500/20 text-sky-300 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-sky-400/30">
                    Sistema Ativo
                  </span>
                </h3>
                <p className="text-[11px] text-slate-300 flex items-center gap-1 font-normal">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>Sede Angatuba-SP • Atendimento SP & PR | Projetos Brasil</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetWizard}
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-xs flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline font-mono text-[10px] uppercase">Reiniciar</span>
              </button>
            </div>
          </div>

          {/* Interactive Flow */}
          {!isCompleted ? (
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              
              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>Passo {currentStepIndex + 1} de {activeSteps.length}</span>
                  <span className="text-sky-400 font-bold">
                    {Math.round(((currentStepIndex + 1) / activeSteps.length) * 100)}% Concluído
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${((currentStepIndex + 1) / activeSteps.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Bot Question Card */}
              <div className="bg-slate-900/90 border border-white/15 p-6 rounded-2xl space-y-4 shadow-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-widest block">
                      Eng(a). Olívia pergunta:
                    </span>
                    <p className="text-sm sm:text-base text-slate-100 font-medium whitespace-pre-line leading-relaxed">
                      {currentStep?.question}
                    </p>
                  </div>
                </div>
              </div>

              {/* Option Buttons or Text Input */}
              <div className="space-y-3">
                {currentStep?.options && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {currentStep.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(opt.value)}
                        className="p-4 bg-white/10 hover:bg-sky-600/30 border border-white/15 hover:border-sky-400 rounded-2xl text-left text-sm font-semibold text-white transition-all flex items-center justify-between group shadow-md"
                      >
                        <span>{opt.label}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-300 transition-transform group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                )}

                {currentStep?.isTextInput && (
                  <form onSubmit={handleTextSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder={currentStep.placeholder}
                      className="flex-1 bg-slate-950 border border-white/20 text-white placeholder-slate-400 text-sm rounded-2xl px-5 py-4 focus:outline-none focus:border-sky-400 transition-colors"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={!customText.trim()}
                      className="bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold px-6 py-4 rounded-2xl transition-colors flex items-center gap-2"
                    >
                      <span>Avançar</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>

              {/* Business & Rule Footer Banner */}
              <div className="p-3.5 bg-slate-950/80 border border-white/10 rounded-2xl text-xs text-slate-300 flex items-center justify-between font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Chalés: Estrutura Metálica • Cliente livre para comprar o aço onde desejar</span>
                </div>
                <span className="text-sky-400 hidden sm:inline">Angatuba-SP • Atendimento SP/PR</span>
              </div>

            </div>
          ) : (
            /* COMPLETED RESULT: GENERATED 3D VISUALIZER */
            <div className="p-6 sm:p-8 space-y-6">
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3 text-emerald-300">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider">
                    Eng(a). Olívia gerou seu Pré-Projeto e Análise Estrutural 3D!
                  </h4>
                  <p className="text-xs text-slate-300">
                    O modelo interativo abaixo foi calculado para a cidade de <strong className="text-white">{params.city}</strong> ({params.areaM2}m²).
                  </p>
                </div>
              </div>

              {/* 3D Interactive Component */}
              <Project3DViewer params={params} />

              {/* Summary Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="p-4 bg-slate-900 border border-white/10 rounded-2xl space-y-1">
                  <span className="text-slate-400 font-mono">Tipo de Obra</span>
                  <div className="font-bold text-white uppercase">{params.projectType}</div>
                </div>

                <div className="p-4 bg-slate-900 border border-white/10 rounded-2xl space-y-1">
                  <span className="text-slate-400 font-mono">Localização da Obra</span>
                  <div className="font-bold text-white">{params.city}</div>
                </div>

                <div className="p-4 bg-slate-900 border border-white/10 rounded-2xl space-y-1">
                  <span className="text-slate-400 font-mono">Sondagem SPT (Fundação)</span>
                  <div className="font-bold text-amber-300">{params.hasSondagemSPT}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                <button
                  onClick={resetWizard}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors border border-white/15"
                >
                  Refazer Pré-Projeto 3D
                </button>

                <a
                  href={buildWhatsAppLink(
                    `Envio de Pré-Projeto Técnico - ${params.projectType} (${params.areaM2}m²)`,
                    `Resumo do Pré-Projeto criado com a Enga. Olívia:\n• Tipo de Obra: ${params.projectType}\n• Cidade/Local: ${params.city}\n• Metragem: ${params.areaM2}m²\n• Possui Terreno: ${params.hasLand}\n• Projeto Arquitetônico: ${params.hasArchitectural}\n• Quartos: ${params.bedrooms}\n• Mezanino: ${params.hasMezzanine ? 'Sim' : 'Não'}\n• Sondagem SPT: ${params.hasSondagemSPT}\n\nOlá Eng. Régis Tavares! Acabei de definir meu pré-projeto com a Olívia e gostaria que sua equipe de Engenheiros analise para darmos andamento ao orçamento!`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-2xl transition-all shadow-xl shadow-emerald-900/30 flex items-center justify-center gap-3 border border-emerald-300 transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4 text-slate-950 fill-current" />
                  <span>Enviar Pré-Projeto para Equipe de Engenheiros</span>
                </a>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
