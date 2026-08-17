import React, { useState } from 'react';
import { MessageSquare, Phone, MapPin, ShieldCheck, Send, Clock, User, CheckCircle2 } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

export const ContactCTA: React.FC = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [projectType, setProjectType] = useState('Chalé em Estrutura Metálica');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildWhatsAppLink(
      `Análise Técnica: ${projectType}`,
      `Nome: ${name || 'Cliente'}\nCidade: ${city || 'Angatuba e Região'}\nDetalhes do projeto: ${message || 'Solicito orçamento e análise técnica.'}`
    );
    window.open(url, '_blank');
  };

  const directWhatsappUrl = buildWhatsAppLink(
    'Contato Direto com Engenheiro',
    'Olá Eng. Régis Tavares! Gostaria de solicitar um orçamento direto e tirar dúvidas sobre projeto/obra.'
  );

  return (
    <section id="contato" className="py-16 sm:py-24 bg-stone-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-12 shadow-2xl overflow-hidden relative">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-extrabold text-emerald-400 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Atendimento Prioritário</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-display tracking-tight text-slate-100">
                Vamos Fechar o Seu Projeto com <span className="font-bold text-white italic">Garantia do Melhor Preço?</span>
              </h2>

              <p className="text-base text-slate-300 leading-relaxed font-normal">
                Fale diretamente com quem entende e fabrica. Envie seu croqui, ideia ou proposta concorrente para nossa engenharia analisar. <strong className="text-white font-semibold">Batemos qualquer valor de orçamento que seja coerente!</strong>
              </p>

              {/* Direct Info Cards */}
              <div className="space-y-3 pt-2">
                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-xl hover:bg-white/15 border border-white/15 rounded-2xl transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-lg shadow-emerald-600/30">
                    <MessageSquare className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 block">WhatsApp Direto dos Engenheiros</span>
                    <span className="text-base font-bold font-mono text-white group-hover:text-emerald-400 transition-colors">
                      Clique para Iniciar Conversa
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-white/10 text-slate-200 border border-white/15 flex items-center justify-center font-bold flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 block">Localização & Cobertura</span>
                    <span className="text-xs font-bold text-white">
                      Angatuba - SP • Atendimento em São Paulo & Paraná
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Quick Form Column */}
            <div className="lg:col-span-6 bg-slate-950/70 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-4">
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-lg font-bold text-white font-display">
                  Solicitar Análise Técnica Gratuita
                </h3>
                <p className="text-xs text-slate-300 font-normal">
                  Preencha os dados abaixo e seja direcionado para o WhatsApp com a mensagem pronta:
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 mb-1">Seu Nome:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite seu nome completo"
                    className="w-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-slate-100 placeholder-slate-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 mb-1">Sua Cidade / Estado:</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ex: Sorocaba-SP, Sengés-PR"
                      className="w-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-slate-100 placeholder-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 mb-1">Tipo de Obra:</label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full bg-slate-900 border border-white/15 text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-slate-100"
                    >
                      <option value="Chalé em Estrutura Metálica">Chalé em Estrutura Metálica</option>
                      <option value="Pré-Fabricado Galpão/Comercial">Galpão / Prédio Comercial</option>
                      <option value="Projeto Arquitetônico do Zero">Projeto Arquitetônico</option>
                      <option value="Projeto Estrutural e ART">Projeto Estrutural & ART</option>
                      <option value="Acompanhamento de Obra">Acompanhamento Técnico de Obra</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 mb-1">Mensagem ou Detalhes (Opcional):</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Conte sobre a área (m²), se possui sondagem SPT do terreno ou orçamento de concorrente..."
                    className="w-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs rounded-xl px-4 py-2 focus:outline-none focus:border-slate-100 placeholder-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-xl shadow-emerald-600/20"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Enviar Orçamento Direto no WhatsApp</span>
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
