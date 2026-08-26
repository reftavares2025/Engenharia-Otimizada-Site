import React, { useEffect, useRef, useState } from 'react';
import { Bot, Send, X, Sparkles, MessageSquare, Loader2 } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

const GREETING: ChatMessage = {
  sender: 'bot',
  text: 'Olá! Sou o assistente técnico da Régis Tavares Engenharia Civil, com respostas geradas por IA. Pode perguntar sobre pré-fabricados, chalés, prazos, projetos ou qualquer dúvida técnica.',
};

/**
 * Free-text AI chat, backed by the real Gemini endpoint (/api/chat — served
 * by api/chat.ts on Vercel, or by server.ts locally). This is the one
 * assistant on the site that is genuinely AI: it can answer open questions,
 * unlike the structured wizard in BotQualification.tsx.
 */
export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [hasError, setHasError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isSending]);

  const whatsappUrl = buildWhatsAppLink(
    'Continuação de Conversa com a Assistente IA',
    'Olá Eng. Régis! Estava conversando com o assistente de IA do site e gostaria de continuar com um atendimento direto.'
  );

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isSending) return;

    const nextMessages: ChatMessage[] = [...messages, { sender: 'user', text }];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);
    setHasError(false);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          // Send prior turns only (exclude the greeting, which the model never said).
          history: messages.slice(1),
        }),
      });

      const data = await res.json();

      if (!res.ok && !data?.reply) {
        throw new Error(data?.error || 'Falha na resposta do assistente.');
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply as string }]);
    } catch (err) {
      setHasError(true);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Tive um problema para responder agora. Você pode falar direto com o Eng. Régis Tavares pelo WhatsApp abaixo.',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm h-[70vh] max-h-[520px] bg-slate-900 border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-slate-950 px-4 py-3.5 border-b border-white/10 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[9px] flex items-center justify-center text-sky-300">
                  <Bot className="w-4.5 h-4.5" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xs text-white flex items-center gap-1.5">
                  Assistente Técnica
                  <span className="inline-flex items-center gap-1 bg-sky-500/20 text-sky-300 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-sky-400/30">
                    <Sparkles className="w-2.5 h-2.5" /> IA
                  </span>
                </h3>
                <p className="text-[10px] text-slate-400">Régis Tavares Engenharia Civil</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Fechar chat"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/60">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-sky-500 text-slate-950 font-medium'
                      : 'bg-slate-800 text-slate-100 border border-white/10'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-slate-400 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Olívia está digitando…</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-slate-900 flex-shrink-0 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua pergunta…"
                className="flex-1 bg-slate-950 border border-white/20 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-sky-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isSending}
                aria-label="Enviar"
                className="bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider py-2 rounded-lg transition-colors ${
                hasError
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400'
              }`}
            >
              <MessageSquare className="w-3 h-3" />
              <span>Prefiro falar com o Eng. Régis no WhatsApp</span>
            </a>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Fechar assistente' : 'Abrir assistente técnica com IA'}
        className="fixed bottom-24 right-6 sm:bottom-28 sm:right-6 z-40 bg-sky-500 hover:bg-sky-400 text-slate-950 p-3.5 rounded-full shadow-2xl shadow-sky-600/40 transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center border-2 border-white/20"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </button>
    </>
  );
};
