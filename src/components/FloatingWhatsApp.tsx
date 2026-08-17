import React from 'react';
import { MessageSquare } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = buildWhatsAppLink(
    'Atendimento Flutuante no Site',
    'Olá Eng. Régis Tavares! Vim pelo site da Régis Tavares Engenharia Civil e gostaria de solicitar um atendimento e orçamento.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip badge */}
      <div className="hidden sm:flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700 shadow-xl animate-bounce">
        <span>Fale com o Engenheiro (Angatuba)</span>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="relative group bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl shadow-emerald-600/50 transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center border-2 border-white/20"
      >
        {/* Gentle pulsing aura glow behind the button */}
        <span className="absolute -inset-1.5 rounded-full bg-emerald-500/40 blur-md animate-pulse pointer-events-none -z-10" />
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping opacity-30 pointer-events-none duration-1000" />

        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300 border-2 border-slate-900"></span>
        </span>
        <MessageSquare className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
};
