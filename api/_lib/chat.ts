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

export async function getChatReply(
  message: string,
  history: ChatHistoryItem[] = []
): Promise<ChatResult> {
  const apiKey = "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";

  const messages: Array<{ role: string; content: string }> = [
    { role: "system", content: SYSTEM_INSTRUCTION }
  ];
  
  history.forEach((item) => {
    messages.push({
      role: item.sender === "user" ? "user" : "assistant",
      content: item.text,
    });
  });
  messages.push({ role: "user", content: message });

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "qwen-2.5-coder-32b",
        messages: messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    const replyText = data.choices?.[0]?.message?.content ||
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
