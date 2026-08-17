import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  Building2,
  X,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Truck,
  Compass,
  CheckSquare,
  Layers,
  Wrench
} from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROJECT_OPTIONS = [
  'Pré-Fabricados de Concreto (Galpão / Edifício Comercial)',
  'Estruturas Metálicas & Coberturas de Grande Vão',
  'Chalés em Estrutura Metálica / Steel Frame (Turismo / Lazer)',
  'Visita Técnica Presencial de Viabilidade (Dúvida entre Concreto e Aço)',
  'Inspeção para Ampliação ou Reforma Estrutural',
  'Outro Projeto de Engenharia Civil'
];

const TIME_SLOTS = [
  '09:00 - Manhã',
  '10:30 - Manhã',
  '14:00 - Tarde',
  '15:30 - Tarde',
  '17:00 - Tarde/Noite',
  '18:30 - Noite'
];

interface ChecklistItem {
  id: string;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  recommendedFor: 'all' | 'pre-fabricado' | 'metalico';
}

const SITE_CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'acesso_carretas',
    label: 'Acesso para Carretas e Caminhões Pesados',
    desc: 'Verificação de curvas, largura de vias e portões para transporte de pilares e vigas',
    icon: Truck,
    recommendedFor: 'pre-fabricado'
  },
  {
    id: 'espaco_munck',
    label: 'Espaço e Patolamento de Munck / Guindaste',
    desc: 'Área firme e raio de giro livre para içamento seguro de estruturas pesadas',
    icon: Wrench,
    recommendedFor: 'all'
  },
  {
    id: 'topografia_inclinacao',
    label: 'Topografia, Declividade e Níveis do Terreno',
    desc: 'Aclive/declive, necessidade de terraplenagem, contenção ou pilotis em aço',
    icon: Compass,
    recommendedFor: 'all'
  },
  {
    id: 'comparativo_sistema',
    label: 'Diagnóstico: Pré-Fabricado vs. Estrutura Metálica',
    desc: 'Análise in loco de custo por m², agilidade de montagem e perfil ideal para o terreno',
    icon: Layers,
    recommendedFor: 'all'
  },
  {
    id: 'interferencias_aereas',
    label: 'Rede Elétrica e Interferências Aéreas',
    desc: 'Fiação de alta/média tensão, árvores ou recuos que impactam a movimentação de peças',
    icon: ShieldCheck,
    recommendedFor: 'all'
  },
  {
    id: 'espaco_canteiro',
    label: 'Área Livre para Canteiro e Descarga de Peças',
    desc: 'Espaço disponível no lote para descarregamento e estoque temporário de peças',
    icon: Building2,
    recommendedFor: 'all'
  }
];

