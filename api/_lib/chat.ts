import { GoogleGenAI } from "@google/genai";

// Shared chat logic for the technical assistant, used both by the local dev
// server (server.ts, via `tsx server.ts`) and by the Vercel serverless
// function (api/chat.ts) that actually serves this in production.

export interface ChatHistoryItem {
  sender: string;
  text: string;
}

export interface ChatResult {
  reply: string;
  recommendedAction: "whatsapp";
  /** Present only when something went wrong (used to mirror the HTTP status). */
  errorStatus?: number;
}

function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// System instruction for the qualification & consulting bot
export const SYSTEM_INSTRUCTION = `Você é o Assistente Virtual da Régis Tavares Engenharia Civil (Engenharia Otimizada).
Sua missão é atender clientes interessados em construções pré-fabricadas, projetos arquitetônicos personalizados, projetos estruturais, chalés de pequeno a grande padrão e acompanhamento técnico de obras.

REGRAS DE CONHECIMENTO E POSICIONAMENTO:
1. SOBRE A EMPRESA: Somos fabricantes de estruturas pré-fabricadas (concreto e metálicas). Trabalhamos com time de engenheiros altamente experientes.
2. DIFERENCIAL DE PREÇO: Garantimos os melhores valores do mercado e batemos qualquer orçamento coerente de concorrentes.
3. LOCALIZAÇÃO E ÁREA DE ATENDIMENTO:
   - Para execução/montagem de obras pré-fabricadas e acompanhamento presencial: atendemos o estado de São Paulo e Paraná (como Sorocaba, Itapetininga, Botucatu, Avaré, Capão Bonito, Campinas, Piracicaba, Tatuí, Sengés, Jaguariaíva, Castro e região de Angatuba-SP).
   - Para projetos arquitetônicos personalizados e projetos estruturais: atendemos clientes de TODO O BRASIL.
4. ESPECIALIDADE EM CHALÉS: Somos especializados em projetos e construções de Chalés de pequeno, médio e grande padrão/luxo (A-Frame, chalés alpinos, estruturas mistas aço/concreto/madeira), garantindo qualidade superior, rapidez e alto apelo estético para turismo/Airbnb ou moradia.
5. SERVIÇOS OFERECIDOS:
   - Estruturas Pré-Fabricadas para Galpões Logísticos, Prédios Comerciais e Casas Residencias.
   - Projetos Arquitetônicos Personalizados (criamos a sua ideia do zero).
   - Projetos Estruturais Otimizados com cálculo de fundações e ART.
   - Acompanhamento técnico da obra e controle de engenharia.
6. CONTATO DIRETO: Atendimento via link direto do WhatsApp (nunca exiba o número de telefone em texto puro).

DIRETRIZES DE ATENDIMENTO DO BOT:
- Seja atencioso, técnico, profissional e direto ao ponto.
- Ajude o cliente a definir: Tipo de obra (Galpão, Chalé, Comercial, Residência), Área aproximada (m²), Cidade/Estado da obra, e se já possui projeto pronto.
- Avalie a localidade do cliente (SP, PR ou outros estados) para orientar sobre montagem ou projetos.
- Dê orientações técnicas úteis (ex: rapidez do pré-fabricado de até 60% em relação à alvenaria, economia de material, sustentabilidade, resistência do concreto pré-fabricado).
- Sempre finalize sua resposta recomendando que o cliente clique no botão de falar diretamente no WhatsApp para receber um orçamento detalhado e atendimento prioritário com o Eng. Régis Tavares (NÃO escreva números de telefone em texto puro).
- Responda em Português do Brasil com excelente ortografia e formatação clara (parágrafos curtos, tópicos em bullet points).`;

function localFallback(message: string): string {
  const lowerMsg = message.toLowerCase();
  let reply = "Olá! Sou o assistente técnico da Régis Tavares Engenharia Civil. ";

  if (lowerMsg.includes("chalé") || lowerMsg.includes("chale")) {
    reply += "Somos especialistas em chalés de pequeno, médio e grande padrão (incluindo modelos A-Frame e luxo). Desenvolvemos desde o projeto arquitetônico até a estrutura pré-fabricada otimizada! ";
  } else if (lowerMsg.includes("pré-fabricado") || lowerMsg.includes("pre fabricado") || lowerMsg.includes("galpão")) {
    reply += "Somos fabricantes diretos de estruturas pré-fabricadas. Garantimos os melhores valores do mercado e cobrimos qualquer orçamento coerente. Atendemos obras em São Paulo e Paraná! ";
  } else if (lowerMsg.includes("projeto") || lowerMsg.includes("arquitetônico") || lowerMsg.includes("estrutural")) {
    reply += "Desenvolvemos projetos arquitetônicos personalizados do zero e projetos estruturais otimizados para todo o Brasil. ";
  } else {
    reply += "Trabalhamos com fabricação própria de pré-fabricados, projetos arquitetônicos personalizados, cálculos estruturais e chalés de alto padrão. ";
  }

  reply += "\n\nPara analisarmos seu projeto com precisão, fale diretamente com o Eng. Régis Tavares pelo botão do WhatsApp!";
  return reply;
}

export async function getChatReply(
  message: string,
  history: ChatHistoryItem[] = []
): Promise<ChatResult> {
  const genAI = getGenAIClient();

  if (!genAI) {
    // No GEMINI_API_KEY configured in this environment — keyword-based fallback.
    return { reply: localFallback(message), recommendedAction: "whatsapp" };
  }

  const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
  history.forEach((item) => {
    contents.push({
      role: item.sender === "user" ? "user" : "model",
      parts: [{ text: item.text }],
    });
  });
  contents.push({ role: "user", parts: [{ text: message }] });

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText =
      response.text ||
      "Desculpe, ocorreu uma instabilidade momentânea. Clique no botão abaixo para falar no WhatsApp com nossos engenheiros!";

    return { reply: replyText, recommendedAction: "whatsapp" };
  } catch (err) {
    console.error("Erro na API /api/chat:", err);
    return {
      reply:
        "Tivemos um pequeno problema na resposta automática, mas você pode chamar o Eng. Régis Tavares diretamente clicando no botão do WhatsApp!",
      recommendedAction: "whatsapp",
      errorStatus: 500,
    };
  }
}
