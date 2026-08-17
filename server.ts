import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy GoogleGenAI initialization
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
const SYSTEM_INSTRUCTION = `Você é o Assistente Virtual da Régis Tavares Engenharia Civil (Engenharia Otimizada).
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

// API endpoint for AI qualification bot
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Mensagem é obrigatória." });
    }

    const genAI = getGenAIClient();

    if (!genAI) {
      // Smart local fallback if GEMINI_API_KEY is not configured
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

      return res.json({
        reply,
        recommendedAction: "whatsapp",
      });
    }

    // Format chat history for Gemini
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      history.forEach((item: { sender: string; text: string }) => {
        contents.push({
          role: item.sender === "user" ? "user" : "model",
          parts: [{ text: item.text }],
        });
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await genAI.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Desculpe, ocorreu uma instabilidade momentânea. Clique no botão abaixo para falar no WhatsApp com nossos engenheiros!";

    return res.json({
      reply: replyText,
      recommendedAction: "whatsapp",
    });
  } catch (err: any) {
    console.error("Erro na API /api/chat:", err);
    return res.status(500).json({
      error: "Erro ao processar mensagem.",
      reply: "Tivemos um pequeno problema na resposta automática, mas você pode chamar o Eng. Régis Tavares diretamente clicando no botão do WhatsApp!",
    });
  }
});

// API endpoint to calculate quick project preliminary estimate
app.post("/api/estimate", (req, res) => {
  const { type, area, location, hasProject } = req.body;

  const areaNum = parseFloat(area) || 100;
  let estimatedDays = Math.ceil(areaNum / 15);
  if (estimatedDays < 10) estimatedDays = 10;
  if (estimatedDays > 45) estimatedDays = 45;

  let highlight = "Estrutura pré-fabricada de alta resistência com garantia de fabricação própria.";
  if (type === "chale") {
    highlight = "Especialidade em Chalés de Pequeno a Grande Padrão. Design sofisticado e montagem rápida.";
  } else if (type === "galpao") {
    highlight = "Galpão Logístico em pré-fabricado com pé-direito livre e fundações otimizadas.";
  } else if (type === "comercial") {
    highlight = "Edifício Comercial pré-fabricado com painéis arquitetônicos e fachada moderna.";
  }

  const whatsappMessage = encodeURIComponent(
    `Olá Eng. Régis! Fiz uma simulação no site para um projeto do tipo ${type || "Geral"}, com área de aproximadamente ${areaNum}m² em ${location || "Angatuba e Região"}. Gostaria de solicitar um orçamento personalizado e verificar os detalhes!`
  );

  return res.json({
    area: areaNum,
    estimatedDays,
    highlight,
    whatsappUrl: `https://wa.me/5519990154309?text=${whatsappMessage}`,
  });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