// Helper to generate next available business days (excluding Sunday)
function getUpcomingDays() {
  const days: { label: string; dateStr: string; dayName: string }[] = [];
  const today = new Date();
  const current = new Date(today);
  current.setDate(current.getDate() + 1); // Start tomorrow

  const dayFormatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' });
  const dateFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' });

  while (days.length < 5) {
    if (current.getDay() !== 0) { // Skip Sundays
      const dayName = dayFormatter.format(current).replace('.', '');
      const dateStr = dateFormatter.format(current);
      days.push({
        label: `${dayName.toUpperCase()} (${dateStr})`,
        dateStr,
        dayName
      });
    }
    current.setDate(current.getDate() + 1);
  }
  return days;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const availableDays = getUpcomingDays();

  const [selectedDay, setSelectedDay] = useState(availableDays[0]?.label || '');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[1]);
  const [projectType, setProjectType] = useState(PROJECT_OPTIONS[0]);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCity, setClientCity] = useState('');
  const [selectedChecklist, setSelectedChecklist] = useState<string[]>([
    'acesso_carretas',
    'espaco_munck',
    'topografia_inclinacao',
    'comparativo_sistema'
  ]);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleChecklistItem = (id: string) => {
    setSelectedChecklist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedChecklistLabels = SITE_CHECKLIST_ITEMS.filter((item) =>
      selectedChecklist.includes(item.id)
    ).map((item) => `  ✓ ${item.label}`);

    const formattedMessage =
      `*SOLICITAÇÃO DE VISITA TÉCNICA & VIABILIDADE PRESENCIAL*\n\n` +
      `👤 *Cliente:* ${clientName || 'Não informado'}\n` +
      `📞 *Telefone/WhatsApp:* ${clientPhone || 'Não informado'}\n` +
      `📍 *Cidade/Local do Terreno:* ${clientCity || 'Não informada'}\n` +
      `🏗️ *Tipo de Projeto:* ${projectType}\n` +
      `📅 *Data Pretendida:* ${selectedDay}\n` +
      `⏰ *Horário Preferencial:* ${selectedTime}\n\n` +
      `📋 *CHECKLIST DE VERIFICAÇÃO DO TERRENO (Pontos de Interesse):*\n` +
      (selectedChecklistLabels.length > 0
        ? selectedChecklistLabels.join('\n')
        : '  (Nenhum item específico marcado)') +
      `\n\n` +
      (notes ? `📝 *Observações / Detalhes do Local:* ${notes}\n\n` : '') +
      `Olá Eng. Régis Tavares! Gostaria de agendar esta Visita Técnica Presencial para avaliarmos meu terreno e definirmos a viabilidade construtiva (Pré-Fabricado x Estrutura Metálica).`;

    const waUrl = `https://wa.me/5515998606403?text=${encodeURIComponent(formattedMessage)}`;

    setIsSubmitted(true);
    window.open(waUrl, '_blank');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full shadow-2xl relative overflow-hidden text-slate-100 my-4 sm:my-8 animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        
        {/* Header with Technical Feasibility Focus */}
        <div className="bg-gradient-to-r from-amber-500/20 via-slate-800 to-emerald-500/20 px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-extrabold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Viabilidade Técnica Presencial</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-display text-white mt-0.5">
                Visita Técnica no Terreno & Diagnóstico
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleFormSubmit} className="p-4 sm:p-6 space-y-5 text-xs sm:text-sm overflow-y-auto flex-1 custom-scrollbar">
            
            {/* Top Explanatory Banner: Feasibility & Decision Matrix */}
            <div className="bg-slate-800/70 border border-amber-500/30 rounded-2xl p-3.5 sm:p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Por que a Visita Técnica Presencial é Essencial?</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Nossa equipe de engenharia inspeciona o terreno no local para avaliar <strong className="text-white">acessibilidade de carretas, raio de giro para caminhão munck e declividade</strong>. No próprio local, diagnosticamos se a solução mais econômica e eficiente para sua obra é o <strong className="text-amber-300">Pré-Fabricado de Concreto</strong> ou a <strong className="text-amber-300">Estrutura Metálica</strong>.
              </p>
            </div>

            {/* Step 1: Day selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>1. Escolha a Data Pretendida para a Visita:</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {availableDays.map((day) => (
                  <button
                    key={day.label}
                    type="button"
                    onClick={() => setSelectedDay(day.label)}
                    className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all ${
                      selectedDay === day.label
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md ring-2 ring-amber-400/30'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="block text-[11px] font-mono uppercase leading-tight">{day.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Time slot selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>2. Horário Preferencial para Reunião / Vistoria:</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      selectedTime === slot
                        ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-md ring-2 ring-emerald-400/30'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="block text-[11px] font-mono">{slot}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Project type */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>3. Finalidade da Obra ou Dúvida Principal:</span>
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 font-medium text-xs sm:text-sm"
              >
                {PROJECT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 4: Interactive Site Feasibility Checklist */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
                  <span>4. Checklist de Verificação do Terreno (Marque o que deseja analisar):</span>
                </label>
                <span className="text-[10px] font-mono text-slate-400">
                  {selectedChecklist.length}/{SITE_CHECKLIST_ITEMS.length} selecionados
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SITE_CHECKLIST_ITEMS.map((item) => {
                  const isChecked = selectedChecklist.includes(item.id);
                  const ItemIcon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`text-left p-2.5 sm:p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                        isChecked
                          ? 'bg-slate-800/95 border-amber-400/80 shadow-sm ring-1 ring-amber-400/30'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                          isChecked
                            ? 'bg-amber-400 border-amber-300 text-slate-950'
                            : 'bg-slate-900 border-slate-600 text-transparent'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <ItemIcon className={`w-3.5 h-3.5 ${isChecked ? 'text-amber-400' : 'text-slate-500'}`} />
                          <span className={`text-xs font-bold leading-tight ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                            {item.label}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-snug mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Contact info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-300 flex items-center gap-1">
                  <User className="w-3 h-3 text-slate-400" />
                  <span>Seu Nome Completo:</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Eduardo"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-300 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>Seu WhatsApp com DDD:</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: (15) 99999-8888"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>Cidade, Bairro ou Região da Obra/Terreno:</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Sorocaba / SP, Angatuba / SP, Curitiba / PR..."
                value={clientCity}
                onChange={(e) => setClientCity(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-300">
                Informações Complementares sobre o Terreno (Opcional):
              </label>
              <textarea
                rows={2}
                placeholder="Ex: O terreno tem 1.000m² em condomínio fechado com aclive suave, portaria com controle de peso..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            {/* Action buttons */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Confirmar Visita Técnica no WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-slate-400 text-center mt-2">
                A solicitação enviará o checklist do terreno e seus dados diretamente ao WhatsApp oficial do Eng. Régis Tavares.
              </p>
            </div>

          </form>
        ) : (
          /* Confirmation State */
          <div className="p-8 text-center space-y-5 overflow-y-auto flex-1">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-bold font-display text-white">
                Solicitação de Visita Técnica Enviada!
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                Seu WhatsApp foi aberto com o checklist do terreno e dados do agendamento para a data <strong className="text-amber-300">{selectedDay}</strong> às <strong className="text-amber-300">{selectedTime}</strong>.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 text-left text-xs space-y-2 font-mono text-slate-300 max-w-md mx-auto">
              <div><strong className="text-slate-400">Cliente:</strong> {clientName}</div>
              <div><strong className="text-slate-400">Finalidade:</strong> {projectType}</div>
              <div><strong className="text-slate-400">Local do Terreno:</strong> {clientCity || 'Não informado'}</div>
              <div>
                <strong className="text-slate-400">Checklist Selecionado:</strong>{' '}
                {selectedChecklist.length} pontos de verificação
              </div>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-colors border border-slate-700"
              >
                Fechar Janela
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
