import React from 'react';
import { BrandLogo } from './BrandLogo';
import { MessageSquare, MapPin, ShieldCheck, Phone, Heart } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const whatsappUrl = buildWhatsAppLink(
    'Contato Rodapé do Site',
    'Olá Eng. Régis Tavares! Estou navegando pelo site da Régis Tavares Engenharia Civil e gostaria de solicitar um orçamento.'
  );

  return (
    <footer className="bg-stone-950 text-slate-400 text-xs border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo variant="dark" />
            <p className="text-slate-400 text-xs leading-relaxed max-w-md font-normal">
              Engenharia Civil e Controle de Obras especializada em estruturas pré-fabricadas de concreto, projetos arquitetônicos personalizados, cálculos estruturais com ART e chalés em estrutura metálica de pequeno a alto padrão.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantia de Cobrir Qualquer Orçamento Coerente do Mercado</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest font-mono">
              Navegação
            </h4>
            <ul className="space-y-2 text-slate-300 font-normal">
              <li><a href="#inicio" className="hover:text-amber-300 transition-colors">Início</a></li>
              <li><a href="#pre-fabricados" className="hover:text-amber-300 transition-colors">Estruturas Pré-Fabricadas</a></li>
              <li><a href="#chales" className="hover:text-amber-300 transition-colors">Chalés em Estrutura Metálica</a></li>
              <li><a href="#projetos" className="hover:text-amber-300 transition-colors">Projetos & Portfólio</a></li>
              <li><a href="#assistente-ia" className="hover:text-amber-300 transition-colors">Eng(a). Olívia • Visualizador 3D</a></li>
              <li><a href="#calculadora" className="hover:text-amber-300 transition-colors">Simulador de Custos</a></li>
              <li><a href="#faq" className="hover:text-amber-300 transition-colors">Perguntas Frequentes (FAQ)</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest font-mono">
              Contato & Localização
            </h4>
            
            <div className="space-y-2 text-slate-300 font-normal">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span><strong>Sede Fabril:</strong> Angatuba - SP (Atendimento presencial em São Paulo e Paraná)</span>
              </div>

              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>WhatsApp:</strong> Atendimento Direto On-line</span>
              </div>

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl transition-colors text-xs uppercase tracking-wider shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>Falar Direto no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Régis Tavares Engenharia Civil — Engenharia Otimizada. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-4">
            <a href="/sitemap.xml" target="_blank" className="hover:text-slate-300 transition-colors">Sitemap XML</a>
            <span>•</span>
            <a href="/robots.txt" target="_blank" className="hover:text-slate-300 transition-colors">Robots TXT</a>
            <span>•</span>
            <a href="/llms.txt" target="_blank" className="hover:text-slate-300 transition-colors">LLMs TXT Context</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
