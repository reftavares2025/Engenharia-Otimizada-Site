import React from 'react';
import {
  ShieldCheck,
  Award,
  FileCheck,
  UserCheck,
  CheckCircle,
  Calendar
} from 'lucide-react';

interface TechnicalCredibilityProps {
  onOpenConsultation?: () => void;
}

export const TechnicalCredibility: React.FC<TechnicalCredibilityProps> = ({ onOpenConsultation }) => {
  return (
    <section className="bg-slate-900 border-y border-slate-800 py-6 text-slate-200 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-slate-900 to-emerald-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
          
          {/* Item 1: Eng. Responsável */}
          <div
            onClick={onOpenConsultation}
            className="lg:col-span-1 flex items-center gap-3.5 bg-slate-800/80 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-500/60 rounded-xl p-3.5 backdrop-blur-sm cursor-pointer transition-all group shadow-sm hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-extrabold">
                  Engenharia Civil
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h4 className="text-sm font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                Eng. Régis Tavares
              </h4>
              <p className="text-[11px] text-slate-400">Engenheiro Responsável Técnico</p>
            </div>
          </div>

          {/* Item 2: Certificado CREA */}
          <div className="flex items-center gap-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-extrabold">
                Garantia de Qualidade
              </div>
              <h4 className="text-sm font-bold text-white leading-snug flex items-center gap-1">
                <span>Engenharia Certificada</span>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
              </h4>
              <p className="text-[11px] text-slate-400">Equipe registrada no conselho de engenharia</p>
            </div>
          </div>

          {/* Item 3: ART Garantida */}
          <div className="flex items-center gap-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-extrabold">
                Segurança Total
              </div>
              <h4 className="text-sm font-bold text-white leading-snug">
                Obra Regularizada
              </h4>
              <p className="text-[11px] text-slate-400">Emissão de Responsabilidade Técnica (ART)</p>
            </div>
          </div>

          {/* Item 4: Conformidade ABNT */}
          <div className="flex items-center gap-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-extrabold">
                Padrão de Excelência
              </div>
              <h4 className="text-sm font-bold text-white leading-snug">
                Materiais Normatizados
              </h4>
              <p className="text-[11px] text-slate-400">Aço, pré-moldados e concreto com laudo</p>
            </div>
          </div>

          {/* Item 5: Action Button to Open Consultation Modal */}
          <div className="lg:col-span-1">
            <button
              onClick={onOpenConsultation}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Agendar Viabilidade</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

